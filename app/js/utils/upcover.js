const request = require('request').defaults({
        jar: true
    }),
    fs = require('fs');

function upcover(file, cookies) {
    fs.createReadStream(file).pipe(request.put('https://member.bilibili.com/x/web/article/upcover', {
        jar: cookies,
        method: "POST",
    })).on('response', (response) => {
        alert(JSON.stringify(response));
    });
}

exports = upcover;