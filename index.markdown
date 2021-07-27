---
layout: default
title: Home
nav_order: 1
description: "Getting sarted with Hybrid Drodpown fields."
permalink: /
---

# Hybrid HTML Dropdown field

This is an HTML dropdown widget that can replace a `<select/>` field or built using a json object which can be fully customised using css.  This is inspired by an original [idea](https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/) by Sandrina Pereira (@sandrina-p). This plugin is written in pure javascript and has evolved consderably from the initial idea.

The main features are

- selection and navigation using arrow/esc/tab/space bar/enter keys
- fully styled using CSS
- initialised using existing `<select/>` form field
- initialised using embeded json objects.
- build complex embed and grouped lists.
- restrain selection to any interger limit.
- filter list displayed in the dropdown.

## How to use it?

Download the latest [release](https://github.com/aurovrata/hybrid-html-dropdown/releases) and uncompress the library into your project.

Include the minified css stylesheet in the head of your HTML file,

```html
<link rel="stylesheet" href="./hybrid-html-dropdown/hybrid-dropdown.css" media="all">
```

and the minified js file in your footer,

```html
<script src="./hybrid-html-dropdown/hybrid-dropdown.js" type="text/javascript"></script>
```

If you have an existing `<select/>` field,
<select id="ex1">
  <option value="">Select an item</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
</select>

```html
<select id="my-list" name="list_field">
   ...
</select>
```
you can convert it to a hybrid dropdown,
<select id="ex1-hdd">
  <option value="">Select an item</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
</select>

```html
<script type="text/javascript">
  (function(){
    let sel, hyd;
    document.addEventListener('DOMContentLoaded', (e) => {  //instantiate on document ready.
      sel= document.querySelector('#my-list');
      hyd = new HybridDropdown(sel,{});
    })
  })
  </script>
  ```

## Creating hybrid dropdowns from embeded json data objects.

A hybrid dropdown can be instantiated from a json data object embeded within the element on which the dropdown will be created,

```html
<div id="json-field">
  <script type="application/json">
    {
      "":"Select a value",
     ...
    }
   </script>
</div>
<script type="text/javascript">
  (function(){
    let el, hyd;
    document.addEventListener('DOMContentLoaded', (e) => {  //instantiate on document ready.
      sel= document.querySelector('#json-field');
      hyd = new HybridDropdown(el,{});
    })
  })
</script>
```

## Configuring the hybrid list object.

The `HybridDropdown` object can be configured using settings parsed at the time of object instantiation or as `data-` attributes on the HTML element itself.  Optional functions need to be configured as bbject settings at the time of instantiaion.  See the option page for a full list of configuration settings.

For example, the following hybrid dropdown is configured to allow multiple selections limited to a maximum of 3,

```javascript
let hyd = new HybridDropdown(el,{
  'limitSelection':3
});
```

this can also be configured on the HTML element using `data-` attributes,

```html
<div id="my-list" data-limit-selection="3">
   <script type="application/json">
    {
      "":"Select a value",
     ...
    }
   </script>
</div>
```
