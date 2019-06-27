<template>
	<div class="mycombo">
		<div class="combocon">
			<h2 class="combotit">套餐列表</h2>
			<div class="combowrap">
				<div class="comboitem" v-for="item in packageList">
					<h2 class="toptit">{{item.packageName}}</h2>
					<div class="combot">
						<div class="pricecon">
							<div class="nowprice">
								<span>￥</span>
								{{item.packageOfferPrice}}
							</div>
							<div class="lastprice">￥{{item.packagePrice}}</div>
						</div>
						<div class="comnum">
							<div class="comnumtxt">
								份数：{{item.packageNum}}份
							</div>
							<div class="comnumtxt">
								有效期：{{item.packageValidity}}个月
							</div>
						</div>
						<div class="buybtn" @click="buyBtn(item.packageID)">立即购买</div>
					</div>
				</div>
			</div>
		</div>
		<Modal 
		v-model="modal"
		title="微信扫码付款" 
		class-name="vertical-center-modal"
		@on-visible-change="onChenge">
			<div class="editarea">
				<Spin size="large" fix v-if="spinShow"></Spin>
				<img v-if="paystate" src="../../../../assets/img/paysuccess.png" alt="">
		        <img v-else :src="qrimg" alt="">
		        <p>{{paytxt}}</p>
			</div>
	    </Modal>
	</div>	
</template>
<script>
	import $ from 'jquery';
	import Account from '@/api/account/account';
	let Base64 = require('js-base64').Base64;
	var interval = null;
	export default {
		data() {
	 		return {
	 			packageList:[],
	 			userid: '',
	 			modal: false,
	 			qrimg:'',
	 			paytxt: '支付中...',
	 			paystate: false,
	 			spinShow: false
	 		}
	 	},
	 	components:{
            
        },
        created(){
        	this.userid = this.$cookieStore.getCookie( 'userid');
        },
        mounted() {
        	this.getPackageList();
        },
        methods: {
        	getPackageList(){
        		Account.getPackageList().then((res) => {
		            console.log(res);
		            if(res.statusCode == 0){
		            	this.packageList = res.list;
		            }
		        })
        	},
        	buyBtn(packageid){
        		console.log(packageid)
        		this.paystate = false;
        		this.paytxt = '支付中...';
        		this.modal = true;
        		this.spinShow = true;
        		Account.pay(this.userid,packageid).then((res) => {
		            console.log(res);
		            if(res.statusCode == 0){
		            	this.spinShow = false;
		            	this.qrimg = res.qrCode;
		            	this.checkPayResult(res.payID);
		            }
		        })
        	},
        	checkPayResult(payid){
        		var _this = this;
        		interval = setInterval(function () {
			      	Account.checkPayResult(payid).then((res) => {
			            console.log(res);
			            if(res.statusCode == 0){
			            	_this.paystate = true;
			            	_this.paytxt = '支付成功！';
			            	_this.$Message.success('支付成功！');
			            	clearInterval(interval)
			            }
			        })
			    }, 2000)
        	},
        	onChenge(state){
        		if(!state) {
        			clearInterval(interval)
        		}
        	}
        }
	}
</script>
<style>
	
</style>