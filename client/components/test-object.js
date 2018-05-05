export const assert = {
  typeOf: {
    func(msg, actual, expected) {
      if (typeof actual === expected) return msg;
      return 'YOU WRONG';
    },
    args: ['actual', 'expected'],
  },
  equal: {
    func(msg, actual, expected) {
      if (actual === expected) return msg;
      return `Expected ${expected} to equal ${actual} YOU WRONG`;
    },
    args: ['actual', 'expected'],
  },
  strictEqual: {
    func(msg, actual, expected) {
      if (actual === expected) return msg;
      return `Expected ${expected} to strictly equal ${actual} YOU WRONG`;
    },
    args: ['actual', 'expected'],
  },
  isTrue: {
    func(msg, actual) {
      if (actual === true) return msg;
      return `Expected ${actual} to be True`;
    },
    args: ['actual'],
  },
  isFalse: {
    func(msg, actual) {
      if (actual === false) return msg;
      return `Expected ${actual} to be False`;
    },
    args: ['actual'],
  },
  isNull: {
    func(msg, actual) {
      if (actual === null) return msg;
      return `Expected ${actual} to be null`;
    },
    args: ['actual'],
  },
  isNotNull: {
    func(msg, actual) {
      if (actual !== null) return msg;
      return `Expected ${actual} to be not null`;
    },
    args: ['actual'],
  },
  isUndefined: {
    func(msg, actual) {
      if (actual === undefined) return msg;
      return `Expected ${actual} to be undefined`;
    },
    args: ['actual'],
  },
  isNotUndefined: {
    func(msg, actual) {
      if (actual !== undefined) return msg;
      return `Expected ${actual} to be not undefined`;
    },
    args: ['actual'],
  },
  isArray: {
    func(msg, actual) {
      if (actual.isArray) return msg;
      return `Expected ${actual} to be an array`;
    },
    args: ['actual'],
  },
  isObject: {
    func(msg, actual) {
      if (typeof actual == 'object') return msg;
      return `Expected ${actual} to be a object`;
    },
    args: ['actual'],
  },
  isFunction: {
    func(msg, actual) {
      if (typeof actual == 'function') return msg;
      return `Expected ${actual} to be a function`;
    },
    args: ['actual'],
  },
  closeTo: {
    func(msg, actual, expected, delta) {
      if (actual === expected) return msg;
      else if (actual < expected && actual + delta >= expected) return msg;
      else if (actual > expected && actual + delta <= expected) return msg;
      return `Expected ${actual} to be close to ${expected}`;
    },
    args: ['actual', 'expected', 'delta'],
  },
  isString: {
    func(msg, actual) {
      if (typeof actual === 'string') return msg;
      return `Expected ${actual} to be a string, WRONG`;
    },
    args: ['actual'],
  },
  isNumber: {
    func(msg, actual) {
      if (typeof actual === 'number') return msg;
      return `Expected ${actual} to be a number, WRONG`;
    },
    args: ['actual'],
  },
  isBoolean: {
    func(msg, actual) {
      if (typeof actual === 'boolean') return msg;
      return `Expected ${actual} to be a boolean, WRONG`;
    },
    args: ['actual'],
  },
  include: {
    func(msg, actual, searchTerm) {
      if (Array.isArray(actual) || typeof actual === 'string') {
        if (actual.includes(searchTerm)) return msg;
      }
      else if (typeof actual === 'object'
      && actual.hasOwnProperty(searchTerm)) {
        return msg;
      }
      return 'ERROR YOU SUCK';
    },
    args: ['actual', 'search term'],
  },
  notInclude: {
    func(msg, actual, searchTerm) {
      if (Array.isArray(actual) || typeof actual === 'string') {
        if (!actual.includes(searchTerm)) {
          return msg;
        }
      } else if (
        typeof actual === 'object' &&
        !actual.hasOwnProperty(searchTerm)
      ) {
        return msg;
      }
      return 'ERROR YOU SUCK';
    },
    args: ['actual, searchTerm'],
  },
  match: {
    func(msg, value, regexp) {
      if (value.match(regexp)) {
        return msg;
      }
      return 'ERROR YOU SUCK';
    },
    args: ['value, regexp'],
  },
  property: {
    func(msg, object, prop) {
      if (object.hasOwnProperty(prop)) {
        return msg;
      }
      return 'ERROR YOU SUCK';
    },
    args: ['object', 'property'],
  },
  lengthOf: {
    func(msg, actual, len) {
      if (Array.isArray(actual) || typeof actual === 'string') {
        if (actual.length === len) {
          return msg;
        }
      } else if (
        typeof actual === 'object' &&
        Object.keys(actual).length === len
      ) {
        return msg;
      }
      return 'ERROR YOU SUCK';
    },
    args: ['actual', 'length'],
  },
  isOk: {
    func(msg, actual) {
      if (actual) return msg;
      return 'ERROR YOU SUCK';
    },
    args: ['actual'],
  },
  isNotOk: {
    func(msg, actual) {
      if (!actual) return msg;
      return 'ERROR YOU SUCK';
    },
    args: ['actual'],
  },
  propertyVal: {
    func(msg, object, property, value) {
      if (object[property] === value) return msg;
      return 'ERROR YOU SUCK';
    },
    args: ['object', 'property', 'value'],
  },
  instanceOf: {
    func(msg, instance, constructor) {
      if (instance instanceof constructor) return msg;
      return 'ERROR YOU SUCK';
    },
    args: ['instance', 'constructor'],
  },
  operator: {
    func(msg, val1, operation, val2) {
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
      return checkBool ? msg : 'ERROR YOU SUCK';
    },
    args: ['value 1', 'operator', 'value 2'],
  },
};

