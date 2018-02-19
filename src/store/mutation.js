import * as types from './mutation-types'

const mutations = {
    [types.CUR_PLAYLIST_INFO](state,obj){
        if(obj.coverImgUrl){
            obj.picUrl = obj.coverImgUrl
        }
        state.curPlaylistDetail = obj
    },
    [types.CUR_ACTIVEPLAY_INFO](state,arr){
        const obj = {
            url:arr[0].data[0].url,
            total:arr[1].total,
            id:arr[2][0].id,
            name:arr[2][0].name,
            art:arr[2][0].ar[0].name,
            album:arr[2][0].al.name,
            albumPic:arr[2][0].al.picUrl,
            lyc:arr[3].lrc
        }
        state.curActiveSong = obj
    },
    [types.CUR_ALLSONGLIST](state,arr){
        state.curAllSongList = arr
    },
    [types.SWITCH_PLAYING](state,status){
        state.playing = status
    },
    [types.SHOWLIST](state){
        state.showList = !state.showList
    },
    [types.MUSICINDEX](state,index){
        state.musicIndex = index
    },
    [types.MASK](state,bool){
        state.mask = bool
    },
    [types.NAV](state,bool){
        state.nav = bool
    },
    [types.CONMENT_SHOW](state,bool){
        state.commentShow = bool
    },
    [types.COMMENTINFO](state,obj){
        state.commentInfo = obj
    },
    [types.PRODUCT_LISTS](state,arr){
        state.productLists = arr
    },
}

export default mutations