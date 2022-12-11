<template>
    <div class="admin-title">我的易购</div>
    <div class="wrap">
        <img class="pic" src="https://res.suning.cn/project/passport/login/wapV8/images/login-icon.png" alt="">
        <p>
            <span>账号：</span>
            <span>{{ userdata.username }}</span>
        </p>
        <p>
            <span>身份：</span>
            <span>{{ userdata.identity }}</span>
        </p>
        <p>
            <span>昵称：</span>
            <span>{{ userdata.nickname }}</span>
        </p>
        <div class="logout" @click="logout">注销登录</div>
    </div>
    <FooterTab :pagename="pagename"></FooterTab>
</template>
<script>
import FooterTab from '@/components/FooterTab.vue';
// import axios from 'axios';
import axios from "@/request/index";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const GetUserData = () => {
    const userdata = ref([])
    const router = useRouter()
    const getuserdata = async () => {
        const { userid, token } = localStorage
        if (!userid) {
            console.log("没登录");
            router.push('login')
            return
        }
        const res = await axios({
            // url:" http://localhost:8888/users/info?id="+userid,
            url: "/users/info?id=" + userid,
            headers: { "authorization": token }
        })
        console.log(res.data);
        //   登录过期
        if (res.data.code === 401 || res.data.code === 0) {
            console.log(res.data.message);
            localStorage.clear()
            router.push('login')
            return
        }
        // 获取成功
        if (res.data.code === 1) {
            console.log(res.data.info);
            userdata.value = res.data.info
        }

    }
    return { getuserdata, userdata }
}
// 注销登录功能
const Logout = () => {
    const router = useRouter()
    const logout = async () => {
        const { userid, token } = localStorage
        const res = await axios({
            // url:"http://localhost:8888/users/logout?id="+userid,
            url: "users/logout?id=" + userid,
            headers: { "authorization": token }
        })
        console.log(res.data);
        if (res.data.code === 1) {
            localStorage.clear()
            router.push('login')
        }

    }
    return { logout }
}
export default {
    name: "adminView",
    components: { FooterTab },
    setup() {
        const pagename = "admin"
        const { getuserdata, userdata } = GetUserData()
        getuserdata()
        const { logout } = Logout()
        return { pagename, userdata, logout }
    }
}
</script>
<style lang="scss" scoped>
.admin-title {
    font-size: .175rem;
    color: white;
    text-align: center;
    height: .45rem;
    line-height: .45rem;
    background-color: #EFDE56;

}

.wrap {
    padding-top: 1.5rem;

    .pic {
        width: 0.6rem;
        margin: .1rem auto;
        display: block;
    }

    p {
        height: .38rem;
        line-height: .38rem;
        // background-color: #7CEF7F;
        margin-left: 50%;
        transform: translateX(-50%);
        border-bottom: .005rem solid #1B1AEF;
        text-align: center;
        color: #555;

        span {
            font-size: .15rem;
        }
    }

    .logout {
        text-align: center;
        color: #87EF71;
        font-size: .15rem;
        margin-top: .2rem;
    }
}
</style>
