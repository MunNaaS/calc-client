// import Vue from 'vue'
// import CalcPage from '@/components/CalcPage'
import c from '@/utils/calc'

// describe('CalcPage.vue', () => {
//   it('should render correct contents', () => {
//     const vm = new Vue({
//       el: document.createElement('div'),
//       render: h => h(CalcPage)
//     }).$mount()

//     expect().to.contain()
//   })
// })

describe('calc.js', () => {
  let a = 5
  let b = 3

  it('plus', () => {
    let r = c(a, b, '+')
    expect(r).to.have.property('result').with.equal(a + b)
  })

  it('minus', () => {
    let r = c(a, b, '-')
    expect(r).to.have.property('result').with.equal(a - b)
  })

  it('multiply', () => {
    let r = c(a, b, '*')
    expect(r).to.have.property('result').with.equal(a * b)
  })

  it('divide', () => {
    let r = c(a, b, '/')
    expect(r).to.have.property('result').with.equal(a / b)
  })

  it('power', () => {
    let r = c(a, b, '^')
    expect(r).to.have.property('result').with.equal(Math.pow(a, b))
  })

  it('operator not match', () => {
    let r = c(a, b, 'pow')
    expect(r).to.have.property('isError').with.equal(true)
    expect(r).to.have.property('result').with.equal('Operator not match.')
  })
})
