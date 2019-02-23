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
            <a href="javascript:void(0)" class="price" @click="sortGoods()">
              Price
              <svg class="icon icon-arrow-short" :class="{'sort-up': sortFlag}">
                <use xlink:href="#icon-arrow-short"></use>
              </svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- 价格筛选 -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd>
                  <a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}"
                    @click="setPriceFilter('all')">All</a>
                </dd>
                <dd v-for="(price, index) in priceFilter" :key="index">
                  <a href="javascript:void(0)" :class="{'cur': priceChecked==index}"
                    @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- 商品列表 -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList" :key="item.productId">
                    <div class="pic">
                      <a href="#"><img :src="'/images/' + item.productImage" alt=""></a>
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
                <!-- 滚动加载插件 - vue-infinite-scroll -->
                <!-- v-infinite-scroll：指定当滚动到距离底部指定位置时，触发的方法 -->
                <!-- infinite-scroll-disabled：等于 true 时，表示正在执行加载，此时禁用滚动触发。 -->
                <!-- infinite-scroll-distance：指定滚动条距离底部多高时，触发 v-infinite-scroll 指向的方法 -->
                <div class="view-more-normal"
                  v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="20">
                  <!-- 加载中... -->
                  <img v-show="loading" src="/images/loading-svg/loading-spinning-bubbles.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 遮罩 -->
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>

      <!-- 底部组件 -->
      <nav-footer></nav-footer>

      <!-- 图标 -->
      <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <symbol id="icon-arrow-short" viewBox="0 0 25 32">
            <title>arrow-short</title>
            <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
          </symbol>
          <symbol id="icon-status-ok" viewBox="0 0 32 32">
            <title>status-ok</title>
            <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
            <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
          </symbol>
        </defs>
        </svg>
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
        goodsList: [], // 商品列表
        priceFilter: [ // 价格区间数组
          {
            startPrice: '0.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          }
        ],
        priceChecked: 'all', // 价格区间标识
        // 'all'  -->  表示全部价格
        // '0'    -->  0 - 100
        // '1'    -->  100 - 500
        // '2'    -->  500 - 1000
        // '3'    -->  1000 - 5000
        filterBy: false, // 响应式布局，当页面缩小的时候，价格筛选菜单以侧边弹窗显示。用于控制侧边栏是否显示
        overLayFlag: false, // 用于控制遮罩的显示与隐藏
        sortFlag: true, // 排序标识:默认升序
        page: 1, // 页数
        pageSize: 8, // 每页请求数据条数
        busy: true, // 滚动加载插件，默认为 true，表示禁用
        loading: false // 加载loading 是否显示，默认为 false，表示不显示
      }
    },
    mounted () {
      this.getGoodsList()
    },
    methods: {
      // 获取商品数据
      getGoodsList (flag) {
        // flag 用于判断是否为累加数据，即滚动加载更多的数据
        // 存在 flag 时，表示加载更多数据；不存在时，表示加载第一页数据
        var param = {
          page: this.page, // 页数
          pageSize: this.pageSize, // 每页请求数据条数
          sort: this.sortFlag ? 1 : -1, // 排序方式：从小到大排序使用 1，从大到小排序使用 -1
          priceLevel: this.priceChecked // 价格区间标识
        }
        this.loading = true // 显示加载loading
        axios.get('/goods/list', {
          params: param
        }).then((response) => {
          var res = response.data
          this.loading = false
          if (res.status === '0') {
            if (flag) {
              // 加载更多数据
              this.goodsList = this.goodsList.concat(res.result.list)
              if (res.result.count === 0) {
                this.busy = true // 禁用 vue-infinite-scroll滚动加载插件
              } else {
                this.busy = false // 启用 vue-infinite-scroll滚动加载插件
              }
            } else {
              this.goodsList = res.result.list
              this.busy = false // 启用 vue-infinite-scroll滚动加载插件
            }
          } else {
            this.goodsList = []
          }
        })
      },
      // 滚动条滚动到底部，触发 vue-infinite-scroll滚动加载插件 的方法
      // 用于实现加载更多数据
      loadMore () { // 滚动加载插件方法
        this.busy = true // 禁用滚动触发 loadMore 方法，防止下一个滚动触发 loadMore 再次发送请求
        setTimeout(() => { // 一个滚动触发加载更多数据完成之后，再滚动加载下一个
          this.page++ // 页数 +1
          this.getGoodsList(true) // 滚动加载是累加数据，所以需要在调用 getGoodsList方法 时，传递标识进行判断
        }, 500)
      },
      // 点击排序（升序或降序）商品
      sortGoods () {
        this.sortFlag = !this.sortFlag
        this.page = 1 // 点击价格排序后从第一页开始
        this.getGoodsList() // 重新加载数据
      },
      // 选择价格区间，显示价格区间内的商品
      setPriceFilter (index) {
        // index 为对应的价格区间
        // '0'  -->  0 - 100
        // '1'  -->  100 - 500
        // '2'  -->  500 - 1000
        // '3'  -->  1000 - 5000
        this.priceChecked = index
        this.closePop() // 调用 closePop 关闭价格筛选菜单和遮罩层
        this.getGoodsList() // 重新加载数据
      },
      // 点击遮罩层，关闭价格筛选菜单和遮罩层
      closePop () {
        this.filterBy = false // 关闭价格筛选菜单（响应式布局，当页面缩小的时候，价格筛选菜单以侧边弹窗显示）
        this.overLayFlag = false // 关闭遮罩层
      },
      // 当页面缩小的时候，价格筛选菜单以侧边弹窗显示。通过点击 Filter by 控制侧边栏是否显示
      showFilterPop () {
        this.filterBy = true // 显示价格筛选菜单
        this.overLayFlag = true // 显示遮罩层
      },
      // 加入购物车
      addCart (productId) {
        axios.post('/goods/addCart', {
          productId: productId
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            // 加入购物车成功，显示加入成功提示框以及更新购物车数量显示
            this.mdShowCart = true
            this.$store.commit('updateCartCount', 1)
          } else {
            this.mdShow = true // 显示未登录提示框
          }
        })
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    }
  }
</script>
