/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
    return s.split('').reduce((sum, char, index) => sum + (char.charCodeAt(0) - 64) * (26 ** (s.length - 1 - index)), 0)
};