<template>
    <div class="wrap">
        <div class="cart-title">购物车</div>
        <div class="main" v-if="goodslist.length !== 0">
            <div class="item" v-for="(item, index) in goodslist" :key="index">
                <img class="pic" :src="item.img_small_logo" alt="">
                <div class="content">
                    <p>
                        {{ item.title }}
                    </p>
                    <div class="money_number">
                        <span class="money">¥{{ item.current_price }}</span>
                        <div class="nubbox">
                            <span class="btn" :data-goodsid="item.goods_id" @click="del"
                                :data-nub="item.cart_number">-</span>
                            <span class="n">{{ item.cart_number }}</span>
                            <span class="btn" :data-goodsid="item.goods_id" @click="add"
                                :data-nub="item.cart_number">+</span>
                        </div>
                    </div>
                </div>
                <div class="removebtn" @click="removeitem" :data-goodsid="item.goods_id">移除</div>
            </div>
            <div class="btnclear">
                <div class="clear" @click="removeAll">清空购物车</div>
            </div>
        </div>
    </div>
    <div class="btnpay" v-if="goodslist.length !== 0">
        <div class="pay" @click="apay">立即支付</div>
    </div>
    <div class="listnull" v-if="goodslist.length === 0">
        <img src="../../assets/WechatIMG56.png" alt="">
        <p>当前购物车为空</p>
    </div>
    <FooterTab :pagename="pagename"></FooterTab>
</template>

<script>
// import axios from 'axios'
import axios from "@/request/index";
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import FooterTab from '../../components/FooterTab'
// 获取购物车列表
const GetData = () => {
    const goodslist = ref([])
    const router = useRouter()
    const getdata = async () => {
        // 拿到ID
        const { userid, token } = localStorage
        console.log(userid);
        // 没有登录
        if (!userid) {
            console.log("没登录");
            router.push('login')
            return
        }
        const res = await axios({
            url: "/cart/list?id=" + userid,
            method: "get",
            headers: { "Content-Type": 'application/x-www-form-urlencoded', "authorization": token }

        })
        console.log(res.data.code);
        // 登录过期
        if (res.data.code === 401) {
            // alert(res.data.message)
            localStorage.clear()
            router.push('login')
            return
        }
        // 获取成功
        if (res.data.code === 1) {
            console.log(res.data.cart);
            goodslist.value = res.data.cart
        }
    }
    return { getdata, goodslist }
}
// 删除单条数据
const RemoveItem = (getdata) => {
    const removeitem = async (e) => {
        const { userid, token } = localStorage
        const goodsid = e.currentTarget.dataset.goodsid
        const res = await axios({
            url: "/cart/remove?goodsId=" + goodsid + "&id=" + userid,
            headers: { "authorization": token }
        })
        console.log(res);
        if (res.data.code === 1) {
            // 为1的时候显示
            getdata()
        }
    }
    return { removeitem }
}
// 清空购物车
const RemoveAll = (getdata) => {
    const removeAll = async (e) => {
        const { userid, token } = localStorage
        const res = await axios({
            url: "/cart/clear?id=" + userid,
            headers: { "authorization": token }
        })
        console.log(res);
        if (res.data.code === 1) {
            getdata()
        }
    }
    return { removeAll }
}
// 增加商品数量
const Add = (getdata) => {
    const add = async (e) => {
        const { userid, token } = localStorage
        const goodsid = e.currentTarget.dataset.goodsid
        let number = e.currentTarget.dataset.nub - 0;
        number++
        // console.log(e.currentTarget.dataset.nub-0);
        const res = await axios({
            method: "post",
            url: "/cart/number",
            data: 'id=' + userid + '&goodsId=' + goodsid + "&number=" + number,
            headers: { "Content-Type": 'application/x-www-form-urlencoded', "authorization": token }

        })
        console.log(res);
        if (res.data.code === 1) {
            getdata()

        }
    }
    return { add }
}
// 减少商品数量
const Del = (getdata) => {
    const del = async (e) => {
        const { userid, token } = localStorage
        const goodsid = e.currentTarget.dataset.goodsid
        let number = e.currentTarget.dataset.nub - 0;
        if (number === 1) {
            alert("就剩一件了，不需要移出购物车🛒")
            return
        }
        number--
        // console.log(e.currentTarget.dataset.nub-0);
        const res = await axios({
            method: "post",
            url: "http://localhost:8888/cart/number",
            data: 'id=' + userid + '&goodsId=' + goodsid + "&number=" + number,
            headers: { "Content-Type": 'application/x-www-form-urlencoded', "authorization": token }

        })
        console.log(res);
        if (res.data.code === 1) {
            getdata()
        }
    }
    return { del }
}
// 支付
const Apay = () => {
    const apay = async (e) => {
        const { userid, token } = localStorage
        const res = await axios({
            method: "post",
            url: "http://localhost:8888/cart/pay",
            data: 'id=' + userid,
            headers: { "Content-Type": 'application/x-www-form-urlencoded', "authorization": token }

        })
        if (res.data.code === 1) {
            alert("支付成功")
        }
    }
    return { apay }
}

export default {
    name: "cartView",
    components: { FooterTab },

    setup() {
        const pagename = "cart"
        const { getdata, goodslist } = GetData()
        getdata()
        const { removeitem } = RemoveItem(getdata)
        const { removeAll } = RemoveAll(getdata)
        const { add } = Add(getdata)
        const { del } = Del(getdata)
        const { apay } = Apay()
        return { goodslist, pagename, removeitem, removeAll, add, del, apay }
    }
}
</script>

<style lang="scss" scoped>
.cart-title {
    font-size: .175rem;
    color: white;
    text-align: center;
    height: .45rem;
    line-height: .45rem;
    background-color: #D5D51E;
    position: sticky;
    top: 0;
    z-index: 999;
}

.main {
    background-color: #f5f5f9;
    padding: .12rem 0rem;

    .item {
        width: 3.4rem;
        // background-color: #939CEF;
        background-color: white;
        border-radius: .1rem;
        margin: .05rem auto;
        padding: .1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .pic {
            width: .9rem;
            height: .9rem;
            border-radius: .06rem;
        }

        .content {
            width: 2rem;
            // background-color:#A2EF70;
            padding: 0 .05rem;

            p {
                font-size: .12rem;
                font-weight: bold;
                line-height: .175rem;
                color: #333;
                width: 100%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;

            }

            .money_number {
                display: flex;
                height: .3rem;
                // background-color: #E2EF3B;
                justify-content: space-between;
                align-items: center;
                margin-top: .15rem;

                .money {
                    font-size: .16rem;
                    font-weight: bold;
                    color: #333;
                }

                .nubbox {
                    display: flex;
                    width: .88rem;
                    height: .27rem;
                    border: .005rem solid #939CEF;
                    border-radius: .15rem;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 .02rem;
                    box-sizing: border-box;

                    .btn {
                        background-color: #E9EFDD;
                        width: .22rem;
                        height: .22rem;
                        border-radius: 50%;
                        text-align: center;
                        line-height: .22rem;
                        color: #555;

                    }
                }
            }
        }

        .removebtn {
            width: .3rem;
            height: .3rem;
            background-color: #EFE6E5;
            color: #978BEF;
            line-height: .3rem;
            padding: .05rem;
            text-align: center;
            border-radius: 50%;
        }
    }
}

.btnclear {
    height: .3rem;

    .clear {
        width: 1rem;
        color: white;
        height: .3rem;
        text-align: center;
        background-color: #EFA842;
        line-height: .3rem;
        font-size: .12rem;
        border-radius: .1rem;
        margin: .08rem auto;
    }
}

.btnpay {
    height: .9rem;
    position: fixed;
    bottom: .53rem;
    left: 50%;
    transform: translateX(-50%);

    .pay {
        width: 1rem;
        color: white;
        height: .3rem;
        text-align: center;
        background-color: #EF2F12;
        line-height: .3rem;
        font-size: .12rem;
        border-radius: .1rem;
        margin: .08rem auto;


    }
}

.listnull {
    text-align: center;
    height: 1.5rem;
    padding-top: 1rem;

    img {
        height: 1rem;
        width: 1rem;
    }

    p {
        font-size: .15rem;
        color: #666;
    }
}
</style>