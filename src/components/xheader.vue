<template>
	<x-header :title="htitle" :left-options="leftOpt">
		<template slot="left">
			<slot name="leftOpt"></slot>
		</template>
		<template slot="right">
			<slot name="rightOpt"></slot>
		</template>
	</x-header>
</template>

<script>
	import {XHeader} from 'vux'
	
	export default {
		name: 'xheader',
		components: {
			XHeader
		},
		props: ['htitle', 'leftOpt', 'rightOpt']
	}
</script>

<style>
</style>