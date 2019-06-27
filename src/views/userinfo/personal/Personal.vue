<template>
	<div class="personal">
		<div class="perpart1">
			<div class="part1con">
				<div class="useravatar">
					<div class="avatar">
						<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
					</div>
					<div class="avatartxt">
						<p>44515151@qq.com</p>
						<p><span>账号:</span>455156</p>
					</div>
				</div>
				<!-- <div class="userinfo">
					<div class="infoitem hasborder">
						<h2>剩余文件份数</h2>
						<h3>3</h3>
					</div>
					<div class="infoitem">
						<h2>还可以下载模板数</h2>
						<h3>限时免费</h3>
					</div>
				</div> -->
			</div>
		</div>
		<div class="perpart2">
			<div class="part2con">
				<div class="part2icon"></div>
				<div class="part2txt">
					<p>您的账号还未进行实名认证，认证过后将获得以下溯证链专业电子合同服务: </p>
					<p>·专属CA证书   ·签发电子合同资格   ·电子合同法律有效险   ·司法鉴定报告</p>
				</div>
				<div class="part2btn" @click="authqrcode">
					<p>去认证<span>》</span></p>
				</div>
			</div>
		</div>
		<div class="perpart3">
			<div class="peroption">
				<div class="pericon">
					<router-link tag="a" :to="{path:''}">
						<img src="../../../assets/img/pericon1.png" alt="">
					</router-link>
				</div>
				<h2 class="pericontxt">发起签约</h2>
			</div>
			<!-- <div class="peroption">
				<div class="pericon">
					<Badge :count="1"></Badge>
					<router-link tag="a" :to="{path:''}">
						<img src="../../../assets/img/pericon2.png" alt="">
					</router-link>
				</div>
				<h2 class="pericontxt">待我签</h2>
			</div>
			<div class="peroption">
				<div class="pericon">
					<router-link tag="a" :to="{path:''}">
						<img src="../../../assets/img/pericon3.png" alt="">
					</router-link>
				</div>
				<h2 class="pericontxt">待他人签</h2>
			</div>
			<div class="peroption">
				<div class="pericon">
					<router-link tag="a" :to="{path:''}">
						<img src="../../../assets/img/pericon4.png" alt="">
					</router-link>
				</div>
				<h2 class="pericontxt">草稿箱</h2>
			</div>
			<div class="peroption">
				<div class="pericon">
					<router-link tag="a" :to="{path:''}">
						<img src="../../../assets/img/pericon5.png" alt="">
					</router-link>
				</div>
				<h2 class="pericontxt">签约完成</h2>
			</div> -->
		</div>
		<Modal 
		v-model="modal" 
		class-name="vertical-center-modal">
	        <img src="../../../assets/img/codepic1.jpg" alt="">
	    </Modal>
	</div>	
</template>
<script>
	import $ from 'jquery';
	export default {
		data() {
	 		return {
	 			modal: false
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
        	
        },
        methods: {
        	authqrcode(){
        		this.modal = true;
        	}
        }
	}
</script>
<style>
	
</style>