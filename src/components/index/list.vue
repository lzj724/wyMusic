<template lang="html">
<div class="list" :class="{showlist:showList}" >
   <div class="title">播放列表（{{curAllSongList.length}}首）</div>
    <div class="content">
        <ul>
            <li v-for="(item,index) in curAllSongList" @click="getActiveSong(item.id)" :class="{current:currentId == item.id}">
                <i class="triangle"></i>
                <span class="song-info">{{item.name}} - </span>
                <span class="song-art" v-for="art in item.art">{{art.name}} </span>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
    import url from '@/common/js/api'
    import axios from 'axios'
 import {mapState,mapGetters,mapActions} from 'vuex'
    export default{
        data(){
            return{
            }
        },
        computed:{
            ...mapState(['showList','curAllSongList','musicIndex']),
            ...mapGetters(['currentId']),
            musicListIndex(){
                if(this.curAllSongList.length > 0) {
                    return this.curAllSongList.findIndex((ele) => {

                        return ele.id === this.currentId
                    })
                }else{
                    return 0
                }
            }
        },
        methods:{
            getActiveSong(id){
                function getUrl() {
                    return axios.get(`${url}/music/url?id=${id}`)
                }

                function getTotal() {
                    return axios.get(`${url}/comment/music?id=${id}`)
                }

                function getSongInfo() {
                    return axios.get(`${url}/song/detail?ids=${id}`)
                }

                function getLyric() {
                    return axios.get(`${url}/lyric?id=${id}`)
                }

                axios.all([getUrl(), getTotal(), getSongInfo(), getLyric()]).then(axios.spread((res1, res2, res3, res4) => {
                    const arr = [res1.data, res2.data, res3.data.songs, res4.data]
                    this.$store.dispatch('activeSong', arr)
                    this.$store.dispatch('switchPlaying', true)
                }))
                this.$store.dispatch('showList')
            },
        },
        mounted(){
            this.$nextTick(()=>{
                this.$store.dispatch('musicIndex', this.musicListIndex)
            })
        },
        watch:{
            musicIndex(val,old){
                this.getActiveSong(this.curAllSongList[val].id)
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
.list{
    position: fixed;
    left: 0;
    bottom: -1800px;
    width: 100%;
    height: 65%;
    background-color: #fff;
    z-index:1003;
    transition: all .5s;
    &.showlist{
        bottom:0;
        transition: all .5s;
    }
    .title{
        box-shadow: 0 0 10px #eee;
        padding:15px 10px;
        font-size:14px;
        border-bottom:1px solid #ccc;
    }
    .content{
        width: 100%;
        height: 100%;
        overflow: auto;
        ul{
            width: 100%;
            height: 100%;
            li{
                height: 35px;
                padding:0 12px;
                font-size:14px;
                line-height:35px;
                overflow: hidden;
                border-bottom:1px solid #ccc;
                &.current{
                    color:red;
                    .song-art{
                        color:red;
                    }
                    .triangle{
                        display: inline-block;
                        left: 5px;
                        top: 5px;
                        width: 0;
                        height: 0;
                        border:5px solid transparent;
                        border-left: 10px solid red;
                    }
                }
                .song-art{
                    color:#888;
                }
                &:last-child{
                    border-bottom:none;
                    padding-bottom:10px;
                }
            }
        }
    }
}
</style>