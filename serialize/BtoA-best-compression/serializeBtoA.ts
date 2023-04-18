export function serializeList(lst: number[]): string {
    let serialized = "";
    for (let num of lst) {
        serialized += String.fromCharCode(num >> 8);
        serialized += String.fromCharCode(num & 0xff);
    }
    return btoa(serialized);
}

export function deserializeList(serialized: string): number[] {
    let decoded = atob(serialized);
    let lst = [];
    for (let i = 0; i < decoded.length; i += 2) {
        let num = (decoded.charCodeAt(i) << 8) | decoded.charCodeAt(i + 1);
        lst.push(num);
    }
    return lst;
}

const numbers = [99, 99, 1, 44, 1, 2, 2, 300, 90, 3, 3];
const s = serializeList(numbers);
console.log(s);
const numbers2 = deserializeList(s);
console.log(numbers2); // [99, 99, 1, 44, 1, 2, 2, 300, 90, 3, 3]

const threeDigitNumbers = Array.from({ length: 1000 }, () =>
    Math.floor(Math.random() * 299) + 100
);


// функция для сравнения размера полученных данных
export const compare = (arr: number[], serialized: string) => {
    const arrStringyfiedBlob = new Blob([JSON.stringify(arr)]).size;
    const serializedBlob = new Blob([serialized]).size;
    console.log('arrStringyfiedBlob', arrStringyfiedBlob);
    console.log('serializedBlob', serializedBlob);
    console.log(serializedBlob / arrStringyfiedBlob * 100);
}

compare(threeDigitNumbers, serializeList(threeDigitNumbers));