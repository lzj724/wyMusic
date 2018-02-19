<template lang="html">
<div class="comment" :class="{commenthide:commentShow}">
   <div class="head">
           <i class="fa fa-arrow-left" @click="back"></i>
           <h2>评论 ({{commentInfo.total}}条)</h2>
   </div>
    <div class="songinfo">
        <div class="album-cover">
            <img :src="commentInfo.albumPic">
        </div>
        <div class="song-info">
        <p class="song-name">{{commentInfo.name}}</p>
        <p class="song-art">{{commentInfo.art}}</p>
        </div>
    </div>
    <div class="comment-list">
    <div class="hot-comment" v-if="hotComment.length !== 0">
        <p class="hot-comment-title">精彩评论</p>
        <ul>
            <li v-for="(item,index) in hotComment">
                    <div class="comment-l">
                        <div>
                        <img :src="item.user.avatarUrl" alt="">
                        </div>
                    </div>
                    <div class="comment-r">
                        <div class="user-info">
                            <div class="user-name">{{item.user.nickname}}</div>
                            <div class="time">{{item.time | Time}}</div>
                        </div>
                        <div class="like">
                            <i>{{item.likedCount}}</i>
                            <i class="iconfont icon-dianzan"></i>
                        </div>
                        <div class="comment-c">
                            <p class="comment-text">{{item.content}}</p>
                        </div>
                    </div>
            </li>
        </ul>
    </div>
    <div class="news-comment">
        <p class="news-comment-title">最新评论</p>
        <ul>
            <li v-for="(item,index) in newsComment">
                <div class="comment-l">
                    <div>
                    <img :src="item.user.avatarUrl" alt="">
                    </div>
                </div>
                <div class="comment-r">
                    <div class="user-info">
                        <div class="user-name">{{item.user.nickname}}</div>
                        <div class="time">{{item.time | Time}}</div>
                    </div>
                    <div class="like">
                        <i>{{item.likedCount}}</i>
                        <i class="iconfont icon-dianzan"></i>
                    </div>
                    <div class="comment-c">
                        <p class="comment-text">{{item.content}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
        <Loading v-if="loading"></Loading>
    </div>
</div>
</template>
<script>
    import Loading from './loading.vue'
    import {mapState} from 'vuex'
import axios from 'axios'
import url from '@/common/js/api'
    export default{
    data(){
        return{
            hotComment:[],
            newsComment:[],
            loading: true,
        }
    },
        components:{
            Loading
        },
        computed:{
            ...mapState(['commentShow','commentInfo']),
        },
        methods:{
        back(){
            this.$store.dispatch('commentShow',false)
        },
            getComment(activeLink){
                axios.get(url + activeLink + this.commentInfo.id).then((res)=>{
                    if(res.status === res.data.code){
                        this.loading = false
                        this.hotComment = res.data.hotComments
                        this.newsComment = res.data.comments
                    }
                })
            },
            isId(id){
                switch (id)
                {
                    case 'PLAYLIST':
                        this.getComment('/comment/playlist?id=')
                        break
                    case 'SONG':
                        this.getComment('/comment/music?id=')
                        break
                    case 'RADIO':
                        this.getComment('/comment/dj?id=')
                        break
                    case 'MV':
                        this.getComment('/comment/mv?id=')
                        break
                    case 'ALBUM':
                        this.getComment('/comment/album?id=')
                        break
                }
            }
        },
        mounted(){
        this.$nextTick(()=>{

        })
        },
        watch:{
        commentInfo(val){
            this.loading = true
            this.hotComment = []
            this.newsComment = []
            this.isId(this.commentInfo.type)
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../common/sass/variable';
.comment{
    position: fixed;
    z-index: 1005;
    width: 100%;
    height: 100%;
    right: -2000px;
    top: 0;
    background-color: #fff;
    transition: all .5s;
    &.commenthide{
        right: 0;
        transition: all .5s;
    }
    .head{
        width: 100%;
        height: 48px;
        background-color: $background-default;
        position: fixed;
        padding-left:10px;
        .fa{
            position: absolute;
            left: 10px;
            top: 12px;
            font-size:24px;
            color: #fff;
        }
        h2{
            font-size:20px;
            color:white;
            line-height:48px;
            padding-left:30px;
        }
    }
    .songinfo{
        margin-top:48px;
        width: 100%;
        height: 89px;
        background-color: #fff;
        .album-cover{
            width: 70px;
            height: 70px;
            margin: 10px 0 0 10px;
            float:left;
            img{
                width: 70px;
                height: 70px;
                vertical-align: top;
            }
        }
            .song-info{
                float:left;
                margin-left:20px;
                font-size:20px;
                .song-name{
                    margin-top:20px;
                }
                .song-art{
                    font-size:18px;
                    color:#666;
                    margin-top:10px;
                }
            }
    }
    .comment-list{
        width: 100%;
        height: 100%;
        overflow:auto;
        .news-comment{
            padding-top:auto;
            ul>li:last-child{
                padding-bottom:150px;
            }
        }
        .hot-comment,.news-comment{
        background-color: #fff;
        .hot-comment-title,.news-comment-title{
            background-color: #F0F0F0;
            font-size:16px;
            padding:10px;
            padding-left:20px;
        }
        ul{
            li{
                display: flex;
                margin-top:10px;
                border-bottom:1px solid #eee;
                .comment-l{
                    display: flex;
                    justify-content: center;
                    width: 50px;
                    div{
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        overflow: hidden;
                        img{
                            height: 100%;
                            width: 100%;
                        }
                    }

                }
                .comment-r{
                    display: flex;
                    justify-content: space-between;
                    flex:1;
                    flex-wrap: wrap;
                    .user-info{
                        .user-name{
                            font-size:14px;
                        }
                        .time{
                            color:#888888;
                            margin-top:5px;
                        }
                    }
                    .like{
                        margin-right:20px;
                        line-height:35px;
                        i{
                            font-size:16px;
                        }
                        i:first-child{
                            font-size:13px;
                        }
                    }
                    .comment-c{
                        display: flex;
                        width: 100%;
                        p{
                            padding:10px 30px 30px 10px;
                            font-size:14px;
                            font-weight: 500;
                            word-break:break-all;

                        }
                    }
                }

            }
            }
        }
    }
    .playlist-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        span {
            font-size: 35px;
            color: $background-default;
            transition: all 0.5s;
            animation: circle .8s infinite cubic-bezier(.55, 0, .1, 1);
        }
        @keyframes circle {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
}
</style>