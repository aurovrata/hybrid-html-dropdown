# hybrid-html-select v0.5
A hybrid HTML select fully customisable and emulating all navigational functions of a select element based on an initial [work](https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/) by @sandrina-p

## How to use it.

Inlcude the stylesheet in your header

```html
<link rel="stylesheet" href="./hybrid-select.css" media="all">
```

and the JavaScript in the footer of your page,

```html
<script src="./hybrid-select.js" type="text/javascript" defer=""></script>
```

then to convert a select field,

```html
<select class="select-native js-select-native" name="select_field" aria-labelledby="jobLabel">
  <option value="sel" disabled="" selected=""> Select an item...</span>
  <optgroup label="Vegetables">
    <option value="fbn">French beans</option>
    <option value="pot">Potatoes</option>
    <option value="chl">Red chillis</option>
    <option value="bgr">Bitter gourd</option>
    <option value="oni">Onions</option>
  </optgroup>
  <optgroup label="Fruits">
    <option value="org">Oranges</option>
    <option value="app">Apples</option>
    <option value="bnn">Bananas</option>
    <option value="sfr">Star fruit</option>
    <option value="csp">Custard apple</option>
  </optgroup>
</select>
```

simply include a script on document ready,

```js
 (function(){
   document.addEventListener('DOMContentLoaded', (e) => {
     let sel= document.querySelector('.select-native');
     let hs = new HybridSelect(sel,{});
   });
 })()
```

## Optional settings on init and refresh.

the following optional settings are currently exposed when initialising a hybrid select object.

```js
new HybridSelect(element, {
  optionLabel: function(label){ //the function called to display the label of an option (defaults to <span>label</span>)
    return '<span>'+label+'</span>';
  },
  selectedLabel: function(label){ //the function called to display the selected option label (defaults to label)
    return label;
  },
  listOption: function(o){return true}, //the function called to list an option in the drodpown, default to true.
})
```
## Filtering listed options in the dropdown

The `HybridSelect` object is stored on the element on which it was initialised, `element._hselect`, and this can be used to refresh the hybrid dropdown menu with a new set of settings.  This is useful to filter a list of options based on the input of another field,  such as example is coded in the `test.html` file provided in this repo.

```js
element._hselect.refresh({
  listOption: function(o){
    if(o.nodeName=='OPTGROUP' && o.label != 'My Selection') return false;
    return true;
  },
})
```

## Changelog
* v0.5 added refresh and dynamic filter of listed options.
* v0.4 added optgroup functionality.
* v0.3 simple select conversion with key navigation.
* v0.2 migration of code to plugin design.
* v0.1 initial version based on the post of @sandrina-p
