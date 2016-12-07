export function shouldLoadPage(page: number, pageSize: number, arrayLen) {
    if (page === undefined || pageSize === undefined) {
        return true;
    }

    return page * pageSize > arrayLen;
}