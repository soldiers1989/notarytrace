<template>
	<div class="mainfooter">
		<div class="szl_footer">
			<div class="szl_content">
				<div class="footercon">
					<div class="footeritem">
						<div class="footerlogo"></div>
					</div>
					<div class="footeritem">
						<div class="footernav">
							<p>
								<a :href="baseUrl">首页</a>
							</p>
							<p>
								<a :href="baseUrl + '/services'">产品服务</a>
							</p>
							<p>
								<a :href="baseUrl + '/solution'">解决方案</a>
							</p>
							<p>
								<a :href="baseUrl + '/protectin'">法律保障</a>
							</p>
							<p>
								<a :href="baseUrl + '/aboutnts'">关于我们</a>
							</p>
						</div>
					</div>
					<div class="footeritem">
						<div class="footertxt">
							<p>办公地址：福建省厦门市湖里区岐山北路</p>
							<p>客服热线：0592-2262203</p>
							<p>咨询电话：0592-2262203</p>
						</div>
					</div>
					<div class="footeritem" style="border-right:none;">
						<div class="codepic">
							<img src="../assets/img/codepic1.jpg" alt="">
							<h2>关注我们</h2>
						</div>
					</div>
				</div>
				<div class="otherlink">
					<div class="links">
						<span>快速通道：</span>
						<a href="https://enc.xmgzc.com/" target="_blank">厦门市公证处电子数据公证中心</a>
					</div>
				</div>
				<div class="footerbot">
					<div class="prenum">
						<p style="margin-right:100px;">版权所有©2018</p>
						<em></em>
						<span> 闽ICP备11001367号-9 </span>
					</div>
				</div>
			</div>
		</div> 
	</div>
</template>
<script>
	export default {
	    data() {
	 		return {
	 			baseUrl:'',
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
        	this.checkUrl();
        },
        methods: {
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