import Vue from 'vue'
Vue.filter('playCount',(value)=>{
    if (value < 10000) {
        return value
    } else {
        value = parseInt(value) + ''
        return value.slice(0, value.length - 4) + '万'
    }
})

Vue.filter('TimeFormat',(value)=>{
    let min = parseInt(value / 60)
    let sec = parseInt(value % 60)
    min = min < 10 ? '0' + min : min
    sec = sec < 10 ? '0' + sec : sec
    return min + ':' + sec
})

Vue.filter('limitLenght',(value)=>{
    value = value+''
    if(value.length>35){
        return value.slice(0,35)+'......'
    }else{
        return value
    }
})

Vue.filter('Time',(time)=>{
    let newTime = new Date(time)
    var y = newTime.getFullYear()
    var m = newTime.getMonth()+1
    var d = newTime.getDate()
    var h = newTime.getHours()
    var mi = newTime.getMinutes()
    var s = newTime.getSeconds()
    const timer = y+'年'+ m+ '月'+ d +'日' + " " + h + "：" + mi + "：" + s
    return timer
})

Vue.filter('YMD',(time)=>{
    let newTime = new Date(time)
    var y = newTime.getFullYear()
    var m = newTime.getMonth()+1
    var d = newTime.getDate()
    const timer = y+'.'+ m+ '.'+ d
    return timer
})