function stringify(obj, deep, indent) {
  if (!deep === 0 || deep < 0) {
    return JSON.stringify(obj);
  }

  if (_.isArray(obj)) {
    return stringifyArray(obj, deep, indent);
  } else if (_.isObject(obj)) {
    return stringifyObject(obj, deep, indent);
  } else {
    return JSON.stringify(obj);
  }
}

function stringifyArray(array, deep, indent) {
  indent = indent || 1;
  let result = `[\n`;
  let tab = `  `;
  for (let i = 0; i < array.length; i++) {
    result += tab.repeat(indent);
    result += stringify(array[i], deep - 1, indent + 1);

    if (i != array.length - 1) {
      result += `,`;
    }
    result += `\n`;
  }
  result += tab.repeat(indent - 1);
  result += `]`;
  return result;
}

function stringifyObject(obj, deep, indent) {
  let result = `{\n`;
  let tab = `  `;
  indent = indent || 1;

  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let item = obj[key];
    result += tab.repeat(indent);
    result += `"${key}": ${stringify(item, deep - 1, indent + 1)}`;

    if (i != keys.length - 1) {
      result += `,`;
    }
    result += `\n`;
  }
  result += tab.repeat(indent - 1);
  result += `}`;

  return result;
}
