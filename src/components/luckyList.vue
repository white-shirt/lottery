<template>
    <div class="luckyList">
       <div class="closeBtn" @click="close">
            <span class="line"></span>
            <span class="line"></span>
        </div>
        <!--<div class="head"></div>-->
        <div class="title">中奖列表</div>
        <div class="contentBox">
            <div class="head">
                <span class="headitem" v-for="(item, index) in headlist" :key="index">{{item}}</span>
            </div>
            <div class="content">
                <div class="luckyitem" v-for="(item ,index) in getLuckyList" :key="index">
                    <span :title="item['name'] || ''" class="luckyName">{{item["name"] || ""}}</span>
                    <span :title="item['gift_id'] || ''" class="luckyGiftId">{{item["gift_id"] || ""}}</span>
                    <span :title="item['dep_name'] || ''" class="luckyDepName">{{item["dep_name"] || ""}}</span>
                    <span :title="item['gift_name'] || ''" class="luckyGiftName">{{item["gift_name"] || ""}}</span>
                </div>      
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "luckyList",
    data() {
        return {
            headlist: ["姓名", "奖项", "部门", "奖品"]
        }
    },
    methods: {
        close() {
            this.$emit("close");
        }
    },
    created() {
        this.$store.dispatch("lucky/get_lucky");    
    },
    mounted() {
        
    },
    computed: {
        ...mapGetters("lucky", {
            getLuckyList: "getLuckyList"
        })
    },
}
</script>

<style scoped>
   .luckyList {
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       transform-origin: center;
       width: 100px;
       height: 100px;
       border-radius: 10px;
       padding: 45px 0px 40px;
       box-sizing: border-box;
       animation: BoxBig ease-in-out 0.5s forwards;
       background: rgba(0, 0, 0, 0.5);
       box-sizing: border-box;
       z-index: 7;
   }
    @keyframes BoxBig {
        from {
            width: 100px;
            height: 100px;
        }
        to {
            width: 1000px;
            height: 450px;
        }
    }
    @-webkit-keyframes BoxBig {
        from {
            width: 100px;
            height: 100px;
        }
        to {
            width: 1000px;
            height: 450px;
        } 
    }
    .closeBtn {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 35px;
        height: 35px;
        text-align: center;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 5px;
        cursor: pointer;
    }
    .closeBtn .line {
        display: inline-block;
        width: 30px;
        height: 5px;
        background: #fcd731;
        border-radius: 2px;
        position: absolute;
        top: 50%;
        left: 50%;
    }
    .closeBtn .line:nth-child(1) {
        transform-origin: center;
        transform: translate(-50%, -50%) rotate(45deg);
    }
    .closeBtn .line:nth-child(2) {
        transform-origin: center;
        transform: translate(-50%, -50%) rotate(-45deg);
    }
    .title {
        position: absolute;
        width: 100%;
        font-size: 26px;
        top: -50px;
        color: #fcd731;
        text-align: center;
    } 
    .contentBox {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 0 50px;
        box-sizing: border-box;
    }
    .head {
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 60px;
        border-bottom: 2px solid #fcd731;
        box-sizing: border-box;
    }
    .headitem {
        display: inline-block;
        flex: 1;
        height: 100%;
        font-size: 20px;
        color: #fcd731;
        text-align: center;
        line-height: 60px;
    }
    .content {
        flex-shrink: 1;
        flex-grow: 1;
        width: 100%;
        height: auto;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .luckyitem {
        flex-shrink: 1;
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 50px;
    }
    .luckyitem span {
        flex: 1;
        display: inline-block;
        font-size: 20px;
        padding: 0 40px;
        box-sizing: border-box;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
    }
    .content::-webkit-scrollbar-track-piece {
        background-color: rgba(0, 0, 0, 0);
    }
    .content::-webkit-scrollbar {
        width: 6px;
        height: auto;
        
    }
    .content::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.15);

        background-clip: padding-box;
    }
    .content::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
</style>