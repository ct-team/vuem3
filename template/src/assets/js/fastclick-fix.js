import FastClick from 'fastclick';

var u = navigator.userAgent;
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

// 这样的处理是为了防止在华为P20自带浏览器下，input框唤醒键盘卡顿，必须长按才能唤醒
FastClick.attach(document.body);

if (isiOS) {
    /* eslint-disable */
    FastClick.prototype.focus = function(targetElement) {
        var length;
        //兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
        //这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法

        if (
            deviceIsIOS &&
            targetElement.setSelectionRange &&
            targetElement.type.indexOf('date') !== 0 &&
            targetElement.type !== 'time' &&
            targetElement.type !== 'month' &&
            targetElement.type !== 'email'
        ) {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
            /*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/
            targetElement.focus();
        } else {
            targetElement.focus();
        }
    };
    /* eslint-disable */
}
