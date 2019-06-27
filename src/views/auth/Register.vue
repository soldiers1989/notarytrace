<template>
	<div class="redisterarea" :style="{ height: screenHeight + 'px' }">
		<div class="regiscon">
			<h2 class="authtit">注册</h2>
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
		        <FormItem prop="user">
		            <Input type="text" v-model="formInline.user" placeholder="请输入已注册手机/邮箱">
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem prop="validation_code">
		            <Input class="codeinput" type="text" v-model="formInline.validation_code" placeholder="请输入手机验证码">
		            	<Icon type="ios-text-outline" slot="prepend"/>
		            </Input>
		            <Button class="codebtn" type="success" :disabled="disabled" @click="sendCode()" small>{{time}}</Button>
		        </FormItem>
		        <FormItem prop="password">
		            <Input type="password" v-model="formInline.password" placeholder="请输入密码">
		                <Icon type="ios-lock-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem style="margin-bottom: 0;">
		            <Button type="primary" long @click="handleSubmit('formInline')">注册</Button>
		        </FormItem>
		    </Form>
		    <div class="regitips">
				<div class="forgettxt">
					<Checkbox label="Eat" v-model="single"></Checkbox>
					<h2>接受用户协议</h2>
				</div>
				<div class="registertxt"><router-link tag="a" :to="{path:'/'}">马上登录</router-link></div>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';	
	var interval = null;
	export default {
		data() {
	 		return {
	 			formInline: {
                    user: '',
                    password: '',
                    validation_code: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写已注册手机/邮箱', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        // { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ],
                    validation_code: [
                        { required: true, message: '验证码不得为空', trigger: 'blur' }
                    ]
                },
                single: true,
                time: '发送验证码',
                disabled: false,
                currentTime: 59,
                screenHeight: 0
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
        	this.onResize();
        },
        methods: {
        	sendCode(){
            	// if(this.formInline.user == ''){
            	// 	this.$Message.error('请输入电话号码');
            	// }else {
            	// 	this.getCode();
	            // 	Account.sendCode(this.formInline.user).then((res) => {
	            //         if(res.data.status === 'failure'){
	            //         	this.$Modal.error({
	            //                 title: '错误提示',
	            //                 content: res.data.message
	            //             });
	            //         }else if(res.data.status === 'success'){
	            //         	// this.getCode();
	            //         }

	            //     }).catch(error => {})
            	// }
            	this.getCode();
            },
            getCode() {
            	this.disabled = true;
            	var that = this;
			    var currentTime = this.currentTime;
			    this.time = currentTime + '秒';
			    interval = setInterval(function () {
			      	currentTime--;
		        	that.time = currentTime + '秒';
			      	if (currentTime <= 0) {
				        clearInterval(interval)
		            	that.time = '重新发送';
		           		that.currentTime = 60;
		            	that.disabled = false;
			      	}
			    }, 1000)
			},
			onResize(){
	  			this.screenHeight = $(window).height()- 384;
		  		window.onresize = () => {
		            return (() => {
		  				this.screenHeight = $(window).height() - 384;
		            })()
		        }
	  		}
        },
	}
</script>