onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const navigate = (url) => {
        webview.getWebContents().session.cookies.get({
            url: 'http://www.bilibili.com'
        }, (err, cookies) => {
            alert(JSON.stringify(cookies));
            window.close();
        });
    }

    webview.addEventListener('will-navigate', navigate);
}