<template>
  <div class="container">
    <div class="search_entry active">
      <i class="fas fa-search"></i>
    </div>
    
    <div class="search_body" ref="wrapperRef">
      <div class="scroll-content">
        <!-- 搜索输入框 -->
        <div class="search_input">
          <div class="search_input_wrapper">
            <i class="fas fa-search"></i>
            <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="搜索电影、电视剧、综艺">
          </div>					
        </div>
        
        <!-- 加载动画 -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner">
            <div class="spinner"></div>
            <p>搜索中...</p>
          </div>
        </div>
        
        <!-- 搜索结果 -->
        <div v-else class="search_result">
          <h3>电影/电视剧/综艺</h3>
          <ul>
            <li v-for="item in searchResults" :key="item.id">
              <div class="img">
                <img :src="getImagePath(item.poster)" :alt="item.title" @error="handleImageError">
              </div>
              <div class="info">
                <p><span>{{ item.title }}</span><span>{{ item.rating }}</span></p>
                <p>{{ item.englishTitle }}</p>
                <p>{{ item.genres.join(',') }}</p>
                <p>{{ item.releaseDate }}</p>
              </div>
            </li>
          </ul>
          <div v-if="searchResults.length === 0" class="no-result">
            <p>暂无搜索结果</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, onBeforeUnmount, computed, watch } from 'vue'
import BScroll from '@better-scroll/core'

export default {
  name: "Search",
  setup() {
    const searchQuery = ref('')
    const bscroll = ref(null)
    const wrapperRef = ref(null)
    const loading = ref(false) // 添加加载状态
    let searchTimeout = null // 搜索防抖计时器

    // 搜索数据模拟
    const mockSearchData = [
      {
        id: 1,
        title: "无名之辈",
        englishTitle: "A Cool Fish",
        rating: 8.5,
        genres: ["剧情", "喜剧", "犯罪"],
        releaseDate: "2018-11-16",
        poster: "/images/无名之辈.jpg"
      },
      {
        id: 2,
        title: "毒液：致命守护者",
        englishTitle: "Venom",
        rating: 7.2,
        genres: ["动作", "科幻", "惊悚"],
        releaseDate: "2018-11-09",
        poster: "/images/毒液.jpg"
      },
      {
        id: 3,
        title: "海王",
        englishTitle: "Aquaman",
        rating: 7.6,
        genres: ["动作", "奇幻", "冒险"],
        releaseDate: "2018-12-07",
        poster: "/images/海王.jpg"
      },
      {
        id: 4,
        title: "蜘蛛侠：平行宇宙",
        englishTitle: "Spider-Man: Into the Spider-Verse",
        rating: 8.6,
        genres: ["动画", "动作", "冒险"],
        releaseDate: "2018-12-21",
        poster: "/images/蜘蛛侠平行宇宙.jpg"
	  },
      {
        id: 5,
        title: "大黄蜂",
        englishTitle: "Bumblebee",
        rating: 7.0,
        genres: ["动作", "科幻", "冒险"],
        releaseDate: "2019-01-04",
        poster: "/images/大黄蜂.jpg"
      },
      {
        id: 6,
        title: "流浪地球",
        englishTitle: "The Wandering Earth",
        rating: 7.9,
        genres: ["科幻", "冒险", "灾难"],
        releaseDate: "2019-02-05",
        poster: "/images/流浪地球.jpg"
      },
      {
        id: 7,
        title: "复仇者联盟4：终局之战",
        englishTitle: "Avengers: Endgame",
        rating: 8.5,
        genres: ["动作", "科幻", "冒险"],
        releaseDate: "2019-04-24",
        poster: "/images/复仇者联盟4：终局之战.jpg"
      },
      {
        id: 8,
        title: "哪吒之魔童降世",
        englishTitle: "Ne Zha",
        rating: 8.4,
        genres: ["动画", "喜剧", "奇幻"],
        releaseDate: "2019-07-26",
        poster: "/images/哪吒之魔童降世.jpg"
	  },
      {
        id: 9,
        title: "少年的你",
        englishTitle: "Better Days",
        rating: 8.3,
        genres: ["剧情", "爱情", "犯罪"],
        releaseDate: "2019-10-25",
        poster: "/images/少年的你.jpg"
      },
      {
        id: 10,
        title: "我和我的祖国",
        englishTitle: "My People, My Country",
        rating: 7.7,
        genres: ["剧情"],
        releaseDate: "2019-09-30",
        poster: "/images/我和我的祖国.jpg"
      },
      {
        id: 11,
        title: "疯狂的外星人",
        englishTitle: "Crazy Alien",
        rating: 6.4,
        genres: ["喜剧", "科幻"],
        releaseDate: "2019-02-05",
        poster: "/images/疯狂的外星人.jpg"
      },
      {
        id: 12,
        title: "飞驰人生",
        englishTitle: "Pegasus",
        rating: 6.9,
        genres: ["喜剧"],
        releaseDate: "2019-02-05",
        poster: "/images/飞驰人生2.jpg"
	  },
      {
        id: 13,
        title: "新喜剧之王",
        englishTitle: "The New King of Comedy",
        rating: 5.7,
        genres: ["喜剧", "剧情"],
        releaseDate: "2019-02-05",
        poster: "/images/新喜剧之王.jpg"
      },
      {
        id: 14,
        title: "中国机长",
        englishTitle: "The Captain",
        rating: 6.7,
        genres: ["剧情", "传记", "灾难"],
        releaseDate: "2019-09-30",
        poster: "/images/中国机长.jpg"
      },
      {
        id: 15,
        title: "攀登者",
        englishTitle: "The Climbers",
        rating: 6.0,
        genres: ["剧情", "冒险"],
        releaseDate: "2019-09-30",
        poster: "/images/攀登者.jpg"
      },
      {
        id: 16,
        title: "误杀",
        englishTitle: "Sheep Without a Shepherd",
        rating: 7.7,
        genres: ["剧情", "悬疑", "犯罪"],
        releaseDate: "2019-12-13",
        poster: "/images/误杀.jpg"
      },
      {
        id: 17,
        title: "叶问4：完结篇",
        englishTitle: "Ip Man 4: The Finale",
        rating: 6.9,
        genres: ["动作", "传记", "剧情"],
        releaseDate: "2019-12-20",
        poster:" /images/叶问终局.jpg"
      },
      {
        id: 18,
        title: "宠爱",
        englishTitle: "Adoring",
        rating: 6.0,
        genres: ["剧情", "喜剧", "爱情"],
        releaseDate: "2019-12-31",
        poster: "/images/宠爱.jpg"
      },
      {
        id: 19,
        title: "南方车站的聚会",
        englishTitle: "The Wild Goose Lake",
        rating: 7.4,
        genres: ["剧情", "犯罪"],
        releaseDate: "2019-12-06",
        poster: "/images/南方车站的聚会.jpg"
      },
      {
        id: 20,
        title: "夏目友人帐剧场版",
        englishTitle: "Natsume's Book of Friends the Movie: Ephemeral Bond",
        rating: 7.5,
        genres: ["动画", "奇幻", "剧情"],
        releaseDate: "2018-09-29",
        poster: "/images/夏目友人帐剧场版.jpg"
      }
    ]

    // 搜索处理
    const handleSearch = () => {
      // 清除之前的计时器
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
      
      // 如果搜索词为空，直接显示所有结果
      if (!searchQuery.value.trim()) {
        loading.value = false
        return
      }
      
      // 显示加载动画
      loading.value = true
      
      // 设置防抖，延迟500ms执行搜索
      searchTimeout = setTimeout(() => {
        // 模拟搜索延迟
        setTimeout(() => {
          loading.value = false
          nextTick(() => {
            if (bscroll.value) {
              bscroll.value.refresh()
            }
          })
        }, 800)
      }, 500)
    }

    // 搜索结果计算
    const searchResults = computed(() => {
      if (!searchQuery.value.trim()) {
        return mockSearchData
      }
      
      const query = searchQuery.value.toLowerCase()
      return mockSearchData.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.englishTitle.toLowerCase().includes(query) ||
        item.genres.some(genre => genre.toLowerCase().includes(query))
      )
    })

    // 监听搜索词变化
    watch(searchQuery, (newValue) => {
      if (!newValue.trim()) {
        loading.value = false
      }
    })

    // 图片路径处理
    const getImagePath = (path) => {
      return path
    }

    // 图片加载错误处理
    const handleImageError = (event) => {
      console.error('图片加载失败:', event.target.src)
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZGRkZGRkIi8+Cjx0ZXh0IHg9IjMwIiB5PSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1zaXplPSIxMiI+Tk9JTUFHRTwvdGV4dD4KPC9zdmc+'
    }

    // 初始化 Better-Scroll
    const initScroll = () => {
      if (bscroll.value) {
        bscroll.value.destroy()
      }
      
      if (wrapperRef.value) {
        bscroll.value = new BScroll(wrapperRef.value, {
          scrollY: true,
          click: true,
          probeType: 3,
          bounce: {
            top: true,
            bottom: true
          }
        })
      }
    }

    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          initScroll()
        }, 100)
      })
    })

    onBeforeUnmount(() => {
      if (bscroll.value) {
        bscroll.value.destroy()
      }
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    })

    return {
      searchQuery,
      searchResults,
      loading,
      handleSearch,
      getImagePath,
      handleImageError,
      wrapperRef
    }
  }
}
</script>

<style lang="css" scoped>
/* 重置样式 */
* {
  box-sizing: border-box;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.search_body {
  flex: 1;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.scroll-content {
  min-height: 100%;
}

/* 加载动画样式 */

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
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
.search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 10;
}

.search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  align-items: center;
  line-height: 20px;
}

.search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
  color: #999;
}

.search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
  height: 30px;
}

.search_input_wrapper input::placeholder {
  color: #999;
}

.search_result {
  padding-bottom: 20px;
}

.search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
  margin: 0;
  background: #f9f9f9;
}

.search_result ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: white;
  min-height: 120px;
}

.search_result li:hover {
  background: #f9f9f9;
}

.search_result .img {
  width: 60px;
  height: 80px;
  flex-shrink: 0;
  margin-right: 15px;
}

.search_result .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.search_result .info {
  flex: 1;
  min-width: 0;
}

.search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
  margin: 2px 0;
  color: #666;
}

.search_result .info p:nth-of-type(1) {
  height: auto;
  min-height: 22px;
}

.search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 16px;
  flex: 1;
  color: #333;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
  font-weight: bold;
  margin-left: 10px;
}

.search_result .info p:nth-of-type(2) {
  color: #999;
  font-size: 11px;
}

.search_result .info p:nth-of-type(4) {
  color: #999;
  font-size: 11px;
}

.no-result {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.no-result p {
  font-size: 16px;
  margin: 0;
}

.search_entry {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: #f03d37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1000;
  cursor: pointer;
}

.search_entry i {
  font-size: 18px;
}

/* 确保所有父元素都有正确的高度 */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>