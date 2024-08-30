/// <reference types="react" />

import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';

/**
 * Specifies the list behavior to perform when the list data changes.
 */
export declare type AutoscrollToBottom<Data = unknown, Context = unknown> = ((params: {
    /**
     * The location of the list before the data change. See {@link ListScrollLocation} for the details of the parameter received.
     */
    scrollLocation: ListScrollLocation;
    /**
     * Indicates whether the list is currently scrolling. If you receive fast updates and use `'smooth'` scrolling, there's a chance that the list will be in the middle of a scroll when new data arrives.
     */
    scrollInProgress: boolean;
    /**
     * Whether the list is at the bottom before the data change.
     */
    atBottom: boolean;
    /**
     * The new data that will be appended to the list.
     */
    data: Data[];
    /**
     * The context passed to the list.
     */
    context: Context;
}) => ScrollBehavior_2 | boolean | ItemLocation) | NonNullable<ScrollToOptions['behavior']> | boolean;

/**
 * A function that describes the easing curve for the scroll animation.
 * See {@link https://easings.net/ | easings.net} for examples of easing functions.
 */
export declare type BezierFunction = (x: number) => number;

/* Excluded from this release type: ComputeItemKey */

/**
 * Used for the custom components that accept the message list context prop.
 */
export declare type ContextAwareComponent<Context = any> = React.ComponentType<{
    /**
     * The value currently passed to the `context` prop of the `VirtuosoMessageList` component.
     */
    context: Context;
}>;

/* Excluded from this release type: Data */

/* Excluded from this release type: DataAppendParams */

/* Excluded from this release type: DataInsertParams */

/* Excluded from this release type: DataMapParams */

export declare interface DataMethods<Data = any, Context = any> {
    /**
     * Prepends additional items to the existing data in the list, while preserving the scroll position.
     * @param data - The data to prepend.
     */
    prepend: (data: Data[]) => void;
    /**
     * Appends additional items to the existing data in the list, while optionally updating the scroll position. See the {@link AutoscrollToBottom} type for more information.
     * @param data - The data to append.
     * @param scrollToBottom - Specifies the behavior when the list is scrolled to the bottom. You can pass a boolean, a `ScrollBehavior`, or a function that returns a `ScrollBehavior`.
     */
    append: (data: Data[], scrollToBottom?: AutoscrollToBottom<Data, Context>) => void;
    /**
     * Updates the data in the list by applying a mapping function to each item. Optionally, you can specify a scroll behavior if the state change displaces the list (for example, if the item size increases).
     * @param callbackfn - A function that maps the data items.
     * @param autoscrollToBottomBehavior - Specifies the behavior to use to scroll to the bottom if necessary.
     */
    map: (callbackfn: (data: Data, index: number) => Data, autoscrollToBottomBehavior?: ScrollBehavior_2 | {
        location: () => ItemLocation | null | undefined;
    }) => void;
    /**
     * Deletes items from the list data that match the predicate.
     */
    findAndDelete: (predicate: (item: Data, index: number) => boolean) => void;
    /**
     * Finds the index of the first item that matches the predicate. If no elements satisfy the testing function, -1 is returned.
     */
    findIndex: (predicate: (item: Data, index: number, data: Data[]) => boolean) => number;
    /**
     * Finds the first item that matches the predicate. If no elements satisfy the testing function, `undefined` is returned.
     */
    find: (predicate: (item: Data, index: number, data: Data[]) => boolean) => Data | undefined;
    /**
     * Completely replaces the data in the list with the new data.
     * Optionally, you can specify an initial scroll location after the data has been replaced.
     * See the {@link ItemLocation} type for more information.
     * Setting the `purgeItemSizes` flag to `true` will clear the item size cache and force the list to remeasure the items.
     * The `suppressItemMeasure` flag will prevent the list from measuring the items after the data has been replaced.
     *
     * @param data - The data to replace.
     * @param options - the location to scroll to after the data has been replaced and whether to purge the item sizes.
     *
     */
    replace: (data: Data[], options?: {
        initialLocation?: ItemLocation;
        purgeItemSizes?: boolean;
        suppressItemMeasure?: boolean;
    }) => void;
    /**
     * Inserts the provided data at the specified offset, optionally updating the scroll position.
     * @param data - The data to append.
     * @param offset - The index that the first item in the data will be inserted at. e.g. [1,2,3] with offset 10 will insert the data at index 10, 11, and 12 and shift the rest of the existing data.
     * @param scrollToBottom - Specifies the behavior when the list is scrolled to the bottom. You can pass a boolean, a `ScrollBehavior`, or a function that returns a `ScrollBehavior`.
     */
    insert: (data: Data[], offset: number, scrollToBottom?: AutoscrollToBottom<Data, Context>) => void;
    /**
     * Deletes a range of items from the list data.
     * @param offset - The index of the first item to delete.
     * @param count - The number of items to delete.
     */
    deleteRange: (offset: number, count: number) => void;
    /**
     * Batches the data operations in the provided callback in a single render cycle.
     * @param callback - The callback that performs the data operations.
     * @param scrollToBottom - Specifies the behavior when the list is scrolled to the bottom. You can pass a boolean, a `ScrollBehavior`, or a function that returns a `ScrollBehavior`.
     */
    batch: (callback: () => void, scrollToBottom?: AutoscrollToBottom<Data, Context>) => void;
    /**
     * Gets a shallow copy of the current data in the list.
     */
    get: () => Data[];
    /**
     * Gets the currently rendered data items.
     */
    getCurrentlyRendered: () => Data[];
}

/* Excluded from this release type: DataRemoveRangeParams */

/* Excluded from this release type: DataReplaceParameters */

/**
 * The type of the component used to wrap the `Footer` custom component.
 */
export declare type FooterWrapperComponent = React.ComponentType<{
    style: React.CSSProperties;
    children: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;

/**
 * The type of the component used to wrap the `Header` custom component.
 */
export declare type HeaderWrapperComponent = React.ComponentType<{
    style: React.CSSProperties;
    children: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;

/* Excluded from this release type: Item */

/**
 * A React component that's used to render the individual item.
 */
export declare type ItemContent<Data = any, Context = any> = React.ComponentType<{
    /**
     * The index of the item in the list data array.
     */
    index: number;
    /**
     * The data item to render.
     */
    data: Data;
    /**
     * The previous data item (if available).
     */
    prevData: Data | null;
    /**
     * The next data item (if available).
     */
    nextData: Data | null;
    /**
     * The value of the `context` prop passed to the list.
     */
    context: Context;
}>;

/**
 * A location in the list to scroll to. Passing a number scrolls instantly to the item at the specified index aligned to the top. See {@link ItemLocationWithAlign} for more advanced options.
 */
export declare type ItemLocation = number | ItemLocationWithAlign;

/**
 * Specifies a location in the list to scroll to.
 */
export declare interface ItemLocationWithAlign {
    /**
     * The index of the item to scroll to. Use `'LAST'` to scroll to the last item.
     */
    index: number | 'LAST';
    /**
     * How to align the item in the viewport.
     */
    align?: 'start' | 'center' | 'end' | 'start-no-overflow';
    /**
     * Set `'smooth'` to have an animated transition to the specified location.
     */
    behavior?: ScrollBehavior_2;
    /**
     * Use the offset for additional adjustment of the position - can be a positive or negative number.
     */
    offset?: number;
    /**
     * A callback that's invoked when the scroll is complete.
     */
    done?: () => void;
}

/**
 * Describes the location of the list relative to the viewport and the scroll element.
 */
export declare interface ListScrollLocation {
    /**
     * The distance between the list top edge and the viewport top edge.
     * When the list is above the viewport (when scrolling down), this value is a negative number. When the list is scrolled to the top, this value is `0`.
     */
    listOffset: number;
    /**
     * The height of the visible portion of the list without any headers and footers.
     */
    visibleListHeight: number;
    /**
     * The scroll height of the scroller wrapper.
     */
    scrollHeight: number;
    /**
     * The distance between the scroller element bottom edge and the viewport botom edge.
     * If `0`, the list is at the bottom.
     */
    bottomOffset: number;
    /**
     * A convenience flag that indicates whether the list is at the bottom. The flag is also true when the list is currently scrolling to the bottom.
     */
    isAtBottom: boolean;
}

/* Excluded from this release type: OffsetPoint */

/**
 * The scroll behavior to use when scrolling to a location.
 * You can also pass a custom scroll behavior function that returns an object with the number of animation frames and the easing function based on the current scroll top and the targetTop.
 */
declare type ScrollBehavior_2 = 'smooth' | 'auto' | 'instant' | ((currentTop: number, targetTop: number) => {
    animationFrameCount: number;
    easing: BezierFunction;
});
export { ScrollBehavior_2 as ScrollBehavior }

/**
 * The type of the component that can be used for the scroll element.
 */
export declare type ScrollElementComponent<Context = any> = React.ComponentType<React.HTMLProps<HTMLDivElement> & {
    context?: Context;
} & React.RefAttributes<HTMLDivElement>>;

/**
 * The DOM attributes that you can pass to the `VirtualMessageList` component to customize the scroll element.
 * @noInheritDoc
 */
export declare type ScrollerProps = Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'data' | 'onScroll'>;

/**
 * Specifies the alignment of the items when the content of the list is smaller than the viewport height.
 * - `'top'` (default), the items will be aligned to the top
 * - `'bottom'`, the items will be aligned to the bottom.
 * - `'bottom-smooth'`, the items will be aligned to the bottom and the scroll will be animated.
 */
export declare type ShortSizeAlign = 'top' | 'bottom' | 'bottom-smooth';

/* Excluded from this release type: SizeRange */

/**
 * The type of the component used to wrap the `StickyFooter` custom component.
 */
export declare type StickyFooterWrapperComponent = React.ComponentType<{
    style: React.CSSProperties;
    children: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;

/**
 * The type of the component used to wrap the `StickyHeader` custom component.
 */
export declare type StickyHeaderWrapperComponent = React.ComponentType<{
    style: React.CSSProperties;
    children: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>;

/**
 * Lets you access the currently rendered data items.
 */
export declare function useCurrentlyRenderedData<Data>(): Data[];

/**
 * Lets you access the current scroll location of the message list component from its child components. See {@link ListScrollLocation} for the available properties.
 */
export declare function useVirtuosoLocation(): ListScrollLocation;

/**
 * Lets you access the message list methods from its child components. See {@link VirtuosoMessageListMethods} for the available methods.
 */
export declare function useVirtuosoMethods<Data = unknown, Context = unknown>(): VirtuosoMessageListMethods<Data, Context>;

/**
 * The React component that renders the message list. Refer to {@link VirtuosoMessageListProps} for the accepted props.
 * The component is accepts a ref that can be used to call methods on the message list. See {@link VirtuosoMessageListMethods} for the available methods.
 *
 * You should wrap your message lists (either individually or at a higher level) in a {@link VirtuosoMessageListLicense} to provide the license key.
 */
export declare const VirtuosoMessageList: <Data, Context>(props: VirtuosoMessageListProps<Data, Context> & {
    ref?: NoInfer<default_2.Ref<VirtuosoMessageListMethods<Data, Context>>>;
}) => default_2.ReactElement;

/**
 * A component that provides a license key to the VirtuosoMessageList component.
 * This component must wrap all VirtuosoMessageList components in your application - either individually or at a common parent.
 */
export declare const VirtuosoMessageListLicense: {
    ({ licenseKey, children, }: {
        /**
         * The license key to use for the VirtuosoMessageList component.
         * Buy a license at https://virtuoso.dev/pricing. Leave empty for trial mode.
         */
        licenseKey: string;
        children: default_2.ReactNode;
    }): JSX_2.Element;
    /* Excluded from this release type: displayName */
};

/**
 * The imperative API of the message list component. You can access it with a `ref`, or by using the {@link useVirtuosoMethods | `useVirtuosoMethods()`} hook from a child component.
 * @typeParam Data - The type of the data items in the list. Specifying this type gives you correct typing in the `data` methods.
 * @typeParam Context - The type of the context passed to the list. Specifying this type gives you correct typing in the `data` methods.
 */
export declare interface VirtuosoMessageListMethods<Data = any, Context = any> {
    /**
     * A set of methods to manipulate the data in the list.
     */
    data: DataMethods<Data, Context>;
    /**
     * Scrolls the list to the specified item. See {@link ItemLocation} for possible location details. Passing a number scrolls to the item at the specified index aligned to the top.
     */
    scrollToItem: (location: ItemLocation) => void;
    /**
     * Scrolls the specified item into view if necessary. See {@link ItemLocation} for possible location details. Passing a number scrolls to the item at the specified index.
     */
    scrollIntoView: (location: ItemLocation) => void;
    /**
     * Lets you obtain a reference to the component's scroller DOM element.
     */
    scrollerElement: () => HTMLDivElement | null;
    /**
     * Retrieves the current scroll location
     */
    getScrollLocation: () => ListScrollLocation;
    /**
     * Cancels the current smooth scroll operation, if any.
     */
    cancelSmoothScroll: () => void;
    /**
     * Gets the known height of the item.
     */
    height: (item: Data) => number;
}

/**
 * The properties accepted of the `VirtuosoMessageList` component.
 * In addition to the properties listed here, you can pass any other props that are accepted by a `div` element. They will be passed to the root div element used for the scroll.
 * @noInheritDoc
 */
export declare interface VirtuosoMessageListProps<Data, Context> extends ScrollerProps {
    /**
     * The initial data to display in the list.
     *
     * Notice: this property does not accept updates after the initial mount of the component.
     * If you need to update the data, use the imperative API of the component.
     */
    initialData?: Data[];
    /**
     * Any additional state that you need to use in the `ItemContent`, `Header`, `Footer`, etc.
     */
    context?: Context;
    /**
     * The initial location to scroll to. It will be applied the first time the list is rendered with data.
     * Using this property allows you to skip rendering of the items at the top of the list.
     */
    initialLocation?: ItemLocation;
    /**
     * Computes the value for the React `key` prop for the item at the specified index. Use stable, unique keys to avoid rendering issues.
     * @param params - The parameters to compute the key.
     */
    computeItemKey?: NoInfer<(params: {
        data: Data;
        index: number;
        context: Context;
    }) => React.Key>;
    /**
     * A React component that's used to render the individual item. See {@link ItemContent} for further details on the accepted props.
     */
    ItemContent?: NoInfer<ItemContent<Data, Context>>;
    /**
     * An optional React component to render above the list items.
     */
    Header?: NoInfer<ContextAwareComponent<Context>>;
    /**
     * An optional React component to render above the list items that remains visible at the top of the viewport when scrolling.
     */
    StickyHeader?: NoInfer<ContextAwareComponent<Context>>;
    /**
     * An optional React component to render below the list items.
     */
    Footer?: NoInfer<ContextAwareComponent<Context>>;
    /**
     * An optional React component to render below the list items that remains visible at the bottom of the viewport when scrolling.
     */
    StickyFooter?: NoInfer<ContextAwareComponent<Context>>;
    /**
     * An optional React component to render when the list has zero data items.
     */
    EmptyPlaceholder?: NoInfer<ContextAwareComponent<Context>>;
    /**
     * An optional React component to replace the default scroller element. The default value is a `div` element.
     */
    ScrollElement?: NoInfer<ScrollElementComponent<Context>>;
    /**
     * A callback that's invoked when the list is scrolled. See {@link ListScrollLocation} for the details of the parameter received.
     */
    onScroll?: (location: ListScrollLocation) => void;
    /**
     * A callback that's invoked when the currently visible items change
     */
    onRenderedDataChange?: (range: Data[]) => void;
    /**
     * Pass a custom component here if you need to adjust the z-index of the header container. The default value is `div` with `zIndex: 1`.
     */
    HeaderWrapper?: HeaderWrapperComponent;
    /**
     * Pass a custom component here if you need to adjust the z-index of the sticky header container. The default value is `div` with `zIndex: 1`.
     */
    StickyHeaderWrapper?: StickyHeaderWrapperComponent;
    /**
     * Pass a custom component here if you need to adjust the footer container. The default value is `div` element.
     */
    FooterWrapper?: FooterWrapperComponent;
    /**
     * Pass a custom component here if you need to adjust z-index the sticky footer container. The default value is `div` element with `zIndex: 1`.
     */
    StickyFooterWrapper?: StickyHeaderWrapperComponent;
    /**
     * Specifies the alignment of the items when the content of the list is smaller than the viewport height.
     * - `'top'` (default), the items will be aligned to the top
     * - `'bottom'`, the items will be aligned to the bottom.
     * - `'bottom-smooth'`, the items will be aligned to the bottom and the scroll will be animated.
     */
    shortSizeAlign?: ShortSizeAlign;
}

export declare const VirtuosoMessageListTestingContext: default_2.Context<VirtuosoMessageListTestingContextValue | undefined>;

declare interface VirtuosoMessageListTestingContextValue {
    viewportHeight: number;
    itemHeight: number;
}

export { }