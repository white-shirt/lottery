<template>
    <div id="start">
        <img class="bg" :src="bg" />
        <luckylist v-if="luckyListState" v-on:close="closeLuckyList"></luckylist>
        <div class="lotteryBox" v-show="!luckyListState">
            <div class="curlotteryInfo" v-html="curlotteryInfo"></div>
            <div class="randomBox">
                <div class="Btn" @click="_start">{{start?"停止":"开始"}}</div>
                <div class="randomName">{{randomName}}</div>
            </div>
            <div class="luckiesBox">
                <div class="title">中奖名单</div>
                <div class="luckiesContent">
                    <div class="list" v-for="item in lucky" v-bind:key="item.id">
                        <div class="luckinfo luckName">{{item["name"]}}</div>
                        <div class="luckinfo luckGiftName">{{item["gift_name"]}}</div>
                        <div class="luckinfo luckDepName">{{item["dep_name"]}}</div>
                    </div>
                </div>
                <div class="arrowDown" @click="getAllLucky"><img :src="arrowdown" /></div>
            </div> 
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import luckylist from '../components/luckyList.vue'

import bg from '../../public/img/background.png'
import arrowdown from '../../public/img/arrowdown.png'

export default {
    name: "start",
    data() {
        return {
            start: false,
            bg,
            arrowdown,
            randomName: "",
            timer: null,
            curlotteryInfo: "",
            luckyListState: false
        }
    },
    components: { luckylist },
    methods: {
        _start() {
            if (this.cur_members.length > 0 && this.cur_gifts.length > 0) {
                this.start = !this.start;
                if (this.start) {
                    this.random();
                } else {
                    clearInterval(this.timer);
                    this.pickOne();
                }
            } else if (this.cur_members.length == 0) {
                console.log("没有更多人参与抽奖了～");
                this.luckyListState = true;
                this.$store.dispatch("lucky/updateNoticeMsg", "没有更多人参与抽奖了～");
            } else if (this.cur_gifts.length == 0) {
                console.log("奖品抽完啦～")
                this.luckyListState = true;
                this.$store.dispatch("lucky/updateNoticeMsg", "奖品抽完啦～");
            }
        },
        pickOne() {
            console.log("礼物总数剩余：" + this.totalGift, "参与人数剩余：" +  this.totalMembers)
            let curMembers = this.cur_members;
            let len = curMembers.length;
            let curGifts = this.cur_gifts;
            //选个幸运儿
            let luckyOne = parseInt(Math.random() * len);
            this.randomName = curMembers[luckyOne]["name"];
            this.checkCurGifts(curGifts, luckyOne, curMembers[luckyOne]["name"], curMembers[luckyOne]["dep_name"], curMembers[luckyOne]["id"]);
        },
        checkCurGifts(gifts, luckyOne, luckyName, depName, luckyId) {
            let giftId;
            let giftName;
            for (let i = 0; i < gifts.length; i++) {
                if (gifts[i].count > 0) {
                    --gifts[i].count;
                    giftId = gifts[i].id;
                    giftName = gifts[i].name;
                    break;
                } else {
                    if (i < gifts.length - 1) {
                        if (gifts[i + 1].count > 0) {
                            --gifts[i + 1].count;
                            giftId = gifts[i + 1].id;
                            giftName = gifts[i + 1].name;
                            break;
                        }
                    } else {
                        // console.log("全部奖项已抽完");
                        return;
                    }
                }
            }
            this.$store.dispatch("lucky/put_candidates", {luckyId, giftId, luckyOne, luckyName, depName, gifts, giftName});
        },
        random() {
            let _this = this;
            _this.timer = setInterval(function () {
                let randomIndex = parseInt(Math.random() * _this.cur_members.length);
                _this.randomName = _this.cur_members[randomIndex]["name"];
            }, 100)       
        },
        getAllLucky() {
            this.luckyListState = true;
        },
        closeLuckyList() {
            this.luckyListState = false;
        }
    },
    created() {
        
    },
    computed: {
        ...mapGetters("lucky", {
            cur_gifts: "cur_gifts"    
        }),
        ...mapGetters("lucky", {
            cur_members: "cur_members"
        }),
        ...mapGetters("lucky", {
            totalGift: "totalGift"
        }),
        ...mapGetters("lucky", {
            totalMembers: "totalMembers"
        }),
        ...mapGetters("lucky", {
            lucky: "lucky"
        })
    },
    watch: {
        cur_gifts: {
            handler(val) {
                if (Array.prototype.isPrototypeOf(val)) {
                    for (let i = 0; i < val.length; i++) {
                        if (val[i].count !== 0) {
                            this.curlotteryInfo = "奖项：" + val[i].name + "(" + val[i]["desc"] + ")&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "剩余：" + val[i].count + "个";
                            return;
                        }else {
                            continue;
                        }
                    }
                    val[val.length - 1].count == 0 ? this.curlotteryInfo = "奖项：" + val[val.length - 1].name + "(" + val[val.length - 1]["desc"] + ")&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "剩余：" + val[val.length - 1].count + "个" : "";
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style scoped>
    #start {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .Btn {
        position: absolute;
        width: 120px;
        height: 120px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        text-align: center;
        line-height: 120px;
        color: #fcd731;
        font-size: 26px;
        cursor: pointer;
        z-index: 2;
    }
    .Btn::before {
        content: "";
        display: inline-block;
        position: absolute;
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid #fcd731;
        border-radius: 8px;
    }
    .bg {
        width: 100%;
        height: 100%;
    }
    .lotteryBox {
        position: absolute;
        width: 1000px;
        height: 450px;
        padding: 40px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        box-sizing: border-box;
        /**overflow: hidden;**/
    }
    .curlotteryInfo {
        position: absolute;
        width: auto;
        font-size: 24px;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        color: #fcd731;
    }
    .lotteryBox::before {
        content: "";
        /**position: absolute;
        width: 760px;
        height: 360px;
        top: 20px;
        left: 20px;
        border: 2px solid #fcd731;
        border-radius: 10px;**/
    }
    .randomBox {
        position: relative;
        float: left;
        width: 60%;
        height: 100%;
    }
    .randomName {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-30%,-50%);
        font-size: 70px;
        display: inline-block;
        color: #fff;   
    }
    .luckiesBox {
        position: relative;
        display: flex;
        flex-direction: column;
        float: right;
        width: 40%;
        height: 100%;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.2);
        padding: 10px 10px 45px;
        overflow: hidden;
        box-sizing: border-box;
    }
    .title {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        color: #fcd731;
        border-bottom: 2px solid #fcd731;
    }
    .luckiesContent {
        flex: 1;
        width: 100%;
        overflow: scroll;
    }
    .luckiesContent::-webkit-scrollbar {
        display: none;
    }
    .list {
        display: flex;
        width: 100%;
        height: 35px;
        margin: 10px 0;
        font-size: 16px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
    }
    .luckinfo {
        width: 33%;
        height: 100%;
        overflow: hidden;
        line-height: 35px;
        text-align: center;
    }
    .arrowDown {
        position: absolute;
        width: 40px;
        height: auto;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        font-size: 0;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
    }
    .arrowDown img {
        display: inline-block;
        width: 70%;
        height: auto;
    }
</style>