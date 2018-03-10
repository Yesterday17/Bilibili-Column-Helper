const {ipcRenderer} = require('electron');
const $ = require('jquery');

////////// Upload with cookies //////////

/**
 * Step 1: Click the button, open the dialog and choose file.
 */
$('#upcover').click(() => {
    ipcRenderer.send('open-file-dialog');
})

/**
 * Step 2: The image has been uploaded, and print the addr here.
 */
ipcRenderer.on('image-chosen', (event, path) => {
    alert(JSON.stringify(path));
})

////////// Upload with cookies //////////

$('#markdown-input').bind('input propertychange',  () => {
    let text = $('#markdown-input').val();
    ipcRenderer.send('markdown-render', text);    
})

ipcRenderer.on('markdown-rendered', (event, md) => {
    $('#render-column').replaceWith('<div id"render-column">' + md + '</div>');
})