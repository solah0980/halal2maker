<template>
  <div class="container" :class="{ loadingItem: isProductLoading }">
    <div class="row text-center" v-if="isProductLoading">
      <grid-loader
        :loading="isProductLoading"
        :color="loaderColor"
        :size="loaderSize"
      ></grid-loader>
    </div>
    <section
      id="hero"
      class="d-flex align-items-center"
      v-if="!isProductLoading"
    >
      <div class="container" data-aos="zoom-out" data-aos-delay="100">
        <h1>ยินดีต้อนรับสู่ <span>Halal2Marker</span></h1>
        <h2>
          We are team of talanted designers making websites with Bootstrap
        </h2>
        <div class="d-flex"></div>
      </div>
    </section>

    <div v-if="!isProductLoading" class="row action-panel">
      <div class="col-12">
        <div class="btn-group btn-group-sm pull-right">
          <button
            id="list"
            class="btn btn-outline-dark"
            @click.prevent="changeDisplay(true)"
          >
            <i class="fa fa-list" aria-hidden="true"></i> List
          </button>
          <button
            id="grid"
            class="btn btn-outline-dark"
            @click.prevent="changeDisplay(false)"
          >
            <i class="fa fa-th" aria-hidden="true"></i> Grid
          </button>
        </div>
      </div>
    </div>
    <h3 v-if="!isProductLoading">รายการสินค้าแนะนำ</h3>
    <div class="row" v-if="!isProductLoading">
      <app-product-item
        v-for="prod in product"
        :item="prod"
        :key="prod.id"
        :displayList="displayList"
      ></app-product-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductItem from "./product/ProductItem.vue";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import axios from "axios";
export default {
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      displayList: false,
      product: null,
    };
  },
  created() {
    axios
      .get("/api/")
      .then((res) => {
        this.product = res.data;
        console.log(this.product);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  computed: {
    ...mapGetters(["isProductLoading"]),
  },
  components: {
    appProductItem: ProductItem,
    GridLoader,
  },
  methods: {
    changeDisplay(isList) {
      this.displayList = isList;
    },
  },
};
</script>

<style>
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.action-panel {
  margin-bottom: 10px;
  margin-right: 5px;
}
#hero {
  width: 100%;
  height: 75vh;
  background: url("../../public/img/hero-bg.jpg") top left;
  background-size: cover;
  position: relative;
}

#hero:before {
  content: "";
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

#hero .container {
  position: relative;
  padding-top: 132px;
}

@media (max-width: 992px) {
  #hero .container {
    padding-top: 58px;
  }
}

#hero h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  color: #222222;
  font-family: "Poppins", sans-serif;
}

#hero h1 span {
  color: #106eea;
}

#hero h2 {
  color: #555555;
  margin: 5px 0 30px 0;
  font-size: 24px;
  font-weight: 400;
}

#hero .btn-get-started {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 10px 28px;
  border-radius: 4px;
  transition: 0.5s;
  color: #fff;
  background: #106eea;
}

#hero .btn-get-started:hover {
  background: #247cf0;
}

#hero .btn-watch-video {
  font-size: 16px;
  display: inline-block;
  padding: 10px 25px 8px 40px;
  transition: 0.5s;
  margin-left: 25px;
  color: #222222;
  position: relative;
  font-weight: 600;
}

#hero .btn-watch-video i {
  color: #106eea;
  font-size: 32px;
  position: absolute;
  left: 0;
  top: 7px;
  transition: 0.3s;
}

#hero .btn-watch-video:hover {
  color: #106eea;
}

#hero .btn-watch-video:hover i {
  color: #3b8af2;
}

@media (min-width: 1024px) {
  #hero {
    background-attachment: fixed;
  }
}

@media (max-width: 768px) {
  #hero {
    height: 100vh;
  }
  #hero h1 {
    font-size: 28px;
    line-height: 36px;
  }
  #hero h2 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }
  #hero .btn-get-started,
  #hero .btn-watch-video {
    font-size: 13px;
  }
}

@media (max-height: 500px) {
  #hero {
    height: 120vh;
  }
}
</style>
