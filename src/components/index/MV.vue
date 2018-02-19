<template lang="html">
    <div class="mv">
        <MHeader :headerTitle="title"></MHeader>
        <div class="video-container" ref="video">
            <video width="100%" :src="MVUrl" controls></video>
        </div>
        <div class="container">
        <div class="art-info">
            <p class="name">{{MVData.name}}</p>
            <div class="art">
                <p class="artist">歌手：{{MVData.art}}</p>
                <p class="play-count">播放次数：{{MVData.playCount}}次</p>
            </div>
            <p class="time">发行时间：{{MVData.updateTime}}</p>
            <div class="desc">{{MVData.desc}}</div>
        </div>
        <div class="control-menu">
            <div class="sub">
                <i class="iconfont icon-wenjianjia"></i>
                <p>{{MVData.subCount}}</p>
            </div>
            <div class="comment">
                <i class="iconfont icon-pinglun"></i>
                <p>{{MVData.likeCount}}</p>
            </div>
            <div class="share">
                <i class="iconfont icon-icglobaltitlebar48iconfontshare"></i>
                <p>{{MVData.shareCount}}</p>
            </div>
            <div class="down">
                <i class="iconfont icon-download"></i>
                <p>下载</p>
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
        </div>
        </div>
    </div>
</template>
<script>
    import url from '@/common/js/api'
    import MHeader from './header-title'
    export default{
        computed: {},
        data(){
            return {
                MVData: {},
                MVUrl: '',
                title: 'MV',
                hotComment:[],
                newsComment:[],
            }
        },
        components: {
            MHeader
        },
        methods: {
            getMV(){
                this.$Axios.get(`${url}/mv?mvid=${this.$route.params.id}`).then(res => {
                    this.MVData = {
                        name: res.data.data.name,
                        art: res.data.data.artistName,
                        playCount: res.data.data.playCount,
                        videoURL: res.data.data.brs[480],
                        desc: res.data.data.desc,
                        updateTime: res.data.data.publishTime,
                        shareCount: res.data.data.shareCount,
                        subCount: res.data.data.subCount,
                        likeCount: res.data.data.likeCount,
                    }
                    this.MVUrl = url + '/mv/url?url=' + res.data.data.brs[480]
                    console.log(this.MVData);
                })
            },
            getComment(){
                this.$Axios.get(`${url}/comment/mv?id=${this.$route.params.id}`).then(res=>{
                    if(res.status === res.data.code){
                        this.loading = false
                        this.hotComment = res.data.hotComments
                        this.newsComment = res.data.comments
                        console.log(this.hotComment);
                        console.log(this.newsComment);
                    }
                })
            }
        },
        created(){
            this.getMV()
            this.getComment()
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../common/sass/variable';
    .mv {
        .video-container {
            padding-top: 48px;
        }
        .container{
            height: 440px;
            overflow-y:auto;
        .art-info {
            margin: 20px 10px;
            margin-bottom:30px;
            .name {
                font-size: 16px;
            }
            .art {
                margin-top: 10px;
                display: flex;
                .artist {
                    color: #6ea4ff;
                    font-size: 14px;
                    padding-right: 20px;
                    border-right: 1px solid #666;
                }
                .play-count {
                    padding-left: 20px;
                    font-size: 14px;
                    color: #777;
                }
            }
            .time {
                padding: 10px 0;
                font-size: 14px;
                color: #777;
            }
            .desc {
                color: #000;
                font-size: 14px;
                line-height: 16px;
            }
        }
        .control-menu {
            margin-bottom:20px;
            display: flex;
            div {
                width: 25%;
                text-align: center;
                    p {
                        padding-top:5px;
                    }
            }
        }
        .comment-list{
            .news-comment{
                padding-top:10px;
            }
            .hot-comment,.news-comment{
                background-color: #fff;
                .hot-comment-title,.news-comment-title{
                    font-size:16px;
                    padding:5px;
                    &:before{
                        content:'';
                        border-left:3px solid $background-default;
                        padding:2px 0;
                        padding-right:15px;
                    }
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
        }
    }
</style>