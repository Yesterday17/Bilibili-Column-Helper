const request = require('request').defaults({
        jar: true
    }),
    fs = require('fs');

function upcover(file, cookies, callback) {
    request.post('https://member.bilibili.com/x/web/article/upcover', {
        form: {
            cover: fs.createReadStream(file),
            csrf: "8317f45914a841278717e676df58b525"
        },
        headers: {
            'Host': 'member.bilibili.com',
            'Connection': 'keep-alive',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://member.bilibili.com/article-text/home?',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cookie': cookies
        }
    }, (err, response, body) => {
        callback(response.toJSON());
    });
}

exports.upcover = upcover;