// 获取网址中参数的参数值；
function getParam(name, src) {
    var re = new RegExp('(?:^|\\?|#|&)' + name + '=([^&#]*)(?:$|&|#)', 'i');
    var m = re.exec(src || location.href);

    return m ? decodeURI(m[1]) : '';
}

// 参数设置
function setParam(name, str, src) {
    var re = new RegExp('(?:^|\\?|#|&)' + name + '=([^&#]*)(?:$|&|#)', 'i');
    var m = re.exec(src);

    src = src || location.href;
    if (m !== null) {
        return src.replace(m[0], m[0].replace(name + '=' + m[1], name + '=' + str));
    }
    if (src.indexOf('?') !== -1) {
        return src + '&' + name + '=' + str;
    }
    return src + '?' + name + '=' + str;
}

// 参数删除
function removeParam(name, src) {
    var _src = src || location.href;

    _src = _src.replace(new RegExp('[?&]' + name + '=[^&#]*(#.*)?$'), '$1');
    _src = _src.replace(new RegExp('([?&])' + name + '=[^&]*&'), '$1');

    return _src;
}

export default {
    getParam: getParam,
    setParam: setParam,
    removeParam: removeParam
};
