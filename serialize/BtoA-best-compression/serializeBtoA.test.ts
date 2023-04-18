import {serializeList, deserializeList} from './serializeBtoA';


describe("serialize and deserialize", () => {
    it("should handle empty array", () => {
        expect(serializeList([])).toBe("");
        expect(deserializeList("")).toEqual([]);
    });
    it("should handle single number array", () => {
        expect(serializeList([5])).toBe("AAU=");
        expect(deserializeList("AAU=")).toEqual([5]);
    });
    it("should handle 3-digit numbers array", () => {
        expect(serializeList([225, 226, 226, 300, 199, 100])).toBe("AOEA4gDiASwAxwBk");
        expect(deserializeList("AOEA4gDiASwAxwBk")).toEqual([225, 226, 226, 300, 199, 100]);
    });
    it("should handle array with repeating numbers", () => {
        expect(serializeList([1, 2, 2, 3, 3, 3])).toBe("AAEAAgACAAMAAwAD");
        expect(deserializeList("AAEAAgACAAMAAwAD")).toEqual([1, 2, 2, 3, 3, 3]);
    });
    it("should handle large random arrays", () => {
        const randomArray50 = Array.from({ length: 50 }, () =>
            Math.floor(Math.random() * 300) + 1
        );
        const randomArray100 = Array.from({ length: 100 }, () =>
            Math.floor(Math.random() * 300) + 1
        );
        const randomArray500 = Array.from({ length: 500 }, () =>
            Math.floor(Math.random() * 300) + 1
        );
        const randomArray1000 = Array.from({ length: 1000 }, () =>
            Math.floor(Math.random() * 300) + 1
        );
        expect(deserializeList(serializeList(randomArray50))).toEqual(randomArray50);
        expect(deserializeList(serializeList(randomArray100))).toEqual(randomArray100);
        expect(deserializeList(serializeList(randomArray500))).toEqual(randomArray500);
        expect(deserializeList(serializeList(randomArray1000))).toEqual(randomArray1000);
    });
    it("should handle arrays with short numbers", () => {
        const shortNumbers = Array.from({ length: 1000 }, () =>
            Math.floor(Math.random() * 9) + 1
        );
        expect(deserializeList(serializeList(shortNumbers))).toEqual(shortNumbers);
    });
    it("should handle arrays with two-digit numbers", () => {
        const twoDigitNumbers = Array.from({ length: 1000 }, () =>
            Math.floor(Math.random() * 90) + 10
        );
        expect(deserializeList(serializeList(twoDigitNumbers))).toEqual(twoDigitNumbers);
    });
    it("should handle arrays with three-digit numbers", () => {
        const threeDigitNumbers = Array.from({ length: 1000 }, () =>
            Math.floor(Math.random() * 300) + 100
        );
        expect(deserializeList(serializeList(threeDigitNumbers))).toEqual(
            threeDigitNumbers
        );
    });
    it("should handle arrays with 3 repeated numbers", () => {
        const threes = Array.from({ length: 300 }, (_, index) =>
            Math.floor(index / 3) + 1
        );
        expect(deserializeList(serializeList(threes))).toEqual(threes);
    });
});