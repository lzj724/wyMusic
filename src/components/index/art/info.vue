<template lang="html">
<div class="info">
    <div class="brefDesc">
        <div class="title">{{artName}}简介</div>
        <div class="desc">{{songData.briefDesc}}</div>
    </div>
    <div class="brefDesc">
        <div class="title">{{songData.introduction[0].ti}}</div>
        <div class="desc">{{songData.introduction[0].txt}}</div>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    props:['songData','artName'],
    methods:{

    },
    mounted(){
    }

}
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../../common/sass/variable';
.info{
    .brefDesc{
        .title{
            margin-top:20px;
            margin-bottom:10px;
            font-size:16px;
            &:before{
                content:'';
                border-left:3px solid $background-default;
                padding-right:10px;
            }
        }
        .desc{
            font-size:14px;
            margin-left:10px;
            margin-right:10px;
            line-height:20px;
        }
        &:last-child{
            margin-bottom:20px;
        }
    }
}
</style>