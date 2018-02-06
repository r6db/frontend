/// <reference path="../../declarations.d.ts" />
/**
 * this is the app's entry point
 */

// import polyfills
import "babel-polyfill";
import "isomorphic-fetch";

// import deps
import "react-hot-loader/patch";
import "./app";


if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
  