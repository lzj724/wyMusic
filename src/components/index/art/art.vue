<template lang="html">
    <div class="art">
        <MHeader :headerTitle="title"></MHeader>
        <div class="cover" :style="`background:url(${artSong.artist.picUrl})no-repeat center /cover`">
        </div>
        <div class="tab-item">
            <div class="hot" :class="{active:show=='song'}" @click="changeShow('song')">
                <p>热门（{{artSong.hotSongs.length}}）</p>
            </div>
            <div class="album" :class="{active:show=='album'}" @click="changeShow('album')">
                <p>专辑（{{artAlbum.hotAlbums.length}}）</p>
            </div>
            <div class="info" :class="{active:show=='info'}" @click="changeShow('info')">
                <p>歌手信息</p>
            </div>
        </div>
        <router-view :songData="ArtData" :artName="title"></router-view>
    </div>
</template>
<script>
    import url from '@/common/js/api'
    import axios from 'axios'
    import MHeader from '../header-title'
    export default{
        data(){
            return {
                artDesc: [],
                artSong: [],
                artAlbum: [],
                title: '',
                show: '',
                ArtData: []
            }
        },
        components: {
            MHeader
        },
        methods: {
            changeShow(title){
                this.show = title
                if (title == 'song') {
                    this.ArtData = this.artSong
                    this.$router.replace({path: `/home/art/${this.$route.params.id}/song`})
                } else if (title == 'album') {
                    this.ArtData = this.artAlbum
                    this.$router.replace({path: `/home/art/${this.$route.params.id}/album`})
                } else if (title == 'info') {
                    this.ArtData = this.artDesc
                    this.$router.replace({path: `/home/art/${this.$route.params.id}/info`})
                }
            },
            getData(){
                let id = this.$route.params.id

                function album() {
                    return axios.get(`${url}/artist/album?id=${id}`)
                }

                function song() {
                    return axios.get(`${url}/artists?id=${id}`)
                }

                function desc() {
                    return axios.get(`${url}/artist/desc?id=${id}`)
                }

                axios.all([desc(), song(), album()]).then(axios.spread((res1, res2, res3) => {
                    this.title = res2.data.artist.name
                    this.artSong = res2.data
                    this.artDesc = res1.data
                    this.artAlbum = res3.data
                    this.changeShow(this.show)
                }))
            },
        },
        mounted(){
            this.$nextTick(() => {
                this.getData()
                var activeLink = this.$route.path.split('/')[4]
                this.show = activeLink
            })
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../../common/sass/variable';

    .art {
        .cover {
            margin-top: 48px;
            height: 214px;
        }
        .tab-item {
            height: 48px;
            width: 100%;
            display: flex;
            div {
                width: 33.3%;
                height: 45px;
                line-height: 45px;
                text-align: center;
                font-size: 16px;
                &.active {
                    color: $background-default;
                    border-bottom: 3px solid $background-default;
                }
            }
        }
    }
</style>