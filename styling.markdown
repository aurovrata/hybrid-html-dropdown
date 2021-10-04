---
layout: default
title: "Styling"
permalink: /styling/
nav_order: 1
---

# Styling

**Important to NOTE**
- The colours of the dropdown are programmatically set to those of the page, this is the default which can be overridden with the [`colourise`](/hybrid-html-dropdown/options/#option-negative) option setting (see below for more details).
- The active/selected options in the list are by default set to blue highlight and white font, this can be overridden using CSS, see below for example.

Here is a list of custom styling examples,

- [Changing the colours of the active/selected field](/hybrid-html-dropdown/styling/#activeselected-option-in-the-list)
- [Custom colour scheme: inverse the default auto-styling](hybrid-html-dropdown/styling/#setting-custom-colours-negative-effect)
- [Custom colour scheme: setting default colours](/hybrid-html-dropdown/styling/#setting-custom-colours-custom-colours)
- [Custom scheme: full CSS control](/hybrid-html-dropdown/styling/#setting-custom-colours-css-overrules)
- [Dropdown menu: right aligned](/hybrid-html-dropdown/styling/#force-the-dropdown-right-aligned)
- [Dropdown menu: open above](/hybrid-html-dropdown/styling/#force-the-dropdown-top-open-above)
- [Dropdown menu: combine above and right](/hybrid-html-dropdown/styling/#force-dropdown-above-and-right-aligned)
- [Dropdown menu: restricting its size](/hybrid-html-dropdown/styling/#restrict-the-dropdown-menu-size)
- [No dropdown: show the fields by default](/hybrid-html-dropdown/styling/#display-the-fields-as-a-grid-without-a-dropdown)
- [2-column grid without a dropdown](http://localhost:4000/hybrid-html-dropdown/styling/#display-the-fields-as-a-2-column-grid-without-a-dropdown)

## Changing colours of the Hybrid dropdown field.

The Hybrid dropdown look is fully customisable using CSS stylesheet rules.  The default is for the plugin to seek the parent element font & background colour and programmatically set the colour styles at initialisation.  

### Active/selected option in the list
The default colours for the active/selected option(s) in the list is a blue hightlight and white font, this can be changed using a CSS rule,

```html
<select id="make-it-pink">
  ...
</select>
<style>
#make-it-pink-hdd .hybriddd-option.active > label,
#make-it-pink-hdd .hybriddd-option > label:hover {
    background: pink;
    color: blue;
}
</style>
```
NOTE: a `<select/>` field with an id attribute will have its hybridised field id attribute post-fixed with `'-hdd'`.
open the dropdown to see the result,
<select id="make-it-pink" class="hybrid-list">
  <option value="">Select a dish</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
</select>

## Setting the general colour scheme
The plugin is designed to match your form or page colours, however, this can be overruled using the object instantiation option settings or CSS rules.

There are 3 ways to modify/customise the colours of your dropdown,

### Setting custom colours: negative effect

You can get the [`negative`](/hybrid-html-dropdown/options/#option-negative) effect of the current page colours,

```html
<select id="ex2-hdd" data-negative="true">
  ...
</select>
```
which results in the reverse colours,
<select id="ex2-hdd" class="hybrid-list" data-negative="true">
  <option value="">Select a dish</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
</select>

However, this can be customised as per requirements using the following CSS rules that need to be loaded after the plugin stylesheet in order to overrule the default styles,

### Setting custom colours: custom colours

You can set the [`color`](/hybrid-html-dropdown/options/#option-color) and [`backgroundColor`](/hybrid-html-dropdown/options/#option-backgroundColor) at initialisation,

```html
<select id="ex3-hdd" data-color="purple"
data-background-color="lightblue">
  ...
</select>
```
which results in,
<select id="ex3-hdd" class="hybrid-list" data-color="purple" data-background-color="lightblue">
  <option value="">Select a dish</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
</select>

when using the color/backgroundColor options, the plugin will force an `id` attribute on the hybrid element and embedded a `<style/>` element into the page that specifically targets that list, this enables each dropdown field to have unique colours should this be desired.

### Setting custom colours: CSS overrules

**It is important to switch off the plugin's automatic colourising functionality** with the [`colourise`](/hybrid-html-dropdown/options/#option-colourise) option setting,

```html
<div id="ex4-hdd" data-colourise="false">
<script type="application/json">
  {
    "":"Select a dish",
    "japan":{
      ...
    }
  }
  </script>
</div>
```
<details>
<summary>and to setup the following CSS rules,</summary>
<div class="language-css highlighter-rouge">
  <div class="highlight">
    <pre class="highlight">
      <code>
/* dropdown colours*/
.hybrid-dropdown{
  color:#fff;
  background-color: darkgreen
}
/*hover colours */
.hybriddd-option.active > label:hover,
.hybriddd-option.hover > label,.hybriddd-option > label:hover{
  color:darkgreen;
  background-color: #fff
}
/* checkboxes colours */
:hover > input:checked + .hybridddcb::before{
  color:#fff
}
.hybriddd-option input:checked + .hybridddcb::before {
  background: darkgreen
}
/* scrollbar colour */
ul.hybriddd-options::-webkit-scrollbar-track {
  background:darkgreen
}
ul.hybriddd-options::-webkit-scrollbar-thumb,
ul.hybriddd-options::-webkit-scrollbar{
  background:#fff
}
/*active/selected options in list*/
.hybriddd-option.active > label {
    background: #fff;
    color: darkgreen
}
</code></pre></div></div></details>

resulting in,
<span id="ex4-hdd" class="hybrid-list" data-colourise="false">
<script type="application/json">
  {
    "":"Select a dish",
    "japan":{
      "label":"Japan",
      "sushi":{
        "label":"Sushi",
        "ps":"Pumpkin sushi",
        "as":"Avocado sushi",
        "tc":"Tomato sushi",
        "cs":"Carrot sushi"
      }
    },
    "india":{
      "label":"India",
      "dosa":{
        "label":"Dosa",
        "pd":"Plain dosa",
        "md":"Masala dosa",
        "myd":"Mysore dosa",
        "pr":"Paper roast"
      },
      "france":{
        "label":"France",
        "crepe":{
          "label":"Cr&ecirc;pe",
          "cps":"Cr&ecirc;pe sucr&eacute;e",
          "cpz":"Cr&ecirc;pe suzette",
          "cpn":"Cr&ecirc;pe banane",
          "cpn":"Cr&ecirc;pe nutella"
        }
      }
    }
  }
 </script>
</span>

## Dropdown location

the dropdown list opens by default below and aligned to the left of the field.  Tt is possible to force the dropdown to open aligned to the right, or even above, using classes inserted in the field element.  This is useful when you field is at the bottom of a form or on the right side of a page, either cases may result in the default dropdown list not being fully visible.

### Force the dropdown right aligned.

add the class `hybriddd-right` to the field element,

```html
<select class="hybriddd-right">...</select>
```

<select id="make-it-pink" class="hybrid-list hybriddd-right">
  <option value="">I am right aligned</option>
  <option value="ps">Pumpkin sushi from vegan Japan</option>
  <option value="as">Avocado sushi from Peru</option>
  <option value="ts">Tomato sushi form Italy</option>
  <option value="cs">Carrot sushi from France</option>
</select>

### Force the dropdown top open above.

add the class `hybriddd-top` to the field element,

```html
<select class="hybriddd-top">...</select>
```

<select id="make-it-pink" class="hybrid-list hybriddd-top">
  <option value="">I slide up</option>
  <option value="ps">Pumpkin sushi from vegan Japan</option>
  <option value="as">Avocado sushi from Peru</option>
  <option value="ts">Tomato sushi form Italy</option>
  <option value="cs">Carrot sushi from France</option>
</select>

### Force dropdown above and right aligned.

add the classes `hybriddd-right hybriddd-top` to the field element, to get both effects combined,

```html
<select class="hybriddd-right hybriddd-top">...</select>
```

<select id="make-it-pink" class="hybrid-list hybriddd-right hybriddd-top">
  <option value="">I slide up and right aligned</option>
  <option value="ps">Pumpkin sushi from vegan Japan</option>
  <option value="as">Avocado sushi from Peru</option>
  <option value="ts">Tomato sushi form Italy</option>
  <option value="cs">Carrot sushi from France</option>
</select>

### Restrict the dropdown menu size.

the dropdown menu automatically adjust to the content of the list, however, it is by default restricted to 34% of the height of the browser window.  This can be controlled with the following CSS rule,

```html
<select id="short-menu">...</select>
```
NOTE: when converting a `<select/>` field to a hybrid fiield, the hybridised field will adopt the original field's id and postfix it with `-hdd`, this is to ensure that scripts querying of the select field using its id are still able to work.
```css
#short-menu-hdd .hybriddd-wrapper{
  max-height: calc(var(--hybriddd-item-height) * 2);
}
```
The above style uses the plugin created variable `--hybriddd-item-height` which can be used to restrict the height of the dropdown to 2 fields only, resulting in,
<select id="short-menu" class="hybrid-list">
  <option value="">2 field dropdown</option>
  <option value="ps">Pumpkin sushi from vegan Japan</option>
  <option value="as">Avocado sushi from Peru</option>
  <option value="ts">Tomato sushi form Italy</option>
  <option value="cs">Carrot sushi from France</option>
</select>

### Display the fields as a grid without a dropdown.

The plugin also has the ability to disable the [`dropdown`](http://localhost:4000/hybrid-html-dropdown/options/#option-dropdown) and display the fields as a grid, however we can force to display [`checkboxes`](/hybrid-html-dropdown/options/#option-checkboxes) to make it more intuitive to a user.
```html
<select id="one-column"
  data-dropdown="none"
  data-checkboxes="true">
  ...
</select>
```
This forces the list of options to be displayed as a single column grid,

<select class="hybrid-list" data-dropdown="none" data-checkboxes="true">
  <option value="ps">Pumpkin sushi from vegan Japan</option>
  <option value="as">Avocado sushi from Peru</option>
  <option value="ts">Tomato sushi form Italy</option>
  <option value="cs">Carrot sushi from France</option>
</select>

### Display the fields as a 2-column grid without a dropdown.

following on from the above example, you can set the number of columns in the grid, using the [`gridColumns`](/hybrid-html-dropdown/options/#option-grid-columns) option,
```html
<select id="two-column"
  data-dropdown="none"
  data-checkboxes="true"
  data-grid-columns="2">
  ...
</select>
```
This forces the list of options to be displayed as a single column grid,

<select class="hybrid-list" data-dropdown="none" data-checkboxes="true" data-grid-columns="2">
  <option value="ps">Pumpkin sushi from vegan Japan</option>
  <option value="as">Avocado sushi from Peru</option>
  <option value="ts">Tomato sushi form Italy</option>
  <option value="cs">Carrot sushi from France</option>
</select>
