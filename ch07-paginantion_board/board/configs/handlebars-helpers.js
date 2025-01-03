module.exports = {
    // Handlebars helper functions
    lengthOfList: (list = []) => list.length,
    eq: (val1, val2) => val1 === val2,
    dateString:(isoString) => new Date(isoString).toLocaleString(),
};