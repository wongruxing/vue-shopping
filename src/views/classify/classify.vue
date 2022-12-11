<template>
  <div class="wrap">
    <div class="header">
      <p class="title">商品分类</p>
      <div class="searchbox">
        <input type="text" placeholder="小米扫地机器人" />
        <span class="iconfont">&#xe693;</span>
      </div>
    </div>
    <div class="main">
      <ul class="nav">
        <li v-for="(item, index) in navlist" :key="index" @click="changeshop">
          {{ item }}
        </li>
      </ul>
      <div class="content">
        <div class="item" v-for="(item, index) in shoplist" :key="index">
          <img :src="item.img_big_logo" :data-goodsid="item.goods_id" @click="linkdetail" />
        </div>
      </div>
    </div>
  </div>
  <FooterTab :pagename="pagename"></FooterTab>
</template>
<script>
import FooterTab from "../../components/FooterTab.vue";
// import axios from "axios";
import axios from "@/request/index";
import { ref } from "vue";
import { useRouter } from "vue-router";
// 定义请求导航数据
const GetNavList = (shoplist) => {
  const navlist = ref([]);
  const getNavlist = async () => {
    const res = await axios({
      url: "/goods/category",
      method: "get",
    });
    console.log(res);
    navlist.value = res.data.list;
  };
  return { getNavlist, navlist };
};
// 获取商品
const GetContent = () => {
  const shoplist = ref([]);
  // 调用获取导航数据
  const getContent = async (w) => {
    const word = w;
    //  const word=event.target.innerText||'童装玩具'
    //  console.log(event.target.innerText);
    const res = await axios({
      url: "/goods/list?category=" + word + "&pagesize=30",
      method: "get",
    });
    console.log(res);
    shoplist.value = res.data.list;
  };
  return { getContent, shoplist };
};
const ChangeShop = (getContent) => {
  const changeshop = () => {
    const w = event.target.innerText;
    getContent(w);
  };
  return { changeshop };
};
// 跳转详情页
const Linkdetail = () => {
  const router = useRouter();
  const linkdetail = (e) => {
    console.log(e.currentTarget.dataset.goodsid);
    const goodsid = e.currentTarget.dataset.goodsid;
    router.push({ name: "detail", query: { goodsid } });
  };
  return { linkdetail };
};

export default {
  name: "classifyView",
  components: { FooterTab },
  setup() {
    const pagename = "classify";

    const { getNavlist, navlist } = GetNavList();
    getNavlist();
    const { getContent, shoplist } = GetContent();
    getContent("童装玩具");
    const { changeshop } = ChangeShop(getContent);
    const { linkdetail } = Linkdetail();
    return { pagename, navlist, getContent, shoplist, changeshop, linkdetail };
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  height: 100vh;
  // background-color: #E3DF10;
  display: flex;
  flex-direction: column;
}

.header {
  height: 0.5rem;
  background-color: #e3df10;
  display: flex;

  .title {
    width: 0.9rem;
    font-size: 0.175rem;
    font-weight: 500;
    line-height: 0.5rem;
    text-align: center;
    color: #5867e3;
  }

  .searchbox {
    flex: 1;
    // background-color:#E0E657;
    padding: 0.1rem;
    position: relative;

    input {
      width: 100%;
      height: 100%;
      border-radius: 0.15rem;
      border: 0;
      text-indent: 0.3rem;
      background-color: #eaeae6;
    }

    span {
      position: absolute;
      z-index: 999;
      left: 0.2rem;
      font-size: 0.18rem;
      font-weight: bold;
      color: #466eb0;
      // background-color: red;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.main {
  flex: 1;
  // background-color: #466EB0;
  display: flex;
  overflow: auto;

  .nav {
    overflow: auto;
    width: 0.9rem;
    background-color: #f9f9f9;

    li {
      text-align: center;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.14rem;
      color: #666;
      font-weight: bold;
    }

    li:hover {
      background-color: #ef501d;
      color: white;
    }
  }

  .content {
    flex: 1;
    // background-color: #9EE381;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: flex-start;
    overflow: auto;

    .item {
      margin: 0.05rem 0;
      width: 0.8rem;
      height: 0.8rem;

      // background-color: skyblue;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.05rem;
      }
    }
  }
}
</style>