const {app,BrowserWindow,dialog,ipcMain} = require('electron');
const path = require('path');

function createWindow(){
    let win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
        }
    });
    win.loadFile('index.html');
}

function openNewDialog(){
    
}

function recoverProductFiles(backupDir,devRootDir){
    return recoverFiles(backupDir,devRootDir,'production');
}

function recoverDevelopFiles(backupDir,devRootDir){
    return recoverFiles(backupDir,devRootDir,'develop');
}

//主进程监听打开文件对话框
ipcMain.on('open-directory-dialog',function(event,args){
    dialog.showOpenDialogSync(BrowserWindow,{
        properties:[args],
        filters:[{
            name:'Javascript',extensions:['js','vue'],
            name:'Html',extensions:['html']
        }]
    },function(files){
        if(files){
            event.sender.send('selectedItem',files[0]);
        }
    });
})

function recoverFiles(backupDir,devRootDir,mode="production"){
    let indexHtml = path.join(backupDir,'index-'+mode+'.html');
    let indexJs = path.join(backupDir,'index-'+mode+'.js');
    let npmJson = path.join(backupDir,'package-'+mode+'.json');
    let npmLockJson = path.join(backupDir,'package-lock-'+mode+'.json');
    let destIndexHtml = path.join(devRootDir,'/app/index.html');
    let destIndexJs = path.join(devRootDir,'/app/index.js');
    let destNpmJson = path.join(devRootDir,'package.json');
    let destNpmLockJson = path.join(devRootDir,'package-lock.json');
    console.error(indexHtml);
    console.error(indexJs);
    console.error(npmJson);
    console.error(npmLockJson);
    console.error(destIndexHtml);
    console.error(destIndexJs);
    console.error(destNpmJson);
    console.error(destNpmLockJson);
    // fs.copyFileSync(indexHtml, destIndexHtml,fs.constants.COPYFILE_FICLONE);
    // fs.copyFileSync(indexJs,destIndexJs,fs.constants.COPYFILE_FICLONE);
    // fs.copyFileSync(npmJson,destNpmJson,fs.constants.COPYFILE_FICLONE);
    // fs.copyFileSync(npmLockJson,destNpmLockJson,fs.constants.COPYFILE_FICLONE);
    return true;
}

app.whenReady().then(createWindow);
app.on('will-finish-launching',()=>{
    recoverProductFiles('D:\\work_root\\bmc\\dev\\backup','D:\\work_root\\bmc\\dev');
    recoverDevelopFiles('D:\\work_root\\bmc\\dev\\backup','D:\\work_root\\bmc\\dev');
});

app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length == 0){
        createWindow();
    }    
});