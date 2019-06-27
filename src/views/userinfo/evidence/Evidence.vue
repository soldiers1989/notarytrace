<template>
	<div class="document">
		<div class="docucon clearfix">
			<div class="docleft">
				<div class="listgroup">
					<div class="listbtn">
						<span>证保类型</span>
						<em></em>
					</div>
					<ul class="listcon">
						<li class="listitem">
							<div class="listicon">
								<img src="../../../assets/img/docicon2.png" alt="">
							</div>
							<div class="listtxt">文档</div>
						</li>
						<li class="listitem">
							<div class="listicon">
								<img src="../../../assets/img/docicon5.png" alt="">
							</div>
							<div class="listtxt">图片</div>
						</li>
						<li class="listitem">
							<div class="listicon">
								<img src="../../../assets/img/docicon3.png" alt="">
							</div>
							<div class="listtxt">哈希值</div>
						</li>
						<li class="listitem">
							<div class="listicon">
								<img src="../../../assets/img/docicon4.png" alt="">
							</div>
							<div class="listtxt">视频</div>
						</li>
						<li class="listitem">
							<div class="listicon">
								<img src="../../../assets/img/docicon5.png" alt="">
							</div>
							<div class="listtxt">录音</div>
						</li>
						<li class="listitem listactive">
							<div class="listicon">
								<img src="../../../assets/img/docicon5.png" alt="">
							</div>
							<div class="listtxt">海康威视</div>
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
					<Table ref="selection" :columns="tableTit" :data="tableData"></Table>
				</div>
				<div class="page">
					<Page :total="pageinfo.total_page" prev-text="上一页" next-text="下一页" />
				</div>
			</div>
		</div>
	</div>	
</template>
<script>
	import Model from '@/api/model/model';
	export default {
		data() {
	 		return {
	 			formInline: {
                    contractname: '0',
                    password: ''
                },
                pageinfo: {
                    id: '',
                    total_page: 100,
                    pagesize: 10,
                    placeholder: '',
                    xmlMessage: 'L05vdGFyeUJyaWRnZS9ISUsvVF9ISUtOb3RhcnlEZXZpY2UueG1s',
                    token: ''
                },
                tableTit: [],
                tableData: [],
                opration: {
                    title: '操作',
                    key: 'action', 
                    width: 130,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            },
                        }, [
                            h('span', {
                                'class': {
                                    constate: true,
                                },
                                attrs:{
							        title:'签订状态',
							    },
                                style: {
                                    width: '16px',
                                    height: '16px',
                                    marginRight: '5px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                        this.signBtn(params.index)
                                    }
                                }
                            }),
                            h('span', {
                                'class': {
                                    preview: true,
                                },
                                attrs:{
							        title:'合同预览',
							    },
                                style: {
                                    width: '18px',
                                    height: '18px',
                                    marginRight: '5px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                        // this.conPriview(params.index)
                                    }
                                }
                            }),
                            h('span', {
                                'class': {
                                    checkicon: true,
                                },
                                attrs:{
							        title:'合同详情',
							    },
                                style: {
                                    width: '17px',
                                    height: '16px',
                                    marginRight: '5px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                        this.show(params.index)
                                    }
                                }
                            }),
                            h('span', {
                                'class': {
                                    removebtn: true,
                                },
                                attrs:{
							        title:'删除',
							    },
                                style: {
                                    width: '16px',
                                    height: '16px',
                                    marginRight: '5px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                        this.remove(params,params.index)
                                    }
                                }
                            })
                        ]);
                    }
                },
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
        	this.searchApi(this.pageinfo.xmlMessage,'','', 1, 10, {});
        },
        methods: {
        	//获取主表表格数据
            searchApi(xmlUrl, fkname, guid, pageIndex, pageSize, obj){
                Model.parentSearch(xmlUrl, fkname, guid, pageIndex, pageSize, obj).then((res) => {
                    console.log(res);
                    this.pageinfo.total_page = res.message.pageMessage.pageTotal * 10;
                    var tableMes = JSON.parse(res.message.tableMessage);
                    console.log(tableMes);
                    tableMes.tableHead.push(this.opration);
                    this.tableTit = tableMes.tableHead;
                    this.tableData = tableMes.tableBody;
                }).catch(error => {})
            },
            //
            show(index){
            	let routeUrl = this.$router.resolve({
                    path: "/model/modeldetail",
                    query:{
                        xml: this.pageinfo.xmlMessage,
                        guid: this.tableData[index].SYSID
                    }
                });
                window.open(routeUrl .href, '_blank');
            }
        }
	}
</script>
<style>
	
</style>