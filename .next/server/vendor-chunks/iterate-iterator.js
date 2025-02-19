"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/iterate-iterator";
exports.ids = ["vendor-chunks/iterate-iterator"];
exports.modules = {

/***/ "(rsc)/./node_modules/iterate-iterator/index.js":
/*!************************************************!*\
  !*** ./node_modules/iterate-iterator/index.js ***!
  \************************************************/
/***/ ((module) => {

eval("\nvar $TypeError = TypeError;\n// eslint-disable-next-line consistent-return\nmodule.exports = function iterateIterator(iterator) {\n    if (!iterator || typeof iterator.next !== \"function\") {\n        throw new $TypeError(\"iterator must be an object with a `next` method\");\n    }\n    if (arguments.length > 1) {\n        var callback = arguments[1];\n        if (typeof callback !== \"function\") {\n            throw new $TypeError(\"`callback`, if provided, must be a function\");\n        }\n    }\n    var values = callback || [];\n    var result;\n    while((result = iterator.next()) && !result.done){\n        if (callback) {\n            callback(result.value); // eslint-disable-line callback-return\n        } else {\n            values.push(result.value);\n        }\n    }\n    if (!callback) {\n        return values;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaXRlcmF0ZS1pdGVyYXRvci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBLElBQUlBLGFBQWFDO0FBRWpCLDZDQUE2QztBQUM3Q0MsT0FBT0MsT0FBTyxHQUFHLFNBQVNDLGdCQUFnQkMsUUFBUTtJQUNqRCxJQUFJLENBQUNBLFlBQVksT0FBT0EsU0FBU0MsSUFBSSxLQUFLLFlBQVk7UUFDckQsTUFBTSxJQUFJTixXQUFXO0lBQ3RCO0lBQ0EsSUFBSU8sVUFBVUMsTUFBTSxHQUFHLEdBQUc7UUFDekIsSUFBSUMsV0FBV0YsU0FBUyxDQUFDLEVBQUU7UUFDM0IsSUFBSSxPQUFPRSxhQUFhLFlBQVk7WUFDbkMsTUFBTSxJQUFJVCxXQUFXO1FBQ3RCO0lBQ0Q7SUFDQSxJQUFJVSxTQUFTRCxZQUFZLEVBQUU7SUFDM0IsSUFBSUU7SUFDSixNQUFPLENBQUNBLFNBQVNOLFNBQVNDLElBQUksRUFBQyxLQUFNLENBQUNLLE9BQU9DLElBQUksQ0FBRTtRQUNsRCxJQUFJSCxVQUFVO1lBQ2JBLFNBQVNFLE9BQU9FLEtBQUssR0FBRyxzQ0FBc0M7UUFDL0QsT0FBTztZQUNOSCxPQUFPSSxJQUFJLENBQUNILE9BQU9FLEtBQUs7UUFDekI7SUFDRDtJQUNBLElBQUksQ0FBQ0osVUFBVTtRQUNkLE9BQU9DO0lBQ1I7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3B1bGxyZXF1ZXN0Ym90Ly4vbm9kZV9tb2R1bGVzL2l0ZXJhdGUtaXRlcmF0b3IvaW5kZXguanM/ZTFjZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXRlcmF0ZUl0ZXJhdG9yKGl0ZXJhdG9yKSB7XG5cdGlmICghaXRlcmF0b3IgfHwgdHlwZW9mIGl0ZXJhdG9yLm5leHQgIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhbiBvYmplY3Qgd2l0aCBhIGBuZXh0YCBtZXRob2QnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHR2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2BjYWxsYmFja2AsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblx0XHR9XG5cdH1cblx0dmFyIHZhbHVlcyA9IGNhbGxiYWNrIHx8IFtdO1xuXHR2YXIgcmVzdWx0O1xuXHR3aGlsZSAoKHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG5cdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRjYWxsYmFjayhyZXN1bHQudmFsdWUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbGxiYWNrLXJldHVyblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YWx1ZXMucHVzaChyZXN1bHQudmFsdWUpO1xuXHRcdH1cblx0fVxuXHRpZiAoIWNhbGxiYWNrKSB7XG5cdFx0cmV0dXJuIHZhbHVlcztcblx0fVxufTtcbiJdLCJuYW1lcyI6WyIkVHlwZUVycm9yIiwiVHlwZUVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyIsIml0ZXJhdGVJdGVyYXRvciIsIml0ZXJhdG9yIiwibmV4dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNhbGxiYWNrIiwidmFsdWVzIiwicmVzdWx0IiwiZG9uZSIsInZhbHVlIiwicHVzaCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/iterate-iterator/index.js\n");

/***/ })

};
;