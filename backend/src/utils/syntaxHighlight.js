export function syntaxHighlight(json) {
  const str = JSON.stringify(json, null, 2);
  return str.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:[.]\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = 'num';
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'key' : 'str';
      } else if (/true|false/.test(match)) {
        cls = 'bool';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
}
