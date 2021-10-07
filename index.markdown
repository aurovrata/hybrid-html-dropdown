---
layout: default
title: Home
nav_order: 1
description: "Getting started with Hybrid Dropdown fields."
permalink: /
---

# Hybrid HTML Dropdown field

This is an HTML dropdown widget that can replace a `<select/>` field or built using a JSON object which can be fully customised using css.  

[Getting started](/hybrid-html-dropdown/#how-to-use-it){: .btn .btn-blue }
[Get it on GitHub](https://github.com/aurovrata/hybrid-html-dropdown){: .btn }

The main features are

- selection and navigation using arrow/esc/tab/space bar/enter keys
- fully styled using CSS
- initialised using existing `<select/>` form field
- initialised using embedded JSON objects.
- build complex embed and grouped lists.
- restrain selection to any integer limit.
- filter list displayed in the dropdown.

See the YouTube videos,
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?controls=0&amp;list=PLblJwjs_dFBvtQ1k-lxNITq565u_sg23L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## How to use it?

Download the latest [release](https://github.com/aurovrata/hybrid-html-dropdown/releases) and uncompress the library into your project.

Include the minified CSS stylesheet in the head of your HTML file,

```html
<link rel="stylesheet" href="./hybrid-html-dropdown/hybrid-dropdown.css" media="all">
```

and the minified js file in your footer,

```html
<script src="./hybrid-html-dropdown/hybrid-dropdown.js" type="text/javascript"></script>
```

If you have an existing `<select/>` field,
<select id="ex1">
  <option value="">Select a dish</option>
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
<select id="ex1-hdd" class="hybrid-list">
  <option value="">Select a dish</option>
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

  However, you can also

  [build a hybrid field from a JSON object](/hybrid-html-dropdown/#creating-a-hybrid-dropdown-from-embedded-json-data-objects){: .btn .btn-blue }

  allowing for

  [multi-level nesting](/hybrid-html-dropdown/#nested-lists){: .btn .btn-blue }

  You can further customise the hybrid with

  [optional settings](/hybrid-html-dropdown/#configuring-the-hybrid-list-object){: .btn .btn-blue }

## Creating a hybrid dropdown from embedded JSON data objects.

A hybrid dropdown can be instantiated from a JSON data object embedded within the element on which the dropdown will be created,
### Simple lists

<div id="json1" class="language-html highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code><span class="nt">&lt;div</span><span class="na">id=</span><span class="s">"json-field"</span><span class="nt">&gt;</span>
    <span class="nt">&lt;script </span><span class="na">type=</span><span class="s">"application/json"</span><span class="nt">&gt;</span>
      <span class="p">{</span>
        <span class="dl">""</span><span class="p">:</span><span class="dl">"</span><span class="s2">Select a dish</span><span class="dl">"</span><span class="p">,</span><span class="hdd-info">an option is made of a key:value pair by default</span>
        <span class="dl">"</span><span class="s2">ps</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Pumpkin sushi</span><span class="dl">"</span><span class="p">,</span>
        <span class="dl">"</span><span class="s2">as</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Avocado sushi</span><span class="dl">"</span><span class="p">,</span>
        <span class="dl">"</span><span class="s2">tc</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Tomato sushi</span><span class="dl">"</span><span class="p">,</span>
        <span class="dl">"</span><span class="s2">cs</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Carrot sushi</span><span class="dl">"</span>
      <span class="p">}</span>
    <span class="nt">&lt;/script&gt;</span>
<span class="nt">&lt;/div&gt;</span>
      </code>
    </pre>
  </div>
</div>

and is initialised with,
```html
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

NOTE: the plugin expects the JSON object to be embedded within the element on which it is initialised.  Alternatively, a JSON object can passed in the settings constructor using the dataSet option,

```javascript
new HybridDropdown(el,{
  dataSet: {
    "":"Select a dish",
    "ps":"Pumpkin sushi",
    "as":"Avocado sushi",
    "tc":"Tomato sushi",
    "cs":"Carrot sushi"
  }
});
```
which results in,
<span id="json-field" class="hybrid-list">
  <script type="application/json">
  {"":"Select a dish","ps":"Pumpkin sushi","as":"Avocado sushi","tc":"Tomato sushi","cs":"Carrot sushi"}
  </script>
</span>

### Grouped lists

the plugin accepts the following JSON object for grouped lists, whereby the notion of grouping is the same as for `<select/>` fields, where a group has a title which is not itself an option,

<div class="language-html highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">"json-field"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;script </span><span class="na">type=</span><span class="s">"application/json"</span><span class="nt">&gt;</span>
    <span class="p">{</span>
      <span class="dl">""</span><span class="p">:</span><span class="dl">"</span><span class="s2">Select a dish</span><span class="dl">"</span><span class="p">,</span>
      <span class="dl">"</span><span class="s2">Sushi</span><span class="dl">"</span><span class="p">:{</span><span class="hdd-info">this is a group title, it has no value so the key is assumed as the title.</span>
        <span class="dl">"</span><span class="s2">ps</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Pumpkin sushi</span><span class="dl">"</span><span class="p">,</span><span class="hdd-info">these are listed as child options</span>
        <span class="dl">"</span><span class="s2">as</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Avocado sushi</span><span class="dl">"</span><span class="p">,</span>
        <span class="dl">"</span><span class="s2">tc</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Tomato sushi</span><span class="dl">"</span><span class="p">,</span>
        <span class="dl">"</span><span class="s2">cs</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Carrot sushi</span><span class="dl">"</span>
      <span class="p">},</span>
      <span class="dl">"</span><span class="s2">Dosa</span><span class="dl">"</span><span class="p">:{</span>
        <span class="dl">"</span><span class="s2">pd</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Plain dosa</span><span class="dl">"</span><span class="p">,</span>
        <span class="dl">"</span><span class="s2">md</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Masala dosa</span><span class="dl">"</span><span class="p">,</span>
        <span class="dl">"</span><span class="s2">myd</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Mysore dosa</span><span class="dl">"</span><span class="p">,</span>
        <span class="dl">"</span><span class="s2">pr</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Paper roast</span><span class="dl">"</span>
      <span class="p">}</span>
    <span class="p">}</span>
   <span class="nt">&lt;/script&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</code></pre></div></div>

which results in,
<span id="json-field" class="hybrid-list">
  <script type="application/json">
  {
    "":"Select a dish",
    "Sushi":{"ps":"Pumpkin sushi","as":"Avocado sushi","tc":"Tomato sushi","cs":"Carrot sushi"},
    "Dosa":{"pd":"Plain dosa","md":"Masala dosa","myd":"Mysore dosa","pr":"Paper roast"}
  }
   </script>
</span>

### Nested lists
nested lists are similar to grouped list, except that the a child parents are themselves options which can be selected.  To achieve this the plugin expects a group object to have `label` key, indicating that the group key is an option,

<div class="language-html highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">"json-field"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;script </span><span class="na">type=</span><span class="s">"application/json"</span><span class="nt">&gt;</span>
    <span class="p">{</span>
      <span class="dl">""</span><span class="p">:</span><span class="dl">"</span><span class="s2">Select a dish</span><span class="dl">"</span><span class="p">,</span>
      <span class="dl">"</span><span class="s2">Japan</span><span class="dl">"</span><span class="p">:{</span><span class="hdd-info">this is a group title as the previous construct</span>
        <span class="dl">"</span><span class="s2">sushi</span><span class="dl">"</span><span class="p">:{</span><span class="hdd-info">this will not be interpreted as a parent option</span>
          <span class="dl">"</span><span class="s2">label</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Sushi</span><span class="dl">"</span><span class="p">,</span><span class="hdd-info">the label key used for the sushi option</span>
          <span class="dl">"</span><span class="s2">ps</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Pumpkin sushi</span><span class="dl">"</span><span class="p">,</span>
          <span class="dl">"</span><span class="s2">as</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Avocado sushi</span><span class="dl">"</span><span class="p">,</span>
          <span class="dl">"</span><span class="s2">tc</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Tomato sushi</span><span class="dl">"</span><span class="p">,</span>
          <span class="dl">"</span><span class="s2">cs</span><span class="dl">"</span><span class="p">:</span><span class="dl">"</span><span class="s2">Carrot sushi</span><span class="dl">"</span>
        <span class="p">}</span>
      <span class="p">}</span>
    <span class="p">}</span>
   <span class="nt">&lt;/script&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</code></pre></div></div>

### More complex data constructs

It is possible to construct more complex dataset structures such as including classes, data attributes or even images for each options, but this require the hybrid field to be initialised with a custom [`optionList`](/hybrid-html-dropdown/options/#option-optionLabel) function setting so as to instruct the plugin how to interpret the dataSet passed at initialisation.  For an example see the custom [image dropdown](/hybrid-html-dropdown/examples/#dropdown-list-with-with-custom-labels-with-images) field in the [Examples](/hybrid-html-dropdown/examples/) section.


## Configuring the hybrid list object.

The `HybridDropdown` object can be configured using [settings](/hybrid-html-dropdown/options/) parsed at the time of object instantiation or as `data-` attributes on the HTML element itself.  Optional functions need to be configured as object settings at the time of instantiation.  See the option page for a full list of configuration settings.

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
