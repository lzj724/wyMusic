<template lang="html">
<div class="search">
    <div class="head">
        <i class="fa fa-arrow-left" @click="back"></i>
        <input type="text" class="search-box" v-model="keyword" @keydown.13="toChild" placeholder="搜索音乐、歌手、歌词、用户">
        <i class="iconfont icon-search" @click="toChild"></i>
        <div class="showlist" v-show="show">
            <div class="showlist-title">搜索“{{keyword}}”</div>
            <ul >
                <li v-for="(item,index) in searchListMin" @click="toPlay(item.id)">
                    <i class="iconfont icon-search searchico"></i>
                    <a href="javascript:void(0)" >
                        {{item.name}}  -  {{item.artists[0].name}}
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="hot" v-if="!tabShow">
        <div class="content">
            <p class="search-hot">热门搜索</p>
            <ul class="clearfix">
                <li v-for="(item,index) in hotSearch">
                    <div @click="searchHotKey(item)">
                        {{item}}
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div class="tab clearfix" v-if="tabShow">
            <div class="menu-item" v-for="(item,index) in tabList" :class="{active:showTitle==item}" @click="searchTab(item)">
                <span class="item">{{tabTitle[index]}}</span>
            </div>
    </div>
    <keep-alive>
    <router-view :searchkey="keyProps"></router-view>
    </keep-alive>
</div>
</template>
<script>
    import url from '@/common/js/api'
    import axios from 'axios'
export default{
    data(){
      return {
          showTitle:'song',
          tabList:['song','art','album','list'],
          tabTitle:['单曲','歌手','专辑','歌单'],
          hotSearch: ['跨界歌王', '老大', '暧昧', '告白气球', '演员', '薛之谦', '因你', '张碧晨', '杨宗纬', '凉凉'],
          keyword:'',
          keyProps:'',
          searchList:[],
          searchListMin:[],
          show:false,
          tabShow:false
      }
    },
    watch:{
        keyword(val,old){
            for(let i=0;i<this.hotSearch.length;i++){
                if(this.keyword == this.hotSearch[i]){
                    return false
                }
            }
            this.search()
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
            this.tabShow = false
        },
        search(e){
                    axios.get(`${url}/search/suggest?keywords=${this.keyword}`).then((res) => {
                        if (res.data.code === res.status) {
                            this.show = true
                            this.searchList = res.data.result
                            this.searchListMin = res.data.result.songs.slice(0, 6)
                        } else if (res.data.code === 400) {
                            this.searchListMin = []
                            this.show = false
                        }
                    })
            if(this.keyword.length <= 0){
                this.searchListMin = []
            }
        },
        searchTab(item){
            this.showTitle = item
            this.$router.replace({path: `/home/search/${item}`})
        },
        searchHotKey(key){
            this.keyword = key
            this.toChild()
            this.show = false
        },
        toChild(){
            this.$router.push({path: `/home/search/song`})
            this.show = false
            this.tabShow = true
            this.keyProps = this.keyword
        },
        toPlay(id){
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
                this.$store.state.showPlayer = true
                this.$store.dispatch('nav',true)
                this.show = false
            }))
        }
    },
    mounted(){
    }
}
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../../common/sass/variable';

.search{
    width: 100%;
    .head{
        height: 48px;
        width: 100%;
        background-color: $background-default;
        position: fixed;
        z-index:100;
        top: 0;
        left: 0;
        .fa{
            float:left;
            font-size:24px;
            line-height:48px;
            color:white;
            padding-left:10px;
            padding-right:15px;
        }
        .iconfont{
            float:right;
            font-size:24px;
            padding-right:10px;
            color:white;
            line-height:48px;

        }
        .search-box{
            float:left;
            width: 78%;
            height: 25px;
            background-color: $background-default;
            border:none;
            border-bottom:2px solid #fff;
            outline-style: none;
            color:#eee;
            padding-top:10px;
            &::-webkit-input-placeholder{
                color:#eee;
                font-size:14px;
            }
        }
        .showlist{
            position: absolute;
            left: 20px;
            top: 50px;
            width: 85%;
            background-color: #F3F3F3;
            box-shadow: 3px 3px 10px #ccc,-1px 3px 10px #ccc;
            .showlist-title{
                font-size:18px;
                color:#679DC5;
                padding:15px 20px;
                border-bottom:1px solid #ccc;
            }
            ul{
                overflow: hidden;
                li{
                    border-bottom:1px solid #ccc;
                    position: relative;
                    &:last-child{
                        border-bottom: none;
                    }
                    .searchico{
                        position: absolute;
                        left: 10px;
                        color:black;
                        font-size:18px;
                    }
                    a{
                        display: block;
                        color:#888;
                        margin-left:25px;
                        padding:13px;
                        padding-top:15px;
                        font-size:16px;
                    }
                }
            }
        }
    }

    .hot{
        margin-top:87px;
        width:100%;
        .content{
            width: 100%;
            .search-hot{
                margin-left:30px;
                margin-top:39px;
                padding-top: 10px;
                padding-bottom:10px;
                font-size:16px;
                color:red;
            }
            ul{
                margin-left:15px;
                margin-right:20px;
                li{
                    float:left;
                    margin:7px;
                    div{
                        display: block;
                        color:black;
                        font-size:15px;
                        padding:9px;
                        padding-right:11px;
                        border-radius: 13px;
                        border:1px solid #aaa;
                        text-align: center;
                    }
                }
            }
        }
    }

    .tab {
        margin-top: 48px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        height: 39px;
        background-color: white;
        .menu-item {
            float: left;
            width: 25%;
            height: 100%;
            text-align: center;
            span {
                line-height: 35px;
                font-size: 14px;
                color: $color-default;
            }
            &.active {
                border-bottom: 4px solid $background-default;
            }
        }
    }

}
</style>