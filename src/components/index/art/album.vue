<template lang="html">
<div class="album">
    <h2>按发行时间排序</h2>
    <div class="album-item">
        <div class="item" v-for="(item,index) in songData.hotAlbums" @click="toAlbum(item.id)">
            <div class="item-l">
                <img :src="item.picUrl" alt="">
            </div>
            <div class="item-r">
                <p class="title">{{item.name}}</p>
                <p class="time">{{item.publishTime | YMD}} 歌曲：{{item.size}}</p>
            </div>
        </div>
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
            toAlbum(id){
                this.$router.push({path:`/home/album/${id}`})
            }
        },
        mounted(){
        }

    }
</script>
<style type="text/scss" lang="scss" scoped>
.album{
    h2{
        font-size:16px;
        padding:10px;
    }
    .album-item{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        .item{
            display: flex;
            margin-bottom:10px;
            .item-l{
                display: flex;
                img{
                    width: 80px;
                    height: 80px;
                }
            }
            .item-r{
                margin-left:10px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .title{
                    font-size:16px;
                    width: 100%;

                }
                .time{
                    font-size:14px;
                    margin-top:0;
                }
            }
        }
    }
}
</style>