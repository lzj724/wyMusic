<template lang="html">
<div class="audio-nav" :class="{navhide:!nav}">
    <div class="nav-warp" @click="showPlayer" >
    <div class="cover" >
        <img :src="curActiveSong.albumPic" alt="" width="30" height="30">
    </div>
    <div class="info">
        <span class="name">{{curActiveSong.name}}</span>
        <span class="art">{{curActiveSong.art}}</span>
    </div>
    </div>
    <div class="control">
        <div class="play">
            <i class="iconfont icon-iconfontplay" v-if="!playing" @click="play"></i>
            <i class="iconfont icon-zanting" v-else @click="pause"></i>
        </div>
        <div class="list" @click.stop="showList">
            <i class="iconfont icon-liebiao" ></i>
        </div>
    </div>
</div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
    export default{
        data(){
            return{
            }
        },
        computed:{
            ...mapState(['curAllSongList','curActiveSong','playing', 'nav'])
        },
        components:{

        },
        methods:{
            play(){
                document.querySelector('#audio').play()
                this.$store.dispatch('switchPlaying', true)
            },
            pause(){
                document.querySelector('#audio').pause()
                this.$store.dispatch('switchPlaying', false)
            },
            showPlayer(){
                this.$store.state.showPlayer = true
            },
            showList(){
                this.$store.dispatch('mask',true)
                this.$store.dispatch('showList')
            }

        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
.audio-nav{
    position: fixed;
    z-index: 1000;
    left: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: 1px 1px 20px rgba(255, 244, 189, 0.67);
    width: 100%;
    height: 50px;
    &.navhide{
        bottom: 2000px;
    }
    .nav-warp{
        width: 100%;
        height: 100%;
        margin-left:-80px;
        float:left;
    .cover{
        float:left;
        margin-top: 10px;
        margin-left:90px;
        animation: maru 17s infinite linear;
        img{
            border-radius:50%;
        }
    }
    @keyframes maru {
        0%{transform: rotate(0deg)}
        100%{transform: rotate(360deg)}
    }
    .info{
        float:left;
        margin-left:10px;
        height: 100%;
        line-height: 25px;
        font-size:13px;
        .name{
            display: block;
            height: 40%;
            margin-top:5px;
        }
        .art{
            display: block;
            height: 40%;
        }
    }
    }
    .control{
        float:right;
        width: 70px;
        height: 100%;
        .play{
            line-height:50px;
            float:left;
            i:nth-of-type(1){
                font-size:20px;
            }
            .icon-zanting{
                display: inline-block;
            }
            .icon-iconfontplay{
                display: inline-block;
                padding-left:6px;
            }
        }
        .list{
            line-height:50px;
            margin-right:10px;
            float:right;
        }
    }
}
</style>