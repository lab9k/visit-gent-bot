const {
  map, filter, pick, mapValues,
} = require('lodash');

const onlyNl = item => item.name['xml:lang'] === 'nl';

module.exports = (rawData) => {
  const {
    head: { vars: properties },
    results: { bindings: items },
  } = rawData;
  return map(filter(items, onlyNl), (item) => {
    const picked = pick(item, properties);
    return mapValues(picked, (v, key) => {
      const { value } = v;
      if (key.includes('List')) {
        return value.split(', ');
      }
      return value;
    });
  });
};
