module.exports = function (a, b, o) {
  a = Number(a)
  b = Number(b)
  let output = {
    input: {
      a: a,
      b: b
    },
    operator: o,
    result: 0
  }
  switch (o) {
    case '+':
      output.result = a + b
      break

    case '-':
      output.result = a - b
      break

    case '*':
      output.result = a * b
      break

    case '/':
      output.result = a / b
      break

    case '^':
      output.result = Math.pow(a, b)
      break

    default:
      console.error('Operator not match.')
      output.isError = true
      output.result = 'Operator not match.'
      break
  }
  return output
}
