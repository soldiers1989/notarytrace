<template>
	<div class="aboutus">
		<div class="bigpic">
			<div class="bigpictxt"></div>
		</div>
		<div class="szl_part_dark">
			<div class="szl_content">
				<div class="aboutcon">
					<div class="aboutlogo"></div>
					<div class="abouttxt">
						<p><span>溯证链（厦门）公证技术服务有限公司</span>（以下称”溯证链”），是任我游（厦门）发展科技有限公司旗下控股子公司。公司秉承法律的单一性与可追溯性，以互联网技术助推公证服务升级，充分发挥证明机构的职能作用和中立地位优势，完善社会生产与生活中的法律与司法服务闭环。</p>
						<p>溯证链以构建法治与和谐社会为宗旨，将“即时公证”和“存证公证”定为两大发展方向，借助前沿的智能公证服务器与智能终端公证设备，为企业与民众提供一站式信息化公证解决方案、便捷化行政审批解决方案及企业与个人法定证明授权解决方案。</p>
						<p>溯证链携手厦门市公证处“电子数据公证中心”（简称ENC） CA机构、互联网法院，推出“溯证签”平台，提供电子签约，电子文件存证、电子数据指纹存证等基础能力，并针对各行业痛点和需求，推出“医疗信息公证平台”、“商事主体电子化行政审批公证平台”及“人际关系/授权公证平台”、“法人代表/授权公证系统”等在线公证平台服务，为企业与社会民生提供严谨、高效、便捷、具有公信力的一站式法律闭环服务。</p>
					</div>
				</div>
			</div>
		</div>
		<div class="szl_part">
			<div class="szl_content">
				<div class="szl_title">
					<h2>溯证链（厦门）公证技术服务有限公司</h2>
					<span style="right: 100px;"></span>
				</div>
				<div class="aboutcon">
					<div class="map" id="dituContent">
						<baidu-map class="bm-view" :center="center" @ready="handler"></baidu-map>
					</div>
					<div class="addressinfo">
						<div class="additem">
							<div class="addtit"><span>地址</span></div>
							<p>福建省厦门市湖里区</p>
							<p>岐山北路223号中恒基大厦</p>
						</div>
						<div class="additem">
							<div class="addtit"><span>客服热线</span></div>
							<p>400-400-400</p>
						</div>
						<div class="additem">
							<div class="addtit"><span>商务合作</span></div>
							<p>187 5927 3892</p>
						</div>
						<div class="additem">
							<div class="addtit"><span>联系邮箱</span></div>
							<p>zhangjl@zmyou.com</p>
						</div>
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
	 			center: {lng: 0, lat: 0}
	 		}
	 	},
	 	components:{
        },
        created(){

        },
        mounted() {
        	
        },
        methods: {
        	handler ({BMap, map}) {
		      map.centerAndZoom(new BMap.Point(118.1574467750,24.5387835629), 15);// 初始化地图,设置中心点坐标和地图级别
		      	map.addControl(new BMap.MapTypeControl({//添加地图类型控件
		        mapTypes:[
		          BMAP_NORMAL_MAP,
		          BMAP_HYBRID_MAP
		        ]}));
			    map.setCurrentCity("厦门");// 设置地图显示的城市 此项是必须设置的
			    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    			var marker = new BMap.Marker(new BMap.Point(118.1574467750,24.5387835629));
				map.addOverlay(marker);
		    }
        }
	}
</script>
<style lang="less">
	.bm-view {
	  width: 100%;
	  height: 100%;
	}
</style>