import { createApp } from 'vue';
import MessageBoxComponent from './MessageBox/index.vue';

export const MessageBox = (options = {}) => {
    const defaults = {
        title: '提示',
        content: '',
        cancel: '取消',
        ok: '确定',
        handleCancel: null,
        handleOk: null
    };
    
    const config = { ...defaults, ...options };
    
    return new Promise((resolve) => {
        // 创建挂载点
        const container = document.createElement('div');
        document.body.appendChild(container);
        console.log('创建弹窗容器:', container);
        
        // 创建应用实例
        const app = createApp(MessageBoxComponent, {
            title: config.title,
            content: config.content,
            cancel: config.cancel,
            ok: config.ok,
            onCancel: () => {
                console.log('onCancel回调执行');
                config.handleCancel && config.handleCancel();
                removeMessageBox();
                resolve(false);
            },
            onOk: () => {
                console.log('onOk回调执行');
                config.handleOk && config.handleOk();
                removeMessageBox();
                resolve(true);
            }
        });
        
        // 挂载
        const instance = app.mount(container);
        console.log('弹窗实例创建完成');
        
        // 移除函数
        const removeMessageBox = () => {
            console.log('开始移除弹窗');
            if (document.body.contains(container)) {
                app.unmount();
                document.body.removeChild(container);
                console.log('弹窗移除成功');
            } else {
                console.log('容器已不存在');
            }
        };
    });
};