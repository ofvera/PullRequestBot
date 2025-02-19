"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-stream";
exports.ids = ["vendor-chunks/is-stream"];
exports.modules = {

/***/ "(rsc)/./node_modules/is-stream/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-stream/index.js ***!
  \*****************************************/
/***/ ((module) => {

eval("\nvar isStream = module.exports = function(stream) {\n    return stream !== null && typeof stream === \"object\" && typeof stream.pipe === \"function\";\n};\nisStream.writable = function(stream) {\n    return isStream(stream) && stream.writable !== false && typeof stream._write === \"function\" && typeof stream._writableState === \"object\";\n};\nisStream.readable = function(stream) {\n    return isStream(stream) && stream.readable !== false && typeof stream._read === \"function\" && typeof stream._readableState === \"object\";\n};\nisStream.duplex = function(stream) {\n    return isStream.writable(stream) && isStream.readable(stream);\n};\nisStream.transform = function(stream) {\n    return isStream.duplex(stream) && typeof stream._transform === \"function\" && typeof stream._transformState === \"object\";\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaXMtc3RyZWFtL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsSUFBSUEsV0FBV0MsT0FBT0MsT0FBTyxHQUFHLFNBQVVDLE1BQU07SUFDL0MsT0FBT0EsV0FBVyxRQUFRLE9BQU9BLFdBQVcsWUFBWSxPQUFPQSxPQUFPQyxJQUFJLEtBQUs7QUFDaEY7QUFFQUosU0FBU0ssUUFBUSxHQUFHLFNBQVVGLE1BQU07SUFDbkMsT0FBT0gsU0FBU0csV0FBV0EsT0FBT0UsUUFBUSxLQUFLLFNBQVMsT0FBT0YsT0FBT0csTUFBTSxLQUFLLGNBQWMsT0FBT0gsT0FBT0ksY0FBYyxLQUFLO0FBQ2pJO0FBRUFQLFNBQVNRLFFBQVEsR0FBRyxTQUFVTCxNQUFNO0lBQ25DLE9BQU9ILFNBQVNHLFdBQVdBLE9BQU9LLFFBQVEsS0FBSyxTQUFTLE9BQU9MLE9BQU9NLEtBQUssS0FBSyxjQUFjLE9BQU9OLE9BQU9PLGNBQWMsS0FBSztBQUNoSTtBQUVBVixTQUFTVyxNQUFNLEdBQUcsU0FBVVIsTUFBTTtJQUNqQyxPQUFPSCxTQUFTSyxRQUFRLENBQUNGLFdBQVdILFNBQVNRLFFBQVEsQ0FBQ0w7QUFDdkQ7QUFFQUgsU0FBU1ksU0FBUyxHQUFHLFNBQVVULE1BQU07SUFDcEMsT0FBT0gsU0FBU1csTUFBTSxDQUFDUixXQUFXLE9BQU9BLE9BQU9VLFVBQVUsS0FBSyxjQUFjLE9BQU9WLE9BQU9XLGVBQWUsS0FBSztBQUNoSCIsInNvdXJjZXMiOlsid2VicGFjazovL3B1bGxyZXF1ZXN0Ym90Ly4vbm9kZV9tb2R1bGVzL2lzLXN0cmVhbS9pbmRleC5qcz8xOWQ4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzU3RyZWFtID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG5cdHJldHVybiBzdHJlYW0gIT09IG51bGwgJiYgdHlwZW9mIHN0cmVhbSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHN0cmVhbS5waXBlID09PSAnZnVuY3Rpb24nO1xufTtcblxuaXNTdHJlYW0ud3JpdGFibGUgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG5cdHJldHVybiBpc1N0cmVhbShzdHJlYW0pICYmIHN0cmVhbS53cml0YWJsZSAhPT0gZmFsc2UgJiYgdHlwZW9mIHN0cmVhbS5fd3JpdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHN0cmVhbS5fd3JpdGFibGVTdGF0ZSA9PT0gJ29iamVjdCc7XG59O1xuXG5pc1N0cmVhbS5yZWFkYWJsZSA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcblx0cmV0dXJuIGlzU3RyZWFtKHN0cmVhbSkgJiYgc3RyZWFtLnJlYWRhYmxlICE9PSBmYWxzZSAmJiB0eXBlb2Ygc3RyZWFtLl9yZWFkID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzdHJlYW0uX3JlYWRhYmxlU3RhdGUgPT09ICdvYmplY3QnO1xufTtcblxuaXNTdHJlYW0uZHVwbGV4ID0gZnVuY3Rpb24gKHN0cmVhbSkge1xuXHRyZXR1cm4gaXNTdHJlYW0ud3JpdGFibGUoc3RyZWFtKSAmJiBpc1N0cmVhbS5yZWFkYWJsZShzdHJlYW0pO1xufTtcblxuaXNTdHJlYW0udHJhbnNmb3JtID0gZnVuY3Rpb24gKHN0cmVhbSkge1xuXHRyZXR1cm4gaXNTdHJlYW0uZHVwbGV4KHN0cmVhbSkgJiYgdHlwZW9mIHN0cmVhbS5fdHJhbnNmb3JtID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzdHJlYW0uX3RyYW5zZm9ybVN0YXRlID09PSAnb2JqZWN0Jztcbn07XG4iXSwibmFtZXMiOlsiaXNTdHJlYW0iLCJtb2R1bGUiLCJleHBvcnRzIiwic3RyZWFtIiwicGlwZSIsIndyaXRhYmxlIiwiX3dyaXRlIiwiX3dyaXRhYmxlU3RhdGUiLCJyZWFkYWJsZSIsIl9yZWFkIiwiX3JlYWRhYmxlU3RhdGUiLCJkdXBsZXgiLCJ0cmFuc2Zvcm0iLCJfdHJhbnNmb3JtIiwiX3RyYW5zZm9ybVN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/is-stream/index.js\n");

/***/ })

};
;