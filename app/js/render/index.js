const {ipcRenderer} = require('electron');
const $ = require('jquery');

////////// Upload with cookies //////////

/**
 * Step 1: Click the button. But in fact, we use it to request cookies.
 */
$('#upcover').click(() => {
    ipcRenderer.send('get-user-cookies');
})

/**
 * Step 2: After getting cookies, open the dialog and choose file.
 */
ipcRenderer.on('request-cookies', (event, cookies) => {
    ipcRenderer.send('open-file-dialog', cookies);
})

/**
 * Step 3: The image has been uploaded, and print the addr here.
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