<template lang="html">
    <div class="album">
        <MHead :headerTitle="header"></MHead>
        <div class="songlist-description">
            <div class="songlist-cover">
                <img :src="artinfo.albumPic">
            </span>
            </div>
            <div class="songlist-avatar">
                <div class="avatar-name">{{artinfo.name}}</div>
                <div class="avatar-art">歌手:{{artinfo.art}}</div>
                <div class="avatar-time">发行时间：{{artinfo.time | YMD}}</div>
                <div class="avatar-user">
                    <div class="user-avatar"
                         :style="`background:url(${artinfo.albumPic})no-repeat center/cover;`"></div>
                </div>
            </div>
            <div class="songlist-menu">
                <ul>
                    <li>
                        <a href="javascript:void(0)">
                            <i class="iconfont icon-wenjianjia"></i>
                            <p>576</p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" @click="toComment">
                            <i class="iconfont icon-pinglun"></i>
                            <p>{{artinfo.comment}}</p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <i class="iconfont icon-icglobaltitlebar48iconfontshare"></i>
                            <p>{{artinfo.share}}</p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <i class="iconfont icon-download"></i>
                            <p>下载</p>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="songlist-bg" :style="`background:url(${artinfo.albumPic}) no-repeat center;`"></div>
        </div>
        <div class="songlist-content">
            <div class="allplay">
                <a href="javascript:void(0)">
                    <i class="iconfont icon-iconfont31"></i>
                    <span>播放全部（{{songList.length}}首）</span>
                </a>
            </div>
            <ul>
                <li v-for="(item,index) in songList" @click.stop="getActiveSong(item.id)">
                    <span class="number">{{index<9?'0'+(index+1):index+1}}</span>
                    <a href="javascript:void(0)">
                        <p class="song-name">{{item.name}}</p>
                        <p class="song-art">{{item.ar[0].name}}</p>
                    </a>
                </li>
            </ul>
            <div class="playlist-loading" v-if="loading">
                <span class="fa fa-circle-o-notch"></span>
            </div>
        </div>
    </div>
</template>
<script>
    import url from '@/common/js/api'
    import MHead from './header-title.vue'
    import axios from 'axios'
    import {mapActions, mapState} from 'vuex'
    export default{
        data(){
            return {
                header:'专辑',
                songList: [],
                artinfo: {},
                loading: true,
                allSongList: [],
                ActiveSongInfo: {}
            }
        },
        computed: {
            ...mapState(['curPlaylistDetail'])
        },
        created(){
            this.$nextTick(() => {
                this.getsongList()
            })
        },
        components:{
            MHead
        },
        methods: {
            back(){
                this.$router.go(-1)
            },
            toComment(){
                const obj = {
                    id:this.$route.params.id,
                    albumPic:this.artinfo.albumPic,
                    art:this.artinfo.art,
                    name:this.artinfo.name,
                    total:this.artinfo.comment,
                    type:'ALBUM'
                }
                this.$store.dispatch('commentShow',true)
                this.$store.dispatch('commentInfo',obj)

            },
            getsongList(){
                this.$Axios.get(`${url}/album`,{
                    params:{
                        id:this.$route.params.id
                    }
                }).then(res => {
                    if (res.status === res.data.code) {
                        console.log(res.data);
                        this.loading = false
                        this.artinfo = {
                            name:res.data.album.name,
                            art:res.data.album.artists[0].name,
                            albumPic:res.data.album.picUrl,
                            time:res.data.album.publishTime,
                            comment:res.data.album.info.commentCount,
                            share:res.data.album.info.shareCount,
                        }
                        this.songList = res.data.songs
                        this.songList.forEach(item=>{
                            let obj = {
                                id: item.id,
                                name: item.name,
                                art: item.ar
                            }
                            this.allSongList.push(obj)
                        })

                    }
                })
            },
            getActiveSong(id){
                this.$store.state.showPlayer = true
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
                    this.$store.dispatch('allSongList', this.allSongList)
                    this.$store.dispatch('nav',true)
                }))
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../common/sass/variable';

    .album {
        width: 100%;
        background-color: #fff;
        z-index: 20;
        .songlist-description {
            position: relative;
            margin-top: 48px;
            width: 100%;
            height: 214px;
            .songlist-bg {
                width: 100%;
                height: 100%;
                background-size: 100%;
                filter: blur(30px) saturate(80%);
                z-index: -5;
            }
            .songlist-cover {
                position: absolute;
                top: 10px;
                left: 10px;
                height: 138px;
                width: 138px;
                z-index: 10;
                img {
                    width: 100%;
                    height: 100%;
                }
                & > span {
                    position: absolute;
                    right: 10px;
                    top: 5px;
                    color: white;
                    font-size: 12px;
                    & > span {
                        padding-left: 5px;

                    }
                }
            }
            .songlist-avatar {
                position: absolute;
                top: 0;
                left: 160px;
                z-index: 10;
                font-size: 16px;
                color: white;
                font-weight: 500;
                padding-right: 10px;
                margin-top:20px;
                .avatar-art {
                    margin-top: 20px;
                    padding-left:20px;
                    font-size:15px;
                }
                .avatar-time{
                    margin-top:20px;
                    margin-left:10px;
                    font-size:14px;
                }
                .avatar-name {
                    padding-left: 10px;
                    font-size: 17px;
                    line-height: 20px;
                    color: white;
                }
            }
            .songlist-menu {
                width: 100%;
                position: absolute;
                bottom: 10px;
                z-index: 10;
                ul {
                    width: 100%;
                    li {
                        float: left;
                        width: 25%;
                        text-align: center;
                        a {
                            display: block;
                            color: white;
                            font-weight: 700;
                            p {
                                margin-top: 5px;
                            }
                        }
                    }
                }
            }
        }
        .songlist-content {
            width: 100%;
            .allplay {
                width: 100%;
                height: 100%;
                border-bottom: 1px solid #eee;
                a {
                    display: inline-block;
                    color: black;
                    margin: 15px 0;
                    margin-left: 15px;
                    span {
                        padding-left: 17px;
                        font-size: 14px;
                    }
                }
            }
            ul {
                width: 100%;
                li {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-bottom: 1px solid #eee;
                    &:last-child {
                        border-bottom: none;
                    }
                    .number {
                        font-size: 24px;
                        margin-left: 15px;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    a {
                        padding: 15px 0;
                        padding-left: 65px;
                        height: 100%;
                        color: black;
                        display: inline-block;
                        font-size: 15px;
                        .song-art {
                            color: #555;
                            font-size: 13px;
                            margin-top: 5px;
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