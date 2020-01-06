<template>
    <div id="home">
        <img class="bg" :src="bg" />
        <div class="tostart" @click="tostart">
            <img :src="toStart" />
        </div>
        <div class="loginInfoBox">
            <!--<div class="float yearBg">
                <img :src="yearBg" />
            </div>
            <div class="float line"></div>
            <div class="float info">
                <div class="list">
                    <div>年会</div>
                    <div>现场抽奖</div>
                </div>
                <div class="name">{{lotteries ? lotteries.data.name : ""}}</div>
            </div>-->
            <div class="name">{{lotteries ? lotteries.data.name : ""}}</div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import bg from '../../public/img/background.png'
import toStart from '../../public/img/start_btn.png'

export default {
    name: "home",
    data() {
        return {
            bg, toStart
        }
    },
    components: { },
    methods: {
        tostart() {
            this.$emit("start")
        }
    },
    computed: {
        ...mapGetters("lucky", {
            lotteries: "lotteries"
        })
    }
}
</script>

<style scoped>
#home {
    position: absolute;
    width: 100%;
    height: 100%;
}
.bg {
    width: 100%;
    height: 100%;
}
.tostart {
    position: absolute;
    width: 200px;
    height: auto;
    bottom: 100px;
    right: 100px;
    cursor: pointer;
}
.tostart img {
    width: 100%;
    height: auto;
}
/* .loginInfoBox {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 20%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -90%);
    font-size: 24px;
    color: #fcd731;
}*/

.loginInfoBox {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -90%);
    font-size: 40px;
    color: #fcd731;  
}

/*.yearBg {
    width: 200px;
    height: auto;
}
.yearBg img {
    width: 100%;
    height: auto;
}
.line {
    width: 4px;
    height: 100%;
    background: #fcd731;
    margin: 0 40px;
}
.info {
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
.info .name {
    font-size: 36px;
}*/
</style>