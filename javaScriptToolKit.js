
/**
 * 获取url中的参数
 * url: window.location.href;
 * 返回格式: xxx
*/
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

/***
 * 获取今天日期
 * 返回格式：xxxx-xx-xx xx:xx:xx
 */
function getToDayDateTime(offset_year, offset_month, offset_day) {
    var date = new Date();

    var dateTime = "";

    dateTime += ( parseInt(date.getFullYear()) + parseInt(offset_year) )  + "-"
    dateTime += ( parseInt( date.getMonth() ) + parseInt(offset_month) + 1) + "-";
    dateTime += parseInt( date.getDate() ) + parseInt(offset_day);
    dateTime += " "+date.getHours();
    dateTime += ":"+date.getMinutes();
    dateTime += ":"+date.getSeconds();


   return dateTime;
}

/**
 * 时间（小时与分钟）与时间增量（小时增量和分钟增量）相加，然后返回时间对象
 * 返回格式: {hour:xx,min:xx}
*/
function createTime(hour, min, hour_increment, min_increment){
    var temp_hour = hour;
    var temp_min = min;

    temp_min += min_increment;

    if(temp_min >= 60){
        temp_hour+=1;
        temp_min -= 60;
    }

    temp_hour += hour_increment;
    if(temp_hour > 24){
        temp_hour -= 24
    }

    if(temp_min==0){
        temp_min = "00";
    }

    return {
        hour : temp_hour,
        min : temp_min
    };
}   

/** 
 * 在使用诸如line-chart之类的控件时，根据选定时间（startTime_hour, startTime_min），和时间增量（hour_increment, min_increment），生成指定数目（numberOfLabel）的标签
 * 返回格式: [ "xx:xx","xx:xx",.......... ]
*/
function createTimeLable(startTime_hour, startTime_min, hour_increment, min_increment, numberOfLabel){
    var timeArray = [12];

    var temp_startTime_hour = startTime_hour;
    var temp_startTime_min = startTime_min;

    timeArray[0] = temp_startTime_hour + ":" + (temp_startTime_min==0 ? "00" : temp_startTime_min);

    temp_startTime_min = startTime_min;

    for (var i = 1; i < numberOfLabel ;i++){
        var time = createTime(temp_startTime_hour,temp_startTime_min,hour_increment,min_increment);

        temp_startTime_hour = time.hour;
        temp_startTime_min = time.min;

        timeArray[i] = temp_startTime_hour+":"+ (temp_startTime_min==0 ? "00" : temp_startTime_min);

    }

    return timeArray;
}

/**
 * 格林威治时间2018-10-25T10:59:41.000+0000
 * 格林威治时间转为标准时间 xxxx-xx-xx xx:xx
*/
//2018-10-23T13:51:45.000+0000
function getFormmattedTime(time){
    time = time.split("T");

    return time[0]+" "+ ( time[1].split(".")[0] )
}
/**
 * 获取某个范围内的随机数（min<=r<=max）
 * 
 */

function RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}