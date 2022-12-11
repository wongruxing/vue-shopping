<template>
  <div class="wrap">
    <div class="header">
      <div class="header__top">
        <div class="header__top__iconbox">
          <span class="iconfont">&#xe811;</span>
          <span class="txt">分类</span>
        </div>
        <img class="header__top__img" src="https://image5.suning.cn/uimg/cms/img/166441792925031353.png" alt="" />
        <div class="header__top__iconbox">
          <span class="iconfont">&#xe6c8;</span>
          <span class="txt" @click="login">登录</span>
        </div>
      </div>
      <div class="header__searchbox">
        <div class="inputbox">
          <input type="text" placeholder="苏宁易购折扣季" @click="linksearch" />
          <span class="iconfont">&#xe693;</span>
        </div>
      </div>
    </div>
    <div class="swiper_wrap">
      <swiper class="swiper" :slides-per-view="1" :space-between="50" :modules="modules" :autoplay="{
        deplay: 3000,
        disableOnInteraction: false,
      }" :pagination="{ clickable: true }">
        <swiper-slide>
          <img
            src="https://oss.suning.com/adpp/creative_kit/material/picture/20200720-59b99b9398884daabd2e9d18424f373a711269f9c49745b2.jpg"
            alt="" />
        </swiper-slide>

        <swiper-slide>
          <img src="https://image3.suning.cn/uimg/cms/img/166390316449622813.jpg" alt="" />
        </swiper-slide>

        <swiper-slide>
          <img src="https://image3.suning.cn/uimg/cms/img/166433639433094659.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://oss.suning.com/adpp/creative_kit/material/picture/20220321-d34cb9bcf1e84e0dab4a24d27297bc36f37dc8ff951445eb.jpg"
            alt="" />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://oss.suning.com/adpp/creative_kit/material/picture/20220106-1cc7ad1973a74984988c9b6f9b5d4d27926dad45f8e94a87.jpg"
            alt="" />
        </swiper-slide>
        <swiper-slide>
          <img
            src="https://oss.suning.com/adpp/creative_kit/material/picture/20220930-e87eb23c4a27478489ba4a5e777259fedf3095e6ac804188.jpg"
            alt="" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="main">
      <div class="banner">
        <img src="https://image3.suning.cn/uimg/cms/img/166435224661929967.gif" alt="" />
      </div>
      <div class="iconlist">
        <div class="iconlist__item">
          <img src="https://image2.suning.cn/uimg/cms/img/165710989476671143.png" alt="" />
          <span>苏宁家电</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image1.suning.cn/uimg/cms/img/161293951076282456.png" alt="" />
          <span>苏宁超市</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image3.suning.cn/uimg/cms/img/166001087785136433.png" alt="" />
          <span>苏宁宜品</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image3.suning.cn/uimg/cms/img/161293957567317395.png" alt="" />
          <span>手机数码</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image3.suning.cn/uimg/cms/img/165711026680588659.png" alt="" />
          <span>家居家装</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image2.suning.cn/uimg/cms/img/165717934177245432.png" alt="" />
          <span>服饰百货</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image1.suning.cn/uimg/cms/img/161293963977525820.png" alt="" />
          <span>生活家电</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image1.suning.cn/uimg/cms/img/161293963977525820.png" alt="" />
          <span>签到有礼</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image1.suning.cn/uimg/cms/img/161293965567020138.png" alt="" />
          <span>领劵中心</span>
        </div>
        <div class="iconlist__item">
          <img src="https://image2.suning.cn/uimg/cms/img/161293968063152286.png" alt="" />
          <span>更多频道</span>
        </div>
      </div>
      <p class="title_love">
        <img src="https://image1.suning.cn/uimg/cms/img/157793128909842388.png" alt="" />
      </p>
      <div class="shoplist">
        <div class="shoplist_item" v-for="(item, index) in shopData" :key="index" @click="linkdetail"
          :data-goodsid="item.goods_id">
          <img :src="item.img_big_logo" alt="" />
          <p>{{ item.title }}</p>
          <div class="promotion">
            <span v-if="item.is_sale">特价</span>
            <span class="hot" v-if="item.is_hot">热销</span>
          </div>
          <div class="moneybox">
            <span class="current_price">{{ item.current_price }}</span>
            <span class="initial_price" v-if="item.is_sale">{{
                item.price
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 底部tab组件 -->
  <FooterTab :pagename="pagename"></FooterTab>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper";
// import axios from "axios";
import axios from "@/request/index";
import { ref } from "vue";
import FooterTab from "../../components/FooterTab";
import "swiper/css/pagination";
import "swiper/css";
import { useRouter } from "vue-router";
const router = useRouter();
// 获取商品列表的方法
const GetShopData = () => {
  const shopData = ref([]);
  const getdata = async () => {
    const res = await axios({
      methods: "get",
      url: "/goods/list?pagesize=30",
    });
    //   console.log(res.data.list);
    shopData.value = res.data.list;
  };
  return { getdata, shopData };
};
// 登录
const Login = () => {
  const router = useRouter();
  const login = () => {
    // console.log(12);
    // router.push({name:"login"})
    router.push("/login");
  };
  return { login };
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
// 搜索
const Linksearch = () => {
  const router = useRouter();
  const linksearch = () => {
    // console.log(12);
    // router.push({name:"login"})
    router.push("/search");
  };
  return { linksearch };
};
export default {
  name: "HomeView",
  components: {
    Swiper,
    SwiperSlide,
    FooterTab,
  },
  setup() {
    // 当前页面的标记
    const pagename = "home";
    const { getdata, shopData } = GetShopData();
    getdata();
    const { login } = Login();
    const { linksearch } = Linksearch();
    const { linkdetail } = Linkdetail();
    return {
      modules: [Autoplay, Pagination],
      shopData,
      pagename,
      login,
      linkdetail,
      linksearch,
    };
  },
};
</script>

<style scoped lang="scss" >
.header {
  height: 1rem;
  background-color: #d5d51e;
  position: sticky;
  top: 0;
  z-index: 999;
}

.header__top {
  height: 0.45rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.085rem;

  &__iconbox {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: white;

    .iconfont {
      font-size: 0.21rem;
      font-weight: bold;
    }

    .txt {
      font-size: 0.1rem;
      transform: scale(0.8);
    }
  }

  &__img {
    width: 1.75rem;
    height: 0.4rem;
  }
}

.header__searchbox {
  height: 0.31rem;
  padding-top: 0.05rem;

  //    background-color:#AD90D5;
  .inputbox {
    margin: 0 auto;
    width: 3.5rem;
    height: 0.315rem;
    background-color: white;
    border-radius: 0.15rem;
    overflow: hidden;
    position: relative;

    input {
      width: 80%;
      height: 100%;
      border: 0;
      text-indent: 0.4rem;
    }

    .iconfont {
      font-size: 0.2rem;
      color: #a6d58d;
      font-weight: bold;
      position: absolute;
      left: 0.15rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.swiper_wrap {
  height: 1.15rem;
  background-color: #a6d58d;

  .swiper {
    width: 3.52rem;
    height: 1.15rem;
    position: relative;
    overflow: hidden;
    border-radius: 0.1rem;

    img {
      width: 3.52rem;
      position: absolute;
      top: -30%;
    }
  }
}

.main {
  background-color: #f6f6f6;

  .banner {
    img {
      width: 3.6rem;
      height: 2rem;
      margin: 0 auto;
      display: block;
    }
  }

  .iconlist {
    padding: 0.05rem 0rem;
    width: 3.6rem;
    height: 1.625rem;
    margin: 0 auto;
    // background-color: #C8A0D5;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;

    &__item {
      display: flex;
      flex-direction: column;
      width: 20%;
      height: 0.55rem;
      align-items: center;
      justify-content: center;

      img {
        width: 0.475rem;
      }

      span {
        font-size: 0.12rem;
        color: #555;
      }
    }
  }

  .title_love {
    background-color: white;
    padding: 0.08rem 0rem;

    img {
      width: 100%;
      display: block;
    }
  }

  .shoplist {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    &_item {
      background-color: white;
      border-radius: 0.05rem;
      overflow: hidden;
      width: 46%;
      margin: 0.06rem 0rem;

      img {
        width: 100%;
      }

      p {
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
        margin-bottom: 0.06rem;
      }

      .promotion {
        min-height: 0.15rem;
        display: flex;

        span {
          font-size: 0.06rem;
          padding: 0.01rem 0.05rem;
          background-color: #d7e682;
          color: white;
          margin-left: 0.05rem;
        }

        .hot {
          background-color: #e6143c;
        }
      }

      .moneybox {
        padding: 0.075rem 0rem;

        .current_price {
          font-size: 0.175rem;
          color: #e65240;
          font-weight: bold;
        }

        .initial_price {
          font-size: 0.08rem;
          color: #b0b0a5;
          margin-left: 0.1rem;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>