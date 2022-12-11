<template>
    <div class="wrap">
        <img src="https://res.suning.cn/project/passport/login/wapV8/images/login-icon.png" alt="">
        <input type="text" placeholder="请输入帐号" v-model="data.username">
        <input type="password" placeholder="请输入密码" v-model="data.password">
        <div class="loginbtn" @click="login">登录</div>
        <p><router-link to="register">立即注册</router-link></p>
    </div>
</template>
<script>
import { reactive } from 'vue';
// import axios from 'axios';
import axios from "@/request/index";
import { useRouter } from 'vue-router';

const Login = () => {
    const router = useRouter()
    // 定义了data数据
    const data = reactive({ username: '', password: '' })
    const login = async () => {
        // 非空验证
        if (!data.username || !data.password) {
            alert("请输入完整信息")
        }
        const res = await axios({
            method: 'post',
            url: "/users/login",
            data: 'username=' + data.username + '&password=' + data.password,
            headers: { "Content-Type": 'application/x-www-form-urlencoded' }
        })
        console.log(res);
        console.log(res.data.code);
        if (res.data.code === 1) {
            // 登录状态的纪录
            localStorage.islogin = true
            localStorage.token = res.data.token
            localStorage.userid = res.data.user.id
            // 跳转路由 跳转到首页
            router.push("/")
        }
        if (res.data.code === 0) {
            alert(res.data.message)
        }
    }
    return { login, data }
}
export default {
    name: "loginView",
    setup() {
        const { login, data } = Login()
        return { login, data }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
    width: 2.95rem;
    height: 5rem;
    // background-color: #E3CF17;
    padding-top: 1.6rem;
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