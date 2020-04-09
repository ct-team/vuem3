var fs = require("fs-extra");
var path = require("path");
var glob = require("glob");
var config = require("./config");
var list = config.list;

const src = path.join(__dirname, "../dist/dest");
var root = path.resolve(__dirname, "../dist");
//
var clearEnv = function(result, env) {
    var s = "<div[^>]*data-hide-env=(" + env + ").*?[^>]*>(.*?)</div>";
    //console.log(s);
    var re = new RegExp(s, "g");

    return result.replace(re, "");
};

var clearOtherEnv = function(result, env) {
    var envList = [];
    var ruleEnv = "";

    list.forEach(function(item) {
        if (item.env != env) {
            envList.push(item.env);
        }
    });

    ruleEnv = envList.join("|");

    var s = "<div[^>]*data-env=(" + ruleEnv + ").*?[^>]*>(.*?)</div>";
    //console.log(s);
    var re = new RegExp(s, "g");

    return result.replace(re, "");
};
//端口替换
var portReplace = function(obj) {
    //list.forEach(obj => {
    const entryHtml = glob.sync(root + "/" + obj.title + "/**/*.html");
    var publicUrl = obj.url + config.appUrl;
    var baseUrl = publicUrl + "assets";
    var env = obj.env;

    entryHtml.forEach(f => {
        fs.readFile(f, "utf8", function(err, data) {
            if (err) {
                throw err;
            }

            var result = data.replace(
                /(={1})((\.)?\/assets)/gi,
                "$1" + baseUrl
            );

            result = result.replace(/<ctEnv>/gi, env);
            result = result.replace(/<ctVersion>/gi, config.appVersion);
            result = result.replace(
                /(={1}(\")?(\')?)((\.)?\/static\/)/gi,
                "$1" + baseUrl + "/"
            );

            result = result.replace(/<ctAppPublic>/g, publicUrl);

            result = clearEnv(result, env);
            result = clearOtherEnv(result, env);

            fs.writeFile(f, result, "utf8", function(err) {
                if (err) {
                    throw err;
                }
            });
        });
    });
    //});
};

//拷贝项目
var copy = function() {
    list.forEach(obj => {
        const url = path.join(__dirname, "../dist/", obj.title);

        fs.copy(src, url, function(err) {
            if (err) {
                throw err;
            }
            portReplace(obj);
            console.log(obj.title + " copy success!");
        });
    });
};

module.exports.init = function() {
    copy();
};
