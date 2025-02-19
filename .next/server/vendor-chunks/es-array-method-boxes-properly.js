/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/es-array-method-boxes-properly";
exports.ids = ["vendor-chunks/es-array-method-boxes-properly"];
exports.modules = {

/***/ "(rsc)/./node_modules/es-array-method-boxes-properly/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/es-array-method-boxes-properly/index.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("module.exports = function properlyBoxed(method) {\n    // Check node 0.6.21 bug where third parameter is not boxed\n    var properlyBoxesNonStrict = true;\n    var properlyBoxesStrict = true;\n    var threwException = false;\n    if (typeof method === \"function\") {\n        try {\n            // eslint-disable-next-line max-params\n            method.call(\"f\", function(_, __, O) {\n                if (typeof O !== \"object\") {\n                    properlyBoxesNonStrict = false;\n                }\n            });\n            method.call([\n                null\n            ], function() {\n                \"use strict\";\n                properlyBoxesStrict = typeof this === \"string\"; // eslint-disable-line no-invalid-this\n            }, \"x\");\n        } catch (e) {\n            threwException = true;\n        }\n        return !threwException && properlyBoxesNonStrict && properlyBoxesStrict;\n    }\n    return false;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWxscmVxdWVzdGJvdC8uL25vZGVfbW9kdWxlcy9lcy1hcnJheS1tZXRob2QtYm94ZXMtcHJvcGVybHkvaW5kZXguanM/YTEzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHByb3Blcmx5Qm94ZWQobWV0aG9kKSB7XG5cdC8vIENoZWNrIG5vZGUgMC42LjIxIGJ1ZyB3aGVyZSB0aGlyZCBwYXJhbWV0ZXIgaXMgbm90IGJveGVkXG5cdHZhciBwcm9wZXJseUJveGVzTm9uU3RyaWN0ID0gdHJ1ZTtcblx0dmFyIHByb3Blcmx5Qm94ZXNTdHJpY3QgPSB0cnVlO1xuXHR2YXIgdGhyZXdFeGNlcHRpb24gPSBmYWxzZTtcblx0aWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcblx0XHRcdG1ldGhvZC5jYWxsKCdmJywgZnVuY3Rpb24gKF8sIF9fLCBPKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgTyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRwcm9wZXJseUJveGVzTm9uU3RyaWN0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRtZXRob2QuY2FsbChcblx0XHRcdFx0W251bGxdLFxuXHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0J3VzZSBzdHJpY3QnO1xuXG5cdFx0XHRcdFx0cHJvcGVybHlCb3hlc1N0cmljdCA9IHR5cGVvZiB0aGlzID09PSAnc3RyaW5nJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1pbnZhbGlkLXRoaXNcblx0XHRcdFx0fSxcblx0XHRcdFx0J3gnXG5cdFx0XHQpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHRocmV3RXhjZXB0aW9uID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuICF0aHJld0V4Y2VwdGlvbiAmJiBwcm9wZXJseUJveGVzTm9uU3RyaWN0ICYmIHByb3Blcmx5Qm94ZXNTdHJpY3Q7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcbiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicHJvcGVybHlCb3hlZCIsIm1ldGhvZCIsInByb3Blcmx5Qm94ZXNOb25TdHJpY3QiLCJwcm9wZXJseUJveGVzU3RyaWN0IiwidGhyZXdFeGNlcHRpb24iLCJjYWxsIiwiXyIsIl9fIiwiTyIsImUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxPQUFPLEdBQUcsU0FBU0MsY0FBY0MsTUFBTTtJQUM3QywyREFBMkQ7SUFDM0QsSUFBSUMseUJBQXlCO0lBQzdCLElBQUlDLHNCQUFzQjtJQUMxQixJQUFJQyxpQkFBaUI7SUFDckIsSUFBSSxPQUFPSCxXQUFXLFlBQVk7UUFDakMsSUFBSTtZQUNILHNDQUFzQztZQUN0Q0EsT0FBT0ksSUFBSSxDQUFDLEtBQUssU0FBVUMsQ0FBQyxFQUFFQyxFQUFFLEVBQUVDLENBQUM7Z0JBQ2xDLElBQUksT0FBT0EsTUFBTSxVQUFVO29CQUMxQk4seUJBQXlCO2dCQUMxQjtZQUNEO1lBRUFELE9BQU9JLElBQUksQ0FDVjtnQkFBQzthQUFLLEVBQ047Z0JBQ0M7Z0JBRUFGLHNCQUFzQixPQUFPLElBQUksS0FBSyxVQUFVLHNDQUFzQztZQUN2RixHQUNBO1FBRUYsRUFBRSxPQUFPTSxHQUFHO1lBQ1hMLGlCQUFpQjtRQUNsQjtRQUNBLE9BQU8sQ0FBQ0Esa0JBQWtCRiwwQkFBMEJDO0lBQ3JEO0lBQ0EsT0FBTztBQUNSIiwiZmlsZSI6Iihyc2MpLy4vbm9kZV9tb2R1bGVzL2VzLWFycmF5LW1ldGhvZC1ib3hlcy1wcm9wZXJseS9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/es-array-method-boxes-properly/index.js\n");

/***/ })

};
;