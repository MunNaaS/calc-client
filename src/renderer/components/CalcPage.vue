<template>
  <main>
    <div>
        A : <input v-model="a"> <br>
        B : <input v-model="b"> <br>
        <button @click="calc('+')">+</button>
        <button @click="calc('-')">-</button>
        <button @click="calc('*')">x</button>
        <button @click="calc('/')">/</button>
        <button @click="calc('^')">Pow</button> <br>
        Result : <input :value="r" readonly> <br>
        <button @click="save">save</button>
    </div>
  </main>
</template>

<script>
import c from '@/utils/calc'
export default {
  name: 'calc-page',
  data () {
    return {
      a: 0,
      b: 0,
      r: 0,
      result: {}
    }
  },
  methods: {
    calc (o) {
      let x = c(this.a, this.b, o)
      this.r = `${x.input.a} ${x.operator} ${x.input.b} = ${x.result}`
      this.result = x
    },
    save () {
      this.store()
    },
    store () {
      this.$db.insert(this.result, function (err, result) {
        if (err) {
          console.error(err)
        }
        console.log(this.$db.filename)
      })
    }
  }
}
</script>

