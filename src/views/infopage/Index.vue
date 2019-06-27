<template>
	<div class="pageindex">
		<div class="szl_banner">
		    <template>
			    <swiper :options="swiperOption">
				    <swiper-slide 
				    v-for="(slide, index) in swiperSlides" 
				    :key="index"
				    :style="{background: 'url(' + slide.image + ') center center'}" >
				    	<a :href="slide.url" target="_blank"></a>
				    </swiper-slide>
				    <div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</template>
		</div>
		<div class="szl_part">
			<div class="szl_content">
				<div class="szl_pictitle">
					<img src="../../assets/img/notatit1.png" alt="">
				</div>
				<div class="whytxt">
					<p class="szl_esay">
						电子数据公证保全从可靠身份、可溯来源、可信传输、安全存储四大方面落实研发  
						保证电子数据生成全链条真实性、完整性和可溯源性
					</p>
				</div>
				<div class="szl_piccon1"></div>
			</div>
		</div>
		<div class="bluearea">
			<div class="bluecon">
				<div class="blueitem">
					<img src="../../assets/img/notaicon1.png" alt="">
					<span>多终端即时公证</span>
				</div>
				<div class="blueitem">
					<img src="../../assets/img/notaicon2.png" alt="">
					<span>可溯源证据链条</span>
				</div>
				<div class="blueitem">
					<img src="../../assets/img/notaicon3.png" alt="">
					<span>多云端加密存储</span>
				</div>
				<div class="blueitem">
					<img src="../../assets/img/notaicon4.png" alt="">
					<span>全公证技术服务</span>
				</div>
			</div>
		</div>
		<div class="szl_part">
			<div class="szl_content">
				<div class="szl_piccon2"></div>
			</div>
		</div>
		<div class="szl_part_dark">
			<div class="szl_content">
				<div class="blue_title">
					携手公证处、CA机构联合共筑电子数据公证保全服务新体系
				</div>
				<div class="szl_piccon3"></div>
				<div class="tipstxt">
					<div class="txtgroup">
						<span>数据标准</span>
						<span>身份校对</span>
						<span>法律归属</span>
						<span>公证监督</span>
					</div>
					<div class="txtgroup">
						<span>在线仲裁</span>
						<span>在线庭审</span>
						<span>在线判决</span>
					</div>
				</div>
			</div>
		</div>
		<div class="szl_bigpic">
			<div class="szl_content">
				<div class="szl_title szl_title_white">
					<h2>针对性行业解决方案</h2>
				</div>
				<div class="solvecon">
					<div class="solveitem">
						<div class="solvetop">
							<em class="solveicon solveicon1"></em>
							<span>——</span>
						</div>
						<div class="solvetit">旅游行业</div>
					</div>
					<div class="solveitem">
						<div class="solvetop">
							<em class="solveicon solveicon2"></em>
							<span>——</span>
						</div>
						<div class="solvetit">医疗行业</div>
					</div>
					<div class="solveitem">
						<div class="solvetop">
							<em class="solveicon solveicon3"></em>
							<span>——</span>
						</div>
						<div class="solvetit">租赁担保</div>
					</div>
					<div class="solveitem">
						<div class="solvetop">
							<em class="solveicon solveicon4"></em>
							<span>——</span>
						</div>
						<div class="solvetit">通信行业</div> 
					</div>
					<div class="solveitem">
						<div class="solvetop">
							<em class="solveicon solveicon5"></em>
							<span>——</span>
						</div>
						<div class="solvetit">金融保险</div>
					</div>
					<div class="solveitem">
						<div class="solvetop">
							<em class="solveicon solveicon6"></em>
							<span>——</span>
						</div>
						<div class="solvetit">更多解决方案...</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>
<script>
	import $ from 'jquery';
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data() {
	 		return {
	 			swiperOption: {
	 				autoplay: true,
      				speed: 1000,
			        initialSlide: 0,
			        loop: true,
		         	pagination: {
				        el: '.swiper-pagination',
				        clickable: true,
				    }
		        },
		        swiperSlides: [
		        	{
		        		image: 'http://filecdn.notarytrace.com/vue/img/banner1.png'
		        	},
		        	{
		        		image: 'http://filecdn.notarytrace.com/vue/img/banner2.png'
		        	},
		        	{
		        		image: 'http://filecdn.notarytrace.com/vue/img/banner3.png'
		        	},
		        ]
	 		}
	 	},
	 	components:{
            swiper,
    		swiperSlide
        },
        created(){

        },
        mounted() {
        	
        },
        methods: {
        }
	}
</script>
<style lang="less">
</style>