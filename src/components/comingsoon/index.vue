<template>
  <div class="container">
    <!-- 加载动画 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>加载中，请稍候...</p>
      </div>
    </div>
    
    <!-- 电影列表 -->
    <div v-else class="movie_body" ref="wrapperRef">
      <div class="scroll-content">
        <ul>
          <li v-for="movie in comingSoonMovies" :key="movie.id">
            <div class="pic_show" @click="handleToDetail(movie.id)">
              <img :src="getMoviePoster(movie)" :alt="movie.title">
            </div>
            <div class="info_list">
              <h2>{{ movie.title }}</h2>
              <p><span class="person">{{ movie.wantToSee }}</span> 人想看</p>
              <p>主演: {{ movie.cast.join('、') }}</p>
              <p>{{ movie.releaseDate }}上映</p>
            </div>
            <div class="btn_pre" @click="handlePreSale(movie.id)">
              预售
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import BScroll from '@better-scroll/core'

export default {
  name: "ComingSoon",
  setup() {
    const comingSoonMovies = ref([])
    const bscroll = ref(null)
    const wrapperRef = ref(null)
    const loading = ref(true)
    const router = useRouter()

    // 即将上映电影模拟数据
    const mockComingSoonData = [
      {
        id: 1,
        title: "无名之辈2",
        wantToSee: 17746,
        director: "饶晓志",
        cast: ["陈建斌", "任素汐", "潘斌龙"],
        releaseDate: "2024-12-20",
        color: "#4A90E2",
        poster: "/images/无名之辈2.jpg",
        genres: ["剧情", "喜剧"],
        duration: 120,
        country: "中国",
        intro: "续集延续第一部的故事，讲述小人物们在城市中的生活百态和温情故事。"
      },
      {
        id: 2,
        title: "毒液：终极守护",
        wantToSee: 2346,
        director: "安迪·瑟金斯",
        cast: ["汤姆·哈迪", "米歇尔·威廉姆斯"],
        releaseDate: "2024-11-15",
        color: "#50C878",
        poster: "/images/毒液3.jpg",
        genres: ["动作", "科幻"],
        duration: 135,
        country: "美国",
        intro: "毒液与宿主埃迪·布洛克面临新的威胁，必须联手保护地球。"
      },
      {
        id: 3,
        title: "复仇者联盟：新的黎明",
        wantToSee: 8921,
        director: "罗素兄弟",
        cast: ["小罗伯特·唐尼", "克里斯·埃文斯"],
        releaseDate: "2024-10-01",
        color: "#FF6B6B",
        poster: "/images/复联5.jpg",
        genres: ["动作", "科幻"],
        duration: 150,
        country: "美国",
        intro: "新的复仇者团队组建，面对宇宙级威胁，开启全新的冒险旅程。"
      },
      {
        id: 4,
        title: "流浪地球3",
        wantToSee: 15678,
        director: "郭帆",
        cast: ["吴京", "刘德华", "李雪健"],
        releaseDate: "2024-09-30",
        color: "#FF4757",
        poster: "/images/流浪地球3.jpg",
        genres: ["科幻", "冒险"],
        duration: 160,
        country: "中国",
        intro: "人类继续在宇宙中寻找新家园，面临前所未有的挑战和危机。"
      },
      {
        id: 5,
        title: "唐人街探案4",
        wantToSee: 9876,
        director: "陈思诚",
        cast: ["王宝强", "刘昊然", "妻夫木聪"],
        releaseDate: "2024-08-15",
        color: "#FF9FF3",
        poster: "/images/唐探4.jpg",
        genres: ["喜剧", "悬疑"],
        duration: 130,
        country: "中国",
        intro: "唐仁和秦风前往新的城市，破解更加复杂的谜案。"
      },
      {
        id: 6,
        title: "蜘蛛侠：平行宇宙3",
        wantToSee: 6543,
        director: "乔伊姆·多斯·桑托斯",
        cast: ["沙梅克·摩尔", "海莉·斯坦菲尔德"],
        releaseDate: "2024-07-20",
        color: "#2ED573",
        poster: "/images/蜘蛛侠3.jpg",
        genres: ["动画", "动作"],
        duration: 140,
        country: "美国",
        intro: "迈尔斯继续在多维宇宙中冒险，遇到新的盟友和敌人。"
      },
      {
        id: 7,
        title: "封神第二部",
        wantToSee: 11234,
        director: "乌尔善",
        cast: ["费翔", "黄渤", "夏雨"],
        releaseDate: "2024-06-30",
        color: "#FFA502",
        poster: "/images/封神2.jpg",
        genres: ["奇幻", "动作"],
        duration: 155,
        country: "中国",
        intro: "封神大战继续，各方势力展开更加激烈的对抗。"
      },
      {
        id: 8,
        title: "超能一家人2",
        wantToSee: 4321,
        director: "宋阳",
        cast: ["艾伦", "沈腾", "陶慧"],
        releaseDate: "2024-05-20",
        color: "#FFC312",
        poster: "/images/超能2.jpg",
        genres: ["喜剧", "家庭"],
        duration: 115,
        country: "中国",
        intro: "超能一家人面临新的挑战和搞笑冒险。"
      },
      {
        id: 9,
        title: "八角笼中2",
        wantToSee: 7654,
        director: "王宝强",
        cast: ["王宝强", "陈永胜", "史彭元"],
        releaseDate: "2024-04-15",
        color: "#009432",
        poster: "/images/八角2.jpg",
        genres: ["剧情", "动作"],
        duration: 125,
        country: "中国",
        intro: "继续讲述格斗运动员的奋斗故事和人生历程。"
      },
      {
        id: 10,
        title: "长安三万里2",
        wantToSee: 5432,
        director: "谢君伟",
        cast: ["杨天翔", "凌振赫", "吴俊全"],
        releaseDate: "2024-03-08",
        color: "#0652DD",
        poster: "/images/长安2.jpg",
        genres: ["动画", "历史"],
        duration: 165,
        country: "中国",
        intro: "继续展现大唐盛世的诗歌文化和历史故事。"
      },
      {
        id: 11,
        title: "热辣滚烫2",
        wantToSee: 8765,
        director: "贾玲",
        cast: ["贾玲", "雷佳音", "张小斐"],
        releaseDate: "2024-02-14",
        color: "#ED4C67",
        poster: "/images/热辣2.jpg",
        genres: ["喜剧", "剧情"],
        duration: 120,
        country: "中国",
        intro: "续集讲述新的励志故事和人生转变。"
      },
      {
        id: 12,
        title: "孤注一掷2",
        wantToSee: 6789,
        director: "申奥",
        cast: ["张艺兴", "金晨", "王传君"],
        releaseDate: "2024-01-20",
        color: "#12CBC4",
        poster: "/images/孤注2.jpg",
        genres: ["犯罪", "剧情"],
        duration: 130,
        country: "中国",
        intro: "继续揭露网络诈骗的内幕，展现正邪对抗。"
      }
    ]

    // 生成SVG图片数据
    const generateSVGPoster = (movie) => {
      const shortText = movie.title.length > 4 ? movie.title.substring(0, 2) : movie.title
      const svgContent = `
        <svg width="64" height="90" viewBox="0 0 64 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="90" fill="${movie.color}"/>
          <text x="32" y="45" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="12" font-family="Arial, sans-serif">
            ${shortText}
          </text>
        </svg>
      `
      return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`
    }

    // 获取电影海报
    const getMoviePoster = (movie) => {
      return generateSVGPoster(movie)
    }

    // 跳转到详情页
    const handleToDetail = () => {
      router.push(`/movie/detail`)
    }

    // 处理预售点击
    const handlePreSale = () => {
      console.log("预售电影ID:")
      // 这里可以添加预售逻辑，比如跳转到预售页面或显示弹窗
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

        // 监听滚动事件
        bscroll.value.on('scroll', (position) => {
          console.log('滚动位置:', position.y)
        })

        bscroll.value.on('scrollEnd', () => {
          console.log('滚动结束')
        })
      }
    }

    // 加载电影数据
    const loadMovies = async () => {
      try {
        // 模拟网络请求延迟
        await new Promise(resolve => setTimeout(resolve, 1500))
        comingSoonMovies.value = mockComingSoonData
      } catch (error) {
        console.error('加载电影数据失败:', error)
        comingSoonMovies.value = mockComingSoonData
      } finally {
        loading.value = false
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
      comingSoonMovies,
      getMoviePoster,
      wrapperRef,
      loading,
      handleToDetail,
      handlePreSale
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
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

/* 电影列表样式 */
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
  transition: transform 0.3s ease;
}

.movie_body ul li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  transition: transform 0.3s ease;
}

.movie_body .pic_show:hover img {
  transform: scale(1.05);
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

.movie_body .info_list .person { 
  font-weight: 700; 
  color: #faaf00; 
  font-size: 15px;
}

.movie_body .btn_pre { 
  width: 50px; 
  height: 30px; 
  line-height: 30px; 
  text-align: center; 
  background-color: #3c9fe6; 
  color: #fff; 
  border-radius: 4px; 
  font-size: 12px; 
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.movie_body .btn_pre:hover {
  background-color: #2a8fd8;
  transform: translateY(-2px);
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