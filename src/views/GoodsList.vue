<template>
    <div>
      <!-- 头部组件 -->
      <nav-header></nav-header>
      <!-- 面包屑组件 -->
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)">All</a></dd>
                <dd>
                  <a href="javascript:void(0)">0 - 100</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">100 - 500</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">500 - 1000</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)">1000 - 2000</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList" :key="index">
                    <div class="pic">
                      <a href="#">
                          <!-- <img :src="'/static/' + item.productImage" alt=""> -->
                          <img :src="'/images/' + item.productImage" alt="">
                          <!-- <img v-lazy="'/static/'+item.productImage" alt=""> -->
                      </a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部组件 -->
      <nav-footer></nav-footer>
    </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader.vue' // 头部
  import NavFooter from '@/components/NavFooter.vue' // 底部
  import NavBread from '@/components/NavBread.vue' // 面包屑
  // import Modal from '@/components/Modal.vue' // 模态框
  import axios from 'axios'

  export default {
    data() {
      return {
        goodsList: []
      }
    },
    mounted () {
      axios.get('/goods').then(response => {
        let res = response.data
        if (res.status === '0') {
          this.goodsList = res.result.list
        } else {
          this.goodsList = []
        }
      })
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    }
  }
</script>
