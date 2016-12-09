export function shouldLoadPage(page: number, pageSize: number, arrayLen) {
    if (page === undefined || pageSize === undefined) {
        return true;
    }
    if(page * pageSize > arrayLen){
        if((page -1) * pageSize < arrayLen){
            return false
        }
        return true;
    } else {
        return false;
    }
}