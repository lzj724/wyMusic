<template lang="html">
<div class="song">
    <ul>
        <li v-for="(item,index) in songData.hotSongs" @click.stop="getActiveSong(item.id)">
            <span class="number">{{index<9?'0'+(index+1):index+1}}</span>
            <div>
                <p class="song-name">{{item.name}}</p>
                <p class="song-art">{{item.ar[0].name}} - {{item.al.name}}</p>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
    import url from '@/common/js/api'
    import axios from 'axios'
    export default{
        data(){
            return{
                allSongList:[]
            }
        },
        props:['songData','artName'],
        methods:{
            getsongList(){
                        this.songData.hotSongs.forEach(item => {
                            let obj = {
                                id: item.id,
                                name: item.name,
                                art: item.ar
                            }
                            this.allSongList.push(obj)
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
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.getsongList()
            })
        }

    }
</script>
<style type="text/scss" lang="scss" scoped>
.song{
    ul {
        overflow: auto;
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
            div {
                padding: 15px 0;
                padding-left: 65px;
                height: 100%;
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
</style>