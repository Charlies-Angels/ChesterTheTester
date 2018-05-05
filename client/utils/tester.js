

export const it = (msg) => {
  return (test) => {
    return (args) => {
      return test(msg, ...args)
    }
  }
}

// let test = it('launchRocket should be a function')(assert.typeof.func)(launchRocket, 'function')
