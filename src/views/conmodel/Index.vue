<template>
	<div class="contractmodel">
		<Header></Header>
		<div class="modelcon">
			<template>
			    <Breadcrumb>
			        <BreadcrumbItem to="/model">模板管理</BreadcrumbItem>
			        <BreadcrumbItem to="/model/contractmodel">合同模板</BreadcrumbItem>
			        <BreadcrumbItem>公司备案申请</BreadcrumbItem>
			    </Breadcrumb>
			</template>
			<div class="modelarea">
				<Companyrecord v-if="modelName == 'VUE_L_CompanyForTheRecord'"></Companyrecord>
			</div>
		</div>
	</div>	
</template>
<script>
	import $ from 'jquery';
	import Header from '@/components/minHeader.vue'
	import Companyrecord from './companychange/Companyrecord.vue'
	export default {
		data() {
	 		return {
	 			modelName: ''
	 		}
	 	},
	 	components:{
            Header,Companyrecord
        },
        created(){
        	this.getParams();
        },
        mounted() {
        	
        },
        methods: {
        	getParams () {
		        // this.id = this.$route.query.house_id;
		        console.log(this.$route.query.modelName);
		        this.modelName = this.$route.query.modelName;
		    },
        }
	}
</script>
<style>
	
</style>