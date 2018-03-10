const {ipcRenderer} = require('electron');
const $ = require('jquery');

$('#upcover').click(() => {
    ipcRenderer.send('open-file-dialog');
})

$('#markdown-input').bind('input propertychange', function () {
    let text = $('#markdown-input').val();
    ipcRenderer.send('markdown-render', text);    
})

ipcRenderer.on('image-chosen', (event, path) => {
    alert(path);
})

ipcRenderer.on('markdown-rendered', (event, md) => {
    $('#render-column').replaceWith('<div id"render-column">' + md + '</div>');
})