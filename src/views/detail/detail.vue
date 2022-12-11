<template>
  <div>
    <div class="wrap">
      <img class="pic" :src="goodsdata.img_big_logo" alt="" />
      <div class="moneybox-wrap">
        <div class="moneybox">
          <span class="current_price">¥{{ goodsdata.current_price }}</span>
          <span class="price" v-if="goodsdata.is_sale">¥{{ goodsdata.price }}</span>
        </div>
        <div class="money_r">
          <p>大聚惠</p>
          <div class="promtion">
            <span v-if="goodsdata.is_sale">特价</span>
            <span class="hot" v-if="goodsdata.is_hot">热销</span>
          </div>
        </div>
      </div>
    </div>
    <p class="title">
      {{ goodsdata.title }}
    </p>
    <div class="detail_footer">
      <div class="iconitem">
        <span class="iconfont">&#xe60d;</span>
        <span class="txt">客服</span>
      </div>
      <div class="iconitem">
        <span class="iconfont">&#xe6e3;</span>
        <span class="txt">店铺</span>
      </div>
      <div class="iconitem" @click="cartlink">
        <span class="iconfont">&#xe601;</span>
        <span class="txt">购物车</span>
      </div>
      <div class="btn">马上抢</div>
      <div class="btn cart" @click="addcart">加入购物车</div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import axios from "@/request/index";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
// 获取商品详情
const GetGoods = () => {
  const goodsdata = ref([]);
  const Getgoods = async (id) => {
    const res = await axios({
      url: "/goods/item/" + id,
      method: "get",
    });
    console.log(res.data.info);
    goodsdata.value = res.data.info;
  };
  return { Getgoods, goodsdata };
};
const Addcart = (goodsid) => {
  const router = useRouter();
  const addcart = async () => {
    const { userid, token } = localStorage;
    if (!userid) {
      alert("加入购物车失败");
      return;
    }
    const res = await axios({
      url: "/cart/add",
      method: "post",
      data: "goodsId=" + goodsid + "&id=" + userid,
      headers: { authorization: token },
    });
    console.log(res);
    //登录过期
    if (res.data.code === 401) {
      localStorage.clear();
      router.push("login");
      return;
    }
    if (res.data.code === 1) {
      alert(res.data.message);
    }
  };
  return { addcart };
};
const CartLink = () => {
  const router = useRouter();
  const cartlink = () => {
    router.push("cart");
  };
  return { cartlink };
};
export default {
  name: "detailView",
  setup() {
    const Router = useRoute();
    console.log(Router.query.goodsid);
    const goodsid = Router.query.goodsid;
    const { Getgoods, goodsdata } = GetGoods();
    Getgoods(goodsid);
    const { addcart } = Addcart(goodsid);
    const { cartlink } = CartLink();
    return { goodsdata, addcart, cartlink };
  },
};
</script>
<style lang="scss" scoped>
.pic {
  width: 100%;
  display: block;
}

.moneybox-wrap {
  height: 0.74rem;
  background-color: #bce09d;
  display: flex;

  .moneybox {
    width: 2.4rem;
    background-color: #e03a10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 0.24rem;
      color: aliceblue;
      margin-left: 0.15rem;
    }

    .price {
      font-size: 0.15rem;
      text-decoration: line-through;
    }
  }

  .money_r {
    flex: 1;
    height: 100%;
    background-color: #d9e023;

    p {
      font-size: 0.225rem;
      color: #e03a10;
      text-align: center;
    }

    .promtion {
      display: flex;
      justify-content: center;

      span {
        font-size: 0.15rem;
        color: white;
        background-color: #9da1e0;
        width: 0.4rem;
        margin-left: 0.1rem;
        text-align: center;
        margin-top: 0.1rem;
      }

      .hot {
        margin-left: 0.1rem;
        background-color: #e03a10;
      }
    }
  }
}

.title {
  font-size: 0.14rem;
  font-weight: bold;
  line-height: 0.175rem;
  color: #333;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding: 0rem 0.075rem;
  box-sizing: border-box;
  margin: 0.06rem;
}

.detail_footer {
  width: 100%;
  border-top: 0.005rem solid #313de0;
  height: 0.6rem;
  display: flex;
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  bottom: 0;

  .iconitem {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #5c6697;

    .iconfont {
      font-size: 0.22rem;
      font-weight: bold;
    }
  }

  .btn {
    width: 1rem;
    height: 0.35rem;
    background-color: #20e610;
    text-align: center;
    line-height: 0.35rem;
    color: white;
    font-weight: bold;
    border-radius: 0.15rem;
  }

  .cart {
    background-color: #ef7f30;
  }
}
</style>