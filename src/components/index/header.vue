<template lang="html">
    <div class="header">
        <h2 class="title"><i class="iconfont icon-wangyiyunyinlezizhi"></i>网易云音乐</h2>
        <i class="iconfont icon-search search" @click="search"></i>
    </div>
</template>
<script>
export default{
    methods:{
        search(){
            this.$router.push({path:'/home/search'})
        }
    }
}
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../common/sass/variable.scss';
    .header {
        width: 100%;
        height: 48px;
        top: 0;
        left: 0;
        background-color: $background-default;
        z-index: 10;
        position: fixed;
        .title{
            text-align: center;
            font-size: 18px;
            color: white;
            line-height: 48px;
            i{
                vertical-align: middle;
                font-size: 30px;
                padding-right:10px;
            }
        }
        .search{
            color:white;
            font-size: 22px;
            position: absolute;
            top: 12px;
            right: 20px;
        }
    }
</style>
