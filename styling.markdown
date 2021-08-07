---
layout: default
title: "Styling"
permalink: /styling/
nav_order: 1
---

# Styling

** Important to note **
- The colours of the dropdown are programmatically set to those of the page, this is the default which can be overridden with the [`colourise`](/hybrid-html-dropdown/options/#option-negative) option setting (see below for more details).
- The active/selected options in the list are by default set to blue highlight and white font, this can be overridden using CSS, see below for example.


## Changing colours of the Hybrid dropdown field.

The Hybrid dropdown look is fully customisable using CSS stylesheet rules.  The default is for the plugin to seek the parent element font & background colour and programmatically set the colour styles at initialisation.  

### Active/selected option in the list
The default colours for the active/selected option(s) in the list is a blue hightlight and white font, this can be changed using a CSS rule,

```html
<select id="make-it-pink" class="hybrid-list">
  <option value="">Select a dish</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
</select>
<style>
#make-it-pink .hybriddd-option.active > label {
    background: pink;
    color: blue;
}
</style>
```
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
<select id="ex2-hdd" class="hybrid-list" data-negative="true">
  <option value="">Select a dish</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
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
<select id="ex3-hdd" class="hybrid-list" data-color="purple"
data-background-color="lightblue">
  <option value="">Select a dish</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
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
<div id="ex4-hdd" class="hybrid-list" data-colourise="false">
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

and to setup the following CSS rules,

```css
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
:hover > input:checked + .hybridddl > .hybridddcb::before{
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
```
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
