var u = navigator.userAgent;
var lastTop = 0

// 正则验证类
var checkFormat = {
    /**
     * android终端
     * @return {Boolean}
     */
    isAndroid: function() {
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    },
    /**
     * ios终端
     * @return {Boolean}
     */
    isIOS: function(){
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    /**
     * 手机正则验证
     * @param {Number} phoneNum 手机号码
     * @return {Boolean}
     */
    isMobilePhone: function () {
        return /^1[3456789]\d{9}$/.test(phoneNum)
    },
    /**
     * 邮箱验证
     * @param {String} email 邮箱
     * @return {Boolean}
     */
    isEmail: function(email) {
        var emailRex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/  //邮箱正则
        return emailRex.test(email)
    },
    /**
     * 5-12位QQ验证
     * @param {Number} qq qq号码
     * @return {Boolean}
     */
    isQQ: function(qq) {
        var qqRex = /^[1-9][0-9]{4,11}$/;
        return qqRex.test(qq)
    },
    /**
     * 2-n位汉字名字验证
     * @param {String} name 汉字
     * @param {Number} n 名字的位数
     * @return {Boolean}
     */
    isCName: function(name,n) {
        var nameRex =/^[\u4e00-\u9fa5]{2,n}$/ //姓名验证
        return nameRex.test(name)
    },
    /**
     * 身份证号码验证
     * @param {String | Number} IdNumber 身份证号码
     * @return {Boolean}
     */
    isIdNum: function(IdNumber) {
        var idCardRegex = {
            //18位身份证简单校验
            IDCARD_18_SIMPLE_PATTERN: /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}(?:1[89]|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}(?:\d|[xX])$/,
            //15位身份证简单校验
            IDCARD_15_SIMPLE_PATTERN: /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}$/
        }
        return idCardRegex.IDCARD_18_SIMPLE_PATTERN.test(IdNumber) || idCardRegex.IDCARD_15_SIMPLE_PATTERN.test(IdNumber)
    }
}

// cookie 方法类
var cookieFormat = {
    /**
     * 设置cookie
     * @param {String} cname cookie名
     * @param {String} cvalue cookie值
     * @param {String} path path值
     * @param {String} options 保存时间
     * @param {String} domain domain值
     */
    setCookie: function(cname, cvalue, path, options, domain) {
        var d = new Date();
        var exdays = 30;
        if (options) {
        exdays = options;
        };
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        if (domain) {
        expires = expires + ";domain=" + domain
        }
        document.cookie = cname + "=" + cvalue + ";path=" + path + ";" + expires;
    },
    /**
     * 获取cookie
     * @param {String} cname cookie名
     * @return {String} 
     */
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    /**
     * 删除cookies 
     * @param {cname} cookie名
     */
    delCookie: function(cname) { 
        var cval = getCookie(cname)
        if (cval!=null) {
            document.cookie = cname + '=' + cval + ';expires=' + (new Date(0)).toGMTString()
        }
    } 
}

//URL,参数类
var urlFormat = {
    /**
     * 获取当前URL参数 
     * @param {String} name 参数名
     */
    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    },
    /**
     * 拼接url 
     * @param {Object} params 需拼接的参数对象
     * @param {String} url 需拼接的url
     */
    concatUrl: function(params, url) {
        var urlWith = url.includes('?') ? url : url+'?'
        for (let key of Object.keys(params)) {
            urlWith =  urlWith + '&' + key + '=' + params[key]
        }
        return urlWith
    }
}

// 格式化时间类
var dateFormat = {
    stringifyDate: function(datetime, simple) {
        if(simple === undefined) {
            simple = false
        }
        // let weekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        datetime = new Date(datetime)
        var year = datetime.getFullYear()
        var simpleYear = datetime.getYear() - 100
        var month = datetime.getMonth() + 1
        month = month > 9 ? month : '0' + month
        var day = datetime.getDate()
        day = day > 9 ? day : '0' + day
        var hour = datetime.getHours()
        hour = hour > 9 ? hour : '0' + hour
        var min = datetime.getMinutes()
        min = min > 9 ? min : '0' + min
        var week = datetime.getDay()
        week = weekMap[week]
        var thatDay = (new Date(year, month - 1, day, 0, 0, 0)).getTime()
      
        if (simple) {
          return {
            withYear: day+'/'+month+'/'+simpleYear,
            withMonth: month+'-'+day,
            withDay: week,
            withLastDay: `昨天`,
            withHour: hour+':'+min,
            thatDay
          }
        } else {
          return {
            withYear: year+'-'+month+'-'+day+' '+hour+':'+min,
            withMonth: month+'-'+day+' '+hour+':'+min,
            withDay: week+' '+hour+':'+min,
            withLastDay: '昨天 '+hour+':'+min,
            withHour: hour+':'+min,
            thatDay
          }
        }
    },
    /**
     * 格式化日期(格式化成类似聊天室时间) 如：昨天 07:00
     * @param {Number} datetime 需要转换的时间戳
     * @param {Boolean} simple  需要转换成的模式
     * @return {string}
     */
    formatDate: function(datetime, simple) {
        if(simple === undefined) {
            simple = false
        }
        var tempDate = (new Date()).getTime()
        var result = this.stringifyDate(datetime, simple)
        var thatDay = result.thatDay
        var deltaTime = (tempDate - thatDay) / 1000
    
        if (deltaTime < 3600 * 24) {
        return result.withHour
        } else if (deltaTime < 3600 * 24 * 2) {
        return result.withLastDay
        } else if (deltaTime < 3600 * 24 * 7) {
        return result.withDay
        } else if (deltaTime < 3600 * 24 * 30) {
        return result.withMonth
        } else {
        return result.withYear
        }
    }
}

var arrayFormat = {
    /**
     * 将类数组转化为数组对象
     * @return {Array}
     */
    toArray: function (){
        return Array.prototype.slice.call(arguments)
    },
    /**
     * 判断是否为数组对象
     * @return {Boolean}
     */
    isArray: function (arr) {
        return arr != undefined && arr.constructor == Array
    },
    /**
     * 数组求和
     * @param {array} arr 数组
     * @return 
     */
    sum: function(arr) {
        if(!this.isArray(arr)){
            return result;
        }
        if(arr.length==0){
            return 0;
        }
        var result = arr[0];
        var length = arr.length;
        for(var i=1;i<length;i++){
            result += arr[i];
        }
        return result;
    },
    /**
     * 数组是否包含该元素
     * @param {array} arr 数组
     * @param {any} x 元素
     * @return {Boolean}
     */
    contains: function(arr, x){
        var result = false;
        if(!this.isArray(arr)){
            return result;
        }
        var length = arr.length;
        if(length==0){
            return result;
        }
        for(var i=0;i<length;i++){
            if(arr[i] == x){
                return true;
            }
        }
        return result;
    },
    /**
     * 数组打乱
     * @param {array} arr 数组
     * @return {Array}
     */
    shuffle: function(arr){
        if(!this.isArray(arr)){
            return arr;
        }
        var length = arr.length;
        for(var i=0;i<length;i++){
            var pos = parseInt(Math.random()*(length-i));
            var save = arr[i];
            arr[i] = arr[pos];
            arr[pos] = save;
        }
        return arr;
    },
    /**
     * 数组去重
     * @param {array} arr 数组
     * @return {Array}
     */
    unique: function(arr){
        if(!this.isArray(arr)){
            return arr;
        }
        var u = [];
        var length = arr.length;
        for(var i=0;i<length;i++){
            var o = arr[i];
            if(!this.contains(u,o)){
                u.push(o);
            }
        }
        return u;
    },
    /**
     * 数组最小值
     * @param {array} arr 数组
     * @return {Number}
     */
    min: function(arr){
        var result = 0;
        if(!this.isArray(arr)){
            return result;
        }
        var length = arr.length;
        if(length == 0){
            return result;
        }
        result = arr[0];
        for(var i=1;i<length;i++){
            var o = arr[i];
            if(o<result){
                result = o;
            }
        }
        return result;
    },
    /**
     * 数组最大值
     * @param {array} arr 数组
     * @return {Number}
     */
    max: function(arr){
        var result = 0;
        if(!this.isArray(arr)){
            return result;
        }
        var length = arr.length;
        if(length == 0){
            return result;
        }
        result = arr[0];
        for(var i=1;i<length;i++){
            var o = arr[i];
            if(o>result){
                result = o;
            }
        }
        return result;
    }
}

// 页面高度类
var scrollFormat = {
    /**
     * 设置 或 获取 scrolltop值
     * @param {Number} val (不传表示获取scrollTop值，传表示设置scrollTop值)
     */
    scrollTop: function(val) {
        // 有val 为赋值
        if (val !== null && val !== undefined) {
            setTimeout(function(){
                lastTop = val;
                document.body.scrollTop = val
                if(window.pageYOffset) {
                    window.pageYOffset = val
                }
                if (document.documentElement) {
                    document.documentElement.scrollTop = val
                }
            },100)
        } else {
            var temp = lastTop
            if(lastTop !=document.body.scrollTop&&document.body.scrollTop!=0){
                temp = document.body.scrollTop
            }else if(window.pageYOffset && lastTop != window.pageYOffset && window.pageYOffset!=0 ){
                temp = window.pageYOffset 
            }else if(document.documentElement && lastTop != document.documentElement.scrollTop && document.documentElement.scrollTop!=0){
                temp = document.documentElement.scrollTop
            }
            return temp
        }			
    },
    /**
     * 滚动条在Y轴上的滚动距离
     * @return {Number}
     */
    getScrollTop: function() {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },
    /**
     * 文档的总高度
     * @return {Number}
     */
    getScrollHeight: function() {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },
    /**
     * 浏览器视口的高度
     * @return {Number}
     */
    getWindowHeight: function() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },
    /**
     * 是否滚动到底部
     * @return {Boolean}
     */
    isBottom: function(distance) {
        var bottomDistance = distance || 0;
        if (getScrollTop() + getWindowHeight() + bottomDistance >= getScrollHeight()) {
            return true;
        }
        else
            return false;
    }
} 

// 数字计算类
var mathFormat = {
    /**
     * 四舍五入保留2位小数（不够位数，则用0替补）
     * 强制保留两位小数(四舍五入  2.3389 => 2.34)
     * @param {Number} x 需要转换的数字
     * @return {String}
     */
    toFixed: function(x){
        var f = parseFloat(x)
        if (isNaN(f)) {
            return false
        }
        var a = Math.round(x * 100) / 100
        var s = a.toString()
        var rs = s.indexOf('.')
        if (rs < 0) {
            rs = s.length
            s += '.'
        }
        while (s.length <= rs + 2) {
            s += '0'
        }
        return s
    },

    //处理js在数字计算时，因为IEEE精度丢失问题(处理支付问题是需要)
    //2.1*3=6.300000000000001
    add: function(a, b) {//相加
        var c, d, e;
        try {
          c = a.toString().split(".")[1].length;
        } catch (f) {
          c = 0;
        }
        try {
          d = b.toString().split(".")[1].length;
        } catch (f) {
          d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
    },
    sub: function(a, b) {//相减
        var c, d, e;
        try {
          c = a.toString().split(".")[1].length;
        } catch (f) {
          c = 0;
        }
        try {
          d = b.toString().split(".")[1].length;
        } catch (f) {
          d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
    },
    mul: function(a, b) {//乘法
        var c = 0,
          d = a.toString(),
          e = b.toString();
        try {
          c += d.split(".")[1].length;
        } catch (f) { }
        try {
          c += e.split(".")[1].length;
        } catch (f) { }
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },
    div: function(a, b) {//除
        var c, d, e = 0,
          f = 0;
        try {
          e = a.toString().split(".")[1].length;
        } catch (g) { }
        try {
          f = b.toString().split(".")[1].length;
        } catch (g) { }
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
    }
}