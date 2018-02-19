<template lang="html">
<div class="tips">
    <p>您没有登陆，请登陆再使用该功能！</p>
</div>
</template>
<script>
export default{

}
</script>
<style type="text/scss" lang="scss" scoped>
.tips{
    width: 80%;
    height: 80px;
    background:#fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-70%);
    border-radius: 10px;
    border:2px solid #eee;
    p{
        color:red;
        text-align: center;
        line-height: 80px;
        font-size:16px;
    }
}
</style>