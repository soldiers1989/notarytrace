<template>
	<div class="mainhead">
		<div class="szl_header">
			<div class="szl_headcon">
				<div class="logocon">
					<a href="">
						<img src="../assets/img/headlogo.png" alt="">
					</a>
				</div>
				<div class="navcon">
					<div class="navitem">
						<router-link tag="a" :to="{path:'/personal'}">
							<Icon type="ios-home-outline" size="22" />
							个人中心
						</router-link>
						<span></span>
					</div>
					<div class="navitem">
						<router-link tag="a" :to="{path:'/document'}">
							<Icon type="ios-document-outline" size="22" />
							文件管理
						</router-link>
						<span></span>
					</div>
					<div class="navitem">
						<router-link tag="a" :to="{path:'/model'}">
							<Icon type="ios-card-outline" size="24" style='margin-bottom: 2px;'/>
							模板管理
						</router-link>
						<span></span>
					</div>
					<div class="navitem">
						<router-link tag="a" :to="{path:'/evidence'}">
							<Icon type="ios-albums-outline" size="24" style='margin-bottom: 3px;'/>
							证据保全
						</router-link>
						<span></span>
					</div>
					<div class="navitem" v-if="isadmin">
						<router-link tag="a" :to="{path:'/company'}">
							<Icon type="ios-people-outline" size="24" style='margin-bottom: 2px;' />
							企业管理
						</router-link>
						<span></span>
					</div>
					<div class="navitem">
						<router-link tag="a" :to="{path:'/account'}">
							<Icon type="ios-person-outline" size="24" style='margin-bottom: 2px;' />
							账号管理
						</router-link>
						<span></span>
					</div>
				</div>
				<div class="navright">
					<!-- <div class="navrightitem navrightitem1">
						<router-link tag="a" :to="{path:''}"></router-link>
					</div> -->
					<div class="navrightitem navrightitem2">
						<router-link tag="a" :to="{path:''}"></router-link>
					</div>
					<Dropdown @on-click="exitBtn">
						<div class="exitbtn"></div>
				        <DropdownMenu slot="list">
				            <DropdownItem name="exit">退出</DropdownItem>
				        </DropdownMenu>
					</Dropdown>
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
	 			isadmin: false,
	 		}
	 	},
	 	components:{
            
        },
        created(){
        	console.log(this.$cookieStore.getCookie( 'isadmin') == 'true')
        	if(this.$cookieStore.getCookie( 'isadmin') == 'true'){
        		this.isadmin = true;
        		console.log(1)
        	}else {
        		this.isadmin = false;
        		console.log(2)
        	}
        	console.log(this.isadmin)
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
					$(this).parent().addClass('navactive')
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
			})
        },
        methods: {
        	checkPath(){
        		var str = this.$route.path;
        		if(this.$route.path == '/personal'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(0).addClass('navactive');
			    }
			    if(this.$route.path == '/document'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(1).addClass('navactive');
			    }
			    if(str.substr(0, 6) == '/model'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(2).addClass('navactive');
			    }
			    if(this.$route.path == '/evidence'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(3).addClass('navactive');
			    }
			    if(str.substr(0, 8) == '/company'){
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(4).addClass('navactive');
			    }
			    if(str.substr(0, 8) == '/account') {
			    	$(".navitem").siblings().removeClass('navactive');
			    	$(".navitem").eq(5).addClass('navactive');
			    }
        	},
        	exitBtn(name){
        		if(name == 'exit') {
        			this.$cookieStore.delCookie('accesstoken');
        			this.$cookieStore.delCookie('token');
			    	this.$store.dispatch('changeLoginState', false);
			    	this.$router.push({
	                	path: '/login'
			        })
        		}
        	}
        }
	}
</script>
<style>
	
</style>