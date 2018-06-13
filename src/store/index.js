import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types.js'

Vue.use(Vuex);

const state = {
	nav_index: 1,
	animate_name: '',
	cache_list: 'index',
	to_path: ''
};

const modules = {
	
};

const mutations = {
	[types.SET_NAV_INDEX](state, nav_index){
		state.nav_index = nav_index;
	},
	[types.SET_ANIMATION_NAME](state, animate_name){
		state.animate_name = animate_name;
	},
	[types.SET_CACHE_LIST](state, cache_list){
		state.cache_list = cache_list;
	},
	[types.SET_TO_PATH](state, to_path){
		state.to_path = to_path;
	}
};

export default new Vuex.Store({
	state,
	modules,
	mutations
});
