---
layout: default
title: "Examples"
permalink: /examples/
nav_order: 4
---
# Examples

Here is a list of examples you will find below,

- [Hybrid dropdown with multiple nested groups](/hybrid-dropdown/examples/#hybrid-dropdown-with-multiple-nested-groups)
- [Hybrid dropdown with treeview selection](/hybrid-dropdown/examples/#hybrid-dropdown-with-treeview-selection)
- [Hybrid Dropdown with multiple limited selections](/hybrid-dropdown/examples/#hybrid-dropdown-with-multiple-limited-selections)
- [Visual styling change to reflect field update](/hybrid-dropdown/examples/#visual-styling-change-to-reflect-field-update)
- [Filtering list of options to display](/hybrid-dropdown/examples/#filtering-list-of-options-to-display)
- [Pre-filled/pre-selected hybrid dropdown](/hybrid-dropdown/examples/#pre-filledpre-selected-hybrid-dropdown)
- [Customise the selected text label and default option](/hybrid-dropdown/examples/#customise-the-selected-text-label-and-default-option)
- [Using keyboard navigation between form fields](/hybrid-dropdown/examples/#using-keyboard-navigation-between-form-fields)

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
          "ps":"Pumpkin sushi",
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
        }
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
   </script>
</div>

**Note**
- `new HybridDropdown(el,{treeView:true})` enables selection of whole branches when the parent option is selected.
- treeView also indicates a parent is partially selected when not all options in the branch are selected.
- partially selected parent options are not submitted.
- treeView automatically activates multiple selection, and if limitSelection is not set then it is automatically set to `-1`, unlimited.
- treeView options' values are constructed by concatenating them with their parent value, this allows submitted treeView fields to preserve their branch selection, so in the above example, the first branch option 'Pumkin Suchi' which has a value of 'ps' will be submitted as `japan/sushi/ps` to reflect that it is a child of 'Sushi' which itself is a child of 'Japan'.

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
        }
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
   </script>
</div>


## Visual styling change to reflect field update.

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

## Filtering list of options to display.
One of the powerful features this plugin offers, is the ability to filter the visible list of options.  This allows  dynamic dropdown lists based on the other fields' values. Here is an example, select the radio field below to change the dropdown list,
<div id="radio-filter">
  <label> <input type="radio" checked="true" name="radio-filter" value="vegetarian"/> Vegetarian  </label>
  <label><input type="radio" name="radio-filter" value="non-vegetarian" /> Non-vegetarian </label>
</div>
<select id="filter-list">
  <option class="vegetarian" value="">Select a vegetarian dish</option>
  <option class="vegetarian" value="ps">Pumpkin sushi</option>
  <option class="vegetarian" value="as">Avocado sushi</option>
  <option class="vegetarian" value="ts">Tomato sushi</option>
  <option class="vegetarian" value="cs">Carrot sushi</option>
  <option class="non-vegetarian" value="">Select a non-vegetarian dish</option>
  <option class="non-vegetarian" value="ss">Salmon sushi</option>
  <option class="non-vegetarian" value="cks">Chicken sushi</option>
  <option class="non-vegetarian" value="bs">Beef sushi</option>
  <option class="non-vegetarian" value="shs">Shark sushi</option>
</select>
the for the list, you can either convert a `<select/>` field or use a JSON dataset,
```html
<div id="radio-filter">
  <label> <input type="radio" checked="true" name="radio-filter" value="vegetarian"/> Vegetarian  </label>
  <label><input type="radio" name="radio-filter" value="non-vegetarian" /> Non-vegetarian </label>
</div>
<select id="filter-list">
  <option class="vegetarian" value="">Select a vegetarian dish</option>
  <option class="vegetarian" value="ps">Pumpkin sushi</option>
  ...
  <option class="non-vegetarian" value="">Select a non-vegetarian dish</option>
  <option class="non-vegetarian" value="ss">Salmon sushi</option>
  ...
</select>
```
**Note**
- the use of 2 options with identical values (the default options)
- the addition of classes in the option list that reflect the values of the radio fields.

the script used to enable this,
```javascript
let fe = document.querySelector('#filter-list'), //select field.
    re = document.querySelector('#radio-filter'); //radio fields container
let hdd =new HybridDropdown(fe,
  {
    'listOption':function(o,i){
      if(o.classList.contains('vegetarian')) return true;
      return false;
    }
  }
);
re.addEventListener('change', (ce) => { //listen for bubbling change events
  hdd.refresh(
    {
      'listOption':function(o,i){ //filter the options based on the new value selected.
        if(o.classList.contains(ce.target.value)) return true;
        return false;
      }
    })
})
```
## Pre-filled/pre-selected hybrid dropdown

You can use the [`selectedValues`](/hybrid-dropdown/options/#option-selectedValues) option to pre-fill/pre-select values in a dropdown field,

```html
<div id="pre-fill">
  <script type="application/json">
    {
      "":"Select any dish",
      "Japan":{
        "sushi":{
          "ps":"Pumpkin sushi",
        ...
        }
      }
    }
  </script>
</div>
```
and use the following construction,

```javascript
let fe = document.querySelector('#pre-fill');
new HybridDropdown(fe,
  {
    'multiple': true,
    'selectedValues':['ps','as','pd'],
    'fieldName':'dishes[]'
  }
);
```
resulting in,
<div class="hybrid-list" data-multiple="true" name="dishes[]" data-selected-values="['ps','as','pd']">
  <script type="application/json">
    {
      "":"Select any dish",
      "Japan":{
        "sushi":{
          "ps":"Pumpkin sushi",
          "as":"Avocado sushi",
          "tc":"Tomato sushi",
          "cs":"Carrot sushi"
        }
      },
      "India":{
        "Dosa":{
          "pd":"Plain dosa",
          "md":"Masala dosa",
          "myd":"Mysore dosa",
          "pr":"Paper roast"
        },
        "France":{
          "Cr&ecirc;pe":{
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

## Customise the selected text label and default option

In the above example, you will note that the mulitple selection in the list results in a selected text being truncated in order to limit the size of the field.  This can be customised using the [`selectedLabel`](/hybrid-dropdown/options/#option-selectedLabel) option setting, while the default option can be set using the [`defaultText`](/hybrid-dropdown/options/#option-defaultText) option setting,

```html
<div id="defaults" style="max-width:200px">
  <script type="application/json">
    {
      "Japan":{
        "sushi":{
          "ps":"Pumpkin sushi",
        ...
        }
      }
    }
  </script>
</div>
```
let's maintain the maximum with at 200px, and use the following construction,

```javascript
let de = document.querySelector('#defaults');
new HybridDropdown(de,
  {
    'limitSelection': -1, //no limits
    'fieldName':'dishes[]',
    'defaultText': '---dishes---',
    'selectedLabel':function(v){ //is a value=>label object.
      let k =  Object.keys(v),
          s='';
      k.forEach(i=>{
        s+=`<span>${v[i]}</span>`;
      });
      return s;
    }
  }
);
```
resulting in, select multiple choices to see the result.
<div id="defaults" style="max-width:200px">
  <script type="application/json">
    {
      "Japan":{
        "sushi":{
          "ps":"Pumpkin sushi",
          "as":"Avocado sushi",
          "tc":"Tomato sushi",
          "cs":"Carrot sushi"
        }
      },
      "India":{
        "Dosa":{
          "pd":"Plain dosa",
          "md":"Masala dosa",
          "myd":"Mysore dosa",
          "pr":"Paper roast"
        }
      },
      "France":{
        "Cr&ecirc;pe":{
          "cps":"Cr&ecirc;pe sucr&eacute;e",
          "cpz":"Cr&ecirc;pe suzette",
          "cpn":"Cr&ecirc;pe banane",
          "cpn":"Cr&ecirc;pe nutella"
        }
      }
    }
   </script>
</div>

## Using keyboard navigation between form fields

`<form/>` fields can use `tabindex` attributes to determine the order in which the fields are `tab`'ed into when using the keyboard to navigate.
```html
<input tabindex=1 type="text"/>
```
The hybrid dropdown can be navigated to and interacted with using the keyboard keys.  
Use,
- `tab` to move from one field to another
- `up/down arrow` keys allow you to choose options in the hybrid list without opening the list.
- `enter/space` to open the hybrid dropdown
- `up/down arrow` to scroll the list.
- `enter` to select an option.

<form id="tabnav">
 <div id="row1">
  <label> Name <input type="text" tabindex=1> </label>&nbsp;
  <label> Phone <input type="tel" tabindex=2> </label>
</div>
<div id="row2">
  <label> Email <input type="email" tabindex=3> </label>&nbsp;
</div>
<div id="row3">
  <select class="hybrid-list" tabindex=4>
    <option value="">I wish to</option>
    <option value="work">enquire about a job</option>
    <option value="prod">enquire about a product</option>
    <option value="else">enquire about something</option>
  </select>
</div>
<div id="row4">
  <textarea tabindex=5 placeholder="type your message here"></textarea>
</div>
</form>
