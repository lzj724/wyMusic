<template lang="html">
<div class="songlist">
    <div class="products" v-for="item in product" @click="toChild">
        <div class="products-bg" :style="`background:url(${item.coverImgUrl})no-repeat center`"></div>
        <div class="products-cover clearfix">
            <img :src="item.coverImgUrl" alt="">
        </div>
        <div class="products-r clearfix">
            <p class="products-title">精品歌单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;> </p>
            <p class="products-name">{{item.name}}</p>
            <p class="products-description">{{item.copywriter}}</p>
        </div>
    </div>
    <div class="recommend-list">
        <p class="songList-title">全部歌单</p>
        <div class="songLists">
            <ul >
                <li v-for="(item,index) in songList" :key="index" class="songlist-items" @click="songlistDetail(item.id,item)">
                    <div class="item-link">
                        <img v-lazy="item.picUrl" :id="item.id">
                        <span class="iconfont icon-erjiline">
                        <span class="playCount">{{item.playCount|playCount}}</span>
                    </span>
                    </div>
                    <span class="item-title">{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>
    <router-view></router-view>
</div>
</template>
<script>
import url from '@/common/js/api'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      product: [],
      productList: [],
      songList: []
    }
  },
  methods: {
    getProductsData() {
      this.$Axios.get(`${url}/top/playlist/highquality`).then(res => {
        if (res.data.code = res.status) {
          this.productList = res.data.playlists
          this.product.push(res.data.playlists[0])
            this.$store.dispatch('productLists',this.productList)
        }
      }).catch(err => {
        console.log(err);
      })
      this.$Axios.get(`${url}/personalized`).then((res) => {
        if (res.status === res.data.code) {
          this.songList = res.data.result;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    songlistDetail(id, obj) {
      this.$router.push({ path: `/home/songlistdetail/${id}` })
      this.$store.dispatch('curPlaylistDetail', obj)
    },
    toChild() {
      this.$router.push({ path: `/home/songlist/productslist` })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getProductsData()
    })
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
@import '../../../common/sass/variable';
.songlist {
  margin-top: 87px;
  width: 100%;
  height: 100%;
  .products {
    width: 100%;
    height: 180px;
    margin-bottom: 20px;
    position: relative;
    .products-bg {
      width: 100%;
      height: 100%;
      z-index: -100;
      background-size: 300%;
      position: absolute;
      top: 0;
      left: 0;
      filter: blur(20px) saturate(50%);
    }
    .products-cover {
      float: left;
      margin-left: 10px;
      margin-top: 40px;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .products-r {
      float: left;
      margin-left: 15px;
      .products-title {
        margin-top: 50px;
        color: white;
        font-size: 18px;
        font-weight: 500;
        margin-left: 30px;
      }
      .products-name {
        margin-top: 20px;
        color: white;
        font-size: 15px;
        font-weight: 500;
      }
      .products-description {
        margin-top: 20px;
        color: #bbb;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
  .recommend-list {
    width: 100%;
    .songList-title {
      display: inline-block;
      font-size: 14px;
      padding: 8px 12px;
      margin-left: 20px;
      margin-bottom: 10px;
      border-radius: 20px;
      border: 1px solid #888888;
    }
    .songLists {
      width: 100%;
      height: 100%;
      ul {
        margin-top: 10px;
        width: 100%;
        height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content:space-between;
          .songlist-items{
              width: 49.5%;
              height: 100%;
              margin-bottom: 12px;
              .item-link{
                  width: 100%;
                  height: 100%;
                  position: relative;
                  img{
                      width: 100%;
                      height: 100%;
                      vertical-align: top;
                  }
                  .camera-up{
                      top:5px !important;
                      .playCount{
                          top:0 !important;
                      }
                  }
                  span{
                      display: inline-block;
                      width: 50px;
                      position: absolute;
                      right: 42px;
                      bottom: 7px;
                      color:white;
                      font-size:10px;
                      text-align:right;
                      .playCount{
                          position: absolute;
                          right:-37px;
                          bottom: -1px;
                      }
                  }
              }
              .item-title{
                  font-size:$font-size;
                  display: block;
                  padding:5px 0;
              }
              .item-art{
                  font-size:12px;
                  color:#555;
              }
          }
      }
    }
  }
}
</style>
