// import axios from 'axios'
// import mockData from '../mockData'
import { Api } from '../api.js'

const state = {
    loginState: { "path": "", "loginState": false, "expire": 0 },  //登录状态
    lotteries: null,   //本次抽奖的数据
    totalGift: 0,   //奖品总数
    totalMembers: 0,  //参与成员总数
    getLuckyList: "",  //get到的中奖名单
    
 
    lucky: [],   //本次中奖人名单
    cur_gifts: "",  //当前剩余奖品
    cur_members: "",  //当前剩余未中奖的成员
    noticeMsg: "",  //提示信息
}

const getters = {
    lotteries(state) {
        return state.lotteries;
    },
    lucky(state) {
        if (window.localStorage.getItem("localluckyData")) {
            let localluckyData = JSON.parse(window.localStorage.getItem("localluckyData"));
            localluckyData["path"] == window.location.search ? state.lucky = localluckyData["data"] : "";
        }
        return state.lucky;
    },
    cur_members(state) {
        if (window.localStorage.getItem("localCurMembers")) {
            let localCurMembers = JSON.parse(window.localStorage.getItem("localCurMembers"));
            localCurMembers["path"] == window.location.search ? state.cur_members = localCurMembers["data"] : "";
        }
        return state.cur_members;
    },
    cur_gifts(state) {
        if (window.localStorage.getItem("localCurGifts")) {
            let localCurGifts = JSON.parse(window.localStorage.getItem("localCurGifts"));
            localCurGifts["path"] == window.location.search ? state.cur_gifts = localCurGifts["data"] : "";
        }
        return state.cur_gifts;
    },
    totalGift(state) {
        return state.totalGift;
    },
    totalMembers(state) {
        return state.totalMembers;
    },
    loginState(state) {
        if (window.localStorage.getItem("loginData")) {
            state.loginState = JSON.parse(window.localStorage.getItem("loginData"));
        }
        return state.loginState;
    },
    noticeMsg(state) {
        let timer;
        clearTimeout(timer);
        timer = setTimeout(function () {
            state.noticeMsg = "";    
        }, 3000)
        return state.noticeMsg;
    },
    getLuckyList(state) {
        return state.getLuckyList;
    }
}

function ErrorMsg(err) {
    if (err.response.status !== 200) {
        if (err.response.data["msg"]) state.noticeMsg = err.response.data["msg"];
        else state.noticeMsg = err.response.statusText;
    }
}

const actions = {
    //登录
    login(state, pwd) {
        let data = {"code": pwd};
        let path = window.location.search;
        new Api("/login" + path, data).ApiPost().then((res) => {
            if (res.data.code == 0 && res.data.msg == "ok") {
                let loginData = {
                    path: path,
                    loginState: true,
                    expire: new Date().getTime() + 1000 * 60 * 30
                }
                state.state.loginState = loginData;
                window.localStorage.setItem("loginData", JSON.stringify(loginData));
                state.dispatch("get_lottery");
                state.dispatch("get_members");
            }
        }).catch((err) => {
            ErrorMsg(err);
        });
    },
    //获取本次抽奖的数据
    get_lottery(state) {
        new Api("/lottery").ApiGet().then((res) => {
            if (res.data.code == 0 && res.data["msg"] == "ok") {
                state.state.lotteries = res.data;
                //页面title
                // document.title = res.data.data.name;
                state.state.cur_gifts = res.data.data.gifts;
                for (let i = 0; i < res.data.data.gifts.length; i++) {
                    state.state.totalGift += res.data.data.gifts[i].count;
                }
            }
        }).catch((err) => {
            ErrorMsg(err);
        })
    },
    //获取本次抽奖的候选人名单
    get_members(state) {
        new Api("/candidates").ApiGet().then((res) => {
            if (res.data.code == 0 && res.data["msg"] == "ok") {
                if (res.data.data.length > 0) {
                    state.state.cur_members = res.data.data;
                    state.state.totalMembers = res.data.data.length;
                }
                console.log(state.state.totalMembers)
            }
        }).catch((err) => {
            ErrorMsg(err);
        })
    },
    //获取本次中奖人名单
    get_lucky(state) {
        new Api("/candidates?t=gift").ApiGet().then((res) => {
            console.log(res)
            if (res.data.code == 0 && res.data["msg"] == "ok") {
                if (res.data.data.length > 0) {
                    state.state.getLuckyList = res.data.data;
                }
            }
        }).catch((err) => {
            ErrorMsg(err);
        })
    },
    
    //luckyId:中奖人id，giftsId:奖品id，luckyOne: 参与抽奖人数组序列号， gifts:更新后的gifts数组
    put_candidates(state, {luckyId, giftId, luckyOne, luckyName, depName, gifts, giftName}) {
        console.log("获奖者ID：" + luckyId, "奖品ID：" + giftId)
        let data = {"gift_id": giftId};
        new Api("/candidates/" + luckyId, data).ApiPut().then((res) => {
            if (res.data.code == 0 && res.data["msg"] == "ok") {
                state.dispatch("updateCurGifts", gifts);
                state.dispatch("updateCurMembers", luckyOne);
                //以中奖人员名单
                state.state.lucky.unshift({
                    "id": luckyId,
                    "name": luckyName,
                    "dep_name": depName,
                    "gift_id": giftId,
                    "gift_name": giftName
                })
                let localluckyData = {
                    "path": window.location.search,
                    "data": state.state.lucky
                }
                window.localStorage.setItem("localluckyData", JSON.stringify(localluckyData));
            }
        }).catch((err) => {
            ErrorMsg(err);
        })
    },
    //更新本地当前剩余奖品数量
    updateCurGifts(state, gifts) {
        state.state.cur_gifts = gifts;
        state.state.totalGift > 0 ? state.state.totalGift-- : state.state.totalGift = 0;
        let localCurGifts = {
            "path": window.location.search,
            "data": state.state.cur_gifts
        }
        window.localStorage.setItem("localCurGifts", JSON.stringify(localCurGifts));
    },
    //更新本地当前未中奖成员
    updateCurMembers(state, luckyOne) {
        state.state.cur_members.splice(luckyOne, 1);
        state.state.totalMembers > 0 ? state.state.totalMembers-- : state.state.totalMembers = 0;
        let localCurMembers = {
            "path": window.location.search,
            "data": state.state.cur_members
        }
        window.localStorage.setItem("localCurMembers", JSON.stringify(localCurMembers));
    },
    updateNoticeMsg(state, msg) {
        state.state.noticeMsg = msg;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions
  }