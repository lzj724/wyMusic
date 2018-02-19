import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Recommend = (resolve) => {
    import('../components/index/recommend/recommend').then((module) => {
        resolve(module)
    })
}

const Home = (resolve) => {
    import('../components/index/home').then((module) => {
        resolve(module)
    })
}

const Radio = (resolve) => {
    import('../components/index/radio/radio').then((module) => {
        resolve(module)
    })
}

const Top = (resolve) => {
    import('../components/index/top/top').then((module) => {
        resolve(module)
    })
}

const SongList = (resolve) => {
    import ('../components/index/songList/songList').then((module) => {
        resolve(module)
    })
}

const songListDetail = (resolve) => {
    import('../components/index/songListDetail').then((module) => {
        resolve(module)
    })
}

const Search = (resolve) => {
    import('../components/index/search/search').then((module) => {
        resolve(module)
    })
}

const SearchSong = (resolve) => {
    import('../components/index/search/song').then((module) => {
        resolve(module)
    })
}

const SearchArt = (resolve) => {
    import('../components/index/search/art').then((module) => {
        resolve(module)
    })
}

const SearchAlbum = (resolve) => {
    import('../components/index/search/album').then((module) => {
        resolve(module)
    })
}

const SearchList = (resolve) => {
    import('../components/index/search/songlist').then((module) => {
        resolve(module)
    })
}
const ProductsList = (resolve) => {
    import('../components/index/songList/productsList').then((module) => {
        resolve(module)
    })
}

const Album = (resolve) => {
    import('../components/index/album').then((module) => {
        resolve(module)
    })
}

const TopOfficial = (resolve) => {
    import('../components/index/top/topofficial').then((module)=>{
        resolve(module)
    })
}

const MV = (resolve) => {
    import('../components/index/MV').then((module)=>{
        resolve(module)
    })
}

const Art = (resolve) => {
    import('../components/index/art/art').then((module)=>{
        resolve(module)
    })
}

const ArtSongs = (resolve) => {
    import('../components/index/art/song').then((module)=>{
        resolve(module)
    })
}

const ArtAlbum = (resolve) => {
    import('../components/index/art/album').then((module)=>{
        resolve(module)
    })
}

const ArtInfo = (resolve) => {
    import('../components/index/art/info').then((module)=>{
        resolve(module)
    })
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home/songListDetail/:id',
            name: 'songListDetail',
            component: songListDetail
        },
        {
            path:'/home/top/official/:id',
            name:'TopOfficial',
            component:TopOfficial
        },
        {
          path:'/home/album/:id',
            name:'Album',
            component:Album
        },
        {
            path:'/home/songlist/productslist',
            name:'ProductsList',
            component:ProductsList
        },
        {
            path:'/home/art/:id',
            name:'Art',
            component:Art,
            redirect:'/home/art/:id/song',
            children:[
                {
                    path:'song',
                    name:'ArtSongs',
                    component:ArtSongs
                },
                {
                    path:'album',
                    name:'ArtAlbum',
                    component:ArtAlbum
                },
                {
                    path:'info',
                    name:'ArtInfo',
                    component:ArtInfo
                },
            ]
        },
        {
            path:'/home/mv/:id',
            name:'MV',
            component:MV
        },
        {
            path:'/home/search',
            name:'Search',
            component:Search,
            children:[
                {
                    path:'/home/search/song',
                    name:'SearchSong',
                    component:SearchSong
                },
                {
                    path:'/home/search/art',
                    name:'SearchArt',
                    component:SearchArt
                },
                {
                    path:'/home/search/album',
                    name:'SearchAlbum',
                    component:SearchAlbum
                },
                {
                    path:'/home/search/list',
                    name:'SearchList',
                    component:SearchList
                },
            ]
        },
        {
            path: '/home',
            name: 'Home',
            redirect: '/home/recommend',
            component: Home,
            children: [
                {
                    path: '/home/recommend',
                    name: 'Recommend',
                    component: Recommend
                },
                {
                    path: '/home/radio',
                    name: 'Radio',
                    component: Radio
                },
                {
                    path: '/home/top',
                    name: 'Top',
                    component: Top,
                },
                {
                    path: '/home/songlist',
                    name: 'SongList',
                    component: SongList
                },
            ]
        },
    ]
})
