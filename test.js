const {remote} = require('electron');
const {Menu,MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({label:'MenuItem1',click(){console.log("item 1 clicked.")}}));
menu.append(new MenuItem({type:'separator'}));
menu.append(new MenuItem({label:"MenuItem1",type:'checkbox',checked:true}));

window.addEventListener('contextMenu',(e)=>{
    e.preventDefault();
    menu.popup({window:remote.getCurrentWindow()});
},false);

const constraints = {
    audio:{
        mandatory:{
            chromeMediaSource:'desktop'
        }
    },
    video:{
        mandatory:{
            chromeMediaSource:'desktop'
        }
    }
}