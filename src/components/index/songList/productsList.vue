<template lang="html">
<div class="productslist">
    <MHead :headerTitle="title"></MHead>
    <div class="product-con">
        <ul>
            <li v-for="(item,index) in productLists" class="clearfix" @click="toSongList(item.id,item)">
                <div class="item-l">
                    <div class="item-cover">
                        <img :src="item.coverImgUrl">
                    </div>
                </div>
                <div class="item-r">
                    <p class="item-title">{{item.name}}</p>
                    <p class="item-username">by: {{item.creator.nickname}}</p>
                    <div class="item-desc">
                        <span class="item-desc-tag">{{item.tag}}</span>
                        <span>{{item.copywriter}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import MHead from '../header-title.vue'
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['productLists'])
    },
  data() {
    return {
      title: '精品歌单·全部'
    }
  },
  components: {
    MHead
  },
  methods: {
    toSongList(id, obj) {
      this.$router.push({ path: `/home/songlistdetail/${id}` })
      this.$store.dispatch('curPlaylistDetail', obj)
    }
  },
  mounted() {
    this.$nextTick(() => {
    })
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
@import '../../../common/sass/variable';
.productslist {
  z-index: 100;
  background-color: #eee;
  width: 100%;
  .product-con {
      margin-top:48px;
      width: 100%;
      ul {
      width: 100%;
      height: 100%;
          display: flex;
          flex-direction: column;
        li {
        width: 100%;
        height: 130px;
            display: flex;
        .item-l {
          .item-cover {
            width: 110px;
            padding-top: 10px;
            img {
              vertical-align: top;
              width: 100%;
            }
          }
        }
        .item-r {
          padding-left: 10px;
          .item-title {
            padding-top: 30px;
            font-size: 16px;
            color: black;
            font-weight: 500;
          }
          .item-username {
            padding-top: 10px;
            font-weight: 500;
            font-size: 14px;
            padding-left: 20px;
            color: #a29b7d;
          }
          .item-desc {
            padding-top: 20px;
            font-size: 13px;
            .item-desc-tag {
              font-size: 12px;
              color: red;
              padding: 2px;
              border: 1px solid red;
            }
          }
        }
      }
    }
  }
}
</style>
