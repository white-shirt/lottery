<template>
    <div class="notice" v-if="show">
        <span>{{noticeMsg}}</span>  
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "notice",
    data() {
        return {
            show: false
        }
    },
    mounted() {
        // setTimeout(function () {
        //     this.show = false
        // }, 3000)
    },
    computed: {
        ...mapGetters("lucky", {
            noticeMsg: "noticeMsg"
        })    
    },
    watch: {
        noticeMsg: {
            handler(Val) {
                Val ? this.show = true : this.show = false;    
            }
        }
    }
}
</script>

<style scoped>
    .notice {
        display: table-cell;
        vertical-align: middle;
        width: auto;
        min-width: 220px;
        height: 60px;
        border-radius: 10px;
        text-align:center;
        padding: 0 30px;
        box-sizing: border-box;
        font-size: 14px;
        color: #fcd731; 
        background: rgba(0, 0, 0, 0.5);
    }
</style>