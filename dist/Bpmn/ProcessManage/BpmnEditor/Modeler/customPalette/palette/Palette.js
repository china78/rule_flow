"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var min_dash_1 = require("min-dash");
var min_dom_1 = require("min-dom");
var TOGGLE_SELECTOR = '.djs-collapse-header';
var ENTRY_SELECTOR = '.entry';
var SLIDE_SELECTOR = '.djs-palette-toggle';
var ELEMENT_SELECTOR = TOGGLE_SELECTOR + ", " + ENTRY_SELECTOR + ", " + SLIDE_SELECTOR;
var PALETTE_OPEN_CLS = 'open';
var PALETTE_TWO_COLUMN_CLS = 'two-column';
/**
 * A palette containing modeling elements.
 */
var Palette = /** @class */ (function () {
    function Palette(eventBus, canvas) {
        var _this = this;
        /**
         * Do we need to collapse to two columns?
         *
         * @param {Number} availableHeight
         * @param {Object} entries
         *
         * @return {Boolean}
         */
        this.needsCollapse = function (availableHeight, entries) {
            // top margin + bottom toggle + bottom margin
            // implementors must override this method if they
            // change the palette styles
            var margin = 20 + 10 + 20;
            var entriesHeight = Object.keys(entries).length * 46;
            return availableHeight < entriesHeight + margin;
        };
        // 关闭/显示一级菜单(工具/流程网关/流程节点)
        this.toggle = function (target) {
            var group = min_dom_1.closest(target, '.group');
            var content = min_dom_1.query('.djs-collapse-content', group);
            var contentClasses = min_dom_1.classes(content);
            var headerClasses = min_dom_1.classes(target);
            var isOpen = contentClasses.has('open');
            if (isOpen) {
                contentClasses.remove('open');
                headerClasses.remove('open');
            }
            else {
                contentClasses.add('open');
                headerClasses.add('open');
            }
        };
        this.isActiveTool = function (tool) {
            return tool && _this.activeTool === tool;
        };
        this.eventBus = eventBus;
        this.canvas = canvas;
        this.providers = [];
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        eventBus.on('tool-manager.update', function (event) {
            var tool = event.tool;
            self.updateToolHighlight(tool);
        });
        eventBus.on('i18n.changed', function () {
            self.update();
        });
        eventBus.on('diagram.init', function () {
            self.diagramInitialized = true;
            // initialize + update once diagram is ready
            if (self.providers.length) {
                self.init();
                self.update();
            }
        });
    }
    // Palette.$inject = ['eventBus', 'canvas'];
    /**
     * Register a provider with the palette
     *
     * @param  {PaletteProvider} provider
     */
    Palette.prototype.registerProvider = function (provider) {
        this.providers.push(provider);
        // postpone init / update until diagram is initialized
        if (!this.diagramInitialized) {
            return;
        }
        if (!this.container) {
            this.init();
        }
        this.update();
    };
    /**
     * Returns the palette entries for a given element
     *
     * @return {Array<PaletteEntryDescriptor>} list of entries
     */
    Palette.prototype.getEntries = function () {
        var entries = {};
        // loop through all providers and their entries.
        // group entries by id so that overriding an entry is possible
        min_dash_1.forEach(this.providers, function (provider) {
            var e = provider.getPaletteEntries();
            min_dash_1.forEach(e, function (entry, id) {
                entries[id] = entry;
            });
        });
        return entries;
    };
    /**
     * Initialize
     */
    Palette.prototype.init = function () {
        var _a = this, canvas = _a.canvas, eventBus = _a.eventBus;
        this.container = min_dom_1.domify(Palette.HTML_MARKUP);
        var parent = min_dom_1.closest(canvas.getContainer(), '.bjs-container');
        var container = this.container;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        parent.insertBefore(container, parent.children[0]);
        min_dom_1.delegate.bind(container, ELEMENT_SELECTOR, 'click', function (event) {
            var target = event.delegateTarget;
            // 菜单伸缩
            if (min_dom_1.matches(target, TOGGLE_SELECTOR)) {
                return self.toggle(target);
            }
            // 左侧栏伸缩
            if (min_dom_1.matches(target, SLIDE_SELECTOR)) {
                return self.slide(target);
            }
            self.trigger('click', event);
            return null;
        });
        // prevent drag propagation
        min_dom_1.event.bind(container, 'mousedown', function (event) {
            event.stopPropagation();
        });
        // prevent drag propagation
        min_dom_1.delegate.bind(container, ENTRY_SELECTOR, 'dragstart', function (event) {
            self.trigger('dragstart', event);
        });
        eventBus.on('canvas.resized', this.layoutChanged, this);
        eventBus.fire('palette.create', {
            container: container,
        });
    };
    /**
     * Update palette state.
     *
     * @param  {Object} [state] { open, twoColumn }
     */
    Palette.prototype.toggleState = function (state) {
        var rstate = state || {};
        var parent = this.getParentContainer();
        var _a = this, container = _a.container, eventBus = _a.eventBus;
        var cls = min_dom_1.classes(container);
        var twoColumn = rstate.twoColumn || this.needsCollapse(parent.clientHeight, this.entries || {});
        // always update two column
        cls.toggle(PALETTE_TWO_COLUMN_CLS, twoColumn);
        if ('open' in rstate) {
            cls.toggle(PALETTE_OPEN_CLS, rstate.open);
        }
        eventBus.fire('palette.changed', {
            twoColumn: twoColumn,
            open: this.isOpen(),
        });
    };
    Palette.prototype.update = function () {
        this.entries = this.getEntries();
        var entriesContainer = min_dom_1.query('.djs-palette-entries', this.container);
        var entries = this.entries;
        min_dom_1.clear(entriesContainer);
        min_dash_1.forEach(entries, function (items) {
            var grouping = items.group || 'default';
            var container = min_dom_1.query("[data-group=" + grouping + "]", entriesContainer);
            var content = min_dom_1.query('.djs-collapse-content', container);
            var header = min_dom_1.domify("<div class =\"djs-collapse-header iconfont open\">" + items.title + "</div>");
            if (!container) {
                container = min_dom_1.domify("<div class =\"group\" data-group=\"" + grouping + "\"></div>");
                content = min_dom_1.domify('<div class="djs-collapse-content open"></div>');
                container.appendChild(header);
                container.appendChild(content);
                entriesContainer.appendChild(container);
            }
            // 如果不存在children，则不显示该菜单项
            if (items.children != null && items.children.length === 0) {
                var containerClass = min_dom_1.classes(container);
                containerClass.add('hidden');
            }
            min_dash_1.forEach(items.children, function (entry) {
                var html = entry.html ||
                    (entry.separator
                        ? '<hr class="separator" />'
                        : '<div class="entry" draggable="true"></div>');
                var control = min_dom_1.domify(html);
                var icon = min_dom_1.domify("<i class =\"content-icon " + entry.className + "\"></i>");
                var label = min_dom_1.domify("<span class =\"content-label\">" + entry.title + "</span>");
                control.appendChild(icon);
                control.appendChild(label);
                content.appendChild(control);
                if (!entry.separator) {
                    min_dom_1.attr(control, 'data-action', entry.id);
                    if (entry.title) {
                        min_dom_1.attr(control, 'title', entry.title);
                    }
                    if (entry.imageUrl) {
                        icon.appendChild(min_dom_1.domify("<img src=\"" + entry.imageUrl + "\">"));
                    }
                }
            });
        });
        // open after update
        this.open();
    };
    /**
     * Trigger an action available on the palette
     *
     * @param  {String} action
     * @param  {Event} event
     */
    Palette.prototype.trigger = function (action, event, autoActivate) {
        var entries = this.entries;
        var entry;
        var button = event.delegateTarget || event.target;
        if (!button) {
            return event.preventDefault();
        }
        min_dash_1.forEach(entries, function (items) {
            min_dash_1.forEach(items.children, function (item) {
                if (item.id === min_dom_1.attr(button, 'data-action')) {
                    entry = item;
                }
            });
        });
        // when user clicks on the palette and not on an action
        if (!entry) {
            return null;
        }
        var handler = entry.action;
        var originalEvent = event.originalEvent || event;
        // simple action (via callback function)
        if (min_dash_1.isFunction(handler)) {
            if (action === 'click') {
                handler(originalEvent, autoActivate);
            }
        }
        else if (handler[action]) {
            handler[action](originalEvent, autoActivate);
        }
        // silence other actions
        event.preventDefault();
        return null;
    };
    Palette.prototype.layoutChanged = function () {
        this.toggleState({});
    };
    /**
     * Close the palette
     */
    Palette.prototype.close = function () {
        this.toggleState({
            open: false,
            twoColumn: false,
        });
    };
    /**
     * Open the palette
     */
    Palette.prototype.open = function () {
        this.toggleState({ open: true });
    };
    // 伸缩左侧栏
    Palette.prototype.slide = function (target) {
        var containerClasses = min_dom_1.classes(this.container);
        var isRetract = containerClasses.has('retract');
        if (isRetract) {
            containerClasses.remove('retract');
            target.setAttribute('title', '收起');
        }
        else {
            containerClasses.add('retract');
            target.setAttribute('title', '展开');
        }
    };
    Palette.prototype.updateToolHighlight = function (name) {
        var entriesContainer;
        if (!this.toolsContainer) {
            entriesContainer = min_dom_1.query('.djs-palette-entries', this.container);
            this.toolsContainer = min_dom_1.query('[data-group=tools]', entriesContainer);
        }
        var toolsContainer = this.toolsContainer;
        min_dash_1.forEach(toolsContainer.children, function (tool) {
            var actionName = tool.getAttribute('data-action');
            if (!actionName) {
                return;
            }
            var toolClasses = min_dom_1.classes(tool);
            actionName = actionName.replace('-tool', '');
            if (toolClasses.contains('entry') && actionName === name) {
                toolClasses.add('highlighted-entry');
            }
            else {
                toolClasses.remove('highlighted-entry');
            }
        });
    };
    /**
     * Return true if the palette is opened.
     *
     * @example
     *
     * palette.open();
     *
     * if (palette.isOpen()) {
     *   // yes, we are open
     * }
     *
     * @return {boolean} true if palette is opened
     */
    Palette.prototype.isOpen = function () {
        return min_dom_1.classes(this.container).has(PALETTE_OPEN_CLS);
    };
    /**
     * Get container the palette lives in.
     *
     * @return {Element}
     */
    Palette.prototype.getParentContainer = function () {
        return this.canvas.getContainer();
    };
    Palette.HTML_MARKUP = "<div class=\"djs-palette\">\n    <div class=\"djs-palette-entries\"></div>\n    <div class=\"djs-palette-toggle iconfont\" title=\"\u6536\u8D77\"></div>\n  </div>";
    return Palette;
}());
exports.default = Palette;
//# sourceMappingURL=Palette.js.map