<template>
	<div class="document">
		<div class="docucon clearfix">
			<div class="docleft">
				<div class="listgroup">
					<div class="listbtn">
						<span>快速操作</span>
						<em></em>
					</div>
					<ul class="listcon">
						<li class="listitem listactive">
							<div class="listicon">
								<img src="../../../assets/img/docicon2.png" alt="">
							</div>
							<div class="listtxt">待我签</div>
							<em class="listnum">5</em>
						</li>
						<li class="listitem">
							<div class="listicon">
								<img src="../../../assets/img/docicon3.png" alt="">
							</div>
							<div class="listtxt">待他人签</div>
							<em class="listnum">0</em>
						</li>
						<li class="listitem">
							<div class="listicon">
								<img src="../../../assets/img/docicon4.png" alt="">
							</div>
							<div class="listtxt">将到期合同</div>
							<em class="listnum">0</em>
						</li>
						<li class="listitem">
							<div class="listicon">
								<img src="../../../assets/img/docicon5.png" alt="">
							</div>
							<div class="listtxt">签约完成</div>
							<em class="listnum">0</em>
						</li>
					</ul>
				</div>
			</div>
			<div class="docright">
				<div class="righttit">待我签</div>
				<div class="rightsearch">
					<div class="searcharea clearfix">
						<div class="search">
				        	<Input placeholder="合同名称/发送名称/发送企业名称"/>
				        	<div class="searchbtn">
				        		搜索<Icon type="ios-search" size="22" />
				        	</div>
						</div>
						<div class="importbtn">
							<span>导出</span>
							<em></em>
						</div>
						<div class="moresearchbtn">
							<span>更多搜索</span>
							<em></em>
						</div>
					</div>		
					<div class="picarea">
						<Form ref="formInline" :model="formInline">
							<FormItem label="合同名称：">
					            <Select v-model="formInline.contractname">
					                <Option value="0">全部</Option>
					                <Option value="1">厦金旅游合同</Option>
					                <Option value="2">房屋租凭合同</Option>
					            </Select>
					        </FormItem>
					        <FormItem label="签署人：">
					            <Select v-model="formInline.contractname">
					                <Option value="0">全部</Option>
					                <Option value="1">厦金旅游合同</Option>
					                <Option value="2">房屋租凭合同</Option>
					            </Select>
					        </FormItem>
					        <FormItem label="合同编号：">
					            <Select v-model="formInline.contractname">
					                <Option value="0">全部</Option>
					                <Option value="1">厦金旅游合同</Option>
					                <Option value="2">房屋租凭合同</Option>
					            </Select>
					        </FormItem>
					        <FormItem label="发送日期：">
					            <Select v-model="formInline.contractname">
					                <Option value="0">全部</Option>
					                <Option value="1">厦金旅游合同</Option>
					                <Option value="2">房屋租凭合同</Option>
					            </Select>
					        </FormItem>
					        <FormItem label="签约截止日期：">
					            <Select v-model="formInline.contractname">
					                <Option value="0">全部</Option>
					                <Option value="1">厦金旅游合同</Option>
					                <Option value="2">房屋租凭合同</Option>
					            </Select>
					        </FormItem>
					        <FormItem label="来源平台：">
					            <Select v-model="formInline.contractname">
					                <Option value="0">全部</Option>
					                <Option value="1">厦金旅游合同</Option>
					                <Option value="2">房屋租凭合同</Option>
					            </Select>
					        </FormItem>
						</Form>
					</div>
				</div>
				<div class="righttable">
					<Table ref="selection" :columns="columns4" :data="data1"></Table>
				</div>
				<div class="page">
					<Page :total="100" prev-text="上一页" next-text="下一页" />
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
	 			formInline: {
                    contractname: '0',
                    password: ''
                },
                columns4: [
                    {
                        type: 'selection',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '合同名称',
                        key: 'name',
                         width: 200,
                        align: 'center'
                    },
                    {
                        title: '签署人',
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '签约状态',
                        key: 'address',
                        align: 'center'
                    },
                    {
                        title: '合同编号',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '发送日期',
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '签约截止日期',
                        key: 'address',
                        width: 150,
                        align: 'center'
                    },
                    {
                        title: '来源平台',
                        key: 'address',
                        align: 'center'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                    	
                ]
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
        	
        },
        methods: {

        }
	}
</script>
<style>
	
</style>