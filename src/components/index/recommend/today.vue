<template lang="html">
<div class="today clearfix">
    <ul class="clearfix">
        <li class="item-list" :key="index" v-for="(item,index) in className" @click="today">
                <div class="item-ico" >
                    <i class="iconfont" :class="item"></i>
                </div>
                <div class="item-title" >{{title[index]}}</div>
        </li>
    </ul>
    <HTips v-if="tips"></HTips>
    <hr>
</div>
</template>
<script>
    import HTips from './tips'
export default {
        components:{
          HTips
        },
    data(){
        return {
            title: ['私人FM','每日歌曲推荐','云音乐热歌榜'],
            className: ['icon-501','icon-rili','icon-paixing'],
            tips:false,
            show:true
        }
    },
    methods:{
        today(){
            if(this.show){
                this.show = false
                this.tips = true
                console.log(this.show);
                setTimeout(()=>{
                    this.tips = false
                    this.show = true
                },3000)
            }

        }
    }
}
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../../common/sass/variable';
.today{
    position: relative;
    padding: 20px 0 10px 0;
    width: 100%;
    ul{
        width: 100%;
        padding-bottom: 10px;
        .item-list{
            float:left;
            width: 33.3333%;
            text-align:center;
            .item-ico{
                width: 47px;
                height: 47px;
                border-radius:50%;
                border:1px solid red;
                text-align:center;
                line-height:47px;
                margin:0 auto;
                margin-bottom:15px;
                .iconfont{
                    font-size: 30px;
                    color:red;
                }
            }
            &:nth-child(2) .item-ico{
                line-height:42px;
            }
            .item-title{
                font-size:$font-size;
                text-align:center;
            }
        }
    }
}
</style>