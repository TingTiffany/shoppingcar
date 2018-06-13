<template>
  <div id="car">
		<transition :name="animateName">
			<keep-alive :include="cacheList">
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
	export default {
			name: 'App',
			computed: {
				animateName: function() {
					return this.$store.state.animate_name;
				},
				cacheList: function(){
					return this.$store.state.cache_list;
				}
			}
		}
</script>
