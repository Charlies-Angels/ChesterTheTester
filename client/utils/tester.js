const it = (msg) => {
  return (test) => {
    return (actual, expected) => {
      return test(msg, actual, expected)
    }
  }
}

const assert = {
  'typeof': (msg, actual, expected) => {
    return typeof actual === expected ? msg : 'ERROR YOU SUCK'
  },
}
let test = it('launchRocket should be a function')(assert.typeof)(launchRocket, 'function')



/******* Should be edited to remove example eventually... Holding onto it for now k******/
