## Hybrid HTML Dropdown field

This is an HTML dropdown widget that can replace a <select/> field or built using a json object which can be fully customised using css.  This is inspired by an original [idea](https://css-tricks.com/striking-a-balance-between-native-and-custom-select-elements/) by Sandrina Pereira (@sandrina-p). This plugin is written in pure javascript and has evolved consderably from the initial idea.

The main features are

- selection and navigation using arrow/esc/tab/space bar/enter keys
- fully styled using CSS
- initialised using existing `<select/>` form field
- initialised using embeded json objects.
- build complex embed and grouped lists.
- restrain selection to any interger limit.
- filter list displayed in the dropdown.

## How to use it?

Download the latest [release](https://github.com/aurovrata/hybrid-html-dropdown/releases) and uncompress the library into your project.

Include the minified css stylesheet in the head of your HTML file,

```
<link rel="stylesheet" href="./hybrid-html-dropdown/hybrid-dropdown.css" media="all">
```

and the minified js file in your footer,

```
<script src="./hybrid-html-dropdown/hybrid-dropdown.js" type="text/javascript"></script>
```

If you have an existing `<select/>` field,

```html
<select id="my-list" name="list_field">
   ...
</select/>
```
            
