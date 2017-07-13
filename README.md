# ImageBlur()

This is an implementation of the original script made by [Mario Klingemann](http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html).
Although the algorithm is still the same, I've added my "personal touch" to make the script a bit more friendly, shorter, and easily implementable either by loading the library in a `<script>`, or via npm.

### Installation

Download the contents in `/lib` and load them in your site like:
`<script src="/ImageBlur.min.js">`

**or**

`npm install github:frondor/js-image-blur --save`

and import the function:
`var ImageBlur = require('js-image-blur')`
or
`load ImageBlur from 'js-image-blur'`

### Usage

Just preload your images and call `ImageBlur(imgElement, canvasElement)`, that's all.

But it isn't all fun and games, *there's a gotcha*. **Be sure your image is already loaded before calling** `ImageBlur` or it won't work.

If your image is already in the DOM, you can do something like
```
var img = document.getElementById('img'),
    canvas = document.getElementById('canvas'),
    BLUR_RADIUS = 6;

setTimeout(() => ImageBlur(img, canvas, BLUR_RADIUS));
```
Or you can preload the image in case you need more control over it, **before** applying the blur. Just be sure you do it once the image is loaded.
```
var img = new Image(),
  canvas = document.getElementById('canvas'),
  blurIt = function () {
    ImageBlur(img, canvas);
  };

img.addEventListener('load', blurIt);
img.src = '/image.jpg';

```

## ImageBlur(img, canvas, radio, alphaChannel);

| Param | Description | Type | Default |
|-------|-------------|---------|---------|
| img | Image element to apply the blur on or its id.| mixed `DOMelement`/`string ` | **required** |
| canvas| Canvas element where the blurred image is drawn on, or its id.| mixed `DOMelement`/`string ` | **required** |
| radius | Blur effect radius | `Number` | `(img.height/img.width)*10` |
| alphaChannel| Determine if the algorithm is working over alpha channel of the image as well. | `boolean` | `false` |


## Scripts

* `npm run build` - produces production version
* `npm run dev` - produces development version and runs a watcher
* `npm run test`
* `npm run test:watch`
