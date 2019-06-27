<template>
	<div class="setting">
		<div class="setcon">
			<div class="setitem">
				<h2 class="itemtit">基本信息</h2>
				<ul class="baseinfo">
					<li>
						<span class="infoname" style="line-height: 50px;">账户头像</span>
						<div class="avatar">
							<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
						</div>
					</li>
					<li>
						<span class="infoname">个人账号</span>
						<span class="infotxt">1835788340@qq.com</span>
					</li>
					<li>
						<span class="infoname">登录密码</span>
						<span class="infotxt">********</span>
						<span class="infoicon"></span>
					</li>
					<li>
						<span class="infoname">真实姓名</span>
						<span class="infotxt bluecolor">立即认证</span>
					</li>
					<li>
						<span class="infoname">身份证号</span>
						<span class="infotxt">350428196505208914</span>
					</li>
					<li>
						<span class="infoname">手机号码</span>
						<span class="infotxt">15465487455</span>
						<span class="infoicon"></span>
					</li>
				</ul>
			</div>
			<!-- <div class="setitem">
				<h2 class="itemtit">提醒设置</h2>
				<div class="alertset">
					<h2>提前</h2>
					<div class="alertday">
						<span class="minusbtn" @click="Minus">-</span>
						<span class="daytxt">{{day}}天</span>
						<span class="addbtn" @click="Add">+</span>
					</div>
					<h2>提醒接收方处理快到期文件</h2>
				</div>
			</div>
			<div class="setitem">
				<h2 class="itemtit">通知设置<em></em></h2>
				<ul class="informset">
					<li>
						<span class="infoname">站内信</span>
						<div class="switchbtn">
							<template>
							    <i-Switch v-model="switch1" @on-change="change1" size="large">
							    	<span slot="open">开</span>
        							<span slot="close">关</span>
							    </i-Switch>
							</template>
						</div>
					</li>
					<li>
						<span class="infoname">短信</span>
						<div class="switchbtn">
							<template>
							    <i-Switch v-model="switch2" @on-change="change2" size="large">
							    	<span slot="open">开</span>
        							<span slot="close">关</span>
							    </i-Switch>
							</template>
						</div>
					</li>
					<li>
						<span class="infoname">邮件</span>
						<div class="switchbtn">
							<template>
							    <i-Switch v-model="switch3" @on-change="change3" size="large">
							    	<span slot="open">开</span>
        							<span slot="close">关</span>
							    </i-Switch>
							</template>
						</div>
					</li>
				</ul>
			</div> -->
		</div>
	</div>	
</template>
<script>
	import $ from 'jquery';
	export default {
		data() {
	 		return {
	 			day: 1,
	 			switch1: false,
	 			switch2: false,
	 			switch3: false,
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
        	
        },
        methods: {
        	Minus(){
        		if(this.day > 1) {
					this.day -= 1;
				}
        	},
        	Add(){
        		this.day += 1;
        	},
        	change1(){

        	},
        	change2(){

        	},
        	change3(){

        	}
        }
	}
</script>
<style>
	
</style>