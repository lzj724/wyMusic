<template lang="html">
<div class="song-list">
    <div class="song-items">
        <ul class="clearfix">
            <li class="clearfix" v-for="(item,index) in list" @click="toList(item.id,item)">
                <div class="list-img">
                    <img :src="item.coverImgUrl">
                </div>
                <div class="list-info">
                    <span class="song-songlist-name">{{item.name}}</span>
                    <span class="song-songlist-info">{{item.trackCount}}首 BY:{{item.creator.nickname}} 播放:{{item.playCount | playCount}}次</span>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
    import axios from 'axios'
    import url from '@/common/js/api'
    export default{
        data(){
            return{
                list:[]
            }
        },
        props:['searchkey'],
        watch:{
            searchKey(val){
                this.getKeySearch()
            }
        },
        methods:{
            getKeySearch(){
                this.$Axios.get(`${url}/search?keywords=${this.searchkey}&type=1000`).then((res) => {
                    if (res.data.code === res.status) {
                        this.list = res.data.result.playlists
                    }
                })
            },
            toList(id,obj){
                this.$router.push({path:`/home/songlistdetail/${id}`})
                this.$store.dispatch('curPlaylistDetail',obj)
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.getKeySearch()
            })
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
.song-list{
    margin-top:91px;
    width: 100%;
    .song-items{
        width: 100%;
        background-color: rgba(0,0,0,.05);
        ul{
            width: 100%;
            li{
                width: 100%;
                border-bottom:1px solid #aaa;
                padding:10px 0;
                height:60px;
                .list-img{
                    float:left;
                    margin-left:10px;
                    img{
                        width: 60px;
                        height: 60px;
                        vertical-align: top;
                    }
                }
                .list-info{
                    margin-left:5px;
                    float:left;
                    .song-songlist-name{
                        display: block;
                        color:#555;
                        font-size:15px;
                        line-height: 35px;
                    }
                    .song-songlist-info{
                        color:#555;
                        font-size:14px;
                        line-height: 20px;
                    }
                }

            }
        }
    }
}
</style>