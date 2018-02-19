<template lang="html">
    <div class="head">
        <i class="fa fa-arrow-left" @click="back"></i>
        <h2>{{headerTitle}}</h2>
    </div>
</template>
<script>

    export default{
        props:['headerTitle'],
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../common/sass/variable';
    .head {
        width: 100%;
        height: 48px;
        line-height: 48px;
        color: white;
        background-color: $background-default;
        z-index: 20;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        display: flex;
        i {
            padding: 0 20px;
            font-size: 22px;
            line-height: 48px;
        }
        h2 {
            display: inline-block;
            font-size: 18px;
        }
    }
</style>
