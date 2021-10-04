---
layout: default
title: "Examples"
permalink: /examples/
nav_order: 4
---
# Examples

Here is a list of examples you will find below,

- [Hybrid dropdown with multiple nested groups](/hybrid-html-dropdown/examples/#hybrid-dropdown-with-multiple-nested-groups)
- [Hybrid dropdown with treeview selection](/hybrid-html-dropdown/examples/#hybrid-dropdown-with-treeview-selection)
- [Hybrid Dropdown with multiple limited selections](/hybrid-html-dropdown/examples/#hybrid-dropdown-with-multiple-limited-selections)
- [Visual styling change to reflect field update](/hybrid-html-dropdown/examples/#visual-styling-change-to-reflect-field-update)
- [Filtering list of options to display](/hybrid-html-dropdown/examples/#filtering-list-of-options-to-display)
- [Pre-filled/pre-selected hybrid dropdown](/hybrid-html-dropdown/examples/#pre-filledpre-selected-hybrid-dropdown)
- [Customise the selected text label and default option](/hybrid-html-dropdown/examples/#customise-the-selected-text-label-and-default-option)
- [Using keyboard navigation between form fields](/hybrid-html-dropdown/examples/#using-keyboard-navigation-between-form-fields)
- [Dropdown list with with custom labels with images](/hybrid-html-dropdown/examples/#dropdown-list-with-with-custom-labels-with-images)
- [Image grid field, no dropdown](/hybrid-html-dropdown/examples/#image-grid-no-dropdown)

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
Using the same example as above, but adding a `"label"` keywords for the top most parent, we enable the [treeView](/hybrid-html-dropdown/options/#option-treeView) option
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
<div id="json-field-2" class="hybrid-list" data-tree-view="true">
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

The Hybrid dropdown can be enabled to allow multiple number of option selection but limited to the [`limitSelection`](/hybrid-html-dropdown/options/#option-limitSelection) option value,

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
<div id="json-field-3" class="hybrid-list" data-limit-selection="3">
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

You can use the [`negative`](/hybrid-html-dropdown/options/#option-negative) option setting along with the [`refresh()`](/hybrid-html-dropdown/options/#method-refresh) method to flip the colour style of the dropdown field when the [`change`](/hybrid-html-dropdown/events/#hybrid-dropdown-change) event is fired.

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

You can use the [`selectedValues`](/hybrid-html-dropdown/options/#option-selectedValues) option to pre-fill/pre-select values in a dropdown field,

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
    'selectedValues':'["ps","as","pd"]',
    'fieldName':'dishes[]'
  }
);
```
resulting in,
<div class="hybrid-list" data-multiple="true" name="dishes[]" data-selected-values='["ps","as","pd"]'>
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

In the above example, you will note that the mulitple selection in the list results in a selected text being truncated in order to limit the size of the field.  This can be customised using the [`selectedLabel`](/hybrid-html-dropdown/options/#option-selectedLabel) option setting, while the default option can be set using the [`defaultText`](/hybrid-html-dropdown/options/#option-defaultText) option setting,

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
let's maintain the maximum width at 200px, and use the following construction,

```javascript
let de = document.querySelector('#defaults');
new HybridDropdown(de,
  {
    'limitSelection': -1, //no limits
    'fieldName':'dishes-img',
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
  <select class="hybrid-list" tabindex=4 name="subject">
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


## Dropdown list with with custom labels with images.
The plugin is built to provide flexible customisation of the dropdown list.  Constructing the list from a JSON dataset allows you to add additional attributes or HTML constructs to your dropdown list.  Using the following JSON dataset to add images to my dropdown list,
```html
<div id="with-images" data-limit-selection="1" >
  <script type="application/json">
    {
      "Sushi":{
        "ps":["Pumpkin sushi", "/images/ps.jpg"],
        "as":["Avocado sushi", "/images/as.jpg"],
        "tc":["Tomato sushi", "/images/tc.jpg"],
        "cs":["Carrot sushi", "/images/cs.jpg"]
      }
    }
    </script>
 </div>
 ```
 and make use of the [`optionLabel`](/hybrid-html-dropdown/options/#option-optionLabel) option setting to customise the option label HTML construct,

 ```javascript
 let wi = document.querySelector('#with-images');
 new HybridDropdown(wi,
   {
     'fieldName':'dishes-img',
     'defaultText': '---Sushis---',
     'checkboxes': false,
     'dropdown':'landscape',
     'optionLabel':function(lbl){ //is a value=>label object.
       return `<div><img src="${lbl[1]}" alt="${lbl[0]}" /><p>${lbl[0]}</p></div>`;
     }
   }
 );
 ```
 **NOTE:**
- switch off the checkboxes, as the images will act as checkboxes.
- the 'landscape' mode which forces the list in a horizontal (inline) display.

<details>
<summary>You'll need some custom CSS Styling</summary>
<div class="language-css highlighter-rouge">
  <div class="highlight">
    <pre class="highlight">
      <code>
#with-images .hybridddl img {
	width: auto;
	height: auto;
}
#with-images .hybridddl img + p,
#with-images .hybriddd-selected img + p{
	position: absolute;
	top: 0;
	width: 140px;
	height: ;
	text-align: center;
	background: #2e2e2ead;
	margin: 57px 5px;
	padding: 12px 0;
	line-height: 1;
	border: solid 1px white;
	border-radius: 4px;
  display: none;
  color: #fff;
}
#with-images .hybriddd-option:hover > label img+p,
#with-images .hybriddd-selected img + p{ display:block}
#with-images .hybriddd-group > ul {
	display: inline-block;
	margin-left: 31px;
}
#with-images .hybriddd-group{line-height: 1;}
#with-images .hybriddd-group > span {
	transform: rotate(-90deg);
	position: absolute;
	top: 61px;
	left: -56px;
	border: solid 1px;
	height: auto;
	padding: 5px 47px;
}
</code></pre></div></div></details>

resulting in,

 <div id="with-images" data-limit-selection="1" data-default-text="---Sushis---" data-field-name="dishes-img" data-checkboxes="false" data-dropdown="landscape">
   <script type="application/json">
     {
       "Sushi":{
         "ps":["Pumpkin sushi", "../assets/images/ps.jpg"],
         "as":["Avocado sushi", "../assets/images/as.jpg"],
         "ts":["Tomato sushi", "../assets/images/ts.jpg"],
         "cs":["Carrot sushi", "../assets/images/cs.jpg"]
       }
     }
     </script>
  </div>


## Image grid, no dropdown.
the plugin can be initialised with the [`dropdown`](/hybrid-html-dropdown/options/#option-dropdown) option set to `none`.  In this mode the field has no dropdown and the fields are visible on the onset.  In addition, setting the [`gridColumns`](/hybrid-html-dropdown/options/#option-grid-columns) option to specific the number of columns will force the option list to be displayed as a grid.

```html
<div id="grid-layout" data-dropdown="none" data-grid-columns="4">
  <script type="application/json">
    {...}
  </script>
</div>
```
```javascript
let ig = document.querySelector('#grid-layout');
new HybridDropdown(ig,{
  fieldName:'painting',
  optionLabel: function(lbl){
    return `<img src="${lbl[4]}" alt="${lbl[0]}-${lbl[1]}" /><p><span class="painter">${lbl[0]}</span> - ${lbl[1]} </p>`;
  }
})
```

<details>
<summary>You'll need some custom CSS Styling</summary>
<div class="language-css highlighter-rouge">
  <div class="highlight">
    <pre class="highlight">
      <code>
#grid-layout .hybriddd-wrapper.hybriddd-grid {
	--hybriddd-gap: 2px;
	width: calc( calc(var(--hybriddd-item) + var(--hybriddd-gap)) * var(--hybriddd-col));
}
#grid-layout.hybriddd-none .hybriddd-option > label > input {
	position: absolute;
}
#grid-layout .hybriddd-option p {
	position: absolute;
	width: 150px;
	padding: 2px 5px;
	bottom: 0;
	line-height: normal;
	background: #0000008c;
	color: white;
	text-align: center;
	margin: auto;
	font-size: 13px;
}
#grid-layout .hybriddd-option p span {
	font-size: 15px;
	font-weight: bold;
}
#grid-layout  input:checked + .hybridddcb {
	width: 20px;
	height: 20px;
	vertical-align: middle;
	visibility: visible;
	border-radius: 50%;
	z-index: 7;
	background: #000000a6;
}
#grid-layout .hybridddcb {
	display: inline-block;
	position: absolute;
	top: 0;
	right: 0;
	margin: 4px;
}
#grid-layout input:checked + .hybridddcb::before {
	width: 10px;
	height: 10px;
	margin: 4px auto;
	background: white;
	border-radius: 50%;
}
#grid-layout .hybridddcb::before {
	content: '';
	display: block;
	width: 0;
	height: 0;
	margin: 0;
}
#grid-layout .hybridddl div{
	position: relative;
	width: 150px;
	height: 150px;
}
#grid-layout .hybriddd-grid .hybriddd-option > label:hover {
	transform: scale(96%);
}</code></pre></div></div>

NOTE: the plugins creates handy variables when the `gridColumns` option is set, allowing for automatic scaling of the CSS rules above, regardless of the size of the thumbnails.
</details>

resulting in,
<div id="grid-layout" data-dropdown="none" data-grid-columns="4">
  <script type="application/json">
    {"1":{"label":["Auguste Renoir","Flowers In A Vase","auguste-renoir","1866","../assets/images/Auguste-Renoir-flowers_in_a_vase_1866-150x150.jpg"]},"2":{"label":["Auguste Renoir","Mademoiselle Sicot","auguste-renoir","1865","../assets/images/Auguste-Renoir-mademoiselle_sicot_1865-150x150.jpg"]},"3":{"label":["Berthe Morisot","The Artists Sister At A Window","berthe-morisot","1869","../assets/images/Berthe-Morisot-the_artists_sister_at_a_window_1869-150x150.jpg"]},"4":{"label":["Camille Pissarro","A Creek In St. Thomas Virgin Islands","camille-pissarro","1856","../assets/images/Camille_Pissarro-a_creek_in_st._thomas_virgin_islands_1856-150x150.jpg"]},"5":{"label":["Camille Pissarro","Two Women Chatting By The Sea St. Thomas","camille-pissarro","1856","../assets/images/Camille_Pissarro-two_women_chatting_by_the_sea_st._thomas_1856-150x150.jpg"]},"6":{"label":["Claude Monet","Bazille And Camille Study For Dejeuner Sur Lherbe","claude-monet","1865","../assets/images/Claude-Monet-bazille_and_camille_study_for__dejeuner_sur_lherbe__1865-150x150.jpg"]},"7":{"label":["Claude Monet","Interior After Dinner","claude-monet","1868","../assets/images/Claude-Monet-interior_after_dinner_1868-150x150.jpg"]},"8":{"label":["Claude Monet","Still Life With Bottle Carafe Bread And Wine","claude-monet","1863","../assets/images/Claude-Monet-still_life_with_bottle_carafe_bread_and_wine_1863-150x150.jpg"]},"9":{"label":["Edgar Degas","Achille De Gas In The Uniform Of A Cadet","edgar-degas","1856","../assets/images/Edgar_Degas-achille_de_gas_in_the_uniform_of_a_cadet_1856-150x150.jpg"]},"10":{"label":["Edgar Degas","Girl In Red","edgar-degas","1866","../assets/images/Edgar-Degas-girl_in_red_1866-150x150.jpg"]},"11":{"label":["Edgar Degas","Rene De Gas","edgar-degas","1855","../assets/images/Edgar_Degas-rene_de_gas_1855-150x150.jpg"]},"12":{"label":["Edgar Degas","Scene From The Steeplechase The Fallen Jockey","edgar-degas","1866","../assets/images/Edgar-Degas-scene_from_the_steeplechase__the_fallen_jockey_1866-150x150.jpg"]}}
  </script>
</div>

images courtesy of the [National Gallery of Art](https://www.nga.gov/), Washington, USA.
