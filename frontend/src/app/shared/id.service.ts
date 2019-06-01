const decode = (encoded) => parseInt(encoded.charAt(1)) * 26 + encoded.charCodeAt(0) - 'A'.charCodeAt(0);
const encode = (numeric) => String.fromCharCode(numeric % 26 + 'A'.charCodeAt(0)) + Math.floor(numeric / 26);
export function nextEncodedId(encodedIds){
  const maxId = Math.max(...encodedIds
    .map(id => id.length === 1 ? id + '0' : id)
    .map(decode), 0);
  return encode(maxId + 1);
}
export function nextNumericId(ids){
  const maxId = Math.max(...ids, 0);
  return maxId + 1;
}
