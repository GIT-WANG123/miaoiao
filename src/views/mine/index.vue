<template>
     <Header :title="'我的'" />
    <div id="main"title="我的喵喵">
        <div id="content">
            <denglu/>
        </div>
       
        <Tab />
    </div>
</template>
<script>
 import Tab from '@/components/tab/index.vue';
 import denglu from '@/components/denglu/index.vue';
 import Header from '@/components/header/index.vue';
export default {
 name: 'Mine',

 components: {
  Header,
  Tab,
  denglu
 }
};
</script>
<style>

</style>