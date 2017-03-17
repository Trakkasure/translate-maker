import find from 'lodash/find';
import getPlural from '../utils/getPlural';

function getValue(data, key, defaultValue) {
  const items = data || [];
  const option = find(items, (item) => item.key === key);

  return option ? option.value : defaultValue;
}

export default function ordinal(value, part, attrs, metadata, ...args) {
  const locale = this.getOptions().locale;
  const numberValue = Number(value);

  const plural = getPlural(locale, 'en');
  const pluralValue = plural(numberValue, true);
  const offset = getValue(metadata, 'offset', 0);

  const smartValue = offset
    ? numberValue - offset
    : value;

  // try to find exact value
  const exactKey = `=${numberValue}`;

  let option = null;
  let defaultOption = null;
  const exactOption = find(args, (arg) => {
    if (arg.type !== 'pair') {
      return false;
    }

    const key = typeof arg.key === 'string'
      ? arg.key.toLowerCase()
      : arg.key;

    if (!key || key === 'other') {
      defaultOption = arg;
    } else if (key === exactKey) {
      return true;
    } else if (key === pluralValue) {
      option = arg;
    }
  });

  if (exactOption) {
    return this.buildText(exactOption.value, attrs, smartValue);
  } else if (option) {
    return this.buildText(option.value, attrs, smartValue);
  } else if (defaultOption) {
    return this.buildText(defaultOption.value, attrs, smartValue);
  }
}
