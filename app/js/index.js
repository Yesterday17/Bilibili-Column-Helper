const md = require('markdown-it')();
const {ipcMain, dialog} = require('electron');
const fs = require('fs');

onload = function () {
    //
}

$('#markdown-input').bind('input propertychange', function () {
    let text = $('#markdown-input').val();

    console.log(text);

    let render = md.render(text);

    console.log(render);

    $('#render-column').replaceWith('<div id"render-column">' + render + '</div>');
})

$('#upcover').click(function () {
    dialog.showOpenDialog(this, {
        properties: ['openFile'],
        filters: [{
            name: 'Images',
            extensions: ['jpg', 'png']
        }]
    });
    console.log(image);

})