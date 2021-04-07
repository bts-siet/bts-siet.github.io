var email=localStorage.getItem("email");
/*
 * QR Code generator input demo (TypeScript)
 *
 * Copyright (c) Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */
"use strict";
var app;
(function (app) {
    function initialize() {
        redrawQrCode();
    }
    function redrawQrCode() {
        // Show/hide rows based on bitmap/vector image output
        var bitmapOutput = true;
        // Reset output images in case of early termination
        var canvas = getElem("qrcode-canvas");
        var svg = document.getElementById("qrcode-svg");
        canvas.style.display = "none";
        svg.style.display = "none";
        // Returns a QrCode.Ecc object based on the radio buttons in the HTML form.
        function getInputErrorCorrectionLevel() {
                return qrcodegen.QrCode.Ecc.HIGH;
        }
        // Get form inputs and compute QR Code
        var ecl = getInputErrorCorrectionLevel();
        var text = email;
        var segs = qrcodegen.QrSegment.makeSegments(text);
        var minVer = parseInt(3, 10);
        var maxVer = parseInt(40, 10);
        var mask = parseInt(-1, 10);
        var boostEcc = true;
        var qr = qrcodegen.QrCode.encodeSegments(segs, ecl, minVer, maxVer, mask, boostEcc);
        // Draw image output
        var border = parseInt(4, 10);
        if (border < 0 || border > 100)
            return;
        if (bitmapOutput) {
            var scale = parseInt(8, 10);
            if (scale <= 0 || scale > 30)
                return;
            qr.drawCanvas(scale, border, canvas);
            canvas.style.removeProperty("display");
        }
        else {
            var code = qr.toSvgString(border);
            var viewBox = / viewBox="([^"]*)"/.exec(code)[1];
            var pathD = / d="([^"]*)"/.exec(code)[1];
            svg.setAttribute("viewBox", viewBox);
            svg.querySelector("path").setAttribute("d", pathD);
            svg.style.removeProperty("display");
            svgXml.value = qr.toSvgString(border);
        }
        // Returns a string to describe the given list of segments.
        function describeSegments(segs) {
            if (segs.length == 0)
                return "none";
            else if (segs.length == 1) {
                var mode = segs[0].mode;
                var Mode = qrcodegen.QrSegment.Mode;
                if (mode == Mode.NUMERIC)
                    return "numeric";
                if (mode == Mode.ALPHANUMERIC)
                    return "alphanumeric";
                if (mode == Mode.BYTE)
                    return "byte";
                if (mode == Mode.KANJI)
                    return "kanji";
                return "unknown";
            }
            else
                return "multiple";
        }
        // Returns the number of Unicode code points in the given UTF-16 string.
        function countUnicodeChars(str) {
            var result = 0;
            for (var i = 0; i < str.length; i++, result++) {
                var c = str.charCodeAt(i);
                if (c < 0xD800 || c >= 0xE000)
                    continue;
                else if (0xD800 <= c && c < 0xDC00 && i + 1 < str.length) { // High surrogate
                    i++;
                    var d = str.charCodeAt(i);
                    if (0xDC00 <= d && d < 0xE000) // Low surrogate
                        continue;
                }
                throw "Invalid UTF-16 string";
            }
            return result;
        }
    }
    function handleVersionMinMax(which) {
        var minElem = 3;
        var maxElem = 40;
        var minVal = parseInt(minElem.value, 10);
        var maxVal = parseInt(maxElem.value, 10);
        minVal = Math.max(Math.min(minVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
        maxVal = Math.max(Math.min(maxVal, qrcodegen.QrCode.MAX_VERSION), qrcodegen.QrCode.MIN_VERSION);
        if (which == "min" && minVal > maxVal)
            maxVal = minVal;
        else if (which == "max" && maxVal < minVal)
            minVal = maxVal;
        minElem.value = minVal.toString();
        maxElem.value = maxVal.toString();
        redrawQrCode();
    }
    app.handleVersionMinMax = handleVersionMinMax;
    function getElem(id) {
        var result = document.getElementById(id);
        if (result instanceof HTMLElement)
            return result;
        throw "Assertion error";
    }
    function getInput(id) {
        var result = getElem(id);
        if (result instanceof HTMLInputElement)
            return result;
        throw "Assertion error";
    }
    initialize();
})(app || (app = {}));
