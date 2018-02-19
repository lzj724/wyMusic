<template lang="html">
<div class="recommend">
   <Slider :sliderData="slider"></Slider>
   <Today></Today>
      <div class="songList">
         <h3 class="songList-title">推荐歌单</h3>
         <ul>
            <li v-for="(item,index) in songList" :key="index" class="songlist-items" @click="songlistDetail(item.id,item)">
               <div class="item-link">
                  <img v-lazy="item.picUrl" :id="item.id">
                  <span class="iconfont icon-erjiline">
                        <span class="playCount">{{item.playCount|playCount}}</span>
                    </span>
               </div>
               <span class="item-title">{{item.name}}</span>
            </li>
         </ul>
      </div>
      <div class="songList">
         <h3 class="songList-title">最新音乐</h3>
         <ul>
            <li v-for="(item,index) in newSong" :key="index" class="songlist-items" @click="toAlbum(item.id,item)">
               <div class="item-link">
                  <img v-lazy="item.song.album.blurPicUrl">
               </div>
               <span class="item-title">{{item.name}}</span>
               <span class="item-art">{{item.song.artists[0].name}}</span>
            </li>
         </ul>
      </div>
      <div class="songList">
         <h3 class="songList-title">推荐MV</h3>
         <ul>
            <li v-for="(item,index) in MV" :key="index" class="priCont-items " @click="toMV(item.id)">
               <div class="item-link">
                  <img :src="item.picUrl" :id="item.id">
                  <span class="fa fa-video-camera camera-up">
                        <span class="playCount">{{item.playCount|playCount}}</span>
                    </span>
               </div>
               <span class="item-title">{{item.name}}</span>
               <span class="item-art">{{item.artistName}}</span>
            </li>
         </ul>
      </div>
</div>
</template>
<script>
import Slider from './slider.vue'
import Today from './today.vue'
import SongList from './songList'
import url from '@/common/js/api'
import {mapMutations,mapActions,mapState} from 'vuex'
    export default{
    data(){
         return {
             slider: [],
             songList:[],
             songListDetail:[],
             priCont:[],
             newSong:[],
             MV:[],
             scroll:''
         }
    },
    components:{
        Slider,
        Today,
        SongList
    },
        computed:{

        },
        methods:{
            songlistDetail(id,obj){
                this.$router.push({path:`/home/songlistdetail/${id}`})
                this.$store.dispatch('curPlaylistDetail',obj)
            },
            getData(){
                //轮播图
                this.$Axios.get(`${url}/banner`).then((res)=>{
                    if(res.status === res.data.code){
                        let temp = res.data.banners;
                        for(var i=0;i<temp.length;i++){
                            if(temp[i].typeTitle === '广告'){
                                temp.splice(i,1);
                            }
                        }
                        this.slider = temp;
                    }
                })
                //推荐歌单
                this.$Axios.get(`${url}/personalized`).then((res)=>{
                    if(res.status === res.data.code){
                            this.songList = res.data.result;
                    }
                })
                //最新音乐
                this.$Axios.get(`${url}/personalized/newsong`).then((res)=>{
                    if(res.status === res.data.code){
                        this.newSong = res.data.result;
                        this.newSong = this.newSong.slice(0,6)
                    }
                })
                //mv
                this.$Axios.get(`${url}/personalized/mv`).then((res)=>{
                    if(res.status === res.data.code){
                        this.MV = res.data.result;
                    }
                })
            },
            toAlbum(id,obj){
                this.$router.push({path:`/home/album/${obj.song.album.id}`})
            },
            toMV(id){
                this.$router.push({path:`/home/mv/${id}`})
            }
        },
        created(){
        this.$nextTick(()=>{
            this.getData()
        })
        },
    }
</script>
<style type="text/scss" lang="scss" scoped>
   @import '../../../common/sass/variable';

   .recommend{
      margin-top:87px;
      width: 100%;
      .songList-enter-active{
         transition: all .3s cubic-bezier(.55, 0, .1, 1);
         transform: translateX(0)
      }
      .songList-leave-active{
         transition:all .3s cubic-bezier(.55, 0, .1, 1);
         transform: translateX(-100%);
      }
      .songList-enter{
         transform: translateX(100%);
      }
      .songList-leave{
         transform: translateX(0)
      }
   }
   .songList{
      width: 100%;
      .songList-title{
         font-size:16px;
         &:before{
            content:'';
            border-left:3px solid $background-default;
            margin-right:7px;
            padding:2px 0;
         }
      }
      ul{
         margin-top:10px;
         width: 100%;
         height: 100%;
         display: flex;
         flex-wrap: wrap;
         justify-content:space-between;
         .priCont-items{
            width: 49.5%;
            height: 100%;
            margin-bottom: 12px;
            .item-link{
               width: 100%;
               height: 100%;
               position: relative;
               img{
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
               }
               .camera-up{
                  top:5px !important;
                  .playCount{
                     top:0 !important;
                  }
               }
               span{
                  display: inline-block;
                  width: 50px;
                  position: absolute;
                  right: 42px;
                  bottom: 7px;
                  color:white;
                  font-size:10px;
                  text-align:right;
                  .playCount{
                     position: absolute;
                     right:-37px;
                     bottom: -1px;
                  }
               }
            }
            .item-title{
               font-size:$font-size;
               display: block;
               padding:5px 0;
            }
            .item-art{
               font-size:12px;
               color:#555;
            }
         }
         .songlist-items{
            width: 32.5%;
            height: 100%;
            padding-bottom:10px;
            .item-link{
               width: 100%;
               height: 100%;
               position: relative;
               img{
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
               }
               .camera-up{
                  top:5px !important;
                  .playCount{
                     top:0 !important;
                  }
               }
               span{
                  display: inline-block;
                  width: 50px;
                  position: absolute;
                  right: 42px;
                  bottom: 7px;
                  color:white;
                  font-size:10px;
                  text-align:right;
                  .playCount{
                     position: absolute;
                     right:-37px;
                     bottom: -1px;
                  }
               }
            }
            .item-title{
               font-size:$font-size;
               display: block;
               padding:5px 0;
            }
            .item-art{
               font-size:12px;
               color:#555;
            }
         }
      }
   }
</style>