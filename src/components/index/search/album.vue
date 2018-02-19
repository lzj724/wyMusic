<template lang="html">
<div class="album">
    <div class="song-items">
        <ul class="clearfix">
            <li class="clearfix" v-for="(item,index) in album" @click="toAlbum(item.id)">
                <div class="list-img">
                    <img :src="item.picUrl">
                </div>
                <div class="list-info">
                    <span class="song-songlist-albumname">{{item.name}}</span>
                    <span class="song-songlist-artname" v-for="art in item.artists">{{art.name}} </span>
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
            return {
                album: []
            }
        },
        watch:{
            searchKey(val){
                this.getKeySearch()
            }
        },
        props:['searchkey'],
        methods:{
            getKeySearch(){
                this.$Axios.get(`${url}/search?keywords=${this.searchkey}&type=10`).then((res) => {
                    if (res.data.code === res.status) {
                        this.album = res.data.result.albums
                        console.log(this.album);
                    }
                })
            },
            toAlbum(id){
                this.$router.push({path:`/home/album/${id}`})
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
.album{
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
                    margin-left:10px;
                    float:left;

                    .song-songlist-albumname,.song-songlist-artname{
                        display: block;
                        color:#555;
                        font-size:16px;
                        line-height: 30px;
                        font-weight:500;
                        width: 320px;
                        height: 30px;
                        overflow:hidden;
                    }
                }

            }
        }
    }
}
</style>