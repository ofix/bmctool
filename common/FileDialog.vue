<template>
    <button v-bind="$attrs" v-on="btnListeners">{{caption}}</button>
</template>

import {ipcRenderer} from 'electron'
export default{
    name:'FileChooseBtn',
    props:['caption','dir'],
    inheritAttrs:false,
    computed:{
        btnListeners:function(){
            let vm = this;
            let ipc = ipcRenderer;
            return Object.assign({},
                this.$listeners,
                {
                    click:function(e){
                        if(vm.dir != 'file'){
                            ipc.sendSync('open-directory-dialog','openDirectory');
                        }else{
                            ipc.sendSync('open-directory-dialog','openFile');
                        }
                        ipc.once('selectItem',function(event,path){
                            vm.$emit('btnSelectItem',path);
                        });
                    }
                });
        }
    }
}


