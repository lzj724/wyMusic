<template lang="html">
<div class="radio">
    <div class="title">
        电台推荐
    </div>
    <div class="radio-recommend">
            <div class="item" v-for="(item,index) in radio" @click="toRadio()">
                <img :src="item.picUrl" alt="">
                <i class="username">{{item.program.dj.nickname}}</i>
                <div class="radio-name">{{item.name}}</div>
            </div>
    </div>
    <HTips v-if="tips"></HTips>
</div>
</template>
<script>
import url from '@/common/js/api'
import HTips from '../recommend/tips'
    export default{
    data(){
        return{
            radio:[],
            tips:false,
            show:true
        }
    },
        components:{
            HTips
        },
        methods:{
            getData(){
                this.$Axios.get(`${url}/personalized/djprogram`).then(res=>{
                    if(res.status === res.data.code){
                    this.radio = res.data.result
                    }
                })
            },
            toRadio(){
                if(this.show){
                    this.tips = true
                    this.show = false
                    setTimeout(()=>{
                        this.tips = false
                        this.show = true
                    },3000)
                }
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.getData()
            })
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../../common/sass/variable';
.radio{
    margin-top:87px;
    width: 100%;
    .title{
        padding-top:20px;
        padding-bottom:20px;
        font-size:16px;
        &:before{
            content:'';
            border-left:3px solid $background-default;
            padding:2px 0;
            padding-right:15px;
        }
    }
    .radio-recommend{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .item{
            display: flex;
            position: relative;
            flex-direction: column;
            width: 49%;
            height: 100%;
            img{
                width: 100%;
                vertical-align: middle;
            }
            i{
                position: absolute;
                font-size:16px;
                top: 170px;
                width: 40px;
                height: 20px;
                right: 20px;
                color:black;
                line-height: 700;
                z-index: 100;
            }
            .radio-name{
                font-size:14px;
                margin:10px 0;
            }
        }
    }
}
</style>