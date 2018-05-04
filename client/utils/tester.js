export const it = (msg) => {
  return (test) => {
    return (args) => {
      const allArgs= [...args]
      return test(msg, allArgs)
    }
  }
}

// let test = it('launchRocket should be a function')(assert.typeof)(launchRocket, 'function')
