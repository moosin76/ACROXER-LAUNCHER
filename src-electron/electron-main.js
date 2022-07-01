import path from 'path'
import os from 'os'
import fs from 'fs';
import isDev from 'electron-is-dev';

import { app, BrowserWindow, nativeTheme, dialog } from 'electron'
import { initialize, enable } from '@electron/remote/main'

// auto update 관련코드
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

import './ipcMain';

initialize();

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
	if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
		fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
	}
} catch (_) { }

let mainWindow

function createWindow() {
	/**
	 * Initial window options
	 */

	mainWindow = new BrowserWindow({
		icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
		width: 1600,
		height: 1024,
		resizable: false,
		useContentSize: true,
		backgroundColor: '#171b28',
		frame: false,
		webPreferences: {
			contextIsolation: true,
			// More info: /quasar-cli/developing-electron-apps/electron-preload-script
			preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
		}
	})

	enable(mainWindow.webContents);
	console.log("APP URL: ", process.env.APP_URL);
	if(isDev) {
		mainWindow.loadURL('http://localhost:8081').then(()=>{
			console.log(a);
		});
	} else {
		mainWindow.loadURL(process.env.APP_URL + '#/update')
	}

	

	// if (process.env.DEBUGGING) {
	// 	// if on DEV or Production with debug enabled
	// 	mainWindow.webContents.openDevTools()
	// } else {
	// 	// we're on production; no access to devtools pls
	// 	mainWindow.webContents.on('devtools-opened', () => {
	// 		mainWindow.webContents.closeDevTools()
	// 	})

	
	// }

	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null
	});

}


app.whenReady().then(() => {
	createWindow();
	// setTimeout(() => {
	// 	sendStatusMessage({ type: 'test', msg: `version : ${app.getVersion()}` });
	// }, 2500);

	// setTimeout(() => {
	// 	sendStatusMessage({ type: 'test', msg: `isDev : ${isDev}` });
	// }, 3500);
})

app.on('window-all-closed', () => {
	if (platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

// console.log(process.env);
// auto update 관련 코드
// log.info("npm package version", process.env.npm_package_version);
// log.info("appVersion", app.getVersion());
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
// const updateServerUrl = `http://localhost:5000/download/latest`;
//log.info('updateServerUrl', updateServerUrl);
// autoUpdater.setFeedURL(updateServerUrl);

function sendStatusMessage(obj) {
	log.info('sendStatusMessage ==>', obj);
	mainWindow.webContents.send('update-status', obj);
}

autoUpdater.on('checking-for-update', () => {
	sendStatusMessage({ type: 'checking-for-update', msg: 'Checking for update...' });
})

autoUpdater.on('update-available', (info) => {
	sendStatusMessage({ type: 'update-available', msg: 'Update available.', info });
})

autoUpdater.on('update-not-available', (info) => {
	sendStatusMessage({ type: 'routerTo', path: '/' });
})

autoUpdater.on('error', (err) => {
	sendStatusMessage({ type: 'error', msg: 'Error in auto-updater. ' + err });
})

autoUpdater.on('download-progress', (progressObj) => {
	let log_message = "Download speed: " + progressObj.bytesPerSecond;
	log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
	sendStatusMessage({ type: 'download-progress', msg: log_message, progressObj });
})

autoUpdater.on('update-downloaded', (info) => {
	sendStatusMessage({ type: 'update-downloaded', msg: 'Update downloaded', info });
	const options = {
		type: "question",
		button: ["Update", 'Cancel'],
		defaultId: 0,
		title: "AcroXceR Updater",
		message: "업데이트가 있습니다. 프로그램을 업데이트 하시겠습니까?"
	};
	let btnIndex = dialog.showMessageBoxSync(mainWindow, options);
	if (btnIndex === 0) {
		autoUpdater.quitAndInstall();
	}
});

app.on('ready', function () {
	// setTimeout(() => {
	// 	log.info("checkForUpdatesAndNotify",);
	// 	sendStatusMessage({ type: 'test', msg: `autoUpdater SET` });
	// 	autoUpdater.checkForUpdatesAndNotify();
	// }, 2000);

});