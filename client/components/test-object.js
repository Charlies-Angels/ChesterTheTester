
 export const assert = {
  equal(msg, [actual, expected]) {
      if (actual === expected) {return msg}
      else { return `Expected ${expected} to equal ${actual} YOU WRONG`}
  },
  strictEqual(msg, [actual, expected]) {
      if (actual === expected) { return msg }
      else { return `Expected ${expected} to strictly equal ${actual} YOU WRONG`}
  },
  isTrue(msg, [actual]) {
      if (actual) {return msg}
      else { return `Expected ${actual} to be True`}
  },
  isFalse(msg, [actual]) {
      if (!actual) {return msg}
      else { return `Expected ${actual} to be False`}
  },
  isNull(msg, [actual]) {
      if (actual === null) {return msg}
      else { return `Expected ${actual} to be null`}
  },
  isNotNull(msg, [actual]) {
      if (actual !== null) {return msg}
      else { return `Expected ${actual} to be not null`}
  },
  isUndefined(msg, [actual]) {
      if (actual === undefined) {return msg}
      else { return `Expected ${actual} to be undefined`}
  },
  isNotUndefined(msg, [actual]) {
      if (actual !== undefined) {return msg}
      else { return `Expected ${actual} to be not undefined`}
  },
  isArray(msg, [actual]) {
    if (actual.isArray) {return msg}
    else { return `Expected ${actual} to be an array`}
  },
  isObject(msg, [actual]) {
    if (typeof actual == 'object') {return msg}
    else {
      return `Expected ${actual} to be a object`
    }
  },
  isFunction(msg, [actual]) {
    if (typeof actual == 'function') {return msg}
    else {
      return `Expected ${actual} to be a function`
    }
  },
  closeTo(msg, [actual, expected, delta]) {
    if ( actual === expected) {return msg}
    else if ( actual < expected && (actual + delta) >= expected) {return msg}
    else if ( actual > expected && (actual + delta) <= expected) {return msg}
    else {return `Expected ${actual} to be close to ${expected}`}
  },
  isString(msg, [actual]) {
    if (typeof actual === 'string' ) return msg;
    else return `Expected ${actual} to be a string, WRONG`
  },
  isNumber(msg, [actual]) {
  if (typeof actual === 'number' ) return msg;
  else return `Expected ${actual} to be a number, WRONG`
  },
  isBoolean(msg, [actual]) {
  if (typeof actual === 'boolean' ) return msg;
  else return `Expected ${actual} to be a boolean, WRONG`
  },
  include(msg, [haystack, needle]) {
    if (Array.isArray(haystack) || typeof haystack === 'string' ) {
      if (haystack.includes(needle)) return msg;
    }
    else if (typeof haystack === 'object' && haystack.hasOwnProperty(needle)) {return msg}
    return 'ERROR YOU SUCK'
  },
  notInclude(msg, [haystack, needle]) {
    if (Array.isArray(haystack) || typeof haystack === 'string' ) {
      if (!haystack.includes(needle)) {return msg}
    }
    else if (typeof haystack === 'object' && !(haystack.hasOwnProperty(needle))) {return msg}
    return 'ERROR YOU SUCK'
  },
  match(msg, [value, regex]) {
    if (value.match(regex)) {return msg}
    return 'ERROR YOU SUCK'
  },
  property(msg, [object, prop]) {
    if (object.hasOwnProperty(prop)) {return msg}
    return 'ERROR YOU SUCK'
  },
  lengthOf(msg, [input, len]) {
    if (Array.isArray(input) || typeof input === 'string' ) {
      if (input.length === len) {return msg}
    }
    else if (typeof haystack === 'object' && (Object.keys(input).length === len)) {return msg}
    return 'ERROR YOU SUCK'
  },
  isOk(msg, [input]) {
    if (input) return msg;
    return 'ERROR YOU SUCK'
  },
  isNotOk(msg, [input]) {
    if (!input) return msg;
    return 'ERROR YOU SUCK'
  },
  propertyVal(msg, [object, property, value]) {
    if (object[property] === value) return msg;
    return 'ERROR YOU SUCK'
  },
  instanceOf(msg, [child, parent]) {
    if (child instanceof parent) return msg;
    return 'ERROR YOU SUCK'
  },
  operator(msg, [val1, operation, val2]) {
    let checkBool = null;
    switch (operation) {
      case '<':
        checkBool = val1 < val2;
        break;
      case '>':
        checkBool = val1 < val2;
        break;
      case '==':
        checkBool = val1 == val2;
        break;
      case '===':
        checkBool = val1 === val2;
        break;
      case '!=':
        checkBool = val1 != val2;
        break;
      case '!==':
        checkBool = val1 !== val2;
        break;
      default:
        checkBool = false;
    }
    return checkBool ? msg : 'ERROR YOU SUCK'
  }
};