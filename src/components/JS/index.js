import Vue from 'vue';
import MessageBox from './MessageBox';


// 闭包？
export var messageBox = (function(){
    var defaults = { //默认值
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleCancel: null,
        handleOk: null
    };

    // 返回执行的函数
    return function(opts){ //配置参数，调用之后的具体值
        for(var attr in opts){
            defaults[attr] = opts[attr];
        }

        // 用extend新建一个节点，节点的内容就是MessageBox组件
        var MyComponent = Vue.extend(MessageBox);
        var vm = new MyComponent({
            el: document.createElement('div'),
            data:{
                title : defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok,

            },
            methods: {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.bind(this)();
                    document.body.removeChild(vm.$el);
                    // removechild?
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.bind(this)();
                    document.body.removeChild(vm.$el);
                }
            }
        });
        // 将这个节点挂载到body上
        document.body.appendChild(vm.$el);
    };   

})();