<template>
  <div class="ys-verification">
    <div class="msg">{{msg}}</div>
    <div class="InputBox">
        <div class="input-wrapper" v-for="item in amount" :key="item">
            <input type="password"  @paste="handlePaste" title="code" v-focus="(item - 1) === currentIndex" maxlength="1" @input="handleInput($event,(item-1))" @keyup.delete="onDelete($event,(item-1))"  v-model="code[item-1]">
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'VerificationCodeInput',
  props: {
    amount: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      code: [],
      currentIndex: 0,
      msg: "请输入安全口令"
    }
  },
  directives: {
    focus: {
      componentUpdated: function (el, obj) {
        obj.value && el.focus()
      }
    }
  },
  created () {
    this.code = new Array(this.amount).fill('')
  },
  methods: {
    handleInput (e, index) {
      this.currentIndex = index
      e.target.value = this.validateNumber(e.target.value)
      e.target.value !== '' && ++this.currentIndex
      !this.code.includes('') && this.$emit('onCompleted', this.code.join(''))
    },
    onDelete (e, index) {
      if (e.target.value === '') {
        this.currentIndex = index - 1
      }
    },
    validateNumber (val) {
      return val.replace(/\D/g, '')
    },
    handlePaste (e) {
      e.preventDefault()
    }
  },
  watch: {
      code: {
          handler(val) {
              function checkCode(num) {
                  return num !== "";
              }
              if (val.every(checkCode) ) {
                this.$store.dispatch("lucky/login", val.join(""))
              }
          }
      }
  }
}
</script>

<style scoped>
.ys-verification{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 600px;
    height: 350px;
    padding: 0 100px;
    box-sizing: border-box;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.96);
    overflow: hidden;
}
.InputBox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
    margin-top: 50px;
}
.msg {
  margin: 100px auto 0;
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.input-wrapper {
    position: relative;
    width: 15%;
    height: 60px;
    border-bottom: 1px solid #fcd731;
}
.input-wrapper input {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 30px;
    color: #fcd731;
    background:none;  
    outline:none;  
    border:none;

}
.input-wrapper input:focus {
    border-bottom: 1px solid #fff;
}
.input-wrapper input::-webkit-inner-spin-button {
    appearance: none;
}
</style>