// import { boot } from 'quasar/wrappers'
// import {ipcMain} from 'electron'
const boot = require('quasar/wrappers').boot;
const {ipcRenderer} = require('electron/renderer');


module.exports = boot(({app})=>{
	app.config.globalProperties.$ipcRenderer = ipcRenderer;
})


// export default boot(({ app }) => {
// 	app.config.globalProperties.$ipcMain = ipcMain;
// });

// export { ipcMain };