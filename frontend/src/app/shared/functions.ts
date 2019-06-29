export const replaceAt = (array, index, item) => (
  [
    ...array.slice(0, index),
    item,
    ...array.slice(index + 1)
  ]
);
