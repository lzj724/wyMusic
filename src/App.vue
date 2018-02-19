<template>
  <div id="app">
    <router-view></router-view>
    <Play></Play>
    <AudioNav></AudioNav>
    <SongList></SongList>
    <HMask></HMask>
    <HComment></HComment>
  </div>
</template>
<script>
    import Home from './components/index/home'
    import Play from './components/index/play'
    import AudioNav from './components/index/audio-nav'
    import SongList from './components/index/list'
    import HMask from './components/index/mask'
    import HComment from './components/index/comment'
export default {
    components:{
        Home,
        Play,
        AudioNav,
        SongList,
        HMask,
        HComment
    },
}
</script>

<style lang="scss" type="text/scss">

</style>
