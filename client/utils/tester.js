

export const it = (msg) => {
  return (test) => {
    return (...args) => {
      return test.func(msg, ...args)
    }
  }
}

// let tests = []
// tests.push(it('launchRocket should be a function')(assert.typeOf)(launchRocket, 'function'))
// tests.push(it('launchRocket should return an array')(assert.isArray)('hi'))
