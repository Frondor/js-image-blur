(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ImageBlur", [], factory);
	else if(typeof exports === 'object')
		exports["ImageBlur"] = factory();
	else
		root["ImageBlur"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ImageBlur = function ImageBlur(img, canvas, radius, blurAlphaChannel) {
  var mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
      shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

  if (typeof img === 'string') {
    img = document.getElementById(img);
  }
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }

  var w = img.naturalWidth,
      h = img.naturalHeight;

  radius = radius ? radius : h / w * 10;

  // canvas.style.width  = w + "px";
  // canvas.style.height = h + "px";
  canvas.width = w;
  canvas.height = h;

  var context = canvas.getContext('2d');

  context.clearRect(0, 0, w, h);
  context.drawImage(img, 0, 0);

  if (isNaN(radius) || radius < 1) return;

  var BlurStack = function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  };

  var stackBlurCanvasRGB = function stackBlurCanvasRGB(context, topX, topY, width, height, radius, includeAlphaChannel) {
    radius |= 0;

    var imageData;

    try {
      try {
        imageData = context.getImageData(topX, topY, width, height);
      } catch (e) {

        // NOTE: this part is supposedly only needed if you want to work with local files
        // so it might be okay to remove the whole try/catch block and just use
        // imageData = context.getImageData( topX, topY, width, height );
        try {
          window.netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
          imageData = context.getImageData(topX, topY, width, height);
        } catch (e) {
          alert('Cannot access local image');
          throw new Error('unable to access local image data: ' + e);
        }
      }
    } catch (e) {
      alert('Cannot access image');
      throw new Error('unable to access image data: ' + e);
    }

    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, rSum, gSum, bSum, aSum, rOutSum, gOutSum, bOutSum, aOutSum, rInSum, gInSum, bInSum, aInSum, pr, pg, pb, pa, rbs;

    var div = radius + radius + 1,
        widthMinus1 = width - 1,
        heightMinus1 = height - 1,
        radiusPlus1 = radius + 1,
        sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2,
        stackEnd;

    var stackStart = new BlurStack();
    var stack = stackStart;

    for (i = 1; i < div; i++) {
      stack = stack.next = new BlurStack();
      if (i == radiusPlus1) stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mulSum = mulTable[radius];
    var shgSum = shgTable[radius];

    for (y = 0; y < height; y++) {
      rInSum = gInSum = bInSum = aInSum = rSum = gSum = bSum = aSum = 0;

      rOutSum = radiusPlus1 * (pr = pixels[yi]);
      gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
      bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
      if (includeAlphaChannel) aOutSum = radiusPlus1 * (pa = pixels[yi + 3]);

      rSum += sumFactor * pr;
      gSum += sumFactor * pg;
      bSum += sumFactor * pb;
      if (includeAlphaChannel) aSum += sumFactor * pa;

      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        if (includeAlphaChannel) stack.a = pa;
        stack = stack.next;
      }

      for (i = 1; i < radiusPlus1; i++) {
        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
        rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
        gSum += (stack.g = pg = pixels[p + 1]) * rbs;
        bSum += (stack.b = pb = pixels[p + 2]) * rbs;
        if (includeAlphaChannel) aSum += (stack.a = pa = pixels[p + 3]) * rbs;

        rInSum += pr;
        gInSum += pg;
        bInSum += pb;
        if (includeAlphaChannel) aInSum += pa;

        stack = stack.next;
      }

      stackIn = stackStart;
      stackOut = stackEnd;
      for (x = 0; x < width; x++) {
        if (includeAlphaChannel) {
          pixels[yi + 3] = pa = aSum * mulSum >> shgSum;
          if (pa != 0) {
            pa = 255 / pa;
            pixels[yi] = (rSum * mulSum >> shgSum) * pa;
            pixels[yi + 1] = (gSum * mulSum >> shgSum) * pa;
            pixels[yi + 2] = (bSum * mulSum >> shgSum) * pa;
          } else {
            pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
          }
        } else {
          pixels[yi] = rSum * mulSum >> shgSum;
          pixels[yi + 1] = gSum * mulSum >> shgSum;
          pixels[yi + 2] = bSum * mulSum >> shgSum;
        }

        rSum -= rOutSum;
        gSum -= gOutSum;
        bSum -= bOutSum;
        if (includeAlphaChannel) aSum -= aOutSum;

        rOutSum -= stackIn.r;
        gOutSum -= stackIn.g;
        bOutSum -= stackIn.b;
        if (includeAlphaChannel) aOutSum -= stackIn.a;

        p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

        rInSum += stackIn.r = pixels[p];
        gInSum += stackIn.g = pixels[p + 1];
        bInSum += stackIn.b = pixels[p + 2];
        if (includeAlphaChannel) aInSum += stackIn.a = pixels[p + 3];

        rSum += rInSum;
        gSum += gInSum;
        bSum += bInSum;
        if (includeAlphaChannel) aSum += aInSum;

        stackIn = stackIn.next;

        rOutSum += pr = stackOut.r;
        gOutSum += pg = stackOut.g;
        bOutSum += pb = stackOut.b;
        if (includeAlphaChannel) aOutSum += pa = stackOut.a;

        rInSum -= pr;
        gInSum -= pg;
        bInSum -= pb;
        if (includeAlphaChannel) aInSum -= pa;

        stackOut = stackOut.next;

        yi += 4;
      }
      yw += width;
    }

    for (x = 0; x < width; x++) {
      gInSum = bInSum = aInSum = rInSum = gSum = bSum = aSum = rSum = 0;

      yi = x << 2;
      rOutSum = radiusPlus1 * (pr = pixels[yi]);
      gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
      bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
      if (includeAlphaChannel) aOutSum = radiusPlus1 * (pa = pixels[yi + 3]);

      rSum += sumFactor * pr;
      gSum += sumFactor * pg;
      bSum += sumFactor * pb;
      if (includeAlphaChannel) aSum += sumFactor * pa;

      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        if (includeAlphaChannel) stack.a = pa;
        stack = stack.next;
      }

      yp = width;

      for (i = 1; i <= radius; i++) {
        yi = yp + x << 2;

        rSum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
        gSum += (stack.g = pg = pixels[yi + 1]) * rbs;
        bSum += (stack.b = pb = pixels[yi + 2]) * rbs;
        if (includeAlphaChannel) aSum += (stack.a = pa = pixels[yi + 3]) * rbs;

        rInSum += pr;
        gInSum += pg;
        bInSum += pb;
        if (includeAlphaChannel) aInSum += pa;

        stack = stack.next;

        if (i < heightMinus1) {
          yp += width;
        }
      }

      yi = x;
      stackIn = stackStart;
      stackOut = stackEnd;
      for (y = 0; y < height; y++) {
        p = yi << 2;
        if (includeAlphaChannel) {
          pixels[p + 3] = pa = aSum * mulSum >> shgSum;
          if (pa > 0) {
            pa = 255 / pa;
            pixels[p] = (rSum * mulSum >> shgSum) * pa;
            pixels[p + 1] = (gSum * mulSum >> shgSum) * pa;
            pixels[p + 2] = (bSum * mulSum >> shgSum) * pa;
          } else {
            pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
          }
        } else {
          pixels[p] = rSum * mulSum >> shgSum;
          pixels[p + 1] = gSum * mulSum >> shgSum;
          pixels[p + 2] = bSum * mulSum >> shgSum;
        }

        rSum -= rOutSum;
        gSum -= gOutSum;
        bSum -= bOutSum;
        if (includeAlphaChannel) aSum -= aOutSum;

        rOutSum -= stackIn.r;
        gOutSum -= stackIn.g;
        bOutSum -= stackIn.b;
        if (includeAlphaChannel) aOutSum -= stackIn.a;

        p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

        rSum += rInSum += stackIn.r = pixels[p];
        gSum += gInSum += stackIn.g = pixels[p + 1];
        bSum += bInSum += stackIn.b = pixels[p + 2];
        if (includeAlphaChannel) aSum += aInSum += stackIn.a = pixels[p + 3];

        stackIn = stackIn.next;

        rOutSum += pr = stackOut.r;
        gOutSum += pg = stackOut.g;
        bOutSum += pb = stackOut.b;
        if (includeAlphaChannel) aOutSum += pa = stackOut.a;

        rInSum -= pr;
        gInSum -= pg;
        bInSum -= pb;
        if (includeAlphaChannel) aInSum -= pa;

        stackOut = stackOut.next;

        yi += width;
      }
    }

    context.putImageData(imageData, topX, topY);
  };

  stackBlurCanvasRGB(context, 0, 0, w, h, radius, blurAlphaChannel);
};

exports.default = ImageBlur;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=ImageBlur.js.map