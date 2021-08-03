---
layout: default
title: "Errors"
nav_order: 5
---

# Troubleshooting possible errors.
Errors will be reported in your's browser javascript console.

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
