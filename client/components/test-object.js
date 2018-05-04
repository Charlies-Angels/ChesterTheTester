
 const assert = {
  equal: (msg, actual, expected) => {
      if (actual === expected) {return msg}
      else { return `Expected ${expected} to equal ${actual} YOU WRONG`}
  },
  strictEqual: (msg, actual, expected) => {
      if (actual === expected) { return msg }
      else { return `Expected ${expected} to strictly equal ${actual} YOU WRONG`}
  },
  isTrue: (msg, actual) => {
      if (actual) {return msg}
      else { return `Expected ${actual} to be True`}
  },
  isFalse: (msg, actual) => {
      if (!actual) {return msg}
      else { return `Expected ${actual} to be False`}
  },
  isNull: (msg, actual) => {
      if (actual === null) {return msg}
      else { return `Expected ${actual} to be null`}
  },
  isNotNull: (msg, actual) => {
      if (actual !== null) {return msg}
      else { return `Expected ${actual} to be not null`}
  },
  isUndefined: (msg, actual) => {
      if (actual === undefined) {return msg}
      else { return `Expected ${actual} to be undefined`}
  },
  isNotUndefined: (msg, actual) => {
      if (actual !== undefined) {return msg}
      else { return `Expected ${actual} to be not undefined`}
  },
  isArray: (msg, actual) => {
    if (actual.isArray) {return msg}
    else { return `Expected ${actual} to be an array`}
  },
  isObject: (msg, actual) => {
    if (typeof actual == 'object') {return msg}
    else {
      return `Expected ${actual} to be a object`
    }
  },
  isFunction: (msg, actual) => {
    if (typeof actual == 'function') {return msg}
    else {
      return `Expected ${actual} to be a function`
    }
  },
  closeTo: (msg, actual, expected, delta) => {
    if ( actual === expected) {return msg}
    else if ( actual < expected && (actual + delta) >= expected) {return msg}
    else if ( actual > expected && (actual + delta) <= expected) {return msg}
    else {return `Expected ${actual} to be close to ${expected}`}
  },
  isString: (msg, actual) => {
    if (typeof actual === 'string' ) return msg;
    else return `Expected ${actual} to be a string, WRONG`
  },
  isNumber: (msg, actual) => {
  if (typeof actual === 'number' ) return msg;
  else return `Expected ${actual} to be a number, WRONG`
  },
  isBoolean: (msg, actual) => {
  if (typeof actual === 'boolean' ) return msg;
  else return `Expected ${actual} to be a boolean, WRONG`
  },
};
