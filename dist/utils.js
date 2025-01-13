"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = void 0;
const generateHash = (len) => {
    const s = 'nycikgerabxahsmhzbfjolqrp47452960318';
    let ans = '';
    for (let i = 0; i < len; i++) {
        ans = ans + s[Math.floor(Math.random() * s.length)];
    }
    return ans;
};
exports.generateHash = generateHash;
