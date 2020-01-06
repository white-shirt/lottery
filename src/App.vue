<template>
  <div id="app">
    <div class="noticeBox">
        <notice></notice>
    </div>
    <!--<div class="exit" @click="exit">退出</div>-->
    <div class="fullScreen" @click="fullScreen"><img v-if="!fullScreenStatus" :src="fullScreenIcon" /><img v-if="fullScreenStatus" :src="exitfullscreenIcon" /></div>
    <home v-if="!start_status" v-on:start="tostart"></home>
    <start v-if="start_status"></start>
    <div class="loginBox" v-if="LoginBoxState">
      <login></login>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import home from './components/home.vue'
import start from './components/start.vue'
import login from './components/login.vue'
import notice from './components/notice.vue'

import fullScreenIcon from '../public/img/fullscreen.png'
import exitfullscreenIcon from '../public/img/exitfullscreen.png'


export default {
  name: 'app',
  data() {
    return {
      start_status: false,
      LoginBoxState: true,
      fullScreenIcon,
      exitfullscreenIcon,
      fullScreenStatus: false
    }
  },
  components: { home, start, login, notice },
  methods: {
    tostart() {
      this.start_status = true;
    },
    fullScreen() {
        let element = document.documentElement;
        // 判断是否已经是全屏
        // 如果是全屏，退出
        if (this.fullScreenStatus) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {    // 否则，进入全屏
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        // 改变当前全屏状态
        this.fullScreenStatus = !this.fullScreenStatus;
    }
    // exit() {
    //   //删除cookie
    //   let cookies = document.cookie.split(";");
    //   for (let i = 0; i < cookies.length; i++) {
    //     let cookie = cookies[i];
    //     let eqPos = cookie.indexOf("=");
    //     let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    //   }
    //   if(cookies.length > 0) {
    //     for (let i = 0; i < cookies.length; i++) {
    //       let cookie = cookies[i];
    //       let eqPos = cookie.indexOf("=");
    //       let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //       let domain = location.host.substr(location.host.indexOf('.'));
    //       document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
    //     }
    //   }
    // }
  },
  created() {
    let localLoginState = this.loginState;
    if (localLoginState["loginState"] == false || localLoginState["expire"] < new Date().getTime()) {
      this.start_status = false;
    } else if (localLoginState["path"] == window.location.search &&localLoginState["loginState"] == true && localLoginState["expire"] > new Date().getTime()) {
      this.start_status = true;
      this.$store.dispatch("lucky/get_lottery");
      this.$store.dispatch("lucky/get_members");
    }
  },
  mounted() {
    
  },
  computed: {
    ...mapGetters("lucky", {
      lotteries: "lotteries"
    }),
    ...mapGetters("lucky", {
      loginState: "loginState"
    }),
    ...mapGetters("lucky", {
      loginState: "loginState"
    })
  },
  watch: {
    loginState: {
      handler(val) {
        if (val && val["path"] == window.location.search && val["loginState"] == true && val["expire"] > new Date().getTime()) {
          this.LoginBoxState = false;
        }
      },
      deep: true,
      immediate: true
    }   
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html, body {
  position: relative;
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 800px;
  -moz-user-select:none;/*火狐*/
  -webkit-user-select:none;/*webkit浏览器*/
  -ms-user-select:none;/*IE10*/
  -khtml-user-select:none;/*早期浏览器*/
  user-select:none;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  background: #eee;
}
.noticeBox {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}
.tostart {
  position: absolute;
  bottom: 100px;
  right: 200px;
}
.loginBox {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.15);
}
.exit {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  top: 80px;
  right: 80px;
  font-size: 12px;
  color: #fcd731;
  border: 2px solid #fcd731;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 6;
  background: rgba(0, 0, 0, 0.96);
}
.fullScreen {
  display: table-cell;
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  top: 50px;
  right: 50px;
  font-size: 0;
  cursor: pointer;
  z-index: 6;
  background: rgba(0, 0, 0, 0.6);
}
.fullScreen img {
  display: inline-block;
  width: 60%;
  height: auto;
  vertical-align: middle;
}

</style>
