<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    name: "Scroller",
    // 定义两个函数由父组件传值
    props:{
        // 当页面滑动时触发的函数
        handleToScroll: {
            type: Function,
            default: function(){}
        },
        // 当页面点击完后触发的函数
        handleToTouchEnd: {
            type: Function,
            default: function(){}
        }
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper, {
            tap : true,
            probeType: 1
        });
        // console.log(this)
        this.scroll = scroll
        // 滑动时触发
        scroll.on("scroll", (pos)=>{
            this.handleToScroll(pos);
        })
        // 点击完后触发
        scroll.on("touchEnd", (pos)=>{
            this.handleToTouchEnd(pos);
        })

    },
    methods:{
        toScrollTop(y){
            this.scroll.scrollTo(0, y)
        }
    }

}
</script>

<style scoped>
    .wrapper{ height: 100%; }
</style>