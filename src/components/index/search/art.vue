<template lang="html">
<div class="art">
    <div class="song-items">
        <ul class="clearfix">
            <li class="clearfix" v-for="(item,index) in art" @click="toArt(item.id)">
                <div class="list-img">
                    <img :src="item.img1v1Url">
                </div>
                <div class="list-info">
                    <span class="song-songlist-art">{{item.name}} {{item.alias[0]?'('+item.alias[0]+')':item.alias[0]}}</span>
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
                art: []
            }
        },
        props:['searchkey'],
        watch:{
            searchkey(val){
                this.getKeySearch()
            }
        },
        methods:{
            getKeySearch(){
                this.$Axios.get(`${url}/search?keywords=${this.searchkey}&type=100`).then((res) => {
                    if (res.data.code === res.status) {
                        this.art = res.data.result.artists
                        console.log(1)
                    }
                })
            },
            toArt(id){
                this.$router.push({path:`/home/art/${id}`})
            }
        },
        mounted(){
                this.getKeySearch()
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
.art{
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
                    margin-left:20px;
                    height: 80px;
                    float:left;
                    .song-songlist-art{
                        display: block;
                        color:#555;
                        font-size:16px;
                        line-height: 60px;
                        font-weight:500;
                        text-overflow:ellipsis;
                    }
                }

            }
        }
    }
}
</style>