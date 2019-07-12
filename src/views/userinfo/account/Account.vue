<template>
	<div class="account">
		<div class="actab">
			<div class="actabcon">
				<Menu mode="horizontal" :active-name="activeName">
					<Menu-item name="1">
						<router-link tag="a" :to="{path:'/account'}"></router-link>
						设置
			        </Menu-item>
			        <Menu-item name="2">
			        	<router-link tag="a" :to="{path:'/account/mycombo'}"></router-link>
			        	我的套餐
			        </Menu-item>
			        <Menu-item name="3">
			        	<router-link tag="a" :to="{path:'/account/mysignature'}"></router-link>
			        	我的签章
			        </Menu-item>
			        <Menu-item name="4">
			        	<router-link tag="a" :to="{path:'/account/contact'}"></router-link>
			        	法人授权
			        </Menu-item>
			        <!-- <Menu-item name="5">
			        	<router-link tag="a" :to="{path:'/account/feedback'}"></router-link>
			        	问题反馈
			        </Menu-item> -->
				</Menu>
			</div>
		</div>
		<router-view/>
	</div>	
</template>
<script>
	import $ from 'jquery';
	export default {
		data() {
	 		return {
	 			activeName: '1',
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
        	this.checkRouter();
        },
        methods: {
        	checkRouter(){
            	if(this.$route.path == '/account'){
			    	this.activeName = '1'
			    }
			    if(this.$route.path == '/account/mycombo'){
			    	this.activeName = '2'
			    }
			    if(this.$route.path == '/account/mysignature'){
			    	this.activeName = '3'
			    }
			    if(this.$route.path == '/account/contact'){
			    	this.activeName = '4'
			    }
			    if(this.$route.path == '/account/feedback'){
			    	this.activeName = '5'
			    }
            },
        }
	}
</script>
<style>
	
</style>