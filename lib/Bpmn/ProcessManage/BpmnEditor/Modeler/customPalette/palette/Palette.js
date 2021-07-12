"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _minDash = require("min-dash");

var _minDom = require("min-dom");

var TOGGLE_SELECTOR = '.djs-collapse-header';
var ENTRY_SELECTOR = '.entry';
var SLIDE_SELECTOR = '.djs-palette-toggle';
var ELEMENT_SELECTOR = "".concat(TOGGLE_SELECTOR, ", ").concat(ENTRY_SELECTOR, ", ").concat(SLIDE_SELECTOR);
var PALETTE_OPEN_CLS = 'open';
var PALETTE_TWO_COLUMN_CLS = 'two-column';
/**
 * A palette containing modeling elements.
 */

var Palette = /*#__PURE__*/function () {
  function Palette(eventBus, canvas) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Palette);
    (0, _defineProperty2.default)(this, "eventBus", void 0);
    (0, _defineProperty2.default)(this, "canvas", void 0);
    (0, _defineProperty2.default)(this, "providers", void 0);
    (0, _defineProperty2.default)(this, "container", void 0);
    (0, _defineProperty2.default)(this, "activeTool", void 0);
    (0, _defineProperty2.default)(this, "toolsContainer", void 0);
    (0, _defineProperty2.default)(this, "diagramInitialized", void 0);
    (0, _defineProperty2.default)(this, "entries", void 0);
    (0, _defineProperty2.default)(this, "needsCollapse", function (availableHeight, entries) {
      // top margin + bottom toggle + bottom margin
      // implementors must override this method if they
      // change the palette styles
      var margin = 20 + 10 + 20;
      var entriesHeight = Object.keys(entries).length * 46;
      return availableHeight < entriesHeight + margin;
    });
    (0, _defineProperty2.default)(this, "toggle", function (target) {
      var group = (0, _minDom.closest)(target, '.group');
      var content = (0, _minDom.query)('.djs-collapse-content', group);
      var contentClasses = (0, _minDom.classes)(content);
      var headerClasses = (0, _minDom.classes)(target);
      var isOpen = contentClasses.has('open');

      if (isOpen) {
        contentClasses.remove('open');
        headerClasses.remove('open');
      } else {
        contentClasses.add('open');
        headerClasses.add('open');
      }
    });
    (0, _defineProperty2.default)(this, "isActiveTool", function (tool) {
      return tool && _this.activeTool === tool;
    });
    this.eventBus = eventBus;
    this.canvas = canvas;
    this.providers = []; // eslint-disable-next-line @typescript-eslint/no-this-alias

    var self = this;
    eventBus.on('tool-manager.update', function (event) {
      var tool = event.tool;
      self.updateToolHighlight(tool);
    });
    eventBus.on('i18n.changed', function () {
      self.update();
    });
    eventBus.on('diagram.init', function () {
      self.diagramInitialized = true; // initialize + update once diagram is ready

      if (self.providers.length) {
        self.init();
        self.update();
      }
    });
  }

  (0, _createClass2.default)(Palette, [{
    key: "registerProvider",
    value: // Palette.$inject = ['eventBus', 'canvas'];

    /**
     * Register a provider with the palette
     *
     * @param  {PaletteProvider} provider
     */
    function registerProvider(provider) {
      this.providers.push(provider); // postpone init / update until diagram is initialized

      if (!this.diagramInitialized) {
        return;
      }

      if (!this.container) {
        this.init();
      }

      this.update();
    }
    /**
     * Returns the palette entries for a given element
     *
     * @return {Array<PaletteEntryDescriptor>} list of entries
     */

  }, {
    key: "getEntries",
    value: function getEntries() {
      var entries = {}; // loop through all providers and their entries.
      // group entries by id so that overriding an entry is possible

      (0, _minDash.forEach)(this.providers, function (provider) {
        var e = provider.getPaletteEntries();
        (0, _minDash.forEach)(e, function (entry, id) {
          entries[id] = entry;
        });
      });
      return entries;
    }
    /**
     * Initialize
     */

  }, {
    key: "init",
    value: function init() {
      var canvas = this.canvas,
          eventBus = this.eventBus;
      this.container = (0, _minDom.domify)(Palette.HTML_MARKUP);
      var parent = (0, _minDom.closest)(canvas.getContainer(), '.bjs-container');
      var container = this.container; // eslint-disable-next-line @typescript-eslint/no-this-alias

      var self = this;
      parent.insertBefore(container, parent.children[0]);

      _minDom.delegate.bind(container, ELEMENT_SELECTOR, 'click', function (event) {
        var target = event.delegateTarget; // 菜单伸缩

        if ((0, _minDom.matches)(target, TOGGLE_SELECTOR)) {
          return self.toggle(target);
        } // 左侧栏伸缩


        if ((0, _minDom.matches)(target, SLIDE_SELECTOR)) {
          return self.slide(target);
        }

        self.trigger('click', event);
        return null;
      }); // prevent drag propagation


      _minDom.event.bind(container, 'mousedown', function (event) {
        event.stopPropagation();
      }); // prevent drag propagation


      _minDom.delegate.bind(container, ENTRY_SELECTOR, 'dragstart', function (event) {
        self.trigger('dragstart', event);
      });

      eventBus.on('canvas.resized', this.layoutChanged, this);
      eventBus.fire('palette.create', {
        container: container
      });
    }
    /**
     * Update palette state.
     *
     * @param  {Object} [state] { open, twoColumn }
     */

  }, {
    key: "toggleState",
    value: function toggleState(state) {
      var rstate = state || {};
      var parent = this.getParentContainer();
      var container = this.container,
          eventBus = this.eventBus;
      var cls = (0, _minDom.classes)(container);
      var twoColumn = rstate.twoColumn || this.needsCollapse(parent.clientHeight, this.entries || {}); // always update two column

      cls.toggle(PALETTE_TWO_COLUMN_CLS, twoColumn);

      if ('open' in rstate) {
        cls.toggle(PALETTE_OPEN_CLS, rstate.open);
      }

      eventBus.fire('palette.changed', {
        twoColumn: twoColumn,
        open: this.isOpen()
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.entries = this.getEntries();
      var entriesContainer = (0, _minDom.query)('.djs-palette-entries', this.container);
      var entries = this.entries;
      (0, _minDom.clear)(entriesContainer);
      (0, _minDash.forEach)(entries, function (items) {
        var grouping = items.group || 'default';
        var container = (0, _minDom.query)("[data-group=".concat(grouping, "]"), entriesContainer);
        var content = (0, _minDom.query)('.djs-collapse-content', container);
        var header = (0, _minDom.domify)("<div class =\"djs-collapse-header iconfont open\">".concat(items.title, "</div>"));

        if (!container) {
          container = (0, _minDom.domify)("<div class =\"group\" data-group=\"".concat(grouping, "\"></div>"));
          content = (0, _minDom.domify)('<div class="djs-collapse-content open"></div>');
          container.appendChild(header);
          container.appendChild(content);
          entriesContainer.appendChild(container);
        } // 如果不存在children，则不显示该菜单项


        if (items.children != null && items.children.length === 0) {
          var containerClass = (0, _minDom.classes)(container);
          containerClass.add('hidden');
        }

        (0, _minDash.forEach)(items.children, function (entry) {
          var html = entry.html || (entry.separator ? '<hr class="separator" />' : '<div class="entry" draggable="true"></div>');
          var control = (0, _minDom.domify)(html);
          var icon = (0, _minDom.domify)("<i class =\"content-icon ".concat(entry.className, "\"></i>"));
          var label = (0, _minDom.domify)("<span class =\"content-label\">".concat(entry.title, "</span>"));
          control.appendChild(icon);
          control.appendChild(label);
          content.appendChild(control);

          if (!entry.separator) {
            (0, _minDom.attr)(control, 'data-action', entry.id);

            if (entry.title) {
              (0, _minDom.attr)(control, 'title', entry.title);
            }

            if (entry.imageUrl) {
              icon.appendChild((0, _minDom.domify)("<img src=\"".concat(entry.imageUrl, "\">")));
            }
          }
        });
      }); // open after update

      this.open();
    }
    /**
     * Trigger an action available on the palette
     *
     * @param  {String} action
     * @param  {Event} event
     */

  }, {
    key: "trigger",
    value: function trigger(action, event, autoActivate) {
      var entries = this.entries;
      var entry;
      var button = event.delegateTarget || event.target;

      if (!button) {
        return event.preventDefault();
      }

      (0, _minDash.forEach)(entries, function (items) {
        (0, _minDash.forEach)(items.children, function (item) {
          if (item.id === (0, _minDom.attr)(button, 'data-action')) {
            entry = item;
          }
        });
      }); // when user clicks on the palette and not on an action

      if (!entry) {
        return null;
      }

      var handler = entry.action;
      var originalEvent = event.originalEvent || event; // simple action (via callback function)

      if ((0, _minDash.isFunction)(handler)) {
        if (action === 'click') {
          handler(originalEvent, autoActivate);
        }
      } else if (handler[action]) {
        handler[action](originalEvent, autoActivate);
      } // silence other actions


      event.preventDefault();
      return null;
    }
  }, {
    key: "layoutChanged",
    value: function layoutChanged() {
      this.toggleState({});
    }
    /**
     * Do we need to collapse to two columns?
     *
     * @param {Number} availableHeight
     * @param {Object} entries
     *
     * @return {Boolean}
     */

  }, {
    key: "close",
    value:
    /**
     * Close the palette
     */
    function close() {
      this.toggleState({
        open: false,
        twoColumn: false
      });
    }
    /**
     * Open the palette
     */

  }, {
    key: "open",
    value: function open() {
      this.toggleState({
        open: true
      });
    } // 关闭/显示一级菜单(工具/流程网关/流程节点)

  }, {
    key: "slide",
    value: // 伸缩左侧栏
    function slide(target) {
      var containerClasses = (0, _minDom.classes)(this.container);
      var isRetract = containerClasses.has('retract');

      if (isRetract) {
        containerClasses.remove('retract');
        target.setAttribute('title', '收起');
      } else {
        containerClasses.add('retract');
        target.setAttribute('title', '展开');
      }
    }
  }, {
    key: "updateToolHighlight",
    value: function updateToolHighlight(name) {
      var entriesContainer;

      if (!this.toolsContainer) {
        entriesContainer = (0, _minDom.query)('.djs-palette-entries', this.container);
        this.toolsContainer = (0, _minDom.query)('[data-group=tools]', entriesContainer);
      }

      var toolsContainer = this.toolsContainer;
      (0, _minDash.forEach)(toolsContainer.children, function (tool) {
        var actionName = tool.getAttribute('data-action');

        if (!actionName) {
          return;
        }

        var toolClasses = (0, _minDom.classes)(tool);
        actionName = actionName.replace('-tool', '');

        if (toolClasses.contains('entry') && actionName === name) {
          toolClasses.add('highlighted-entry');
        } else {
          toolClasses.remove('highlighted-entry');
        }
      });
    }
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

  }, {
    key: "isOpen",
    value: function isOpen() {
      return (0, _minDom.classes)(this.container).has(PALETTE_OPEN_CLS);
    }
    /**
     * Get container the palette lives in.
     *
     * @return {Element}
     */

  }, {
    key: "getParentContainer",
    value: function getParentContainer() {
      return this.canvas.getContainer();
    }
  }]);
  return Palette;
}();

exports.default = Palette;
(0, _defineProperty2.default)(Palette, "HTML_MARKUP", "<div class=\"djs-palette\">\n    <div class=\"djs-palette-entries\"></div>\n    <div class=\"djs-palette-toggle iconfont\" title=\"\u6536\u8D77\"></div>\n  </div>");
module.exports = exports.default;