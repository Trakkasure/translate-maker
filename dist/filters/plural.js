'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashCollectionFind = require('lodash/collection/find');

var _lodashCollectionFind2 = _interopRequireDefault(_lodashCollectionFind);

var _cldr = require('cldr');

var _cldr2 = _interopRequireDefault(_cldr);

var _cldrDataSupplementalPlurals = require('cldr-data/supplemental/plurals');

var _cldrDataSupplementalPlurals2 = _interopRequireDefault(_cldrDataSupplementalPlurals);

function test(locale) {
  var language = locale;

  // Your awesome pluralization logic
  var pluralForm = _cldrDataSupplementalPlurals2['default'].supplemental["plurals-type-cardinal"][language];

  return pluralForm;
}

console.log(test('sk'));

var cachePlural = null;

function plural(locale, count) {
  if (!cachePlural || cachePlural.locale !== locale) {
    cachePlural = {
      locale: locale,
      fn: _cldr2['default'].extractPluralRuleFunction(locale)
    };
  }

  var fn = cachePlural.fn;

  return fn(count);
}

function getValue(data, key, defaultValue) {
  var items = data || [];
  var option = (0, _lodashCollectionFind2['default'])(items, function (item) {
    return item.key === key;
  });

  return option ? option.value : defaultValue;
}

exports['default'] = function (value, part, attrs, metadata) {
  var root = this._root;
  var locale = root.getOptions().locale;
  var numberValue = Number(value);
  var pluralValue = plural(locale, numberValue);
  var offset = getValue(metadata, 'offset', 0);

  var smartValue = offset ? numberValue - offset : value;

  var defaultOption = null;

  for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }

  var option = (0, _lodashCollectionFind2['default'])(args, function (arg) {
    if (arg.type !== 'pair') {
      return false;
    }

    if (!arg.key) {
      defaultOption = arg;
      return false;
    }

    var key = typeof arg.key === 'string' ? arg.key.toLowerCase() : arg.key;
    if (key[0] === '=') {
      var keyValue = parseInt(key.substr(1), 10);
      return keyValue === numberValue;
    }

    return key === pluralValue;
  });

  if (option) {
    return this.buildText(option.value, attrs, smartValue);
  } else if (defaultOption) {
    return this.buildText(defaultOption.value, attrs, smartValue);
  }
};

module.exports = exports['default'];