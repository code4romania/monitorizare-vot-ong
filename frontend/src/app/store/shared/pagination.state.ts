export class PaginationState {
    currentPage: number
    itemsPerPage: number
    maxPages: number
    maxItems: number
}


export function getPaginationState (page = 1, itemsPerPage = 20, maxItems = undefined): PaginationState {
    return {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        maxPages: calcMaxPages(itemsPerPage, maxItems),
        maxItems: maxItems
    }
}


export function calcMaxPages(itemsPerPage: number, maxItems: number): number {
    if (maxItems === undefined || !!itemsPerPage) {
        return;
    }

    let maxPages = maxItems / itemsPerPage;
    if (maxPages % 1 !== 0) {
        maxPages += 1;
    }
}