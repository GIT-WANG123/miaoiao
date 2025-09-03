
  <template>
  <div>
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner-circle"></div>
        <div class="spinner-circle"></div>
        <div class="spinner-circle"></div>
        <div class="spinner-circle"></div>
        <div class="spinner-circle"></div>
      </div>
      <div class="loading-text">正在加载精彩电影...</div>
    </div>
    <div v-else class="container">
      <div class="movie_body" ref="wrapperRef">
        <div class="scroll-content">
          <ul>
            <li v-for="movie in movies" :key="movie.id">
              <div class="pic_show" @click="handleToDetail(movie.id)">
                <img :src="getMoviePoster(movie)" :alt="movie.title" @error="handleImageError">
              </div>
              <div class="info_list">
                <h2>{{ movie.title }}</h2>
                <p>观众评 <span class="grade">{{ movie.rating }}</span></p>
                <p>主演: {{ movie.cast.join('、') }}</p>
                <p>导演: {{ movie.director }}</p>
                <p>今天{{ randomTheaterCount() }}家影院放映{{ randomShowCount() }}场</p>
              </div>
              <div class="btn_mall">
                购票
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import BScroll from '@better-scroll/core'

export default {
  name: "NowPlaying",
  
  setup() {
    const movies = ref([])
    const bscroll = ref(null)
    const wrapperRef = ref(null)
    const isLoading = ref(true)
    const router = useRouter()

    // 完整的模拟数据（使用在线占位图）
    const mockMoviesData = [
      {
        id: 1,
        title: "奥本海默",
        rating: 9.2,
        director: "克里斯托弗·诺兰",
        cast: ["基里安·墨菲", "艾米莉·布朗特", "马特·达蒙"],
        year: 2023,
        duration: 180,
        country: "美国",
        poster: "/images/奥本海默.jpg",
        genres: ["剧情", "传记"]
      },
      {
        id: 2,
        title: "流浪地球2",
        rating: 9.3,
        director: "郭帆",
        cast: ["吴京", "刘德华", "李雪健"],
        year: 2023,
        duration: 173,
        country: "中国",
        poster: "/images/流浪地球2.jpg",
        genres: ["科幻", "冒险"]
      },
      {
        id: 3,
        title: "蜘蛛侠：纵横宇宙",
        rating: 9.1,
        director: "乔伊姆·多斯·桑托斯",
        cast: ["沙梅克·摩尔", "海莉·斯坦菲尔德", "奥斯卡·伊萨克"],
        year: 2023,
        duration: 140,
        country: "美国",
        poster: "/images/蜘蛛侠纵横宇宙.jpg",
        genres: ["动画", "动作"]
      },
      {
        id: 4,
        title: "满江红",
        rating: 8.9,
        director: "张艺谋",
        cast: ["沈腾", "易烊千玺", "张译"],
        year: 2023,
        duration: 159,
        country: "中国",
        poster: "/images/满江红.jpg",
        genres: ["剧情", "喜剧"]
      },
      {
        id: 5,
        title: "芭比",
        rating: 8.7,
        director: "格蕾塔·葛韦格",
        cast: ["玛格特·罗比", "瑞恩·高斯林", "亚美莉卡·费雷拉"],
        year: 2023,
        duration: 114,
        country: "美国",
        poster: "/images/芭比.jpg",
        genres: ["喜剧", "冒险"]
      },
      {
        id: 6,
        title: "消失的她",
        rating: 9.0,
        director: "崔睿",
        cast: ["朱一龙", "倪妮", "文咏珊"],
        year: 2023,
        duration: 121,
        poster: "/images/消失的她.jpg",
        country: "中国",
        genres: ["悬疑", "犯罪"]
      },
      {
        id: 7,
        title: "封神第一部",
        rating: 8.8,
        director: "乌尔善",
        cast: ["费翔", "李雪健", "黄渤"],
        year: 2023,
        duration: 148,
        country: "中国",
        poster: "/images/封神第一部.jpg",
        genres: ["奇幻", "动作"]
      },
      {
        id: 8,
        title: "超能一家人",
        rating: 7.9,
        director: "宋阳",
        cast: ["艾伦", "沈腾", "陶慧"],
        year: 2023,
        duration: 113,
        country: "中国",
        poster: "/images/超能一家人.jpg",
        genres: ["喜剧", "家庭"]
      },
      {
        id: 9,
        title: "八角笼中",
        rating: 8.5,
        director: "王宝强",
        cast: ["王宝强", "陈永胜", "史彭元"],
        year: 2023,
        duration: 117,
        country: "中国",
        poster: "/images/八角笼中.jpg",
        genres: ["剧情", "动作"]
      },
      {
        id: 10,
        title: "长安三万里",
        rating: 9.0,
        director: "谢君伟",
        cast: ["杨天翔", "凌振赫", "吴俊全"],
        year: 2023,
        duration: 168,
        country: "中国",
        poster: "/images/长安三万里.jpg",
        genres: ["动画", "历史"]
      }
    ]

    const randomTheaterCount = () => Math.floor(Math.random() * 100) + 20
    const randomShowCount = () => Math.floor(Math.random() * 500) + 100

    const getMoviePoster = (movie) => {
      return movie.poster
    }

    const handleImageError = (event) => {
      // 使用占位图
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iOTAiIHZpZXdCb3g9IjAgMCA2NCA5MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjkwIiBmaWxsPSIjZGRkZGRkIi8+Cjx0ZXh0IHg9IjMyIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1zaXplPSIxMiI+Tk9JTUFHRTwvdGV4dD4KPC9zdmc+'
    }

    const handleToDetail = (movieId) => {
      console.log("handleToDetail")
      router.push('/movie/detail/')
    }

    // 初始化 better-scroll
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

    const loadMovies = async () => {
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 2000))
        movies.value = mockMoviesData
      } catch (error) {
        console.error('加载电影数据失败:', error)
        movies.value = mockMoviesData
      } finally {
        isLoading.value = false
        nextTick(() => {
          setTimeout(() => {
            initScroll()
          }, 100)
        })
      }
    }

    onMounted(() => {
      loadMovies()
    })

    onBeforeUnmount(() => {
      if (bscroll.value) {
        bscroll.value.destroy()
      }
    })

    return {
      isLoading,
      movies,
      randomTheaterCount,
      randomShowCount,
      getMoviePoster,
      handleImageError,
      handleToDetail,
      wrapperRef
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.movie_body {
  flex: 1;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.scroll-content {
  min-height: 100%;
}

.movie_body ul { 
  margin: 0 12px; 
  padding: 10px 0;
}

.movie_body ul li { 
  margin-top: 12px; 
  display: flex; 
  align-items: center; 
  border-bottom: 1px #e6e6e6 solid; 
  padding-bottom: 15px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.movie_body ul li:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.movie_body .pic_show { 
  width: 64px; 
  height: 90px;
  flex-shrink: 0;
  cursor: pointer;
}

.movie_body .pic_show img { 
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.movie_body .info_list { 
  margin-left: 15px; 
  flex: 1; 
  position: relative;
}

.movie_body .info_list h2 { 
  font-size: 17px; 
  line-height: 24px; 
  width: 150px; 
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.movie_body .info_list p { 
  font-size: 13px; 
  color: #666; 
  line-height: 20px; 
  width: 200px; 
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
  margin: 3px 0;
}

.movie_body .info_list .grade { 
  font-weight: 700; 
  color: #faaf00; 
  font-size: 15px;
}

.movie_body .btn_mall { 
  width: 50px; 
  height: 30px; 
  line-height: 30px; 
  text-align: center; 
  background-color: #f03d37; 
  color: #fff; 
  border-radius: 4px; 
  font-size: 12px; 
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.movie_body .btn_mall:hover {
  background-color: #e02b25;
  transform: translateY(-2px);
}

/* Loading动画样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  padding: 20px;
}

.loading-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.spinner-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-radius: 50%;
  animation: rotate 2s linear infinite;
}

.spinner-circle:nth-child(1) {
  border-top-color: #ff7e5f;
  animation-duration: 1.5s;
}

.spinner-circle:nth-child(2) {
  border-right-color: #feb47b;
  animation-duration: 2s;
}

.spinner-circle:nth-child(3) {
  border-bottom-color: #3498db;
  animation-duration: 2.5s;
}

.spinner-circle:nth-child(4) {
  border-left-color: #2ecc71;
  animation-duration: 3s;
}

.spinner-circle:nth-child(5) {
  border-top-color: #9b59b6;
  border-right-color: #e74c3c;
  animation-duration: 3.5s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 18px;
  color: #555;
  font-weight: 500;
  text-align: center;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

/* 电影列表加载动画 */
.movie_body ul li {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
  transform: translateY(20px);
}

.movie_body ul li:nth-child(1) { animation-delay: 0.1s; }
.movie_body ul li:nth-child(2) { animation-delay: 0.2s; }
.movie_body ul li:nth-child(3) { animation-delay: 0.3s; }
.movie_body ul li:nth-child(4) { animation-delay: 0.4s; }
.movie_body ul li:nth-child(5) { animation-delay: 0.5s; }
.movie_body ul li:nth-child(6) { animation-delay: 0.6s; }
.movie_body ul li:nth-child(7) { animation-delay: 0.7s; }
.movie_body ul li:nth-child(8) { animation-delay: 0.8s; }
.movie_body ul li:nth-child(9) { animation-delay: 0.9s; }
.movie_body ul li:nth-child(10) { animation-delay: 1.0s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 确保父容器有正确的高度 */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}
</style>