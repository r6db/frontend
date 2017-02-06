/*
* memoize.js
* by @philogb and @addyosmani
* with further optimizations by @mathias
* and @DmitryBaranovsk
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
export default function memoize( fn ) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        let hash = "";
        let i = args.length;
        let currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += (currentArg === Object(currentArg)) ?
            JSON.stringify(currentArg) : currentArg;
            fn.memoize || (fn.memoize = {});
        }
        return (hash in fn.memoize)
            ? fn.memoize[hash]
            : fn.memoize[hash] = fn.apply(this, args);
    };
}
