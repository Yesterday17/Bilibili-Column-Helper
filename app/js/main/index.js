const {ipcMain, dialog, remote} = require('electron'),
    upcover = require('../utils/upcover');


/**
 * Called by ../render/index.js: 17
 */
ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (file) => {
        if (file) {
            const glob = global.sharedObject;

            upcover.upcover(file[0], glob.cookies, glob.csrf, (req) => {
                event.sender.send('image-chosen', req);
            });
        }
    });
})