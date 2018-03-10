const $ = require('jquery');
const { ipcRenderer } = require('electron');
const implicitFigures = require('markdown-it-implicit-figures');
const markdown = require('markdown-it')({
    html: true
}).use(implicitFigures);


////////// Upload with cookies //////////

/**
 * Step 1: Click the button, open the dialog and choose file.
 */
$('#upcover').click(() => {
    ipcRenderer.send('image-upload');
})

/**
 * Step 2: The image has been uploaded, and print the addr here.
 * 
 * Response has the format like this:
 *  {
 *      "code": 0,
 *      "data": {
 *          "size": 283382,
 *          "url": "http://i0.hdslb.com/bfs/article/24d88dea4b05f9806ebc740de1be2840eedccf5c.png"
 *      },
 *      "message": "0",
 *      "ttl": 1
 *  }
 */
ipcRenderer.on('image-uploaded', (event, response) => {
    const original = $('#markdown-input').val();
    $('#markdown-input').val(original + '\n![](' + response.data.url + ')');
    $('#markdown-input').trigger('input');
})

////////// Upload with cookies //////////

$('#markdown-input').bind('input propertychange', () => {
    let text = $('#markdown-input').val(),
        md = markdown.render(text);
    $('#render-column').replaceWith('<div id="render-column">' + md + '</div>');
})