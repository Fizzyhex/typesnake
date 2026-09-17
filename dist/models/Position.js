"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pos_add = pos_add;
exports.pos_subtract = pos_subtract;
exports.pos_equals = pos_equals;
exports.pos_hash = pos_hash;
exports.pos_fromHash = pos_fromHash;
function pos_add(left, right) {
    return {
        x: left.x + right.x,
        y: left.y + right.y,
    };
}
function pos_subtract(left, right) {
    return {
        x: left.x - right.x,
        y: left.y - right.y,
    };
}
function pos_equals(left, right) {
    return left.x === right.x && left.y === right.y;
}
function pos_hash(pos) {
    return `${pos.x},${pos.y}`;
}
function pos_fromHash(hash) {
    const separator = hash.indexOf(",");
    return {
        x: Number(hash.slice(0, separator)),
        y: Number(hash.slice(separator + 1)),
    };
}
