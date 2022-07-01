import { ipcMain, dialog } from 'electron';
import { promises as fsp} from 'fs';
import { autoUpdater } from 'electron-updater';
import isDev from 'electron-is-dev';

ipcMain.handle('saveTextFile', async(ev, text) => {
	const options = {
		properties : ['createDirectory']
	}
	const r = await dialog.showSaveDialog(options);

	if(!r.filePath) throw Error('cancel');

	await fsp.writeFile(r.filePath, text);
	return r.filePath;
})

ipcMain.handle('checkUpdate', async (ev)=> {
	console.log("CHECK UPDATE RUN")
	if(isDev) {
		return true;
	} else {
		return await autoUpdater.checkForUpdatesAndNotify();
	}
})