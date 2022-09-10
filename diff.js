const ArrayWrapper = ["[", "]"];
const ObjectWrapper = [".", ""];

function diff(before, after) {
    if (!isObject(before)) return after;
    if (!isObject(after)) return {};
    let res = {};
    let iter = function (beforeData, afterData, path, wrapper = ["", ""]) {
        for (let i in afterData) {
            let targetPath = path + wrapper[0] + i + wrapper[1];
            if (beforeData[i] === undefined || beforeData[i] === null) {
                res[targetPath] = afterData[i];
                continue;
            }
            let beforeType = type(beforeData[i]);
            let afterType = type(afterData[i]);
            if (beforeType !== afterType) {
                res[targetPath] = afterData[i];
                continue;
            }

            switch (afterType) {
                case "number":
                case "string":
                case "boolean":
                    if (beforeData[i] === afterData[i]) continue;
                    else res[targetPath] = afterData[i];
                    break;
                case "array":
                    if (beforeData[i].length === 0 && afterData[i].length > 0) res[targetPath] = afterData[i];
                    else iter(beforeData[i], afterData[i], targetPath, ArrayWrapper);
                    break;
                case "object":
                    iter(beforeData[i], afterData[i], targetPath, ObjectWrapper);
                    break;
                case "undefined":
                case "null":
                    break;
                default:
                    console.warn("undefined type");
                    if (beforeData[i] === afterData[i]) continue;
                    else res[targetPath] = afterData[i];
                    break;
            }
        }
    };

    iter(before, after, "", ["", ""]);

    return res;
}

function type(val) {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
}

function isObject(val) {
    return type(val) === "object";
}

module.exports = diff;
