import { app, BrowserWindow } from 'electron'
import { initialize, enable } from '@electron/remote/main'
import path from 'path';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

// initialize();

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
let win;
log.info(`App starting... ver ${process.env.npm_package_version}`);

function sendStatusToWindow(text) {
	log.info(text);
	win.webContents.send('message', text);
}

function createUpdateWindow() {
	win = new BrowserWindow({
		title: 'AcroXeR Update',
		width: 400,
		height: 400,
		resizable: false,
		backgroundColor: '#171b28',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		}
	});


	win.loadURL(`${process.env.APP_URL}#/update`);

	if (process.env.DEBUGGING) {
		// if on DEV or Production with debug enabled
		win.webContents.openDevTools()
	} else {
		// we're on production; no access to devtools pls
		win.webContents.on('devtools-opened', () => {
			win.webContents.closeDevTools()
		})
	}

	win.on('closed', () => {
		win = null;
	})


}

export default createUpdateWindow;

