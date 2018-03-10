const {
    ipcMain,
    dialog,
    remote,
    Menu
} = require('electron'),
    biliapi = require('../utils/biliapi');


ipcMain.on('image-upload', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (file) => {
        if (file) {
            const glob = global.sharedObject;

            biliapi.upcover(file[0], glob.cookies, glob.csrf, (response) => {
                event.sender.send('image-uploaded', JSON.parse(response));
            });
        }
    });
})

/**
 * Menu
 */
var menuTemplate = [
    {
        label: 'Edit',
        submenu: [{
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        label: 'About',
        submenu: [{
            label: 'Visit Repository',
            click() {
                require('electron').shell.openExternal('https://github.com/Yesterday17/Bilibili-Column-Helper')
            }
        }]
    }
];
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);