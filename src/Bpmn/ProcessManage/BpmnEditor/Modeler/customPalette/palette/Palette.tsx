import { isFunction, forEach } from 'min-dash';
import {
  domify,
  query as domQuery,
  closest as domClosest,
  attr as domAttr,
  clear as domClear,
  classes as domClasses,
  matches as domMatches,
  delegate as domDelegate,
  event as domEvent,
} from 'min-dom';

const TOGGLE_SELECTOR = '.djs-collapse-header';
const ENTRY_SELECTOR = '.entry';
const SLIDE_SELECTOR = '.djs-palette-toggle';
const ELEMENT_SELECTOR = `${TOGGLE_SELECTOR}, ${ENTRY_SELECTOR}, ${SLIDE_SELECTOR}`;

const PALETTE_OPEN_CLS = 'open';
const PALETTE_TWO_COLUMN_CLS = 'two-column';

/**
 * A palette containing modeling elements.
 */
export default class Palette {
  eventBus: any;
  canvas: any;
  providers: never[] | any[];
  container: any;
  activeTool: any;
  toolsContainer: any;
  diagramInitialized: boolean | undefined;
  entries: any;

  constructor(eventBus: any, canvas: any) {
    this.eventBus = eventBus;
    this.canvas = canvas;

    this.providers = [];

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    eventBus.on('tool-manager.update', (event: any) => {
      const { tool } = event;

      self.updateToolHighlight(tool);
    });

    eventBus.on('i18n.changed', () => {
      self.update();
    });

    eventBus.on('diagram.init', () => {
      self.diagramInitialized = true;

      // initialize + update once diagram is ready
      if (self.providers.length) {
        self.init();

        self.update();
      }
    });
  }
  static HTML_MARKUP = `<div class="djs-palette">
    <div class="djs-palette-entries"></div>
    <div class="djs-palette-toggle iconfont" title="收起"></div>
  </div>`;
  // Palette.$inject = ['eventBus', 'canvas'];

  /**
   * Register a provider with the palette
   *
   * @param  {PaletteProvider} provider
   */
  registerProvider(provider: never) {
    this.providers.push(provider);

    // postpone init / update until diagram is initialized
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
  getEntries() {
    const entries = {};

    // loop through all providers and their entries.
    // group entries by id so that overriding an entry is possible
    forEach(this.providers, (provider: any) => {
      const e = provider.getPaletteEntries();

      forEach(e, (entry: any, id: any) => {
        entries[id] = entry;
      });
    });

    return entries;
  }

  /**
   * Initialize
   */
  init() {
    const { canvas, eventBus } = this;
    this.container = domify(Palette.HTML_MARKUP);
    const parent = domClosest(canvas.getContainer(), '.bjs-container');
    const { container } = this;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    parent.insertBefore(container, parent.children[0]);

    domDelegate.bind(container, ELEMENT_SELECTOR, 'click', (event: any) => {
      const target = event.delegateTarget;

      // 菜单伸缩
      if (domMatches(target, TOGGLE_SELECTOR)) {
        return self.toggle(target);
      }

      // 左侧栏伸缩
      if (domMatches(target, SLIDE_SELECTOR)) {
        return self.slide(target);
      }

      self.trigger('click', event);
      return null;
    });

    // prevent drag propagation
    domEvent.bind(container, 'mousedown', (event: any) => {
      event.stopPropagation();
    });

    // prevent drag propagation
    domDelegate.bind(container, ENTRY_SELECTOR, 'dragstart', (event: any) => {
      self.trigger('dragstart', event);
    });

    eventBus.on('canvas.resized', this.layoutChanged, this);

    eventBus.fire('palette.create', {
      container,
    });
  }

  /**
   * Update palette state.
   *
   * @param  {Object} [state] { open, twoColumn }
   */
  toggleState(state: any) {
    const rstate = state || {};
    const parent = this.getParentContainer();
    const { container, eventBus } = this;
    const cls = domClasses(container);
    const twoColumn =
      rstate.twoColumn || this.needsCollapse(parent.clientHeight, this.entries || {});

    // always update two column
    cls.toggle(PALETTE_TWO_COLUMN_CLS, twoColumn);
    if ('open' in rstate) {
      cls.toggle(PALETTE_OPEN_CLS, rstate.open);
    }

    eventBus.fire('palette.changed', {
      twoColumn,
      open: this.isOpen(),
    });
  }

  update() {
    this.entries = this.getEntries();
    const entriesContainer: any = domQuery('.djs-palette-entries', this.container);
    const { entries } = this;

    domClear(entriesContainer);

    forEach(entries, (items: any) => {
      const grouping = items.group || 'default';

      let container: any = domQuery(`[data-group=${grouping}]`, entriesContainer);
      let content: any = domQuery('.djs-collapse-content', container);
      const header = domify(`<div class ="djs-collapse-header iconfont open">${items.title}</div>`);

      if (!container) {
        container = domify(`<div class ="group" data-group="${grouping}"></div>`);
        content = domify('<div class="djs-collapse-content open"></div>');
        container.appendChild(header);
        container.appendChild(content);
        entriesContainer.appendChild(container);
      }

      // 如果不存在children，则不显示该菜单项
      if (items.children != null && items.children.length === 0) {
        const containerClass = domClasses(container);
        containerClass.add('hidden');
      }

      forEach(items.children, (entry: any) => {
        const html =
          entry.html ||
          (entry.separator
            ? '<hr class="separator" />'
            : '<div class="entry" draggable="true"></div>');

        const control = domify(html);
        const icon = domify(`<i class ="content-icon ${entry.className}"></i>`);
        const label = domify(`<span class ="content-label">${entry.title}</span>`);
        control.appendChild(icon);
        control.appendChild(label);
        content.appendChild(control);

        if (!entry.separator) {
          domAttr(control, 'data-action', entry.id);

          if (entry.title) {
            domAttr(control, 'title', entry.title);
          }

          if (entry.imageUrl) {
            icon.appendChild(domify(`<img src="${entry.imageUrl}">`));
          }
        }
      });
    });

    // open after update
    this.open();
  }

  /**
   * Trigger an action available on the palette
   *
   * @param  {String} action
   * @param  {Event} event
   */
  trigger(action?: any, event?: any, autoActivate?: any) {
    const { entries } = this;
    let entry: any;
    const button = event.delegateTarget || event.target;

    if (!button) {
      return event.preventDefault();
    }

    forEach(entries, (items: any) => {
      forEach(items.children, (item: any) => {
        if (item.id === domAttr(button, 'data-action')) {
          entry = item;
        }
      });
    });

    // when user clicks on the palette and not on an action
    if (!entry) {
      return null;
    }

    const handler = entry.action;
    const originalEvent = event.originalEvent || event;

    // simple action (via callback function)
    if (isFunction(handler)) {
      if (action === 'click') {
        handler(originalEvent, autoActivate);
      }
    } else if (handler[action]) {
      handler[action](originalEvent, autoActivate);
    }

    // silence other actions
    event.preventDefault();
    return null;
  }

  layoutChanged() {
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
  needsCollapse = (availableHeight: any, entries: any) => {
    // top margin + bottom toggle + bottom margin
    // implementors must override this method if they
    // change the palette styles
    const margin = 20 + 10 + 20;

    const entriesHeight = Object.keys(entries).length * 46;

    return availableHeight < entriesHeight + margin;
  };

  /**
   * Close the palette
   */
  close() {
    this.toggleState({
      open: false,
      twoColumn: false,
    });
  }

  /**
   * Open the palette
   */
  open() {
    this.toggleState({ open: true });
  }

  // 关闭/显示一级菜单(工具/流程网关/流程节点)
  toggle = (target: any) => {
    const group: any = domClosest(target, '.group');
    const content: any = domQuery('.djs-collapse-content', group);
    const contentClasses = domClasses(content);
    const headerClasses = domClasses(target);
    const isOpen = contentClasses.has('open');
    if (isOpen) {
      contentClasses.remove('open');
      headerClasses.remove('open');
    } else {
      contentClasses.add('open');
      headerClasses.add('open');
    }
  };

  // 伸缩左侧栏
  slide(target: any) {
    const containerClasses = domClasses(this.container);
    const isRetract = containerClasses.has('retract');
    if (isRetract) {
      containerClasses.remove('retract');
      target.setAttribute('title', '收起');
    } else {
      containerClasses.add('retract');
      target.setAttribute('title', '展开');
    }
  }

  isActiveTool = (tool: any) => {
    return tool && this.activeTool === tool;
  };

  updateToolHighlight(name: any) {
    let entriesContainer: any;

    if (!this.toolsContainer) {
      entriesContainer = domQuery('.djs-palette-entries', this.container);
      this.toolsContainer = domQuery('[data-group=tools]', entriesContainer);
    }
    const { toolsContainer } = this;
    forEach(toolsContainer.children, (tool: any) => {
      let actionName = tool.getAttribute('data-action');

      if (!actionName) {
        return;
      }

      const toolClasses = domClasses(tool);

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
  isOpen() {
    return domClasses(this.container).has(PALETTE_OPEN_CLS);
  }

  /**
   * Get container the palette lives in.
   *
   * @return {Element}
   */
  getParentContainer() {
    return this.canvas.getContainer();
  }
}
