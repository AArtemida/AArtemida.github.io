Vue.directive('drag',//自定义指令                                      JS
        {bind:function (el, binding) {
                let oDiv = el;   //当前元素
                let self = this;  //上下文
                oDiv.onmousedown = function (e) {
                 //鼠标按下，计算当前元素距离可视区的距离
                    let disX = e.clientX - oDiv.offsetLeft;
                    // let disY = e.clientY - oDiv.offsetTop;

                    document.onmousemove = function (e) {
                      //通过事件委托，计算移动的距离 
                        let l = e.clientX - disX;
                        // let t = e.clientY - disY;
                      //移动当前元素
                        // oDiv.style.left = e.pageX + 'px';
                        // oDiv.style.top = t + 'px';
                         //将此时的位置传出去
                        binding.value({x:e.pageX,y:e.pageY})
                    };
                    document.onmouseup = function (e) {
                        document.onmousemove = null;
                        document.onmouseup = null;
                     };
                };
            }
        });
window.onload = function(){
	let interval = null;
	var article = new Vue({
		el:'#article',
		data:{
			lightWidth:0,
			screenWidth:0,

			addTop:true,
			addDown:false,
		},
		computed:{
			
		},
		watch:{
			
		},
		mounted:function(){
			var srccenWidth = window.screen.width;
			this.screenWidth = srccenWidth + 'px';
			this.lightWidth = srccenWidth/2 +'px';
			this.animateWapper();
		},
		methods: {
			changeWidth(obj){
				this.lightWidth = obj.x + 'px';
				// console.log(obj.x);
			},
			clickChangeWidth(e){
				this.lightWidth = e.pageX + 'px';
			},
			animateWapper(){
				let _this = this;
				clearInterval(interval);
				let clock = function*(_) {
				  while (true) {
				    yield _;
				    console.log('Tick!');
				    _this.addTop = false;
				    _this.addDown = true;
				    yield _;
				    console.log('Tock!');
				    _this.addTop = true;
				    _this.addDown = false;
				  }
				};
				let timeout = clock();
				interval = setInterval(function(){
					timeout.next();
				},1200);
			},
		}
	})
}