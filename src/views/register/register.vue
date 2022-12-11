<template>
    <div class="wrap">
        <img src="https://res.suning.cn/project/passport/login/wapV8/images/login-icon.png" alt="">
        <input type="text" placeholder="请输入帐号" v-model="data.username">
        <input type="password" placeholder="请输入密码" v-model="data.password">
        <input type="password" placeholder="请再次输入密码" v-model="data.rpassword">
        <input type="text" placeholder="请输入昵称" v-model="data.nickname">
        <div class="loginbtn" @click="register">立即注册</div>
        <p><router-link to="login">已有账号去登录</router-link></p>
    </div>
</template>
<script>
import { reactive } from 'vue';
// import axios from 'axios';
import axios from "@/request/index";
import { useRouter } from 'vue-router';

const Register = () => {
    const router = useRouter()
    // 定义了data数据
    const data = reactive({ username: '', password: '', rpassword: '', nickname: '' })
    const register = async () => {
        if (!data.username || !data.password || !data.rpassword || !data.nickname) {
            alert("表单未输入完整，请检查是否都已填完")
        }
        const res = await axios({
            method: "post",
            url: "/users/register",
            data: 'username=' + data.username + '&password=' + data.password + '&rpassword=' + data.rpassword + '&nickname=' + data.nickname,
            headers: { "Content-Type": 'application/x-www-form-urlencoded' }
        })
        console.log(res);
        // 注册成功
        if (res.data.code === 1) {
            router.push("login")
        }
        // 注册失败
        if (res.data.code === 0) {
            alert(res.data.message)
        }
    }
    return { register, data }
}
export default {
    name: "registerView",
    setup() {
        const { register, data } = Register()
        return { register, data }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
    width: 2.95rem;
    height: 5rem;
    // background-color: #E3CF17;
    padding-top: 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: .66rem;
        height: .66rem;
        margin-top: .2rem;
    }

    input {
        width: 100%;
        height: 48px;
        border: 0;
        margin-top: .16rem;
        font-size: .16rem;
        color: #666;
        border-radius: .2rem;
        background-color: #E0E0D2;
        text-indent: .2rem;

    }

    p {
        font-size: .14rem;

        a {
            color: #888;
            margin-top: .15rem;
            text-decoration: none;
        }
    }

    .loginbtn {
        width: 100%;
        height: .48rem;
        margin-top: .2rem;
        color: white;
        background-color: #E3CF17;
        text-align: center;
        font-size: .16rem;
        line-height: .48rem;
        border-radius: .2rem;
        margin-bottom: .1rem;
    }
}
</style>