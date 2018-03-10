const {ipcRenderer} = require('electron'),
    request = require('request');

onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const navigate = (url) => {
        webview.getWebContents().session.cookies.get({
            url: 'http://www.bilibili.com'
        }, (err, cookies) => {
            let jar = '';

            for (let element in cookies){
                jar += ('; ' + request.cookie(cookies[element].name + '=' + cookies[element].value));
            }

            ipcRenderer.send('set-user-cookies', jar.substring(2));
            window.close();
        });
    }

    webview.addEventListener('will-navigate', navigate);
}