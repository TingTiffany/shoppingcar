<template>
	<tabbar ref="tabbars">
    <tabbar-item :selected="navIndex == 1" link="/">
      <i slot="icon" class="iconfont icon-home"></i>
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item :selected="navIndex == 2" link="/car">
      <i slot="icon" class="iconfont icon-car"></i>
      <span slot="label">购物车</span>
    </tabbar-item>
    <tabbar-item :selected="navIndex == 3" link="/my">
      <i slot="icon" class="iconfont icon-my"></i>
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'

	export default {
		name: 'xfooter',
	  components: {
	    Tabbar, TabbarItem
	  },
		computed: {
			navIndex: function(){
				return this.$store.state.nav_index;
			}
		},
		deactivated () {  
	    this.$destroy(true);  
	  }
	}
</script>

<style>
</style>