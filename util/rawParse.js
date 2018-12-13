const { map } = require('lodash');

module.exports = (rawData) => {
  const {
    results: { bindings: items },
  } = rawData;
  return map(
    items,
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
