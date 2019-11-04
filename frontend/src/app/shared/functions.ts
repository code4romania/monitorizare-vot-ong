export const replaceAt = (array: any[], index: number, item: any) => (
  (index < 0 || index >= array.length) ? (array) : ([
    ...array.slice(0, index),
    item,
    ...array.slice(index + 1)
  ])
);
export const decode = (encoded) => (parseInt(encoded.length === 1 ? 0 : encoded.charAt(1), 0) * 26
  + encoded.charCodeAt(0) - 'A'.charCodeAt(0));
export const encode = (numeric) => (String.fromCharCode(numeric % 26 + 'A'.charCodeAt(0))
  + (Math.floor(numeric / 26) === 0 ? '' : Math.floor(numeric / 26)));
