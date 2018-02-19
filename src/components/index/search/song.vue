<template lang="html">
<div class="song">
    <div class="song-items">
        <ul>
            <li v-for="(item,index) in songList" @click="toPlay(item.id)">
                <p class="song-name">{{item.name}}</p>
                <span class="song-art" v-for="art in item.artists">{{art.name}}</span>
                <span class="song-album"> - {{item.album.name}}</span>
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
            songList:[]
        }
    },
    props:['searchkey'],
    methods:{
        watch:{
            searchkey(val){
              this.getKeySearch()
          }
        },
        getKeySearch(){
            this.$Axios.get(`${url}/search?keywords=${this.searchkey}&type=1`).then((res) => {
                if (res.data.code === res.status) {
                    this.songList = res.data.result.songs
                }
            })
        },
        toPlay(id){
            console.log(id);
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
                this.$store.dispatch('nav',true)
                this.$store.state.showPlayer = true
            }))
        }
    },
    mounted(){
        this.getKeySearch()
    }
}
</script>
<style type="text/scss" lang="scss" scoped>
.song{
    margin-top:91px;
    width: 100%;
    .song-items{
        width: 100%;
        background-color: rgba(0,0,0,.05);
        ul{
            width: 100%;
            li{
                border-bottom:1px solid #aaa;
                padding:13px 0;
                p,span{
                    padding-left:20px;
                    font-size:16px;
                    padding-bottom:10px;
                    font-weight: 500;
                }
                span{
                    padding-left:5px;
                    &:nth-child(2){
                        padding-left:20px;
                    }
                }
            }
        }
    }
}
</style>