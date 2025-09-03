<template>
  <div id="detailContainer">
    <div class="header">
      <i class="fas fa-arrow-left back-icon" @click="handleToBack"></i>
      <div class="header-title">影片详情</div>
    </div>
    
    <div id="content" class="contentDetail">
      <div v-if="movieDetail" class="detail_list">
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="movieDetail.poster" :alt="movieDetail.title" @error="handleImageError">
          </div>
          <div class="detail_list_info">
            <h2>{{ movieDetail.title }}</h2> 
            <p>{{ movieDetail.englishTitle || 'A Cool Fish' }}</p>
            <p><i class="fas fa-star"></i> 评分：{{ movieDetail.rating }}</p>
            <p><i class="fas fa-film"></i> {{ movieDetail.genres.join(',') }}</p>
            <p><i class="fas fa-globe"></i> {{ movieDetail.country }} / {{ movieDetail.duration }}分钟</p>
            <p><i class="fas fa-calendar-alt"></i> {{ movieDetail.releaseDate }}上映</p>
          </div>
        </div>
      </div>
      
      <div v-if="movieDetail" class="detail_intro">
        <p>{{ movieDetail.intro }}</p>
      </div>
      
      <div class="detail_player">
        <h3><i class="fas fa-users"></i> 主演</h3>
        <ul>
          <li v-for="(actor, index) in actors" :key="index">
            <div class="actor-img">
              <img :src="getActorImage(index)" :alt="actor.name" @error="handleActorImageError">
              <div class="actor-overlay">
                <i class="fas fa-info-circle"></i>
              </div>
            </div>
            <p>{{ actor.name }}</p>
            <p>{{ actor.role }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: "detail",
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const movieDetail = ref(null);
    const loading = ref(true);
    
    // 模拟电影数据
    const mockMoviesData = {
      1: {
        id: 1,
        title: "奥本海默",
        englishTitle: "Oppenheimer",
        rating: 9.2,
        director: "克里斯托弗·诺兰",
        cast: ["基里安·墨菲", "艾米莉·布朗特", "马特·达蒙"],
        year: 2023,
        duration: 180,
        country: "美国",
        poster: "/images/奥本海默.jpg",
        genres: ["剧情", "传记"],
        releaseDate: "2023-08-30",
        intro: "影片聚焦罗伯特·奥本海默的一生，讲述美国理论物理学家罗伯特·奥本海默在二战期间领导研制原子弹的过程，以及他在战后美国臭名昭著的听证会上的经历。"
      },
      2: {
        id: 2,
        title: "流浪地球2",
        englishTitle: "The Wandering Earth II",
        rating: 9.3,
        director: "郭帆",
        cast: ["吴京", "刘德华", "李雪健"],
        year: 2023,
        duration: 173,
        country: "中国",
        poster: "/images/流浪地球2.jpg",
        genres: ["科幻", "冒险"],
        releaseDate: "2023-01-22",
        intro: "太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。然而宇宙之路危机四伏，为了拯救地球，流浪地球时代的年轻人再次挺身而出，展开争分夺秒的生死之战。"
      },
      // 其他电影数据...
    };

    const actors = ref([
      { name: '陈建斌', role: '马先勇' },
      { name: '任素汐', role: '马嘉旗' },
      { name: '潘斌龙', role: '李海根' },
      { name: '章宇', role: '胡广生' },
      { name: '王砚辉', role: '高明' },
      { name: '九孔', role: '王顺才' }
    ]);

    // 加载电影详情
    const loadMovieDetail = () => {
      const movieId = route.params.id;
      loading.value = true;
      
      // 模拟API请求
      setTimeout(() => {
        movieDetail.value = mockMoviesData[movieId] || {
          id: movieId,
          title: "无名之辈",
          rating: 9.2,
          director: "饶晓志",
          cast: ["陈建斌", "任素汐", "潘斌龙", "章宇"],
          year: 2018,
          duration: 108,
          country: "中国大陆",
          poster: "/images/无名之辈.jpg",
          genres: ["剧情", "喜剧", "犯罪"],
          releaseDate: "2018-11-16",
          intro: "在一座山间小城中，一对低配劫匪、一个落魄的泼皮保安、一个身体残疾却性格彪悍的残毒舌女以及一系列生活在社会不同轨迹上的小人物，在一个貌似平常的日子里，因为一把丢失的老枪和一桩当天发生在城中的乌龙劫案，从而被阴差阳错地拧到一起，发生的一幕幕令人啼笑皆非的荒诞喜剧。"
        };
        
        loading.value = false;
      }, 500);
    };

    const handleToBack = () => {
      router.back();
    };

    const handleImageError = (event) => {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDEwOCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTUwIiBmaWxsPSIjZGRkZGRkIi8+Cjx0ZXh0IHg9IjU0IiB5PSI3NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1zaXplPSIxNCI+Tk9JTUFHRTwvdGV4dD4KPC9zdmc+';
    };

    const handleActorImageError = (event) => {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzUiIGN5PSIzNSIgcj0iMzUiIGZpbGw9IiNlMWUxZTEiLz4KPHRleHQgeD0iMzUiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjEyIj7otoXnuqc8L3RleHQ+Cjwvc3ZnPg==';
    };

    const getActorImage = (index) => {
      const avatarUrls = [
        '/images/陈建斌.jpg',
        '/images/任素汐.jpg',
        '/images/潘斌龙.jpg',
        '/images/章宇.jpg',
        '/images/王砚辉.jpg',
        '/images/九孔.jpg'
      ];
      return avatarUrls[index] || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzUiIGN5PSIzNSIgcj0iMzUiIGZpbGw9IiNlMWUxZTEiLz4KPHRleHQgeD0iMzUiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjEyIj7otoXnuqc8L3RleHQ+Cjwvc3ZnPg==';
    };

    // 监听路由参数变化
    watch(() => route.params.id, (newId) => {
      if (newId) {
        loadMovieDetail();
      }
    });

    // 组件挂载时加载数据
    onMounted(() => {
      loadMovieDetail();
    });

    return {
      movieDetail,
      actors,
      handleToBack,
      getActorImage,
      handleImageError,
      handleActorImageError
    };
  }
});
</script>

<style scoped>
/* 样式保持不变，与您提供的代码一致 */
#detailContainer {
  position: absolute;
  left: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
}

.header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(90deg, #e54847,#e54847);
  color: white;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.back-icon {
  font-size: 20px;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;
  margin-right: 15px;
  background: rgba(255, 255, 255, 0.2);
}

.back-icon:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-3px);
}

.header-title {
  font-size: 1.4rem;
  font-weight: 500;
  flex: 1;
  text-align: center;
  margin-right: 40px;
}

#content.contentDetail { 
  display: block; 
  margin-bottom: 0;
}

#content .detail_list { 
  height: 200px; 
  width: 100%; 
  position: relative; 
  overflow: hidden;
  background-color: #40454d;
}

.detail_list .detail_list_content { 
  display: flex; 
  width: 100%; 
  height: 100%; 
  position: absolute; 
  left: 0; 
  top: 0; 
  z-index: 2;
}

.detail_list .detail_list_img { 
  width: 108px; 
  height: 150px; 
  border: solid 1px #f0f2f3; 
  margin: 20px;
  border-radius: 4px;
  overflow: hidden;
}

.detail_list .detail_list_img img { 
  width: 100%; 
  height: 100%;
  object-fit: cover;
}

.detail_list .detail_list_info { 
  margin-top: 20px;
}

.detail_list .detail_list_info h2 { 
  font-size: 20px; 
  color: white; 
  font-weight: normal; 
  line-height: 40px;
  margin-bottom: 10px;
}

.detail_list .detail_list_info p { 
  color: #ccc; 
  line-height: 20px; 
  font-size: 14px; 
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.detail_list .detail_list_info i {
  margin-right: 8px;
  font-size: 12px;
  width: 16px;
  text-align: center;
}

.detail_intro {
  padding: 20px 15px;
  font-size: 14px;
  line-height: 1.8;
  color: #333;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  margin: 15px;
}

.detail_player {
  padding: 15px;
}

.detail_player h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
  display: flex;
  align-items: center;
}

.detail_player h3 i {
  margin-right: 10px;
  color: #3498db;
}

.detail_player ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail_player li {
  width: 25%;
  text-align: center;
  margin-bottom: 25px;
  padding: 0 10px;
  transition: transform 0.3s ease;
}

.detail_player li:hover {
  transform: translateY(-5px);
}

.actor-img {
  position: relative;
  width: 70px;
  height: 70px;
  margin: 0 auto 10px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.actor-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actor-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(52, 152, 219, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.actor-img:hover .actor-overlay {
  opacity: 1;
}

.detail_player li p {
  margin: 5px 0;
  font-size: 12px;
  color: #666;
}

.detail_player li p:first-of-type {
  font-weight: bold;
  color: #333;
  font-size: 14px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .detail_player li {
    width: 33.33%;
  }
  
  .header-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .detail_player li {
    width: 50%;
  }
  
  .detail_list .detail_list_content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .detail_list .detail_list_info {
    margin-top: 0;
    padding: 0 20px 20px;
  }
  
  .back-icon {
    font-size: 18px;
    padding: 8px;
  }
}
</style>