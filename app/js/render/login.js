const {ipcRenderer} = require('electron'),
    request = require('request');

onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const navigate = (url) => {
        webview.getWebContents().session.cookies.get({
            url: 'http://www.bilibili.com'
        }, (err, cookies) => {
            let jar = request.jar();

            for (let element in cookies){
                jar.setCookie(request.cookie(element.name), element.domain)
            }

            ipcRenderer.send('set-user-cookies', cookies);
            window.close();
        });
    }

    webview.addEventListener('will-navigate', navigate);
}