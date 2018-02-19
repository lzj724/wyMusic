<template lang="html">
    <div class="swiper-container">
        <div class="swiper-wrapper">
    <div class="swiper-slide" v-for="(slider,index) in sliderData">
        <img :src="slider.pic" :alt="slider.typeTitle" :title="slider.typeTitle">
    </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>
<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    export default {
        props: ['sliderData'],
        mounted(){
            this.$nextTick(() => {
                this.play()
            })
        },
        methods: {
            play(){
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        loop: true,
                        speed: 600,
                        autoplay : 4000,
                        observer:true,//修改swiper自己或子元素时，自动初始化swiper
                        autoplayDisableOnInteraction : false,
                        observeParents:true,//修改swiper的父元素时，自动初始化swiper
                        onTouchEnd: function(){
                            swiper.startAutoplay();
                        }
                    });
            }

        }

    }
</script>
<style type="text/scss" lang="scss" scoped>
    .swiper-container {
        width: 100%;
        margin-bottom: 20px;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 100%;
            height:100%;
            img {
                width: 100%;
                height:100%;
            }
        }
    }
</style>