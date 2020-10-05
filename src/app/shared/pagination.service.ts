export function shouldLoadPage(page: number, pageSize: number, arrayLen) {
  if (page === undefined || pageSize === undefined) {
    return true;
  }
  if (page * pageSize > arrayLen) {
    return !((page - 1) * pageSize < arrayLen);
  } else {
    return false;
  }
}
