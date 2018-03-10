const {ipcMain, dialog} = require('electron'),
    upcover = require('../utils/upcover');


/**
 * Called by ../render/index.js: 17
 */
ipcMain.on('open-file-dialog', (event, cookies, csrf) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (file) => {
        if (file) {
            upcover.upcover(file[0], cookies, csrf, (req) => {
                event.sender.send('image-chosen', req);
            });
        }
    });
})