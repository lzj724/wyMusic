<template lang="html">
<div class="mask" @click="hide" :class="{hide:!mask}"></div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
    export default{
        computed:{
            ...mapState(['mask'])
        },
        methods:{
            hide(){
                this.$store.dispatch('mask',false)
                this.$store.dispatch('showList')

            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
.mask{
    width: 100%;
    height: 100%;
    z-index:1002;
    display: block;
    top: 0;
    left: 0;
    background-color: transparent;
    position: fixed;
    &.hide{
        display: none;
    }
}
</style>