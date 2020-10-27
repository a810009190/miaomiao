<template>
    <div class="messageBox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div class="div2">
            <div class="div1" @click="handleCancel">{{cancel}}</div>
            <div class="div1" style="border-left: 1px solid #ccc" @click="handleOk">{{ok}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBox'
}
</script>

<style scoped>
    .messageBox{width: 200px; height: 140px; border: 1px solid #ccc; border-radius: 4px; background-color: white; box-shadow: 3px 3px 3px 3px; position: absolute; left: 50%; top: 50%; z-index: 999; margin-top: -70px; margin-left: -100px;}
    *{margin: 0; padding: 0;}
    h2{text-align: center;}
    p{text-align: center; font-size: 18px; height: 20px; line-height: 20px; margin-top: 25px;}
    .div2{position: absolute; bottom: 0; width: 100%; border: 1px #ccc solid;}
    .div1{float: left; width: 50%; text-align: center;height: 40px; box-sizing: border-box; line-height: 40px;}
</style>