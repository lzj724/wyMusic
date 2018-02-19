<template lang="html">
<div class="home" ref="home">
    <HeadM></HeadM>
    <div class="tab">
        <div v-for="(item,index) in tabList" class="tab-item" :class="{active:show==item}">
        <router-link class="menu-item"   @click.native="show=item" :to="'/home/'+item">
            <span class="item">{{tabTitle[index]}}</span>
        </router-link>
        </div>
    </div>
    <router-view ref="view"></router-view>
</div>
</template>
<script>
    import HeadM from '@/components/index/header.vue'
    export default {
        data(){
            return {
                show:'',
                transitionName: '',
                tabList:['recommend','songlist','radio','top'],
                tabTitle:['个性推荐','歌单','主播电台','排行榜']
            }
        },
        components:{
            HeadM
        },
        created(){
            var activeLink = this.$route.path.split('/')[2]
            this.show = activeLink
        },
        mounted(){
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../common/sass/variable.scss';

        .tab {
            margin-top: 48px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 10;
            height: 39px;
            background-color: white;
            display: flex;
            .tab-item{
                flex:1;
                width: 25%;
                height: 35px;
                text-align: center;
                &.active {
                    border-bottom: 4px solid $background-default;
                }
                .menu-item {
                span {
                    line-height: 35px;
                    font-size: 14px;
                    color: $color-default;
                }
            }
            }
        }

</style>
