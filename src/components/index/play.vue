<template lang="html">
    <div class="play" :class="{show:showPlayer}">
        <audio autoplay :src="curActiveSong.url"
               id="audio"
               @timeupdate="timeProgress"
               @play="startPlay"
               @ended="ended"
               ref="audio"
        ></audio>
        <div class="cover-bg" :style="`background:url(${curActiveSong.albumPic})`"></div>
        <div class="play-t">
            <i class="fa fa-arrow-left" @click="back"></i>
            <div class="play-title">
                <p class="name">{{curActiveSong.name}}</p>
                <p class="art">{{curActiveSong.art}}</p>
            </div>
            <i class="iconfont icon-icglobaltitlebar48iconfontshare"></i>
        </div>
        <div class="play-c" v-show="!showlyc" @click="showLyc">
            <div class="img-t">
            </div>
            <div class="img-c">
            </div>
            <div class="img-cover" @click="showLyc">
                <img class="cover" :src="curActiveSong.albumPic" alt="" width="180" height="180">
            </div>
        </div>
        <div class="lyc" v-show="showlyc" @click="showLyc">
            <ul ref="lyric_wrap" class="lyric-wrap" v-if="lyric" :style="`transform: translateY(${marginTop}px)`">
                <li v-for="(value,key) in lyric">{{value}}</li>
            </ul>
            <ul v-else class="lyric-wrap">
                <li>暂无歌词</li>
            </ul>
        </div>
        <div class="play-b">
            <div class="play-bar" v-show="!showlyc">
                <ul>
                    <li>
                        <a href="javascript:void(0)">
                            <span class="iconfont icon-like"></span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <span class="iconfont icon-download"></span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" @click="openComment">
                            <span class="iconfont icon-pinglun" ></span>
                            <span class="total">{{curActiveSong.total>999?'999+':curActiveSong.total}}</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            <span class="iconfont icon-more1170511easyiconnet"></span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="play-control">
                <div class="progress">
                    <span class="curtime">{{curTime | TimeFormat}}</span>
                    <div class="progress-bar" ref="progress" @touchmove.stop="moveProgress" @touchend.stop="moveProgressEnd"  @click.stop="touchProgress">
                        <div class="cur-progress" :style="{width:curProgress}"></div>
                        <div class="idot" :style="{left:curIdot}"></div>
                    </div>
                    <span class="alltime">{{allTime | TimeFormat}}</span>
                </div>
                <div class="control">
                    <div class="play-mode" @click="PlayMode">
                            <i class="iconfont" :class="{
                        'icon-shunxubofang': playMode === 1,
                        'icon-suijibofang': playMode === 2,
                        'icon-danquxunhuan': playMode === 3
                        }" ></i>
                        </div>
                        <div class="prev" @click="prev">
                            <i class="iconfont icon-shangyishou1" ></i>
                        </div>
                        <div class="ctrl" >
                            <i class="iconfont icon-iconfontplay" v-if="!playing" @click="play"></i>
                            <i class="iconfont icon-zanting" v-else="playing" @click="pause"></i>
                        </div>
                        <div class="next" @click="next">
                            <i class="iconfont icon-xiayishou1" ></i>
                        </div>
                        <div class="list" @click="showList">
                            <i class="iconfont icon-liebiao" ></i>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    export default{
        data(){
            return {
                autoPlay:true,
                curTime:0,
                allTime:0,
                playMode:1,//1顺序播放，2随机播放，3循环播放
                curIdot:0,
                curProgress:'0',
                isMove:false,
                showlyc:false,
                marginTop:0,
                parsed:{},
            }
        },
        computed: {
            ...mapState(['curActiveSong','showPlayer','curAllSongList','musicIndex','playing']),
            lyric() {
                if (this.curActiveSong.lyc !== undefined) {
                    return this.parseLrc(this.curActiveSong.lyc.lyric)
                } else {
                    return false
                }
            },
        },
        methods: {
            showList(){
                this.$store.dispatch('mask',true)
                this.$store.dispatch('showList')
            },
            randomId(){
                let length = this.curAllSongList.length
                let  id = parseInt(Math.random()*length)
                if(this.musicIndex !== id){
                    return id
                } else{
                    this.randomId()
                }
            },
            back(){
                this.$store.state.showPlayer = false
            },
            openComment(){
                const obj = {
                    id:this.curActiveSong.id,
                    albumPic:this.curActiveSong.albumPic,
                    art:this.curActiveSong.art,
                    name:this.curActiveSong.name,
                    total:this.curActiveSong.total,
                    type:'SONG'
                }
                this.$store.dispatch('commentShow',true)
                this.$store.dispatch('commentInfo',obj)

            },
            startPlay(){
                if (this.lyric.length <= 0) {
                    return
                }
                this.$store.dispatch('switchPlaying', true)
                this.setParsed()
            },
            ended(){
                this.$store.dispatch('switchPlaying', false)
                this.next()
            },
            next(){
                if (this.playMode === 1) {
                    this.$store.dispatch('musicIndex', this.musicIndex + 1)
                } else if (this.playMode === 2) {
                    const num = this.randomId()
                    this.$store.dispatch('musicIndex',num )
                }
                this.$store.dispatch('showList')
            },
            prev(){
                if (this.playMode === 1) {
                    !this.musicIndex
                        ? this.$store.dispatch('musicIndex', 0)
                        : this.$store.dispatch('musicIndex', this.musicIndex - 1)
                } else if (this.playMode === 2) {
                    const num = this.randomId()
                    this.$store.dispatch('musicIndex', num)
                }
                this.$store.dispatch('showList')
            },
            PlayMode(){
                this.playMode < 3 ? this.playMode++ : this.playMode = 1
            },
            showLyc(){
                this.showlyc = !this.showlyc
            },
            timeProgress(){
                if(this.isMove) return
                const audioid = this.$refs.audio;
                this.curTime = audioid.currentTime
                this.allTime = audioid.duration
                var cur = (this.curTime / this.allTime) * this.$refs.progress.offsetWidth
                this.curProgress = cur + 'px'
                this.curIdot = (cur - 7) + 'px'
                this.updateLyric(audioid)
            },
            //歌词滚动
            updateLyric(audioid){
                let text_temp;
                let data = this.parsed
                if(!data) return
                let currentTime = Math.round(audioid.currentTime)
                let lrc = data[currentTime]
                if(!lrc) return
                let text = lrc.text
                if(text != text_temp){
                    document.querySelectorAll('.lyric_wrap .on').forEach((v, i) => {
                        v.classList.remove('on')
                    })
                    let num = document.querySelector('.lyric-wrap').querySelectorAll('li:nth-child(' + (lrc.index + 1) + ')')[0]
                    num.classList.add('on')
                    let top = Math.min(0, -lrc.top);
                    this.marginTop = top
                    text_temp = text;
                }
            },
            //解析歌词
            parseLrc(lrc) {
                var lyrics = lrc.split("\n");
                var lrcObj = {};
                for (var i = 0; i < lyrics.length; i++) {
                    var lyric = decodeURIComponent(lyrics[i]);
                    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                    var timeRegExpArr = lyric.match(timeReg);
                    if (!timeRegExpArr)continue;
                    var clause = lyric.replace(timeReg, '');
                    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                        var t = timeRegExpArr[k];
                        var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                            sec = Number(String(t.match(/\:\d*/i)).slice(1));
                        var time = min * 60 + sec;
                        lrcObj[time] = clause;
                    }
                }
                return lrcObj;
            },
            //保存歌词数据
            setParsed() {
                let i = 0
                if (this.lyric.length <= 0) {
                    return
                }
                var arr = []
                for (let k in this.lyric) {
                    arr.push(parseInt(k))
                }
                //循环数组来为parsed赋值
                arr.sort((a, b) => a - b).forEach((v, i) => {
                    this.parsed[v] = {
                        index: i++,
                        text: this.lyric[v],
                        top: (i * 30) * 1
                    }
                })

            },
            touchProgress(e){
                var curTime = (e.clientX - this.$refs.progress.offsetLeft) * this.$refs.progress.offsetWidth / this.allTime
                this.$refs.audio.currentTime = curTime
            },
            moveProgressEnd(e){
                this.isMove =false
                var pro = this.$refs.progress
//                var curTime = (e.changedTouches[0].clientX - pro.offsetLeft) * pro.offsetWidth / this.allTime
                this.$refs.audio.currentTime = this.curTime
            },
            moveProgress(e){
                this.isMove = true
                if(this.isMove){
                    const pro = this.$refs.progress
                    let curWidth = (e.touches[0].clientX - pro.offsetLeft)
                    if(curWidth <= 0) {
                        curWidth = 0
                    }else if(curWidth >=300){
                        curWidth = 300
                    }
                    this.curProgress =  curWidth - 5 + 'px'
                    this.curIdot = curWidth - 5 + 'px'
                    this.curTime = curWidth - 5

                }
            },
            play(){
                this.$refs.audio.play()
                this.$store.dispatch('switchPlaying', true)
            },
            pause(){
                this.$refs.audio.pause()
                this.$store.dispatch('switchPlaying', false)
            }
        },
        mounted(){
            this.$nextTick(()=>{
            })
        },
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .play {
        position: fixed;
        z-index: 1001;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        top: 2000px;
        background-color: #eee;
        transition: all .7s;
        &.show{
            top: 0;
            transition: all .3s;
        }
        &.animated{
            animation-duration: .1s;
        }
        .cover-bg {
            position: absolute;
            top: -30%;
            right: -30%;
            filter: blur(30px) brightness(40%);
            width: 180%;
            height: 180%;
            z-index: -10;
        }
        .play-t {
            position: absolute;
            width: 100%;
            height: 56px;
            color: white;
            overflow: hidden;
            border-bottom: 1px solid #888;
            .fa {
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 24px;
            }
            .play-title {
                width: 100%;
                margin: 10px 60px;
                .name {
                    font-size: 16px;
                    margin-bottom:5px;
                }
                .art {
                    font-size: 14px;
                    color: #bbb;
                }
            }
            .iconfont {
                position: absolute;
                top: 10px;
                right: 20px;
            }
        }
        .play-c {
            width: 100%;
            height: 100%;
            margin-top: 56px;
            .img-t {
                width: 40%;
                height: 50%;
                position: absolute;
                top: -6px;
                left: 50%;
                transform: translateX(-50%);
                background: url(../../common/image/player-needle.png) no-repeat center;
                background-size: 100%;
            }
            .img-c {
                width: 60%;
                height: 60%;
                position: absolute;
                left: 50%;
                top: 18%;
                transform: translateX(-50%);
                background: url(../../common/image/record-bg.png) no-repeat center;
                background-size: 100%;
                z-index: -1;
            }
            .img-cover {
                width: 170px;
                height: 170px;
                position: absolute;
                left: 50%;
                top: 36%;
                transform: translateX(-50%);
                z-index: -5;
                .cover {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    animation: circle 20s infinite linear;
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
        .lyc{
            position: absolute;
            left: 0;
            right: 0;
            top: 70px;
            bottom: 120px;
            color:white;
            overflow: hidden;
            width: 100%;
            ul{
                padding-top: 65%;
                transition: all .8s;
                li{
                    font-size:14px;
                    line-height:30px;
                    text-align: center;
                    color:#ccc;
                    &.on{
                        color: #54fffb;
                    }
                }
            }
        }
        .play-b {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 160px;
            z-index: 50;
            .play-bar {
                position: absolute;
                top: 20px;
                width: 100%;
                height: 18px;
                margin:0 50px;
                ul {
                    width: 100%;
                    li {
                        float: left;
                        width: 20%;
                        text-align: center;
                        a {
                            display: block;
                            text-decoration: none;
                            color: white;
                            position: relative;
                            .total{
                                position: absolute;
                                right: 12px;
                                top: -11px;
                                font-size:11px;
                                font-weight: 300;
                            }
                            span{
                                font-size:18px;
                            }
                        }
                    }
                }
            }
            .play-control{
                width: 100%;
                position: absolute;
                bottom: 30px;
                .progress{
                    width: 100%;
                    height: 10px;
                    position: relative;
                    margin-top:25px;
                    .curtime{
                        margin-right:3px;
                        margin-left:7px;
                        color:white;
                    }
                    .progress-bar{
                        height: 1px;
                        width: 74%;
                        position: absolute;
                        top: 50%;
                        left: 47px;
                        background-color: #fff;
                        .cur-progress{
                            width: 100%;
                            height: 1px;
                            background-color: red;
                        }
                        .idot{
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            background-color: #fff;
                            position: absolute;
                            top: -5px;
                            box-shadow: 0 0 20px #08fbff;
                        }
                    }
                    .alltime{
                        float:right;
                        margin-right:10px;
                        color:white;
                    }
                }
                .control{
                    width: 100%;
                    margin-top:35px;
                        div{
                            float:left;
                            text-align: center;
                            color:white;
                            width: 20%;
                        }
                    }
                }
        }
    }
</style>