import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/home/login'
import Index from '@/pages/home/index'
import List from '@/pages/home/list'
import Car from '@/pages/mycar/car'
import My from '@/pages/myself/my'
import MyAdr from '@/pages/myself/myAdr'
import AddAdr from '@/pages/myself/addAdr'
import EditAdr from '@/pages/myself/editAdr'
import MyInfo from '@/pages/myself/myInfo'
import MyQrcode from '@/pages/myself/myQrcode'
import UpdName from '@/pages/myself/updName'

Vue.use(Router)

const router = new Router({
	mode: 'history',
  routes: [
  	{
      path: '/login',
      name: 'login',
      component: Login,
			meta: {
				auth: false,
				status: 2
			}
    },
    {
      path: '/',
      name: 'index',
      component: Index,
			meta: {
				auth: false,
				status: 0
			}
    },
    {
      path: '/list',
      name: 'list',
      component: List,
			meta: {
				auth: false,
				status: 1
			}
    },
    {
      path: '/car',
      name: 'car',
      component: Car,
			meta: {
				auth: true,
				status: 0
			}
    },
    {
      path: '/my',
      name: 'my',
      component: My,
			meta: {
				auth: true,
				status: 0
			}
    },
    {
      path: '/myAdr',
      name: 'myAdr',
      component: MyAdr,
			meta: {
				auth: true,
				status: 1
			}
    },
    {
      path: '/addAdr',
      name: 'addAdr',
      component: AddAdr,
			meta: {
				auth: true,
				status: 2
			}
    },
    {
      path: '/editAdr/:id',
      name: 'editAdr',
      component: EditAdr,
			meta: {
				auth: true,
				status: 2
			}
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: MyInfo,
			meta: {
				auth: true,
				status: 1
			}
    },
    {
      path: '/myQrcode',
      name: 'myQrcode',
      component: MyQrcode,
			meta: {
				auth: true,
				status: 2
			}
    },
    {
      path: '/updName',
      name: 'updName',
      component: UpdName,
			meta: {
				auth: true,
				status: 2
			}
    }
  ]
});

router.beforeEach((to, from, next) => {
	let store = this.a.app.$store,
		isLog = false;
	if(to.meta.auth){	//是否需要验证
		if(window.localStorage.user_info){ //是否登录
			next();
		}else{
			isLog = true;
			store.commit('SET_TO_PATH', to.path);
			next('/login');
		}
	}else{
		next();
	}
	if(store) {
		if(to.name == 'login' || isLog){
			store.commit('SET_ANIMATION_NAME', 'vux-slide-up');
		}else if(from.name == 'login'){
			store.commit('SET_ANIMATION_NAME', 'vux-slide-down');
		}else{
			if(to.meta.status == 0 && from.meta.status == 0){
				store.commit('SET_ANIMATION_NAME', '');
			}else if(to.meta.status < from.meta.status){
				store.commit('SET_ANIMATION_NAME', 'vux-pop-out');
			}else{
				store.commit('SET_ANIMATION_NAME', 'vux-pop-in');
			}
		}
	}
});

export default router