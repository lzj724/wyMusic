<template lang="html">
    <div class="playlist-loading">
        <span class="fa fa-circle-o-notch"></span>
    </div>
</template>
<script>

</script>
<style type="text/scss" lang="scss" scoped>
    @import '../../common/sass/variable';
    .playlist-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        span {
            font-size: 35px;
            color: $background-default;
            transition: all 0.5s;
            animation: circle .8s infinite cubic-bezier(.55, 0, .1, 1);
        }
        @keyframes circle {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>