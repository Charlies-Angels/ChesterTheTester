
const assert = {
  include(msg, haystack, needle) {
    if (Array.isArray(haystack) || typeof haystack === 'string' ) {
      if (haystack.includes(needle)) return msg;
    }
    else if (typeof haystack === 'object' && haystack.hasOwnProperty(needle)) return msg;
    else return 'ERROR YOU SUCK'
  },
  notInclude(msg, haystack, needle) {
    if (Array.isArray(haystack) || typeof haystack === 'string' ) {
      if (!haystack.includes(needle)) return msg;
    }
    else if (typeof haystack === 'object' && !(haystack.hasOwnProperty(needle))) return msg;
    else return 'ERROR YOU SUCK'
  },
}
