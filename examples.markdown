---
layout: default
title: "Examples"
nav_order: 4
---

# Hybrid dropdown with multiple nested groups.

Unlinke `<select/>` dropdown fields, Hybrid Dropdowns can be constructed with multiple nested groups,  this is esepcially useful to display hierarchical list such as WordPress taxonomies with multiple branches, however this is only possible using the JSON dataset construct,

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
which results in,
<span id="json-field" class="hybrid-list">
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
</span>

a reference to the object is placed on the node structure of the element on which the dropdown is constructed,
