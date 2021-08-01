---
layout: default
title: "Options & Methods"
nav_order: 2
---

# Hybrid dropdown configuration

## Options

| option           | description                                                  |
|:-----------------|:-------------------------------------------------------------|      
| `dropdown`       | 'vertical'&#124;'horizontal', default is a vertical dropdown list.|
| `limitSelection` | default 1, -1 for illimited, or an integer value.            |
| `selectedLabel`  | a function to display the selected label, see [Selected label function](./#selected-label-function) section below.|
| `defaultText`    | if a an empty value option is providded in the data list it will be used by default, else the default selected text will diplay this text value.|
| `treeView`       | `false` by default, setting this to true allows Tree View selection, see Tree Vien section below.|
| `fieldName`      | '' the field name to use for the form submission if none are provided in the HTML element used to intialise the dropdown object.|
| `tabIndex`       | the tabindex value of the field used for tabbed navigation between the form fields.|
| `listOption`     | filter functon to determine if a data option is to be included in the dropdonw list.  This is especially useful when needing to display a subset of the options depending on the value of another field in the form. See the section [Filtering Dropdown lists](./#filtering-dropdown-lists) below.|
| `selectedValues` | `[]` an empty array by default, but can hold existing option values which show as pre-selected when the dropdown is initialised.|
| `checkboxes`     | `true`&#124;`false`, by default it is set to `false` on dropdowns converted from existing `<select/>` fields and `true` for JSON dataset fields.|
| `colourise`      | `true` by default, plugin attempts to find the font and background colours of the page and set the dropdown  style properties, using the inverse for highlighted options.  The active option is by default set to white font and `#0466ff` (blue) background.  This can be changed, see the [Styling](./styling.html) page.|
| `negative`       | `false` by default.  Setting to true will inverse the automatic colour styling applied by the plugin with the above `colourise` option set to true.  So the default font color is applied to the dropdown background and inversely the background to the font.|
| `color`          | empty by default, can be used to force the plugin to use a specific font colour with the option `colourise` set to true.|
| `backgroundColor`| empty by default, can be used to force the plugin to use a specific background colour with the option `colourise` set to true.|

## Methods

| method           | description                                                  |
|:-----------------|:-------------------------------------------------------------|      
| `refresh({})`| used to refresh a dropdown field, destroys the option list and reconstructs it.  The method can have configuration options passed in order to modify the dropdown.  This is especially useful to filter the option list by passing a new filter function.|

## Selected label function

the default function to label selected options is,

```javascript
function(s){
  let k =  Object.keys(s);
  return s[k[0]]+ ((k.length>1)?'<span>[...]</span>':'');
}
```

the selected values is an object of value=>text labels, which can have  multiple values for multiple enabled dropdowns.

## Filtering Dropdown lists

The Hybrid dropdown builds the lists of options to diplay at the time of initialisation and used the `listOption` configured option to determine if a given option should appear in the list or not.  The default funciton used by the plugin is,

```javascript
function(o,i){
  return true
}
```
however, this function can be re-configured when calling the Hybrid Dropdown's method `refresh()`, which will trigger a re-build of the dropdown list.  This is useful to refresh the listed options in light of change in the another field in the form.

```html
<div id="market-produce" data-limit-selection="-1">
  <script type="application/json">
    {
      "":"Choose any",
      "vegetables": {
        "label":"Vegetables",
        "beet" : "Beetroot",
        "pot": "Potato",
        "car": "Carrot"
      },
      "fruits":{
        "label":"Fruits",
        "org" " Orange",
        "grp":"Grapes",
        "apl":"Apples"
      }
    }
  </script>
</div>
```
