<template>
     <div class="FooterTab">
        <div :class="{item:true,active:pagename==='home'}" @click="classClick('/')">
            <span class="iconfont">&#xe609;</span>
            <span class="txt">猜你喜欢</span>
        </div>
        <div :class="{item:true,active:pagename==='classify'}"  @click="classClick('/classify')">
            <span class="iconfont">&#xe636;</span>
            <span class="txt" >分类</span>
        </div>
        <div :class="{item:true,active:pagename==='cart'}"  @click="classClick('/cart')">
            <span class="iconfont">&#xe621;</span>
            <span class="txt">购物车</span>
        </div>
        <div :class="{item:true,active:pagename==='admin'}"  @click="classClick('/admin')">
            <span class="iconfont">&#xe6c8;</span>
            <span class="txt">我的易购</span>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
    // 点击分类按钮的方法
const ClassClick=()=>{
     // 路由跳转
     const router= useRouter()
    const classClick=(path)=>{
        router.push(path)
    //   console.log("点击了");
    }
    return {classClick}
}
    export default{
        name:"FooterTab",
        props:['pagename'],
        setup(){
            const {classClick}=ClassClick()
            return {classClick}
        }
    }
</script>
<style lang="scss" scoped>
.FooterTab{
        border-top:.005rem silid #ccc;
        width: 100%;
        height: .5rem;
        background-color:white;
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        z-index: 999;
        .item{
            display: flex;
            flex-direction: column;
            text-align: center;
            width: 25%;
            // padding: .1rem;
            .iconfont{
                font-size: .22rem;
                color: #E6C36A;
                font-weight:bold;
            }
            .txt{
                font-size: .1rem;
                color: #B0B0A5;
            }

        }
        .item.active span{
             color:#6AE64E ;
        }
    }

</style>