# hybrid-html-select
A hybrid HTML select fully customisable and emulating all navigational functions of a select element based on an initial [work](https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/) by @sandrina-p

v0.4 released which now works and is ready to be tested in the wild.

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
