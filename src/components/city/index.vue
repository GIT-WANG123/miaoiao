<template>
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"> 
        <div class="spinner"></div>
        <p>加载中，请稍候...</p>
      </div>
    </div>
  <div class="city_body">
    <div class="city_list" ref="wrapper">
      <div>
        <!-- 热门城市 -->
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <li v-for="city in hotCities" :key="city.id" @click="selectCity(city)">{{ city.name }}</li>
          </ul>
        </div>
        
        <!-- 按字母排序的城市 -->
        <div class="city_sort">
          <div v-for="group in cityGroups" :key="group.index" :ref="setLetterRef">
            <h2>{{ group.index }}</h2>
            <ul>
              <li v-for="city in group.list" :key="city.id" @click="selectCity(city)">{{ city.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右侧字母索引 -->
    <div class="city_index">
      <ul>
        <li 
          v-for="letter in indexLetters" 
          :key="letter" 
          @click="scrollToLetter(letter)"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
        >
          {{ letter }}
        </li>
      </ul>
    </div>

    <!-- 当前字母提示 -->
    <div v-if="currentLetter" class="letter_indicator">
      {{ currentLetter }}
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>
    
    <!-- 错误状态 -->
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted, computed, nextTick, onBeforeUnmount } from 'vue'
import BScroll from 'better-scroll'

export default {
  name: "City",
  setup() {
    const cities = ref([])
    const loading = ref(false)
    const error = ref(null)
    const bscroll = ref(null)
    const letterElements = ref({})
    const currentLetter = ref('')

    // 完整的城市模拟数据
    const mockCitiesData = {
      msg: "ok",
      data: {
        cities: [
          // 热门城市
          { id: 1, name: "上海", pinyin: "shanghai", isHot: true },
          { id: 2, name: "北京", pinyin: "beijing", isHot: true },
          { id: 3, name: "广州", pinyin: "guangzhou", isHot: true },
          { id: 4, name: "深圳", pinyin: "shenzhen", isHot: true },
          { id: 5, name: "杭州", pinyin: "hangzhou", isHot: true },
          { id: 6, name: "成都", pinyin: "chengdu", isHot: true },
          { id: 7, name: "重庆", pinyin: "chongqing", isHot: true },
          { id: 8, name: "天津", pinyin: "tianjin", isHot: true },
          
          // A 开头
          { id: 9, name: "阿拉善盟", pinyin: "alashanmeng", isHot: false },
          { id: 10, name: "鞍山", pinyin: "anshan", isHot: false },
          { id: 11, name: "安庆", pinyin: "anqing", isHot: false },
          { id: 12, name: "安阳", pinyin: "anyang", isHot: false },
          { id: 13, name: "安顺", pinyin: "anshun", isHot: false },
          { id: 14, name: "安康", pinyin: "ankang", isHot: false },
          
          // B 开头
          { id: 15, name: "保定", pinyin: "baoding", isHot: false },
          { id: 16, name: "蚌埠", pinyin: "bengbu", isHot: false },
          { id: 17, name: "包头", pinyin: "baotou", isHot: false },
          { id: 18, name: "宝鸡", pinyin: "baoji", isHot: false },
          { id: 19, name: "北海", pinyin: "beihai", isHot: false },
          { id: 20, name: "本溪", pinyin: "benxi", isHot: false },
          
          // C 开头
          { id: 21, name: "长春", pinyin: "changchun", isHot: false },
          { id: 22, name: "长沙", pinyin: "changsha", isHot: false },
          { id: 23, name: "成都", pinyin: "chengdu", isHot: false },
          { id: 24, name: "重庆", pinyin: "chongqing", isHot: false },
          { id: 25, name: "常州", pinyin: "changzhou", isHot: false },
          { id: 26, name: "沧州", pinyin: "cangzhou", isHot: false },
          
          // D 开头
          { id: 27, name: "大连", pinyin: "dalian", isHot: false },
          { id: 28, name: "东莞", pinyin: "dongguan", isHot: false },
          { id: 29, name: "大庆", pinyin: "daqing", isHot: false },
          { id: 30, name: "大同", pinyin: "datong", isHot: false },
          { id: 31, name: "丹东", pinyin: "dandong", isHot: false },
          
          // E 开头
          { id: 32, name: "鄂尔多斯", pinyin: "eerduosi", isHot: false },
          { id: 33, name: "恩施", pinyin: "enshi", isHot: false },
          { id: 34, name: "鄂州", pinyin: "ezhou", isHot: false }
        ]
      }
    }

    // 计算属性：热门城市
    const hotCities = computed(() => {
      return cities.value.filter(city => city.isHot)
    })

    // 计算属性：按字母分组的城市
    const cityGroups = computed(() => {
      const groups = {}
      
      cities.value.forEach(city => {
        if (!city.isHot) { // 热门城市不参与字母分组
          const firstLetter = city.pinyin.substring(0, 1).toUpperCase()
          if (!groups[firstLetter]) {
            groups[firstLetter] = []
          }
          groups[firstLetter].push(city)
        }
      })
      
      // 转换为数组并排序
      return Object.keys(groups)
        .sort()
        .map(letter => ({
          index: letter,
          list: groups[letter]
        }))
    })

    // 计算属性：字母索引
    const indexLetters = computed(() => {
      const letters = cityGroups.value.map(group => group.index)
      return ['热门', ...letters]
    })

    // 设置字母引用
    const setLetterRef = (el) => {
      if (el) {
        const letter = el.querySelector('h2').textContent
        letterElements.value[letter] = el
      }
    }

    // 滚动到指定字母
    const scrollToLetter = (letter) => {
      if (letter === '热门') {
        bscroll.value.scrollTo(0, 0, 300)
        currentLetter.value = '热门'
        setTimeout(() => {
          currentLetter.value = ''
        }, 1000)
        return
      }
      
      const element = letterElements.value[letter]
      if (element && bscroll.value) {
        bscroll.value.scrollToElement(element, 300, 0, 0)
        currentLetter.value = letter
        setTimeout(() => {
          currentLetter.value = ''
        }, 1000)
      }
    }

    // 触摸事件处理
    const handleTouchStart = (e) => {
      const letter = e.target.textContent
      scrollToLetter(letter)
    }

    const handleTouchMove = (e) => {
      const touch = e.touches[0]
      const target = document.elementFromPoint(touch.clientX, touch.clientY)
      if (target && target.tagName === 'LI' && target.parentElement.classList.contains('city_index')) {
        scrollToLetter(target.textContent)
      }
    }

    // 选择城市
    const selectCity = (city) => {
      console.log('选择城市:', city.name)
      // 这里可以添加路由跳转或其他逻辑
    }

    // 初始化 better-scroll
    const initScroll = () => {
      if (bscroll.value) {
        bscroll.value.destroy()
      }
      
      const wrapper = document.querySelector('.city_list')
      if (wrapper) {
        bscroll.value = new BScroll(wrapper, {
          scrollY: true,
          click: true,
          probeType: 3,
          bounce: {
            top: true,
            bottom: true
          }
        })

        // 监听滚动事件
        bscroll.value.on('scroll', (pos) => {
          // 可以在这里实现滚动时字母高亮逻辑
        })
      }
    }

    // 加载城市数据
    const loadCities = async () => {
      loading.value = true
      error.value = null
      
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 使用模拟数据
        cities.value = mockCitiesData.data.cities
      } catch (err) {
        error.value = '加载城市数据失败'
        console.error('Error:', err)
        cities.value = mockCitiesData.data.cities
      } finally {
        loading.value = false
        // 数据加载完成后初始化滚动
        nextTick(() => {
          initScroll()
        })
      }
    }

    onMounted(() => {
      loadCities()
    })

    // 组件销毁时清理
    onBeforeUnmount(() => {
      if (bscroll.value) {
        bscroll.value.destroy()
      }
    })

    return {
      cities,
      hotCities,
      cityGroups,
      indexLetters,
      loading,
      error,
      currentLetter,
      setLetterRef,
      scrollToLetter,
      handleTouchStart,
      handleTouchMove,
      selectCity
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

.city_body {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.city_list {
  height: 100%;
  overflow: hidden;
}

.city_hot {
  margin-top: 20px;
  background: white;
}

.city_hot h2 {
  padding: 10px 15px;
  line-height: 30px;
  font-size: 16px;
  background: #f9f9f9;
  color: #666;
  border-bottom: 1px solid #eee;
}

.city_hot ul {
  padding: 0 10px;
  overflow: hidden;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.city_hot ul li {
  background: #fff;
  width: 29%;
  height: 33px;
  line-height: 33px;
  text-align: center;
  margin: 10px 2%;
  border-radius: 16px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.city_hot ul li:hover {
  background: #f03d37;
  color: white;
  border-color: #f03d37;
}

.city_sort div {
  margin-top: 20px;
}

.city_sort h2 {
  padding: 10px 15px;
  line-height: 30px;
  font-size: 16px;
  background: #f9f9f9;
  color: #666;
  border-bottom: 1px solid #eee;
  margin: 0;
}

.city_sort ul {
  padding-left: 15px;
  margin-top: 0;
  list-style: none;
}

.city_sort ul li {
  line-height: 40px;
  padding: 5px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.city_sort ul li:hover {
  background: #f5f5f5;
  color: #f03d37;
}

.city_sort ul li:last-child {
  border-bottom: none;
}

.city_index {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 15px;
  padding: 10px 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
}

.city_index ul {
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
}

.city_index ul li {
  font-size: 14px;
  padding: 4px 8px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  user-select: none;
}

.city_index ul li:hover {
  color: #f03d37;
  font-weight: bold;
}

/* 字母指示器 */
.letter_indicator {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  z-index: 2000;
}

/* 加载和错误状态 */
.loading {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #666;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.error {
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #f56c6c;
  background: #fef0f0;
  border-radius: 8px;
  margin: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}
</style>