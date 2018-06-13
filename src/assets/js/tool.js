exports.install = function (Vue, options){
	Vue.prototype.showTextToast = function(txt, fn){
		this.$vux.toast.show({
			type: 'text',
			text: txt,
			time: 800,
			width: 'auto',
			onHide(){
				fn?fn():''
			}
		});
	};
	
	Vue.prototype.backTop = function($ele){
		//var tim;
		let tim = setInterval(()=>{
			if($ele.scrollTop <= 0){
				clearInterval(tim);
			}else{
				$ele.scrollTop -= 10;
			}
		}, 1);
		/*tim = setInterval(function(){
			if($ele.scrollTop <= 0){
				clearInterval(tim);
			}else{
				$ele.scrollTop -= 10;
			}
		}, 1);*/
	};
};