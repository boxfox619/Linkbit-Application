/**
 * This polyfill is used where the Uint8Array.fill is not available on given platform.
 * It will port the Array.fill function to Uint8Array.fill. So, when Uint8Array.fill is called,
 * then the implementation of Array.fill will be invoked.
 *
 * @platfroms IE11, Safari, Android for React Native Apps.
 * @author Mozilla Development Network
 */
if (!Uint8Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function (value) {

            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            const O = Object(this);

            // Steps 3-5.
            // tslint:disable-next-line
            const len = O.length >>> 0;

            // Steps 6-7.
            const start = arguments[1];
            // tslint:disable-next-line
            const relativeStart = start >> 0;

            // Step 8.
            let k = relativeStart < 0 ?
                Math.max(len + relativeStart, 0) :
                Math.min(relativeStart, len);

            // Steps 9-10.
            const end = arguments[2];
            // tslint:disable-next-line
            const relativeEnd = end === undefined ? len : end >> 0;

            // Step 11.
            const final = relativeEnd < 0 ?
                Math.max(len + relativeEnd, 0) :
                Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
                O[k] = value;
                k++;
            }

            // Step 13.
            return O;
        }
    });

    // @ts-ignore
    Uint8Array.prototype.fill = Array.prototype.fill;
}