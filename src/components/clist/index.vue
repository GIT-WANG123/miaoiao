
<template>
  <div id="content">
    <!-- 加载动画 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>加载中，请稍候...</p>
      </div>
    </div>
    
    <!-- 影院列表 -->
    <div class="cinema_body" ref="wrapper">
      <ul>
        <li v-for="cinema in cinemaList" :key="cinema.id">
          <div>
            <span>{{ cinema.name }}</span>
            <span class="q"><span class="price">{{ cinema.lowPrice }}</span> 元起</span>
          </div>
          <div class="address">
            <span>{{ cinema.address }}</span>
            <span>{{ cinema.distance }}km</span>
          </div>
          <div class="card">
            <div v-for="(service, index) in cinema.services" :key="index" 
                 :class="{'or': service.type === 'discount', 'bl': service.type === 'snack'}">
              {{ service.name }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Clist',
  data() {
    return {
      loading: true, // 控制加载动画显示
      cinemaList: [
        {
          id: 1,
          name: '大地影院(澳东世纪店)',
          lowPrice: 22.9,
          address: '金州区大连经济技术开发区澳东世纪3层',
          distance: '1763.5',
          services: [
            { name: '小吃', type: 'snack' },
            { name: '折扣卡', type: 'discount' }
          ]
        },
        {
          id: 2,
          name: '万达影城(和平广场店)',
          lowPrice: 35.0,
          address: '沙河口区和平广场4楼',
          distance: '2.8',
          services: [
            { name: 'IMAX', type: 'discount' },
            { name: '4DX', type: 'snack' },
            { name: '小吃', type: 'snack' }
          ]
        },
           {
          id: 3,
          name: 'CGV影城(柏威年店)',
          lowPrice: 38.5,
          address: '中山区柏威年购物中心5层',
          distance: '1.2',
          services: [
            { name: '黄金厅', type: 'discount' },
            { name: '会员优惠', type: 'discount' }
          ]
        },
        {
          id: 4,
          name: '金逸影城(中央大道店)',
          lowPrice: 29.9,
          address: '甘井子区中央大道购物中心3层',
          distance: '5.6',
          services: [
            { name: '小吃', type: 'snack' },
            { name: '停车优惠', type: 'discount' }
          ]
        },
        {
          id: 5,
          name: '星美国际影城',
          lowPrice: 25.0,
          address: '西岗区奥林匹克广场B1层',
          distance: '3.4',
          services: [
            { name: '情侣座', type: 'discount' },
            { name: '饮料', type: 'snack' }
          ]
        },
        {
          id: 6,
          name: '百丽宫影城',
          lowPrice: 42.0,
          address: '中山区时代广场6层',
          distance: '0.8',
          services: [
            { name: 'VIP厅', type: 'discount' },
            { name: '专属服务', type: 'discount' },
            { name: '餐饮', type: 'snack' }
          ]
        },
        {
          id: 7,
          name: 'UME国际影城',
          lowPrice: 36.5,
          address: '甘井子区华南广场3层',
          distance: '4.2',
          services: [
            { name: '杜比全景声', type: 'discount' },
            { name: '小吃', type: 'snack' }
          ]
        },
        {
          id: 8,
          name: '横店影视城',
          lowPrice: 28.0,
          address: '西岗区长春路百盛5层',
          distance: '2.1',
          services: [
            { name: '优惠套餐', type: 'discount' },
            { name: '爆米花', type: 'snack' }
          ]
        },
        {
          id: 9,
          name: '中影国际影城',
          lowPrice: 31.9,
          address: '中山区青泥洼桥大商新玛特7层',
          distance: '0.5',
          services: [
            { name: '巨幕厅', type: 'discount' },
            { name: '会员卡', type: 'discount' }
          ]
        },
        {
          id: 10,
          name: '博纳国际影城',
          lowPrice: 39.9,
          address: '沙河口区西安路罗斯福4层',
          distance: '1.8',
          services: [
            { name: '激光厅', type: 'discount' },
            { name: '餐饮套餐', type: 'snack' }
          ]
        }
        // 其他影院数据...
      ],
      bscroll: null
    }
  },
  mounted() {
    // 模拟数据加载过程
    setTimeout(() => {
      this.loading = false;
      this.$nextTick(() => {
        this.initScroll()
      })
    }, 1500); // 1.5秒后隐藏加载动画并初始化滚动
  },
  beforeDestroy() {
    if (this.bscroll) {
      this.bscroll.destroy()
    }
  },
  methods: {
    initScroll() {
      // 确保wrapper有高度
      const wrapper = this.$refs.wrapper
      wrapper.style.height = '100vh'
      
      this.bscroll = new BScroll(wrapper, {
        scrollY: true,
        click: true,
        probeType: 3,
        bounce: {
          top: true,
          bottom: true
        }
      })

      // 可选：监听滚动事件
      this.bscroll.on('scroll', (position) => {
        // console.log('滚动位置:', position.y)
      })

      this.bscroll.on('scrollEnd', () => {
        // console.log('滚动结束')
      })
    }
  }
}
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3c9fe6;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-spinner p {
  color: #666;
  font-size: 16px;
}

.cinema_body {
  height: 100%;
  overflow: hidden;
}

.cinema_body ul {
  padding: 20px;
}

.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
}

.cinema_body div {
  margin-bottom: 10px;
}

.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
  float: right;
}

.cinema_body .price {
  font-size: 18px;
  font-weight: bold;
}

.cinema_body .address {
  font-size: 13px;
  color: #666;
  display: flex;
  justify-content: space-between;
}

.cinema_body .card {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.cinema_body .card div {
  padding: 0 8px;
  height: 20px;
  line-height: 20px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 0;
}

.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
  background-color: rgba(255, 153, 0, 0.1);
}

.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
  background-color: rgba(88, 157, 175, 0.1);
}
</style>