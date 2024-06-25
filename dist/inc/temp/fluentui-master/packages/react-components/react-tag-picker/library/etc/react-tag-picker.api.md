## API Report File for "@fluentui/react-tag-picker"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="react" />

import type { ActiveDescendantContextValue } from '@fluentui/react-aria';
import { ComboboxBaseState } from '@fluentui/react-combobox';
import { ComboboxProps } from '@fluentui/react-combobox';
import { ComboboxSlots } from '@fluentui/react-combobox';
import type { ComboboxState } from '@fluentui/react-combobox';
import { ComponentProps } from '@fluentui/react-utilities';
import { ComponentState } from '@fluentui/react-utilities';
import { DropdownProps } from '@fluentui/react-combobox';
import type { EventData } from '@fluentui/react-utilities';
import type { EventHandler } from '@fluentui/react-utilities';
import type { ExtractSlotProps } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { Listbox } from '@fluentui/react-combobox';
import type { ListboxContextValue } from '@fluentui/react-combobox';
import { OptionGroupProps } from '@fluentui/react-combobox';
import { OptionGroupSlots } from '@fluentui/react-combobox';
import { OptionGroupState } from '@fluentui/react-combobox';
import { OptionSlots } from '@fluentui/react-combobox';
import { OptionState } from '@fluentui/react-combobox';
import * as React_2 from 'react';
import { Slot } from '@fluentui/react-utilities';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { TagGroupContextValues } from '@fluentui/react-tags';
import type { TagGroupSlots } from '@fluentui/react-tags';
import type { TagGroupState } from '@fluentui/react-tags';

// @public
export const renderTagPicker_unstable: (state: TagPickerState, contexts: TagPickerContextValues) => JSX.Element;

// @public
export const renderTagPickerButton_unstable: (state: TagPickerButtonState) => JSX.Element;

// @public
export const renderTagPickerControl_unstable: (state: TagPickerControlState) => JSX.Element;

// @public (undocumented)
export function renderTagPickerGroup_unstable(state: TagPickerGroupState, contexts: TagGroupContextValues): JSX.Element | null;

// @public
export const renderTagPickerInput_unstable: (state: TagPickerInputState) => JSX.Element;

// @public
export const renderTagPickerList_unstable: (state: TagPickerListState) => JSX.Element;

// @public
export const renderTagPickerOption_unstable: (state: TagPickerOptionState) => JSX.Element;

// @public
export const renderTagPickerOptionGroup: (state: TagPickerOptionGroupState) => JSX.Element;

// @public
export const TagPicker: React_2.FC<TagPickerProps>;

// @public
export const TagPickerButton: ForwardRefComponent<TagPickerButtonProps>;

// @public (undocumented)
export const tagPickerButtonClassNames: SlotClassNames<TagPickerButtonSlots>;

// @public
export type TagPickerButtonProps = ComponentProps<TagPickerButtonSlots> & Pick<DropdownProps, 'size' | 'appearance'> & {
    disabled?: boolean;
};

// @public (undocumented)
export type TagPickerButtonSlots = {
    root: Slot<'button'>;
};

// @public
export type TagPickerButtonState = ComponentState<TagPickerButtonSlots> & Pick<TagPickerContextValue, 'size'> & {
    hasSelectedOption: boolean;
};

// @public (undocumented)
export type TagPickerContextValues = {
    picker: TagPickerContextValue;
    activeDescendant: ActiveDescendantContextValue;
    listbox: ListboxContextValue;
};

// @public
export const TagPickerControl: ForwardRefComponent<TagPickerControlProps>;

// @public (undocumented)
export const tagPickerControlClassNames: SlotClassNames<TagPickerControlSlots & TagPickerControlInternalSlots>;

// @public
export type TagPickerControlProps = ComponentProps<Partial<TagPickerControlSlots>>;

// @public (undocumented)
export type TagPickerControlSlots = {
    root: Slot<ExtractSlotProps<Slot<'div'> & {
        style?: TagPickerControlCSSProperties;
    }>>;
    secondaryAction: Slot<'span'>;
} & Pick<ComboboxSlots, 'expandIcon'>;

// @public
export type TagPickerControlState = ComponentState<TagPickerControlSlots & TagPickerControlInternalSlots> & Pick<TagPickerContextValue, 'size' | 'appearance' | 'disabled'> & {
    invalid: boolean;
};

// @public
export const TagPickerGroup: ForwardRefComponent<TagPickerGroupProps>;

// @public (undocumented)
export const tagPickerGroupClassNames: SlotClassNames<TagPickerGroupSlots>;

// @public
export type TagPickerGroupProps = ComponentProps<TagPickerGroupSlots>;

// @public (undocumented)
export type TagPickerGroupSlots = TagGroupSlots;

// @public
export type TagPickerGroupState = TagGroupState & {
    hasSelectedOptions: boolean;
};

// @public
export const TagPickerInput: ForwardRefComponent<TagPickerInputProps>;

// @public (undocumented)
export const tagPickerInputClassNames: SlotClassNames<TagPickerInputSlots>;

// @public
export type TagPickerInputProps = Omit<ComponentProps<Partial<TagPickerInputSlots>>, 'children' | 'size' | 'defaultValue'> & Pick<ComboboxProps, 'clearable' | 'appearance'> & {
    disabled?: boolean;
    value?: string;
};

// @public (undocumented)
export type TagPickerInputSlots = {
    root: NonNullable<Slot<'input'>>;
};

// @public
export type TagPickerInputState = ComponentState<TagPickerInputSlots> & Pick<TagPickerContextValue, 'size' | 'disabled'>;

// @public
export const TagPickerList: ForwardRefComponent<TagPickerListProps>;

// @public (undocumented)
export const tagPickerListClassNames: SlotClassNames<TagPickerListSlots>;

// @public
export type TagPickerListProps = ComponentProps<TagPickerListSlots>;

// @public (undocumented)
export type TagPickerListSlots = {
    root: Slot<typeof Listbox>;
};

// @public
export type TagPickerListState = ComponentState<TagPickerListSlots> & Pick<TagPickerContextValue, 'open'>;

// @public (undocumented)
export type TagPickerOnOpenChangeData = {
    open: boolean;
} & (EventData<'click', React_2.MouseEvent<HTMLDivElement>> | EventData<'keydown', React_2.KeyboardEvent<HTMLDivElement>>);

// @public
export type TagPickerOnOptionSelectData = {
    value: string;
    selectedOptions: string[];
} & (EventData<'click', React_2.MouseEvent<HTMLDivElement>> | EventData<'keydown', React_2.KeyboardEvent<HTMLDivElement>>);

// @public
export const TagPickerOption: ForwardRefComponent<TagPickerOptionProps>;

// @public (undocumented)
export const tagPickerOptionClassNames: SlotClassNames<TagPickerOptionSlots>;

// @public
export const TagPickerOptionGroup: ForwardRefComponent<TagPickerOptionGroupProps>;

// @public (undocumented)
export const tagPickerOptionGroupClassNames: SlotClassNames<TagPickerOptionGroupSlots>;

// @public
export type TagPickerOptionGroupProps = OptionGroupProps;

// @public (undocumented)
export type TagPickerOptionGroupSlots = OptionGroupSlots;

// @public
export type TagPickerOptionGroupState = OptionGroupState;

// @public
export type TagPickerOptionProps = ComponentProps<TagPickerOptionSlots> & {
    value: string;
} & ({
    text?: string;
    children: string;
} | {
    text: string;
    children?: React_2.ReactNode;
});

// @public (undocumented)
export type TagPickerOptionSlots = Pick<OptionSlots, 'root'> & {
    media?: Slot<'div'>;
    secondaryContent?: Slot<'span'>;
};

// @public
export type TagPickerOptionState = ComponentState<TagPickerOptionSlots> & Pick<OptionState, 'components' | 'root'>;

// @public
export type TagPickerProps = ComponentProps<TagPickerSlots> & Pick<ComboboxProps, 'positioning' | 'disabled' | 'defaultOpen' | 'selectedOptions' | 'defaultSelectedOptions' | 'open'> & Pick<Partial<TagPickerContextValue>, 'size' | 'appearance'> & {
    onOpenChange?: EventHandler<TagPickerOnOpenChangeData>;
    onOptionSelect?: EventHandler<TagPickerOnOptionSelectData>;
    children: [JSX.Element, JSX.Element] | JSX.Element;
    inline?: boolean;
};

// @public (undocumented)
export type TagPickerSize = 'medium' | 'large' | 'extra-large';

// @public (undocumented)
export type TagPickerSlots = {};

// @public
export type TagPickerState = ComponentState<TagPickerSlots> & Pick<ComboboxState, 'open' | 'activeDescendantController' | 'mountNode' | 'onOptionClick' | 'registerOption' | 'selectedOptions' | 'selectOption' | 'value' | 'setValue' | 'setOpen' | 'setHasFocus' | 'appearance' | 'clearSelection' | 'getOptionById' | 'getOptionsMatchingValue' | 'disabled'> & Pick<TagPickerContextValue, 'triggerRef' | 'secondaryActionRef' | 'popoverId' | 'popoverRef' | 'targetRef' | 'tagPickerGroupRef' | 'size'> & {
    trigger: React_2.ReactNode;
    popover?: React_2.ReactNode;
    inline: boolean;
};

// @public
export const useTagPicker_unstable: (props: TagPickerProps) => TagPickerState;

// @public
export const useTagPickerButton_unstable: (props: TagPickerButtonProps, ref: React_2.Ref<HTMLButtonElement>) => TagPickerButtonState;

// @public
export const useTagPickerButtonStyles_unstable: (state: TagPickerButtonState) => TagPickerButtonState;

// @public
export const useTagPickerControl_unstable: (props: TagPickerControlProps, ref: React_2.Ref<HTMLDivElement>) => TagPickerControlState;

// @public
export const useTagPickerControlStyles_unstable: (state: TagPickerControlState) => TagPickerControlState;

// @public (undocumented)
export function useTagPickerFilter({ filter: filterOverride, noOptionsElement, renderOption, query, options, }: UseTagPickerFilterConfig): JSX.Element[];

// @public
export const useTagPickerGroup_unstable: (props: TagPickerGroupProps, ref: React_2.Ref<HTMLDivElement>) => TagPickerGroupState;

// @public
export const useTagPickerGroupStyles_unstable: (state: TagPickerGroupState) => TagPickerGroupState;

// @public
export const useTagPickerInput_unstable: (propsArg: TagPickerInputProps, ref: React_2.Ref<HTMLInputElement>) => TagPickerInputState;

// @public
export const useTagPickerInputStyles_unstable: (state: TagPickerInputState) => TagPickerInputState;

// @public
export const useTagPickerList_unstable: (props: TagPickerListProps, ref: React_2.Ref<HTMLDivElement>) => TagPickerListState;

// @public
export const useTagPickerListStyles_unstable: (state: TagPickerListState) => TagPickerListState;

// @public
export const useTagPickerOption_unstable: (props: TagPickerOptionProps, ref: React_2.Ref<HTMLDivElement>) => TagPickerOptionState;

// @public
export const useTagPickerOptionGroup: (props: TagPickerOptionGroupProps, ref: React_2.Ref<HTMLDivElement>) => TagPickerOptionGroupState;

// @public
export const useTagPickerOptionGroupStyles: (state: TagPickerOptionGroupState) => TagPickerOptionGroupState;

// @public
export const useTagPickerOptionStyles_unstable: (state: TagPickerOptionState) => TagPickerOptionState;

// (No @packageDocumentation comment for this package)

```