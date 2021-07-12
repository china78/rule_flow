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
    constructor(eventBus: any, canvas: any);
    static HTML_MARKUP: string;
    /**
     * Register a provider with the palette
     *
     * @param  {PaletteProvider} provider
     */
    registerProvider(provider: never): void;
    /**
     * Returns the palette entries for a given element
     *
     * @return {Array<PaletteEntryDescriptor>} list of entries
     */
    getEntries(): {};
    /**
     * Initialize
     */
    init(): void;
    /**
     * Update palette state.
     *
     * @param  {Object} [state] { open, twoColumn }
     */
    toggleState(state: any): void;
    update(): void;
    /**
     * Trigger an action available on the palette
     *
     * @param  {String} action
     * @param  {Event} event
     */
    trigger(action?: any, event?: any, autoActivate?: any): any;
    layoutChanged(): void;
    /**
     * Do we need to collapse to two columns?
     *
     * @param {Number} availableHeight
     * @param {Object} entries
     *
     * @return {Boolean}
     */
    needsCollapse: (availableHeight: any, entries: any) => boolean;
    /**
     * Close the palette
     */
    close(): void;
    /**
     * Open the palette
     */
    open(): void;
    toggle: (target: any) => void;
    slide(target: any): void;
    isActiveTool: (tool: any) => boolean;
    updateToolHighlight(name: any): void;
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
    isOpen(): any;
    /**
     * Get container the palette lives in.
     *
     * @return {Element}
     */
    getParentContainer(): any;
}
