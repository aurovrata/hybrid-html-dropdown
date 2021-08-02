---
layout: default
title: "Examples"
permalink: /examples/
nav_order: 4
---

# Hybrid dropdown with multiple nested groups.

Unlike `<select/>` dropdown fields, Hybrid Dropdowns can be constructed with multiple nested groups,  this is esepcially useful to display hierarchical list such as WordPress taxonomies with multiple branches, however this is only possible using the JSON dataset construct,

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
**Note the inclusion of the keyword** `"label"` in the json 2nd level branch, which results in,
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
and enables selection of the parent option.  Exluding the `"label"` keyword would simply group the child branch with the parent as title.

## Hybrid dropdonw with treeview selection
Using the same example as above, but adding a `"label"` keywords for the top most parent, we enable the [treeView](/hybrid-dropdow/options/#option-treeView) option
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
        }
      }
    }
   </script>
</div>
