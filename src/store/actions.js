import * as types from './mutation-types'

export default {
    curPlaylistDetail({commit},obj) {
        commit(types.CUR_PLAYLIST_INFO, obj)
    },
    activeSong({commit},arr){
        commit(types.CUR_ACTIVEPLAY_INFO,arr)
    },
    allSongList({commit},arr){
        commit(types.CUR_ALLSONGLIST,arr)
    },
    switchPlaying({commit}, status) {
        commit(types.SWITCH_PLAYING, status)
    },
    showList({commit}){
        commit(types.SHOWLIST)
    },
    musicIndex({commit},index){
        commit(types.MUSICINDEX,index)
    },
    mask({commit},bool){
        commit(types.MASK,bool)
    },
    nav({commit},bool){
        commit(types.NAV,bool)
    },
    commentShow({commit},bool){
        commit(types.CONMENT_SHOW,bool)
    },
    commentInfo({commit},obj){
        commit(types.COMMENTINFO,obj)
    },
    productLists({commit},arr){
        commit(types.PRODUCT_LISTS,arr)
    },
}