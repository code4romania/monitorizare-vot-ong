import { Injectable } from '@angular/core';
@Injectable()
export class Paginator {

    currentPage: number = undefined;
    pageSize: number = undefined;
    initialLoad: boolean = false;
    totalItems: number = undefined;
    hasMore: boolean = undefined;

    updatePagination(data) {
        let pageData = data;
        if (pageData.pageSize === undefined) {
            pageData = data.data;
        }
        if (!this.initialLoad) {
            this.initialLoad = true;
        }

        this.pageSize = pageData.pageSize;
        this.currentPage = pageData.page;
        this.totalItems = pageData.total;
        this.hasMore = this.pageSize * this.currentPage < this.totalItems;
        return data;
    }
}