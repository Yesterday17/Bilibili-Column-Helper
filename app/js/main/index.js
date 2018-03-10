const {ipcMain, dialog} = require('electron');

ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{
            name: 'Images',
            extensions: ['jpg', 'png']
        }]
    }, (file) => {
        if (files) {
            event.sender.send('image-chosen', files);
        }
    });
})