const diff = require("../diff");
const { describe, expect, test } = require("@jest/globals");

const stringify = JSON.stringify;

describe("diff", () => {
    test("number", () => {
        expect(stringify(diff({ a: 1 }, { a: -1 }))).toBe(stringify({ a: -1 }));
    });

    test("string", () => {
        expect(stringify(diff({ a: 1 }, { a: "1" }))).toBe(stringify({ a: "1" }));
    });

    test("boolean", () => {
        expect(stringify(diff({ a: false }, { a: true }))).toBe(stringify({ a: true }));
    });

    test("array", () => {
        expect(stringify(diff({}, { list: [] }))).toBe(stringify({ list: [] }));
        expect(stringify(diff({ list: [] }, { list: [] }))).toBe(stringify({}));
    });

    test("before the object does not exist", () => {
        expect(stringify(diff(undefined, { a: 1 }))).toBe(stringify({ a: 1 }));
        expect(stringify(diff(null, { a: 1 }))).toBe(stringify({ a: 1 }));
        expect(stringify(diff("", { a: 1 }))).toBe(stringify({ a: 1 }));
        expect(stringify(diff(false, { a: 1 }))).toBe(stringify({ a: 1 }));
        expect(stringify(diff(0, { a: 1 }))).toBe(stringify({ a: 1 }));
        expect(stringify(diff("", { a: 1 }))).toBe(stringify({ a: 1 }));
        expect(stringify(diff({}, { a: 1 }))).toBe(stringify({ a: 1 }));
    });

    test("after the object does not exist", () => {
        expect(stringify(diff({ a: 1 }, undefined))).toBe(stringify({}));
        expect(stringify(diff({ a: 1 }, null))).toBe(stringify({}));
        expect(stringify(diff({ a: 1 }, ""))).toBe(stringify({}));
        expect(stringify(diff({ a: 1 }, false))).toBe(stringify({}));
        expect(stringify(diff({ a: 1 }, 0))).toBe(stringify({}));
        expect(stringify(diff({ a: 1 }))).toBe(stringify({}));
        expect(stringify(diff({ a: 1 }, {}))).toBe(stringify({}));
    });

    test("object with depth", () => {
        let before = {
            list: [
                {
                    a: 1,
                    b: 2,
                    c: [5, 5, 1],
                },
            ],
            user: {
                avatar: "",
                id: "",
            },
        };

        let after = {
            list: [
                {
                    a: "1",
                    b: 3,
                    c: [5, 4, 1],
                },
            ],
            user: {
                avatar: "123",
                id: "1",
            },
        };

        let res = {
            "list[0].a": "1",
            "list[0].b": 3,
            "list[0].c[1]": 4,
            "user.avatar": "123",
            "user.id": "1",
        };

        let diff_res = diff(before, after);
        expect(stringify(diff_res)).toBe(stringify(res));
    });

    test("the value of the target object is undefined", () => {
        expect(stringify(diff({ a: 1 }, { a: undefined }))).toBe(stringify({}));
        expect(stringify(diff({ a: 1 }, { a: "undefined" }))).toBe(stringify({ a: "undefined" }));
    });
});
