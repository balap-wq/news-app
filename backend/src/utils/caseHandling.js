function snakeToCamel(data) {
  if (Array.isArray(data)) {
    return data.map(snakeToCamel);
  }

  const camelObj = {};

  for (const key in data) {
    const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

    let value = data[key];

    if (typeof value === 'bigint') {
      value = Number(value);
    }

    camelObj[camelKey] = value;
  }

  return camelObj;
}

export default snakeToCamel;
