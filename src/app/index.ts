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

if (/googlebot/i.test(navigator.userAgent)) {
    window.addEventListener("error", function(err) {
        this.document.body.innerHTML = `
            <style>
                body{
                    background: white !important;
                    color: black !important;
                    font-size: 32px;
                }
            </style>
            <h1>${err.message}</h1>
            <pre>
                ${JSON.stringify(err, null, 4)}
            </pre>
        `;
    });
}
