<template lang="html">
<div class="top">
    <div class="top-official" v-if="topUp.length !== 0">
        <h3>官方榜</h3>
            <ul>
                <li v-for="(item,index) in topUp" @click="toOfficial(item.id,item)">
                    <div class="top-l">
                        <img :src="item.coverImgUrl">
                    </div>
                    <div class="top-r">
                        <p v-for="num in 3">{{num}}.{{item.tracks[num-1].artists[0].name}} - {{item.tracks[num-1].name}}</p>
                    </div>
                </li>
            </ul>
    </div>
    <div class="top-world" v-if="topWorld.length !== 0">
        <h3>全球榜</h3>
        <ul>
            <li v-for="(item,index) in topWorld" @click="toOfficial(item.id,item)">
                <img :src="item.coverImgUrl">
                <p class="top-name">{{item.name}}</p>
            </li>
        </ul>
    </div>
    <Loading v-if="loading"></Loading>
</div>
</template>
<script>
    import Loading from '../loading'
    import axios from 'axios'
    import url from '@/common/js/api'
    import {mapState} from 'vuex'
export default{
    data(){
        return{
            topUp:[],
            topWorld:[],
            loading:true
        }
    },
    components:{
        Loading
    },
    methods:{
        get(){
            function top1(){
                return axios.get(`${url}/top/list?idx=3`)
            }
            function top2(){
                return axios.get(`${url}/top/list?idx=0`)
            }
            function top3(){
                return axios.get(`${url}/top/list?idx=2`)
            }
            function top4(){
                return axios.get(`${url}/top/list?idx=1`)
            }
            axios.all([top1(),top2(),top3(),top4()]).then((res,index) => {
                res.forEach(item=>{
                    this.topUp.push(item.data.result)
                })
                this.loading = false;

            })
            function world1(){
                return axios.get(`${url}/top/list?idx=10`)
            }
            function world2(){
                return axios.get(`${url}/top/list?idx=4`)
            }
            function world3(){
                return axios.get(`${url}/top/list?idx=21`)
            }
            function world4(){
                return axios.get(`${url}/top/list?idx=5`)
            }
            function world5(){
                return axios.get(`${url}/top/list?idx=6`)
            }
            function world6(){
                return axios.get(`${url}/top/list?idx=19`)
            }
            function world7(){
                return axios.get(`${url}/top/list?idx=8`)
            }
            function world8(){
                return axios.get(`${url}/top/list?idx=9`)
            }
            function world9(){
                return axios.get(`${url}/top/list?idx=7`)
            }
            function world10(){
                return axios.get(`${url}/top/list?idx=14`)
            }
            function world11(){
                return axios.get(`${url}/top/list?idx=15`)
            }
            function world12(){
                return axios.get(`${url}/top/list?idx=20`)
            }
            axios.all([world1(),world2(),world3(),world4(),world5(),world6(),world7(),world8(),world9(),world10(),world11(),world12()]).then(res => {
                res.forEach(item=>{
                    this.topWorld.push(item.data.result)
                })
            })
        },
        toOfficial(id,obj){
            this.$router.push({path:`/home/top/official/${id}`})
            this.$store.dispatch('curPlaylistDetail',obj)
        },
    },
    created(){
        this.$nextTick(()=>{
            this.get()
        })
    }
}
</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../../common/sass/variable';
.top{
    margin-top:97px;
    .top-official{
        h3{
            font-size:16px;
            margin:20px 0;
            &:before{
                content:'';
                border-left:3px solid $background-default;
                margin-right:7px;
                padding:2px 0;
            }
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                display: flex;
                margin-bottom:20px;
                .top-l{
                    display: flex;
                    img{
                        width: 130px;
                        height: 130px;
                    }
                }
                .top-r{
                    display: flex;
                    flex-wrap: wrap;
                    margin-left:20px;
                    p{
                        width: 100%;
                        font-size:14px;
                        line-height: 40px;
                    }
                }
            }
        }
    }
    .top-world{
        padding-bottom: 50px;
        width: 100%;
        height: 100%;
        h3{
            font-size:16px;
            margin:10px 0;
            &:before{
                content:'';
                border-left:3px solid $background-default;
                margin-right:7px;
                padding:2px 0;
            }
        }
        ul{
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                display: flex;
                width: 32.5%;
                height: 100%;
                flex-wrap: wrap;
                img{
                    width: 100%;
                    height: 100%;
                }
                .top-name{
                    width: 100%;
                    font-size:14px;
                    padding:5px 0;
                    text-align: center;
                }
            }
        }
    }
}
</style>