const { map, filter } = require('lodash');

const onlyNl = item => item.name['xml:lang'] === 'nl';

module.exports = (rawData) => {
  const {
    results: { bindings: items },
  } = rawData;
  return map(
    filter(items, onlyNl),
    ({
      attraction: { value: attraction },
      name: { value: name },
      description: { value: description },
      page: { value: pageUrl },
      images: { value: imageString },
    }) => ({
      attraction,
      name,
      description,
      pageUrl,
      images: imageString.split(', '),
    }),
  );
};
