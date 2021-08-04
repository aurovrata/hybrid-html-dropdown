---
layout: default
title: "Events"
permalink: /events/
nav_order: 3
---

# Javascript Events

## Hybrid Dropdown `change`

A `change` event is fired on the hybrid dropdown DOM element on which it was instantiated.

A hybrid dropdown created from an existing `<select/>` will update the original field and fire `change` events on the field each time its value is updated.

```javascript
let el= document.querySelector('#my-list');
new HybridDropdown(el,{});
el.addEventListener('change', (e) => {
 //do something
});
```

the `change` can be used to flip the styling of the dropdown to give a visual indication of the field change.  See the an example. 

## Hybrid Drodpown opened

A `hybrid-dd-click` or a `hybrid-dd-keydown` event is fired on the DOM element when the dropdown is activated (opened) either usnig the mouse or keyboard spacebar.
