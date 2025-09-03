<!-- src/views/movie/index.vue -->
<template>
    <div id="main">
        
        <Header :title="'喵喵影院'" />
        <Tab />
        <div id="content">
			<div class="movie_menu">
				<router-link tag="div" to="/movie/city" class="city_name">
					<span>大连</span><i class="fas fa-lower-triangle"></i>
        </router-link>
				<div class="hot_swtich">
					<router-link tag="div"to="/movie/nowplaying"class="hot_item">正在上映</router-link>
					<router-link tag="div"to="/movie/comingsoon" class="hot_item">即将上映</router-link>
				</div>
				<router-link tag="div" to="/movie/search" class="search_entry">
					<i class="fas fa-search"></i>
        </router-link> 
			</div>
      <Keep-alive>
      <router-view></router-view>
      </Keep-alive>
      
  </div>
  <router-view name="detail"></router-view>
    </div>
</template>

<script>
 import Header from '@/components/header/index.vue';
 import Tab from '@/components/tab/index.vue';
import router from '@/routers/router';
import { MessageBox } from '@/components/JS/index'
export{MessageBox}
 export default
{
   name: 'Movie',
   components: {
     Header,
     Tab,
   
   },
  
mounted() {
    setTimeout(() => {
        MessageBox({
            title: "定位",
            content: "大连",
            cancel: "取消",
            ok: "切换定位",
            handleCancel: () => {
                console.log("用户点击了取消");
            },
            handleOk: () => {
                console.log("用户点击了切换定位");
                // 这里可以添加切换定位的逻辑
            }
        }).then(result => {
            console.log('对话框结果:', result ? '确定' : '取消');
        });
    }, 3000);
}
}


</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name { margin-left: 20px; height:100%; line-height: 45px;text-decoration: none; color:#666; font-size: 15px;}
.movie_menu .city_name.active { color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;text-decoration: none;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>