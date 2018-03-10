const request = require('request').defaults({
        jar: true
    }),
    fs = require('fs');

function upcover(file, cookies, csrf, callback) {
    request.post('https://member.bilibili.com/x/web/article/upcover', {
        form: {
            cover: createBase64Image(fs.readFileSync(file)),
            csrf: csrf
        },
        headers: {
            'Origin': 'https://member.bilibili.com',
            'Host': 'member.bilibili.com',
            'Connection': 'keep-alive',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://member.bilibili.com/article-text/home?',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cookie': cookies
        },
        timeout: 3e4,
    }, (err, response, body) => {
        if (!err) callback(response.toJSON());
    });
}

function createBase64Image(stream) {
    return "data:image/bmp;base64," + stream.toString('base64');
}

exports.upcover = upcover;