/**
 * ajax get
 * @param url
 * @param data
 * @param _context
 * @returns {*}
 */
'useStrict'

var immutable = require('immutable');
var request = function(){};
module.exports = request;
request.getToken = function(){
    if(!window._isReplace){
        return;
    }
    $.ajax({
        url:"/oauth/getToken",
        type:"GET",
        success:function(resp){
            if(resp.result == 'ok'){
                var r = resp.data.token;
                window._token = r;
                $.cookie('token_p',r);
                window._isReplace = false;
            }
        },
        error:function(){
            mui.toast('系统错误！');
        }
    });
}
request.get = function(url, data, _context) {
    var deferred = $.Deferred();

    var ctx = _context || this;

    var params = data || {};
    params.sessionId = $("#sessionId").val();

    $.ajax({
        url:url,
        type:"GET",
        data:params,
        success:function(resp){
            var r = arguments[2].getResponseHeader('Server-Replace');
            if(r){
                window._isReplace = true;
                request.getToken();
            }
            (resp.result === "ok") ? deferred.resolveWith(ctx, [resp.data]) : deferred.rejectWith(ctx, [resp]);
        },
        error:function(resq){
            deferred.rejectWith(ctx, [resq]);
        }
    });
    return deferred.promise();
};
/**
 * ajax get
 * @param url
 * @param data
 * @param _context
 * @returns {*}
 */
request.ajax = function(url, data, _context) {
    var deferred = $.Deferred();
    if(!requestControl(data,url)){
        return deferred.promise();
    }

    var ctx = _context || this;

    var params = data || {};
    params.sessionId = $("#sessionId").val();

    $.ajax({
        url:url,
        type:"GET",
        data:params,
        success:function(resp){
            var r = arguments[2].getResponseHeader('Server-Replace');
            if(r){
                window._isReplace = true;
                request.getToken();
            }
            (resp.result === "ok") ? deferred.resolveWith(ctx, [resp.data]) : deferred.rejectWith(ctx, [resp]);
        },
        error:function(resq){
            deferred.rejectWith(ctx, [resq]);
        }
    });
    return deferred.promise();
};
/**
 * ajax post
 * @param url
 * @param data
 * @param _context
 * @returns {*}
 */
request.post = function(url, data, _context,_config) {
    var deferred = $.Deferred();
    if(!requestControl(data,url)){
        return deferred.promise();
    }

    var ctx = _context || this;
    var params = data || {};
    params.sessionId = $("#sessionId").val();

    var _option = {
        url:url,
        type:"POST",
        data:params,
        success:function(resp){
            var r = arguments[2].getResponseHeader('Server-Replace');
            if(r){
                window._isReplace = true;
                request.getToken();
            }
            (resp.result === "ok") ? deferred.resolveWith(ctx, [resp.data]) : deferred.rejectWith(ctx, [resp]);
        },
        error:function(resq){
            deferred.rejectWith(ctx, [resq]);
        }
    };
    for(var key in _config){
        _option[key] = _config[key];
    }
    $.ajax(_option);
    return deferred.promise();
};

request.postLoading = function(url, data, _context,_config) {
    $("#loading").show();
    var deferred = $.Deferred();
    if(!requestControl(data,url)){
        $("#loading").hide();
        return deferred.promise();
    }

    var ctx = _context || this;
    var params = data || {};
    params.sessionId = $("#sessionId").val();

    var _option = {
        url:url,
        type:"POST",
        data:params,
        success:function(resp){
            $("#loading").hide();
            var r = arguments[2].getResponseHeader('Server-Replace');
            if(r){
                window._isReplace = true;
                request.getToken();
            }
            (resp.result === "ok") ? deferred.resolveWith(ctx, [resp.data]) : deferred.rejectWith(ctx, [resp]);
        },
        error:function(resq){
            $("#loading").hide();
            deferred.rejectWith(ctx, [resq]);
        }
    };
    for(var key in _config){
        _option[key] = _config[key];
    }
    $.ajax(_option);
    return deferred.promise();
};

/**
 * ajax post
 * @param url
 * @param data
 * @param _context
 * @returns {*}
 */
request.put = function(url, data, _context) {
    var deferred = $.Deferred();
    if(!requestControl(data,url)){
        return deferred.promise();
    }

    var ctx = _context || this;
    var params = data || {};
    params.sessionId = $("#sessionId").val();

    $.ajax({
        url:url,
        type:"PUT",
        data:params,
        success:function(resp){
            var r = arguments[2].getResponseHeader('Server-Replace');
            if(r){
                window._isReplace = true;
                request.getToken();
            }
            (resp.result === "ok") ? deferred.resolveWith(ctx, [resp.data]) : deferred.rejectWith(ctx, [resp]);
        },
        error:function(resq){
            deferred.rejectWith(ctx, [resq]);
        }
    });
    return deferred.promise();
};

/**
 * ajax post
 * @param url
 * @param data
 * @param _context
 * @returns {*}
 */
request.delete = function(url, data, _context) {
    var deferred = $.Deferred();
    if(!requestControl(data,url)){
        return deferred.promise();
    }

    var ctx = _context || this;
    var params = data || {};
    params.sessionId = $("#sessionId").val();

    $.ajax({
        url:url,
        type:"DELETE",
        data:params,
        success:function(resp){
            var r = arguments[2].getResponseHeader('Server-Replace');
            if(r){
                window._isReplace = true;
                request.getToken();
            }
            (resp.result === "ok") ? deferred.resolveWith(ctx, [resp.data]) : deferred.rejectWith(ctx, [resp]);
        },
        error:function(resq){
            deferred.rejectWith(ctx, [resq]);
        }
    });

    return deferred.promise();
};

/**
 * 请求处理器，1秒内仅允许一次请求*/
var arr = new Array();
var t = 1000;//同一请求1秒内只允许一次
function requestControl(params,url){
    var obj = immutable.fromJS({params:params,url:url});
    var _index = arr.length;
    for(var _i in arr){
        if(immutable.is(arr[_i].target,obj)){
            var times = arr[_i].times;
            if(new Date().getTime() - times >= t){
                _index = _i;
                break;
            }else{
                arr = arr.splice(_i,_index - _i);
                return false;//停止此次请求
            }
        }
    }
    arr[_index] = {times:new Date().getTime(),target:obj};
    return true;
}
