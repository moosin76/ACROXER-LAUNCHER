import { ipcMain, dialog } from 'electron';
import { promises as fsp} from 'fs';

ipcMain.handle('saveTextFile', async(ev, text) => {
	const options = {
		properties : ['createDirectory']
	}
	const r = await dialog.showSaveDialog(options);

	if(!r.filePath) throw Error('cancel');

	await fsp.writeFile(r.filePath, text);
	return r.filePath;
})