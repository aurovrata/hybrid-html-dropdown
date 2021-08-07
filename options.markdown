---
layout: default
title: "Options & Methods"
permalink: /options/
nav_order: 2
---

# Hybrid dropdown configuration

## Options

| option           | description                                                  |
|:-----------------|:-------------------------------------------------------------|      
| [`dropdown`](#option-dropdown)       | 'vertical'&#124;'horizontal', default is a vertical dropdown list.|
| [`limitSelection`](#option-limitSelection) | default 1, -1 for unlimited, or an integer value, see the example [Hybrid Dropdown with multiple limited selections](/hybrid-html-dropdown/examples/#hybrid-dropdown-with-multiple-limited-selections).            |
| [`selectedLabel`](#option-selectedLabel)  | a function to display the selected label, see the example [Customise the selected text label and default option](/hybrid-html-dropdown/examples/#customise-the-selected-text-label-and-default-option).|
| [`defaultText`](#option-defaultText)    | if a an empty value option is provided in the data list it will be used by default, else the default selected text will display this text value, see the example [Customise the selected text label and default option](/hybrid-html-dropdown/examples/#customise-the-selected-text-label-and-default-option).|
| [`treeView`](#option-treeView)       | `false` by default, setting this to true allows Tree View selection, see treeView [example](/hybrid-html-dropdown/examples/#hybrid-dropdonw-with-treeview-selection).|
| [`treeGlue`](#option-treeGlue)       | '/' by default, use to concatenate branch values in treeView mode.|
| [`fieldName`](#option-fieldName)      | '`hybridd`' the default field name to use for the form submission if none are provided in the HTML element, the plugin will use either the HTML `name` attribute or the `id` attribute before falling back on the default.|
| [`tabIndex`](#option-tabIndex)       | the tabindex value of the field used for tabbed navigation between the form fields.|
| [`listOption`](#option-listOption)     | filter function to determine if a data option is to be included in the dropdonw list.  This is especially useful when needing to display a subset of the options depending on the value of another field in the form. See the example [Filtering list of options to display](/hybrid-html-dropdown/examples/#filtering-list-of-options-to-display).|
| [`selectedValues`](#option-selectedValues) | `[]` an empty array by default, but can hold existing option values which show as pre-selected when the dropdown is initialised, see the example [Pre-filled/pre-selected hybrid dropdown](/hybrid-html-dropdown/examples/#pre-filledpre-selected-hybrid-dropdown).|
| [`checkboxes`](#option-checkboxes)     | `true`&#124;`false`, by default it is set to `false` on dropdowns converted from existing `<select/>` fields and `true` for JSON dataset fields.|
| [`colourise`](#option-colourise)      | `true` by default, plugin attempts to find the font and background colours of the page and set the dropdown  style properties, using the inverse for highlighted options.  The active option is by default set to white font and `#0466ff` (blue) background.  This can be changed, see the [Styling](/hybrid-html-dropdown/styling/#setting-custom-colours-css-overrules) section for more details.|
| [`negative`](#option-negative)       | `false` by default.  Setting to true will inverse the automatic colour styling applied by the plugin with the above `colourise` option set to true.  So the default font colour is applied to the dropdown background and inversely the background to the font, see the [Styling](/hybrid-html-dropdown/styling/#setting-custom-colours-negative-effect) section.|
| [`color`](#option-color)          | empty by default, can be used to force the plugin to use a specific font colour with the option `colourise` set to true, see the [Styling](/hybrid-html-dropdown/styling/#setting-custom-colours-custom-colours) section for an example.|
| [`backgroundColor`](#option-backgroundColor)| empty by default, can be used to force the plugin to use a specific background colour with the option `colourise` set to true, see the [Styling](/hybrid-html-dropdown/styling/#setting-custom-colours-custom-colours) section for an example.|

## Methods

| method           | description                                                  |
|:-----------------|:-------------------------------------------------------------|      
| [`refresh({})`](#method-refresh)| used to refresh a dropdown field, destroys the option list and reconstructs it.  The method can have configuration options passed in order to modify the dropdown.  This is especially useful to filter the option list by passing a new filter function, see the example [Filtering list of options to display](/hybrid-html-dropdown/examples/#filtering-list-of-options-to-display), or [Visual styling change to reflect field update](/hybrid-html-dropdown/examples/#visual-styling-change-to-reflect-field-update).|
