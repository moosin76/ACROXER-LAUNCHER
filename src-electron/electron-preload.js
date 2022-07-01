/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
import { contextBridge, ipcRenderer } from 'electron';
import { BrowserView, BrowserWindow } from '@electron/remote'

contextBridge.exposeInMainWorld('myWinApi', {
	minimize() {
		console.log("api, minimize call", BrowserWindow.getFocusedWindow());
		BrowserWindow.getFocusedWindow().minimize();
	},
	toggleMaximize() {
		console.log("api, toggleMaximize call");
		const win = BrowserWindow.getFocusedWindow();
		if (win.isMaximized()) {
			win.unmaximize();
		} else {
			win.maximize();
		}
	},
	close() {
		console.log("api, close call");
		BrowserWindow.getFocusedWindow().close()
	},
	setSize(width, height) {
		const win = BrowserWindow.getFocusedWindow();
		win.setSize(width, height, true);
		win.center();
	},
	updateStatus(callback) {
		ipcRenderer.on('update-status', callback);
	},
	checkUpdate() {
		return ipcRenderer.invoke('checkUpdate');
	},
	saveTextFile(text) {
		return ipcRenderer.invoke('saveTextFile', text);
	},
	
	
	
})