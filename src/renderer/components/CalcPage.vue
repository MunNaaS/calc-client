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
        <button @click="load">load</button>
    </div>
  </main>
</template>

<script>
import c from '@/utils/calc'
import fs from 'fs'
export default {
  name: 'calc-page',
  data () {
    return {
      a: '',
      b: '',
      r: '',
      result: {}
    }
  },
  methods: {
    calc (o) {
      let x = c(this.a, this.b, o)
      this.r = `${x.input.a} ${x.operator} ${x.input.b} = ${x.result}`
      this.result = x
    },
    load () {
      this.localLoad()
    },
    localLoad () {
      this.$electron.remote.dialog.showOpenDialog({
        filters: [
          {name: 'JSON Files (*.json)', extensions: ['json']},
          {name: 'All Files (*.*)', extensions: ['*']}
        ]
      },
      (filePaths) => {
        // filePaths is an array that contains all the selected
        if (filePaths === undefined) {
          console.log('No file selected')
          return
        }

        fs.readFile(filePaths[0], 'utf-8', (err, data) => {
          if (err) {
            alert('An error ocurred reading the file :' + err.message)
            return
          }

          data = JSON.parse(data)
          this.a = data.input.a
          this.b = data.input.b
          this.r = `${data.input.a} ${data.operator} ${data.input.b} = ${data.result}`
          this.result = data.result
        })
      })
    },
    save () {
      this.localStore()
    },
    localStore () {
      let result = JSON.stringify(this.result)
      console.log(result)
      this.$electron.remote.dialog.showSaveDialog((fileName) => {
        if (fileName === undefined) {
          console.log("You didn't save the file")
          return
        }
        // fileName is a string that contains the path and filename created in the save file dialog.
        fs.writeFile(fileName, result, (err) => {
          if (err) {
            alert('An error ocurred creating the file ' + err.message)
          }

          alert('The file has been succesfully saved')
        })
      })
    }
  }
}
</script>

