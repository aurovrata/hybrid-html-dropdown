---
layout: default
title: "Errors"
permalink: "/errors/"
nav_order: 5
---

# Troubleshooting possible errors.
Errors will be reported in your browser JavaScript console.

## Missing element
<div class="language-plaintext highlighter-rouge" style="background:white;color:red">
  <div class="highlight">
    <pre class="highlight"><code style="background:white;border:none">Uncaught HybridDropdownError: HybridDropdown requires a DOM element to intialise.</code></pre>
      </div>
    </div>
If the plugin constructor is invoked with an undefined element,

```javascript
let el = document.querySelector('#my-list'); //el = 'undefined'
new HybridDropdown(el,{});
```
the plugin will throw an error with the following message:

## Element already converted to hybrid dropdown.
If you attempt to convert an element already converted,
```javascript
let sel = document.querySelector('select#my-list'); //el = 'undefined'
new HybridDropdown(el,{});
sel = document.querySelector('select#my-list'); //el = 'undefined'
new HybridDropdown(el,{}); //this line will throw a warning.
```
<div class="language-plaintext highlighter-rouge" style
="background:white;color:red">
  <div class="highlight">
    <pre class="highlight"><code style="background:white;border:none">WARNING: attempting instantiate element already converted to Hybrid Dropdown.</code></pre>
  </div>
</div>
or if an element is a hybrid dropdown the following warning appears on the console,
<div class="language-plaintext highlighter-rouge" style
="background:white;color:red">
  <div class="highlight">
    <pre class="highlight"><code style="background:white;border:none">WARNING: attempting instantiate Hybrid Dropdown element.</code></pre>
  </div>
</div>
in both cases the plugin will ignore this and exit gracefully.

## JSON dataset construct errors
Several issue can occur in case of the HybridDropdown constructor being called with a malformed JSON object dataset.
The plugin will gracefully exit and render the following dropdown,
<div id="json-field" class="hybrid-list">
  <script type="application/json">
    {
      "":"Select a dish",
    }
   </script>
</div>
### Malformed JSON object
If the JSON object is malformed, the following error will be displayed in the console,
<div class="language-plaintext highlighter-rouge" style="background:white;color:red">
  <div class="highlight">
    <pre class="highlight"><code style="background:white;border:none">SyntaxError:Unexpected token } in JSON at position ...
Unable to Hybridise element, missing or malformed json dataset</code></pre>
  </div>
</div>
However, the plugin will exist gracefully and display a *`json error`* message in the dropdown field.
### Duplicate option values
If the JSON dataset contains duplicate keys (which are used as values for the option list), then the plugin will display the following error in the console,
<div class="language-plaintext highlighter-rouge" style="background:white;color:red">
  <div class="highlight">
    <pre class="highlight"><code style="background:white;border:none">HybridDropdownError:Option list has duplicate value: ...</code></pre>
  </div>
</div>

However, the plugin will exist gracefully and display a *`json error`* message in the dropdown field.

## Malformed functions parsed in settings.

The plugin allows overriding functions to be parsed in the settings at the time of initialisation or when using the refresh method.  The following functions can be customised,

### Malformed `listOption` function

the [`listOption`](/hybrid-html-dropdown/options/#option-listOption) option expects a function with 2 arguments.  The following malformed function

```javascript
let sel = document.querySelector('#my-list'); //el = 'undefined'
new HybridDropdown(el,{
  listOption: function(){
    return true;
  }
});
```
will result in the following error displayed in the console,

<div class="language-plaintext highlighter-rouge" style="background:white;color:red">
  <div class="highlight">
    <pre class="highlight"><code style="background:white;border:none">HybridDropdownError:listOption setting must be a function with 2 arguments.</code></pre>
  </div>
</div>

the plugin exit with an error.

### Malformed `selectedLabel` function

the [`selectedLabel`](/hybrid-html-dropdown/options/#option-selectedLabel) option expects a function with 1 argument.  The following malformed function

```javascript
let sel = document.querySelector('#my-list'); //el = 'undefined'
new HybridDropdown(el,{
  selectedLabel: function(){
    return 'My label';
  }
});
```
will result in the following error displayed in the console,

<div class="language-plaintext highlighter-rouge" style="background:white;color:red">
  <div class="highlight">
    <pre class="highlight"><code style="background:white;border:none">HybridDropdownError:selectedLabel setting must be a function with 1 argument.</code></pre>
  </div>
</div>

the plugin will exit with an error.

### Malformed `optionLabel` function

the [`optionLabel`](/hybrid-html-dropdown/options/#option-optionLabel) option expects a function with 1 argument.  The following malformed function

```javascript
let sel = document.querySelector('#my-list'); //el = 'undefined'
new HybridDropdown(el,{
  optionLabel: function(){
    return 'My option';
  }
});
```
will result in the following error displayed in the console,

<div class="language-plaintext highlighter-rouge" style="background:white;color:red">
  <div class="highlight">
    <pre class="highlight"><code style="background:white;border:none">HybridDropdownError:optionLabel setting must be a function with 1 argument.</code></pre>
  </div>
</div>

the plugin will exit with an error.
