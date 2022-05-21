"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var EjsTemplateFactory = function () {
  function frag(children) {
    return children == null ? '' : !Array.isArray(children) ? children : children.filter(function (value) {
      return value != null;
    }).join('');
  }

  function tag(name, attributes, children) {
    if (typeof name === 'function') {
      name(attributes, children);
    }

    var openTag = "<".concat([name].concat(_toConsumableArray(attributes == null ? [] : Object.keys(attributes).map(function (key) {
      return attributes[key] == null ? null : "".concat(key, "=\"").concat(attributes[key], "\"");
    }).filter(function (attribute) {
      return attribute != null;
    }))).join(' '), ">");

    if (children == null) {
      return openTag;
    }

    return "".concat(openTag).concat(frag(children), "</").concat(name, ">");
  }

  function style(properties) {
    return properties == null ? '' : Object.keys(properties).map(function (key) {
      return properties[key] == null ? null : properties[key] && _typeof(properties[key]) === 'object' ? "".concat(key, " { ").concat(style(properties[key]), " }") : "".concat(key, ": ").concat(properties[key], ";");
    }).filter(function (value) {
      return value != null;
    }).join(' ');
  }

  function exp(value) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$escaped = _ref.escaped,
        escaped = _ref$escaped === void 0 ? false : _ref$escaped;

    return "".concat(escaped ? '<%-' : '<%=', " ").concat(value, " %>");
  }

  function code(value) {
    return ['<%', value == null ? null : value, '%>'].filter(function (value) {
      return value != null;
    }).join(' ');
  }

  function cond(condition, trueChildren, falseChildren) {
    return [code("if (".concat(condition, ") {")), trueChildren == null ? null : frag(trueChildren)].concat(_toConsumableArray(falseChildren == null ? [] : ['<% } else { %>', frag(falseChildren)]), [code('}')]).filter(function (value) {
      return value != null;
    }).join('');
  }

  function forLoop(initial, condition, increment, children) {
    return [code("for (let ".concat(initial, "; ").concat(condition, "; ").concat(increment, ") {")), children == null ? null : frag(children), code('}')].filter(function (value) {
      return value != null;
    }).join('');
  }

  function doLoop(children, condition) {
    return [code('do {'), children == null ? null : frag(children), code("} while(".concat(condition, ")"))].filter(function (value) {
      return value != null;
    }).join('');
  }

  function whileLoop(condition, children) {
    return [code("while(".concat(condition, ") {")), children == null ? null : frag(children), code('}')].filter(function (value) {
      return value != null;
    }).join('');
  }

  function fromJson(json) {
    return json == null ? '' : Array.isArray(json) ? fromJson({
      type: 'frag',
      children: json
    }) : _typeof(json) === 'object' ? fromJson[json.type] ? fromJson[json.type](json) : '' : json;
  }

  fromJson.frag = function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        children = _ref2.children;

    return frag(children == null ? children : Array.isArray(children) ? children.map(function (child) {
      return fromJson(child);
    }) : fromJson(children));
  };

  fromJson.tag = function (_ref3) {
    var name = _ref3.name,
        attributes = _ref3.attributes,
        children = _ref3.children;
    return tag(name, attributes, children == null ? children : fromJson(children));
  };

  fromJson.exp = function (_ref4) {
    var value = _ref4.value,
        options = _ref4.options;
    return exp(value, options);
  };

  fromJson.code = function (_ref5) {
    var value = _ref5.value;
    return code(value);
  };

  fromJson.cond = function (_ref6) {
    var condition = _ref6.condition,
        trueChildren = _ref6.trueChildren,
        falseChildren = _ref6.falseChildren;
    return cond(condition, trueChildren == null ? trueChildren : fromJson(trueChildren), falseChildren == null ? falseChildren : fromJson(falseChildren));
  };

  fromJson.forLoop = function (_ref7) {
    var initial = _ref7.initial,
        condition = _ref7.condition,
        increment = _ref7.increment,
        children = _ref7.children;
    return forLoop(initial, condition, increment, children == null ? children : fromJson(children));
  };

  fromJson.doLoop = function (_ref8) {
    var children = _ref8.children,
        condition = _ref8.condition;
    return doLoop(children == null ? children : fromJson(children), condition);
  };

  fromJson.whileLoop = function (_ref9) {
    var condition = _ref9.condition,
        children = _ref9.children;
    return whileLoop(condition, children == null ? children : fromJson(children));
  };

  return;
  {
    frag, tag, style, exp, code, cond, forLoop, doLoop, whileLoop, fromJson;
  }
  ;
}();
/* exported EjsTemplateFactory */