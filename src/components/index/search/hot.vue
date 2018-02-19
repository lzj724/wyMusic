<template lang="html">
<div class="hot">
    <div class="content">
        <p class="search-hot">热门搜索</p>
        <ul class="clearfix">
            <li v-for="(item,index) in hotSearch">
                 <div @click="searchHotKey(item)">
                    {{item}}
                 </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return {
            hotSearch: ['跨界歌王', '老大', '暧昧', '告白气球', '演员', '薛之谦', '因你', '张碧晨', '杨宗纬', '凉凉'],

        }
    },
    methods:{
        searchHotKey(key){

        }
    }
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>