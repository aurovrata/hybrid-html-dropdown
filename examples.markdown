---
layout: default
title: "Examples"
permalink: /examples/
nav_order: 4
---
# Examples

## Hybrid dropdown with multiple nested groups.

Unlike `<select/>` dropdown fields, Hybrid Dropdowns can be constructed with multiple nested groups,  this is especially useful to display hierarchical list such as WordPress taxonomies with multiple branches, however this is only possible using the JSON dataset construct,

```html
<div id="json-field">
  <script type="application/json">
    {
      "":"Select a dish",
      "Japan":{
        "sushi":{
          "label":"Sushi",
          "ps":"Pumpkin sushi",
          "as":"Avocado sushi",
          "tc":"Tomato sushi",
          "cs":"Carrot sushi",
        }
      },
      "India":{
        "dosa":{
          "label":"Dosa",
          "pd":"Plain dosa",
          "md":"Masala dosa",
          "myd":"Mysore dosa",
          "pr":"Paper roast",
        }
      }
    }
   </script>
</div>
```
**Note the inclusion of the keyword** `"label"` in the JSON 2nd level branch, which results in,
<div id="json-field" class="hybrid-list">
  <script type="application/json">
    {
      "":"Select a dish",
      "Japan":{
        "sushi":{
          "label":"Sushi",
          "ps":"Pumpkin sushi",
          "as":"Avocado sushi",
          "tc":"Tomato sushi",
          "cs":"Carrot sushi"
        }
      },
      "India":{
        "dosa":{
          "label":"Dosa",
          "pd":"Plain dosa",
          "md":"Masala dosa",
          "myd":"Mysore dosa",
          "pr":"Paper roast"
        }
      }
    }
   </script>
</div>
and enables selection of the parent option.  Excluding the `"label"` keyword would simply group the child branch with the parent as title.

## Hybrid dropdown with treeview selection
Using the same example as above, but adding a `"label"` keywords for the top most parent, we enable the [treeView](/hybrid-dropdown/options/#option-treeView) option
```html
<div id="json-field" data-tree-view="true">
  <script type="application/json">
    {
      "":"Select a dish",
      "japan":{
        "label":"Japan",
        "sushi":{
          "label":"Sushi",
          ...
        }
      }
    }
   </script>
</div>
```
which results in,
<div id="json-field" class="hybrid-list" data-tree-view="true">
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
</div>

**Note**
- `new HybridDropdown(el,{treeView:true})` enables selection of whole branches when the parent option is selected.
- treeView also indicates a parent is partially selected when not all options in the branch are selected.
- treeView automatically activates multiple selection, and if limitSelection is not set then it is automatically set to `-1`, unlimited.

## Hybrid Dropdown with multiple limited selections

The Hybrid dropdown can be enabled to allow multiple number of option selection but limited to the [`limitSelection`](/hybrid-dropdown/options/#option-limitSelection) option value,

```html
<div id="json-field" data-limit-selection="3">
  <script type="application/json">
    {
      "":"Select a dish",
      "Japan":{
        "sushi":{
          "label":"Sushi",
          ...
        }
      }
    }
   </script>
</div>
```
which results in,
<div id="json-field" class="hybrid-list" data-limit-selection="3">
  <script type="application/json">
    {
      "":"Select up to 3 dish",
      "Japan":{
        "sushi":{
          "label":"Sushi",
          "ps":"Pumpkin sushi",
          "as":"Avocado sushi",
          "tc":"Tomato sushi",
          "cs":"Carrot sushi"
        }
      },
      "India":{
        "dosa":{
          "label":"Dosa",
          "pd":"Plain dosa",
          "md":"Masala dosa",
          "myd":"Mysore dosa",
          "pr":"Paper roast"
        },
        "France":{
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
</div>


## Visual styling change to reflect field changed

You can use the [`negative`](/hybrid-dropdown/options/#option-negative) option setting along with the [`refresh()`](/hybrid-dropdown/options/#method-refresh) method to flip the colour style of the dropdown field when the [`change`](/hybrid-dropdown/events/#hybrid-dropdown-change) event is fired.

```html
<select id="flip-style">
  <option value="">Select a dish</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
</select>
<script type="text/javascript">
  (function(){
    let sel, hyd;
    document.addEventListener('DOMContentLoaded', (e) => {  //instantiate on document ready.
      sel= document.querySelector('#flip-style');
      new HybridDropdown(sel,
        {
          'negative':false
        });
      sel.addEventListener('change', (ce) => {
        let hdd = ce.target._hybriddd; //hybrid object is stored on the element on which it was instantiated
        if(!hdd) return; //no hybrid here.
        if(Object.keys(hdd.value).length>0 && !hdd.value['']){ //hybrid value is always an object of value=>label.
          if(!hdd.opt.negative){ //if previously negative, let's refresh.
            hdd.refresh({'negative':true});
          }
        }else if(hdd.opt.negative) hdd.refresh({'negative':false}); //flip back.
      })
    })
  })
  </script>
```
which results in a hybrid dropdown which inverts its style if a value is selected,
<select id="flip-style">
  <option value="">Select a dish</option>
  <option value="ps">Pumpkin sushi</option>
  <option value="as">Avocado sushi</option>
  <option value="ts">Tomato sushi</option>
  <option value="cs">Carrot sushi</option>
</select>
