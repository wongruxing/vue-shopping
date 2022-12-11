<template>
  <div class="header">
    <div class="searchbox" @click="search">
      <input type="text" placeholder="童装玩具" v-model="keywords" @keydown.enter="search" @keyup="getData($event)"
        @blur="hiddenData" />
      <span class="iconfont">&#xe693;</span>
    </div>
  </div>
  <!-- 搜索 -->
  <div class="searchlist">
    <div class="title">热销榜</div>
    <div class="search_item" v-for="(item, index) in searchdata" :key="index" @click="linkdetail"
      :data-goodsid="item.goods_id">
      <text class="nub">{{ index + 1 }}</text>
      <div class="con">
        <div class="namebox">
          <text class="name">{{ item.category }}</text>
        </div>
        <text class="txt">{{ item.title }}</text>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import axios from "@/request/index";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
// 定义获取搜索数据
const Getsearchdata = () => {
  const searchdata = ref([]);
  const getsearchdata = async () => {
    const res = await axios({
      url: "/goods/list?pagesize=9",
      methods: "get",
    });
    console.log(res.data.list);
    searchdata.value = res.data.list;
  };
  return { getsearchdata, searchdata };
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
  name: "searchView",
  setup() {
    const { getsearchdata, searchdata } = Getsearchdata();
    getsearchdata();
    const { linkdetail } = Linkdetail();
    return { searchdata, linkdetail };
  },
};
</script>

<style scoped lang="scss">
.header {
  height: 0.5rem;
  background-color: #e3df10;
  display: flex;

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

.searchlist {
  .title {
    font-size: 0.2rem;
    line-height: 0.2rem;
    color: #555;
    padding: 0.1rem;
    color: #e71a27;
    // background-color: #466eb0;
  }

  div:nth-child(1) .nub,
  div:nth-child(2) .nub,
  div:nth-child(3) .nub {
    color: #e71a27;
  }

  .search_item {
    display: flex;
    align-items: center;
    padding: 0.05rem 0;

    .nub {
      font-size: 0.175rem;
      width: 0.25rem;
      text-align: center;
      color: #555;
    }

    .con {
      flex: 1;
      display: flex;
      flex-direction: column;

      .namebox {
        .name {
          font-size: 0.1rem;
          color: #555;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          // background-color: #466eb0;
        }
      }

      .txt {
        font-size: 0.075rem;
        color: #88888888;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        // background-color: #e3df10;
      }
    }
  }
}
</style>