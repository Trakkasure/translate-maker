import Adapter from '../Adapter';

const DEFAULT_NAMESPACE = 'default';

export default class Memory extends Adapter {
  constructor(options) {
    super(options);

    this._locales = {};
  }

  get(locale, namespace, callback) {
    if (typeof namespace === 'function') {
      return this.get(locale, DEFAULT_NAMESPACE, namespace);
    }

    const locales = this._locales;
    const data = locales[locale];
    if (!data || !data[namespace]) {
      return callback(null, null);
    }

    callback(null, data[namespace]);
  }

  set(locale, data, namespace, callback) {
    if (typeof namespace === 'function') {
      return this.set(locale, data, DEFAULT_NAMESPACE, namespace);
    }

    const locales = this._locales;
    if (!locales[locale]) {
      locales[locale] = {};
    }

    const dataLocale = locales[locale];
    dataLocale[namespace] = data;

    callback(null, data);
  }
}