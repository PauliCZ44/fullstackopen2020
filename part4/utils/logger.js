const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {  //in tests dont show logger info
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}