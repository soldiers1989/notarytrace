<template>
	<div class="mainhead fixed_top">
		<div class="szl_header">
			<div class="szl_headcon">
				<div class="logocon">
					<a href="">
						<img src="../assets/img/headlogo.png" alt="">
					</a>
				</div>
				<div class="navcon">
					<div class="navitem">
						<router-link tag="a" :to="{path:'/index'}">首页</router-link>
						<span></span>
					</div>
					<div class="navitem">
						<router-link tag="a" :to="{path:'/product'}">产品服务</router-link>
						<span></span>
					</div>
					<div class="navitem">
						<router-link tag="a" :to="{path:'/solvecase'}">解决方案</router-link>
						<span></span>
					</div>
					<div class="navitem">
						<router-link tag="a" :to="{path:'/law'}">法律保障</router-link>
						<span></span>
					</div>
					<div class="navitem">
						<router-link tag="a" :to="{path:'/aboutus'}">关于我们</router-link>
						<span></span>
					</div>
					<div class="navitem" style="margin-left: 220px;">
						<router-link tag="a" :to="{path:'/verify'}">验证中心</router-link>
						<span></span>
					</div>
					<!-- <div class="navitem">
						<router-link tag="a" :to="{path:'/openplate'}">开放平台</router-link>
						<span></span>
					</div> -->
					<div class="navlogin">
						<span class="loginbtn">
							<router-link tag="a" :to="{path:'/login'}">登录</router-link>
						</span>
						<!-- <span>
							<router-link tag="a" :to="{path:'/register'}">注册</router-link>
						</span> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	export default {
		data() {
	 		return {
	 			classnum: 0,
	 			baseUrl:'',
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
        	this.checkPath();
        	$(document).ready(function(){
				$(".navitem").hover(function(){
					$(".navitem span").eq($(this).index()).stop();
				    $(".navitem a").eq($(this).index()).css("color","#007CE8");
				    $(".navitem span").eq($(this).index()).show(500);
				},function(){
					if(!$(this).hasClass("navactive")){
						$(".navitem span").eq($(this).index()).stop();
					    $(".navitem a").eq($(this).index()).css("color","#333333");
					    $(".navitem span").eq($(this).index()).hide(500);
					}
				});
				$(".navitem a").on('click', function(){
					$(this).parent().siblings().removeClass('navactive');
					$(this).parent().addClass('navactive');
					if($(this).parent().index() == 0){
						$(".navitem a").eq(1).css("color","#333333");
						$(".navitem span").eq(1).hide(500);
						$(".navitem a").eq(2).css("color","#333333");
						$(".navitem span").eq(2).hide(500);
						$(".navitem a").eq(3).css("color","#333333");
						$(".navitem span").eq(3).hide(500);
						$(".navitem a").eq(4).css("color","#333333");
						$(".navitem span").eq(4).hide(500);
						$(".navitem a").eq(5).css("color","#333333");
						$(".navitem span").eq(5).hide(500);
					}
					if($(this).parent().index() == 1){
						$(".navitem a").eq(0).css("color","#333333");
						$(".navitem span").eq(0).hide(500);
						$(".navitem a").eq(2).css("color","#333333");
						$(".navitem span").eq(2).hide(500);
						$(".navitem a").eq(3).css("color","#333333");
						$(".navitem span").eq(3).hide(500);
						$(".navitem a").eq(4).css("color","#333333");
						$(".navitem span").eq(4).hide(500);
						$(".navitem a").eq(5).css("color","#333333");
						$(".navitem span").eq(5).hide(500);
					}
					if($(this).parent().index() == 2){
						$(".navitem a").eq(0).css("color","#333333");
						$(".navitem span").eq(0).hide(500);
						$(".navitem a").eq(1).css("color","#333333");
						$(".navitem span").eq(1).hide(500);
						$(".navitem a").eq(3).css("color","#333333");
						$(".navitem span").eq(3).hide(500);
						$(".navitem a").eq(4).css("color","#333333");
						$(".navitem span").eq(4).hide(500);
						$(".navitem a").eq(5).css("color","#333333");
						$(".navitem span").eq(5).hide(500);
					}
					if($(this).parent().index() == 3){
						$(".navitem a").eq(0).css("color","#333333");
						$(".navitem span").eq(0).hide(500);
						$(".navitem a").eq(1).css("color","#333333");
						$(".navitem span").eq(1).hide(500);
						$(".navitem a").eq(2).css("color","#333333");
						$(".navitem span").eq(2).hide(500);
						$(".navitem a").eq(4).css("color","#333333");
						$(".navitem span").eq(4).hide(500);
						$(".navitem a").eq(5).css("color","#333333");
						$(".navitem span").eq(5).hide(500);
					}
					if($(this).parent().index() == 4){
						$(".navitem a").eq(0).css("color","#333333");
						$(".navitem span").eq(0).hide(500);
						$(".navitem a").eq(1).css("color","#333333");
						$(".navitem span").eq(1).hide(500);
						$(".navitem a").eq(2).css("color","#333333");
						$(".navitem span").eq(2).hide(500);
						$(".navitem a").eq(3).css("color","#333333");
						$(".navitem span").eq(3).hide(500);
						$(".navitem a").eq(5).css("color","#333333");
						$(".navitem span").eq(5).hide(500);
					}
					if($(this).parent().index() == 5){
						$(".navitem a").eq(0).css("color","#333333");
						$(".navitem span").eq(0).hide(500);
						$(".navitem a").eq(1).css("color","#333333");
						$(".navitem span").eq(1).hide(500);
						$(".navitem a").eq(2).css("color","#333333");
						$(".navitem span").eq(2).hide(500);
						$(".navitem a").eq(3).css("color","#333333");
						$(".navitem span").eq(3).hide(500);
						$(".navitem a").eq(4).css("color","#333333");
						$(".navitem span").eq(4).hide(500);
					}
				})
				$(".loginbtn a").on('click', function(){
					$(".navitem a").eq(0).css("color","#333333");
					$(".navitem span").eq(0).hide(500);
					$(".navitem a").eq(1).css("color","#333333");
					$(".navitem span").eq(1).hide(500);
					$(".navitem a").eq(2).css("color","#333333");
					$(".navitem span").eq(2).hide(500);
					$(".navitem a").eq(3).css("color","#333333");
					$(".navitem span").eq(3).hide(500);
					$(".navitem a").eq(4).css("color","#333333");
					$(".navitem span").eq(4).hide(500);
					$(".navitem a").eq(5).css("color","#333333");
					$(".navitem span").eq(5).hide(500);
				})
			})
        },
        methods: {
        	checkPath(){
        		if(this.$route.path == '/index'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(0).addClass('navactive');
			    }
			    if(this.$route.path == '/product'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(1).addClass('navactive');
			    }
			    if(this.$route.path == '/solvecase'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(2).addClass('navactive');
			    }
			    if(this.$route.path == '/law'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(3).addClass('navactive');
			    }
			    if(this.$route.path == '/aboutus'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(4).addClass('navactive');
			    }
        		if(this.$route.path == '/verify'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(5).addClass('navactive');
			    }
			    if(this.$route.path == '/login'){
			    	$(".navitem").siblings().removeClass('navactive');
			    }
        	},
        	checkUrl(){
        		if (process.env.NODE_ENV === 'production') {

				    if (process.env.VUE_APP_FLAG === 'pro') {
				        //production 生产环境
				        this.baseUrl = 'https://www.notarytrace.com';
				        console.log('pro 生产环境:' + this.baseUrl)
				    } else {
				        //test 测试环境
				        this.baseUrl = 'http://dev.zmyou.com:8025';
				        console.log('test 测试环境:' + this.baseUrl)
				    }
				} else {
				    //dev 开发环境
				    this.baseUrl = 'https://www.notarytrace.com';
				    console.log('dev 开发环境:' + this.baseUrl)
				}
        	}
        }
	}
</script>
<style lang="less">
	
</style>