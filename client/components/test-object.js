
export const assert = {
  typeOf: {
    func(msg, actual, expected) {
      if (actual === expected) return msg;
      return `${msg}, Expected ${actual} to be a type of ${expected}`;
    },
    args: ['actual', 'expected'],
    pre: 'typeof ',
  },
  equal: {
    func(msg, actual, expected) {
      if (actual == expected) return msg;
      return `${msg}, Expected ${actual} to equal ${expected}`;
    },
    args: ['actual', 'expected'],
  },
  strictEqual: {
    func(msg, actual, expected) {
      if (actual === expected) return msg;
      return `${msg}, Expected ${actual} to strictly equal ${expected}`;
    },
    args: ['actual', 'expected'],
  },
  isTrue: {
    func(msg, actual) {
      if (actual === 'true') return msg;
      return `${msg}, Expected ${actual} to be true`;
    },
    args: ['actual'],
  },
  isFalse: {
    func(msg, actual) {
      if (actual === 'false') return msg;
      return `${msg}, Expected ${actual} to be false`;
    },
    args: ['actual'],
  },
  isNull: {
    func(msg, actual) {
      if (actual === 'null') return msg;
      return `${msg}, Expected ${actual} to be null`;
    },
    args: ['actual'],
  },
  isNotNull: {
    func(msg, actual) {
      if (actual !== 'null') return msg;
      return `${msg}, Expected ${actual} to not be null`;
    },
    args: ['actual'],
  },
  isUndefined: {
    func(msg, actual) {
      if (actual === 'undefined') return msg;
      return `${msg}, Expected ${actual} to be undefined`;
    },
    args: ['actual'],
  },
  isNotUndefined: {
    func(msg, actual) {
      if (actual !== 'undefined') return msg;
      return `${msg}, Expected ${actual} to not be undefined`;
    },
    args: ['actual'],
  },
  isArray: {
    func(msg, actual) {
      if (actual === 'true') return msg;
      return `${msg}, Expected ${actual} to be an array`;
    },
    args: ['actual'],
    pre: 'Array.isArray(',
    post: ')'
  },
  isObject: {
    func(msg, actual) {
      if (actual === "'object'") return msg;
      return `${msg}, Expected ${actual} to be an object`;
    },
    args: ['actual'],
    pre: 'typeof '
  },
  isFunction: {
    func(msg, actual) {
      if (actual == "'function'") return msg;
      return `${msg}, Expected ${actual} to be a function`;
    },
    args: ['actual'],
    pre: 'typeof '
  },
  // closeTo: {
  //   func(msg, actual, expected, delta) {
  //     if (actual === expected) return msg;
  //     else if (actual < expected && actual + delta >= expected) return msg;
  //     else if (actual > expected && actual + delta <= expected) return msg;
  //     return `${msg}, Expected ${actual} to be close to ${expected}`;
  //   },
  //   args: ['actual', 'expected', 'delta'],
  // },
  isString: {
    func(msg, actual) {
      if (actual === "'string'") return msg;
      return `${msg}, Expected ${actual} to be a string`;
    },
    args: ['actual'],
    pre: 'typeof '
  },
  isNumber: {
    func(msg, actual) {
      if (actual === "'number'") return msg;
      return `${msg}, Expected ${actual} to be a number`;
    },
    args: ['actual'],
    pre: 'typeof '
  },
  isBoolean: {
    func(msg, actual) {
      if (actual === "'boolean'") return msg;
      return `${msg}, Expected ${actual} to be a boolean`;
    },
    args: ['actual'],
    pre: 'typeof '
  },
  include: {
    func(msg, actual, searchTerm) {
      if ((actual.slice(0, 1) === "'" && actual.slice(-1) === "'") || (actual.slice(0, 1) === '[' && actual.slice(-1) === ']')){
        if (searchTerm.slice(0, 1) === "'" && searchTerm.slice(-1) === "'") searchTerm = searchTerm.slice(1, -1)
        if (actual.includes(searchTerm)) return msg;
      }

      return `${msg}, Expected ${actual} to include ${searchTerm}`;
    },
    args: ['actual', 'search term'],
  },
  notInclude: {
    func(msg, actual, searchTerm) {
      if ((actual.slice(0, 1) === "'" && actual.slice(-1) === "'") || (actual.slice(0, 1) === '[' && actual.slice(-1) === ']')){
        if (searchTerm.slice(0, 1) === "'" && searchTerm.slice(-1) === "'") searchTerm = searchTerm.slice(1, -1)
        if (!actual.includes(searchTerm)) return msg;
      }

      return `${msg}, Expected ${actual} to not include ${searchTerm}`;
    },
    args: ['actual', 'searchTerm'],
  },
  // match: {
  //   func(msg, value, regexp) {
  //     if (value.match(regexp)) {
  //       return msg;
  //     }
  //     return `${msg}, Expected ${value} to match ${regexp}`;
  //   },
  //   args: ['value', 'regexp'],
  // },
  // property: {
  //   func(msg, object, prop) {
  //     if (object.hasOwnProperty(prop)) {
  //       return msg;
  //     }
  //     return `${msg}, Expected ${object} to have the property ${prop}`;
  //   },
  //   args: ['object', 'property'],
  // },
  lengthOf: {
    func(msg, actual, len) {
      if (actual.slice(0, 1) === "'" && actual.slice(-1) === "'"){
        console.log('here')
        actual = actual.slice(1, -1)
        console.log(actual)
        if (actual.length === Number(len)) {
          console.log('actual')
          return msg;
        }
      }
      if (actual.slice(0, 1) === '[' && actual.slice(-1) === ']'){
        actual = actual.slice(1, -1)
        actual = actual.split(',')
        if (actual.length === Number(len)) {
          return msg;
        }
      }

      return `${msg}, Expected ${actual} to have a length of ${len}`;
    },
    args: ['actual', 'length'],
  },
  isOk: {
    func(msg, actual) {
      if (actual==='true') return msg;
      return `${msg}, Expected ${actual} to be ok (truthy)`;
    },
    args: ['actual'],
    pre: 'Boolean(',
    post: ')'
  },
  isNotOk: {
    func(msg, actual) {
      if (actual==='false') return msg;
      return `${msg}, Expected ${actual} to not be ok (falsey)`;
    },
    args: ['actual'],
    pre: 'Boolean(',
    post: ')'
  },
  // propertyVal: {
  //   func(msg, object, property, value) {
  //     if (object[property] === value) return msg;
  //     return `${msg}, Expected ${object} to have a property of ${property}, with a value of ${value}`;
  //   },
  //   args: ['object', 'property', 'value'],
  // },
  // instanceOf: {
  //   func(msg, instance, con) {
  //     if (instance) return msg;
  //     return `${msg}, Expected ${instance} to be an instance of ${con}`;
  //   },
  //   args: ['instance', 'con'],
  // },
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
      return checkBool ? msg : `${msg}, Expected ${val1} ${operation} ${val2} to be true`;
    },
    args: ['value 1', 'operator', 'value 2'],
  },
};
