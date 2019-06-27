<template>
	<div class="loginarea">
		<div class="logincon">
			<h2 class="authtit">溯证链登录</h2>
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
		        <FormItem prop="user">
		            <Input type="text" v-model="formInline.user" placeholder="请输入已注册手机/邮箱">
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem prop="password">
		            <Input type="password" v-model="formInline.password" @keyup.enter.native="handleSubmit(formInline)" placeholder="请输入密码">
		                <Icon type="ios-lock-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem style="margin-bottom: 0;">
		            <Button type="primary" :loading="loading" long @click="handleSubmit(formInline)">登录</Button>
		        </FormItem>
		    </Form>
		    <div class="logtips">
				<!-- <div class="forgettxt"><router-link tag="a" :to="{path:'/reset'}">忘记密码</router-link></div>
				<div class="registertxt">还没有账号?<router-link tag="a" :to="{path:'/register'}">马上注册</router-link></div> -->
			</div>
		</div>
		<div class="ukeymengban" v-if="ukeyshow">
			<div class="ukeycon">
				<div class="ukeytit">
					<span></span>
					<p>请插入溯证签安全盾</p>
				</div>
				<Form ref="ukeypin" :model="ukeypin" @submit.native.prevent>
			        <FormItem>
			            <Input type="password" v-model="ukeypin.pin" @keyup.enter.native="ukeySubmit(ukeypin)" placeholder="请输入U盾Pin码">
			                <Icon type="ios-lock-outline" slot="prepend"></Icon>
			            </Input>
			        </FormItem>
			        <FormItem style="margin-top: 50px;">
			            <Button type="primary" :loading="ukeyloading" long @click="ukeySubmit(ukeypin)">{{ukeytxt}}</Button>
			        </FormItem>
			    </Form>
			</div>
		</div>
	</div>
</template>
<script>
	import Account from '@/api/account';
	import Ukey from '@/api/ukey';
	import {mapGetters, mapState,mapActions} from 'vuex';
	import $ from 'jquery';	
	export default {
		data() {
	 		return {
	 			loading: false,
	 			ukeyloading: false,
	 			ukeyshow: false,
	 			ukeytxt: '',
	 			formInline: {
                    user: '',
                    password: ''
                },
                ukeypin: {
                	pin: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写已注册手机/邮箱', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        // { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ],
                    ukeypin: [
                        { required: true, message: '请填写Pin码', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'Pin码最少六位', trigger: 'blur' }
                    ],
                },
				screenHeight: 0,
				loginData: {}
	 		}
	 	},
	 	components:{
            
        },
        computed: {
 			...mapGetters([
                'validate'
            ]),
        },
        mounted() {

        },
        methods: {
        	handleSubmit(name) {     
        		this.loading = true;          
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                    	Account.login(name.user,name.password).then((res) => {
                    		console.log(res)
                    		this.loginData = JSON.parse(res);
                        	this.loading = false;
	                        if(this.loginData.code == 0){
	                        	this.checkUkey(this.loginData);
	                        }else {
	                        	this.$Message.error(this.loginData.message);
	                        }
		                }).catch(error => {})
                    } else {
                    	this.loading = false;
                        this.$Message.error('登入失败！');
                    }
                })
            },
            ukeySubmit(name){
            	console.log(name)
            	this.ukeyloading = true;
            	if(this.ukeypin.pin != ''){
            		if(this.loginData.ukKeyNeed == 1){
            			this.GetCertBaseInfo();
            		}else if(this.loginData.ukKeyNeed == 2) {
            			var tempStr = this.loginData.token + this.loginData.caRanDom;
            			this.GetCryptSignHashString(tempStr, this.ukeypin.pin)
            		}
            	}else {
            		this.ukeyloading = false;
            		this.$Message.error('Pin码不得为空！');
            	}    
           		
            },
            checkUkey(obj){
            	if(obj.ukKeyNeed == 0){
            		var token = obj.token,
            		access_token = obj.access_token,
            		isadmin = obj.isAdmin,
            		userid = obj.userid;
            		console.log(token,access_token)
                	this.$cookieStore.addCookie( 'token' , token);
                    this.$cookieStore.addCookie( 'accesstoken' , access_token);
					this.$cookieStore.addCookie( 'isadmin' , isadmin);
                    this.$cookieStore.addCookie( 'userid' , userid);
                    this.$store.dispatch('changeLoginState', true);
                    this.$Message.success('登入成功!');
                    this.$router.push({
		                path: '/personal'
				    })
            	}else if(obj.ukKeyNeed == 1) {
            		this.ukeytxt = '激活';
            		this.ukeyshow = true;
            	}else if(obj.ukKeyNeed == 2) {
            		this.ukeytxt = '登录';
            		this.ukeyshow = true;
            	}

            },
            GetCertBaseInfo() {
            	var _this = this;
	            $.ajax({
	                url: "http://localhost:9188/ETAuto199Service/GetCertBaseInfo?jsoncallback=?",
	                type: "get",
	                data:null,
	                dataType: "jsonp",
	                success: function (data) {
	                	console.log(data)
	                	if(data.code == 0){
	                		_this.GetCryptSignHashString(data.rlt_data, _this.ukeypin.pin)
	                	}else {
	                		_this.ukeyloading = false;
	                		_this.$Message.error(data.msg);
	                	}
	                    // alert(data.code+"/"+data.msg+"/"+data.rlt_data);
	                },
	                complete: function (XMLHttpRequest, textStatus) {
	                 var returnText = XMLHttpRequest.responseText;                    
	                },
	                error: function (err) {
	                   alert("溯证签安全盾服务访问失败！请联系管理人员！");
	                } 
	            });
            },
            GetCryptSignHashString(txt, pin){
            	let _this = this;
		        $.ajax({
	                url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
	                type: "get",
	                data:{'besigntxt':txt,'keypin':pin},
	                dataType: "jsonp",
	                success: function (data) {
	                	console.log(data)
	                    if(data.code == 0){
	                		_this.UpdateCaMessage(_this.loginData.token,txt,data.rlt_data)
	                	}else {
	                		_this.ukeyloading = false;
	                		_this.$Message.error(data.msg);
	                	}
	                },
	                complete: function (XMLHttpRequest, textStatus) {
	                 var returnText = XMLHttpRequest.responseText;                    
	                },
	                error: function (err) {
	                   alert("溯证签安全盾服务访问失败！请联系管理人员！");
	                } 
	            });
        	},
        	UpdateCaMessage(toKen, txt, signal){
        		if(this.loginData.ukKeyNeed == 2) {
        			txt = '';
        		}
        		Ukey.UpdateCaMessage(toKen, txt, signal).then((res) => {
		            console.log(res);
		            if(res.statusCode == 0){
                		this.$Message.success('登录成功!');
                		var token = this.loginData.token,
	            		access_token = this.loginData.access_token,
	            		isadmin = this.loginData.isAdmin,
	            		userid = this.loginData.userid;
	            		console.log(token,access_token)
	                	this.$cookieStore.addCookie( 'token' , token);
	                    this.$cookieStore.addCookie( 'accesstoken' , access_token);
	                    console.log(this.loginData.isAdmin);
	                    console.log(isadmin);
	                    this.$cookieStore.addCookie( 'isadmin' , isadmin);
	                    this.$cookieStore.addCookie( 'userid' , userid);
	                    this.$store.dispatch('changeLoginState', true);
	                    this.$router.push({
			                path: '/personal'
					    })

                	}else {
                		this.ukeyloading = false;
                		this.$Message.error(res.message);
                	}
		        })
        	}
        },
	}
</script>