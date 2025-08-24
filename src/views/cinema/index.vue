<template>
    <div id="main">
       
        <Header :title="'喵喵电影'"/>
        <Tab/>
        <clist/>
        <div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</div>
        </div>
        </div>
</template>
<script>
import Tab from '@/components/tab/index.vue';
 import Header from '@/components/header/index.vue';
 import clist from '@/components/clist/index.vue';
export default {
 name: 'Cinema',
 components: {
  Header,
  Tab,
  clist
 },
 data() {
  return {
    title: '喵喵电影'
  };
 },
};
</script>
<style>

</style>