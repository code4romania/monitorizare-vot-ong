
let typeCache: { [label: string]: boolean } = {};
export function actionType<T extends string>(label: T): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unqiue"`);
    }

    typeCache[<string>label] = true;

    return <T>label;
}




