const {ipcMain, dialog} = require('electron'),
    upcover = require('../utils/upcover');

ipcMain.on('open-file-dialog', (event, cookies) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (file) => {
        if (file) {
            upcover.upcover(file[0], cookies, (req) => {
                event.sender.send('image-chosen', req);
            });
        }
    });
})