<template>
	<div class="modelindex">
		<div class="righttit">
            <Breadcrumb>
                <BreadcrumbItem>模板管理</BreadcrumbItem>
                <BreadcrumbItem v-for="item in initData.titList">{{item}}</BreadcrumbItem>
                <BreadcrumbItem>{{initData.subtit}}</BreadcrumbItem>
            </Breadcrumb>
            <!-- <div class="addbtn" v-if="baseData"  tag="a" target="_blank" :to="{path:'/model/contractmodel',query:{Guid:baseData.companyGuid,conGuid:baseData.contractTypeConfigGuid}}">新增</div> -->
        </div>
        <div class="rightsearch">
            <div class="searcharea clearfix">
                <div class="search" v-if="baseData.keys_Search">
                    <Input v-model="searchData.keyword" :placeholder="pageinfo.placeholder"/>
                    <div class="searchbtn" @click="searchBtn">
                        搜索<Icon type="ios-search" size="22" />
                    </div>
                </div>
            </div>      
            <div class="picarea">
                <Form v-if="baseData">
                    <FormItem :label="item.showName" v-for="item in baseData.selects_Search">
                        <Select v-model="searchData[item.fieldName]" @on-change="onSelectChange">
                            <Option :value="subitem.key" v-for="subitem in item.dictionarys">{{subitem.value}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="item.showName" v-for="item in baseData.dates_Search" style="width: 350px">
                         <DatePicker v-model="searchData[item.fieldName]" type="datetimerange" placement="bottom-end" placeholder="Select date and time" style="width: 300px" @on-ok="onDateOk"></DatePicker>
                    </FormItem>
                </Form>
            </div>
        </div>
        <div class="righttable">
            <Table ref="currentRowTable" :columns="tableTit" :data="tableData"></Table>
            <div class="page">
                <div class="addbtn" v-if="baseData" @click="addContract">新增</div>
                <Page :total="pageinfo.total_page" @on-change="handleCurrentPage" prev-text="上一页" next-text="下一页" />
            </div>
        </div>
        <Modal
            v-model="addState"
            title="新增合同"
            width="1000"
            class-name="">
            <div class="addarea">
                <Form v-for="(item,index) in signData" ref="addFinaData.SignParts[index]" :model="addFinaData.SignParts[index]" :rules="signRuleValidate">
                    <h2 class="edittit">{{item.titleName}}</h2>
                    <template v-for="subitem in item.tests">
                        <FormItem :label="subitem.showName" v-if="subitem.type !== 99&&subitem.type !== 98" :label-width="100" :prop="subitem.fieldName">
                            <Input v-if="subitem.type == 1"  v-model="addFinaData.SignParts[index][subitem.fieldName]"/>
                            <Select v-if="subitem.type == 5" v-model="addFinaData.SignParts[index][subitem.fieldName]">
                                <Option :value="subchilditem.key" v-for="subchilditem in subitem.dictionarys">{{subchilditem.value}}</Option>
                            </Select>
                        </FormItem>
                        <div class="imgarea" v-if="subitem.type == 98">
                            <img class="comimg" :src="baseFyImg(subitem.text)" alt="">
                            <img class="signimg" :src="baseFyImg(subitem.signatureImg)" alt="">
                        </div>
                    </template>
                </Form>
            </div>
            <div class="addarea">
                <Form v-if="addData != null" ref="addPostData" :model="addPostData" :rules="addRuleValidate">
                    <h2 class="edittit">合同内容</h2>
                    <template v-for="item in addData">
                        <FormItem :label="item.showName" :label-width="100" :prop="item.fieldName" v-if="item.type !== 9">
                            <Input v-if="item.type == 1"  v-model="addPostData[item.fieldName]"/>
                            <Select v-if="item.type == 5" v-model="addPostData[item.fieldName]">
                                <Option :value="subitem.key" v-for="subitem in item.dictionarys">{{subitem.value}}</Option>
                            </Select>
                            <DatePicker v-if="item.type == 12" v-model="addPostData[item.fieldName]" type="datetime" placeholder="Select date and time"></DatePicker>
                        </FormItem>
                        <template v-if="item.type == 9">
                            <h2 class="edittit">附件</h2>
                            <Upload></Upload>
                        </template>
                    </template>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="loadingbtn" @click="addConfirm">确定</Button>
            </div>
        </Modal>
        <Modal
            v-model="signModal"
            title="签订状态"
            width="1000"
            class-name="vertical-center-modal">
            <div class="signModal">
                <Row style="background-color: #0058A6">
                    <Col span="3" class="szl-label">类别</Col>
                    <Col span="3" class="szl-label">姓名</Col>
                    <Col span="3" class="szl-label">联系方式</Col>
                    <Col span="5" class="szl-label">需签署附件</Col>
                    <Col span="4" class="szl-label">签名图片</Col>
                    <Col span="3" class="szl-label">签订状态</Col>
                    <Col span="3" class="szl-label">签约二维码</Col>
                </Row>
                <Row style="background-color: #f5f5f5">
                    <Col span="3" class="szl-sublabel">类别</Col>
                    <Col span="3" class="szl-sublabel">姓名</Col>
                    <Col span="3" class="szl-sublabel">联系方式</Col>
                    <Col span="5" class="szl-sublabel">需签署附件</Col>
                    <Col span="4" class="szl-sublabel">签名图片</Col>
                    <Col span="3" class="szl-sublabel">签订状态</Col>
                    <Col span="3" class="szl-sublabel">签约二维码</Col>
                </Row>
                <Row>
                    <Col span="3" class="szl-sublabel">类别</Col>
                    <Col span="3" class="szl-sublabel">姓名</Col>
                    <Col span="3" class="szl-sublabel">联系方式</Col>
                    <Col span="5" class="szl-sublabel">需签署附件</Col>
                    <Col span="4" class="szl-sublabel">签名图片</Col>
                    <Col span="3" class="szl-sublabel">签订状态</Col>
                    <Col span="3" class="szl-sublabel">签约二维码</Col>
                </Row>
                <Row style="background-color: #f5f5f5">
                    <Col span="3" class="szl-sublabel">类别</Col>
                    <Col span="3" class="szl-sublabel">姓名</Col>
                    <Col span="3" class="szl-sublabel">联系方式</Col>
                    <Col span="5" class="szl-sublabel">需签署附件</Col>
                    <Col span="4" class="szl-sublabel">签名图片</Col>
                    <Col span="3" class="szl-sublabel">签订状态</Col>
                    <Col span="3" class="szl-sublabel">签约二维码</Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="signModalBtn">确定</Button>
            </div>
        </Modal>
	</div>	
</template>
<script>
    import Model from '@/api/model/model';
    import Upload from '@/views/userinfo/model/Upload.vue'
    let Base64 = require('js-base64').Base64;
	export default {
        props: {
            initData: Object,
        },
		data() {
	 		return {
                pageinfo: {
                    id: '',
                    total_page: 100,
                    pagesize: 10,
                    placeholder: '',
                    xmlMessage: '',
                    token: ''
                },
	 			baseData:{
                    keys_Search: null
                },
                tableTit: [],
                tableData: [],
                leftMenuList:[],
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
                            },[h('em','签订状态')]),
                            h('span', {
                                'class': {
                                    preview: true,
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
                                        this.conPriview(params.index)
                                    }
                                }
                            },[h('em','合同预览')]),
                            h('span', {
                                'class': {
                                    checkicon: true,
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
                            },[h('em','合同详情')]),
                            h('span', {
                                'class': {
                                    removebtn: true,
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
                            },[h('em','删除')])
                        ]);
                    }
                },
                loadingbtn: false,
                searchData:{},
                addState: false,
                addData: null,
                addPostData: {},
                addRuleValidate: {},
                signData: null,
                signPostData: [],
                signRuleValidate: {
                    CNAME:[{required:true,message:"姓名不能为空",trigger:"blur",pattern:/.+/}],
                    CPHONE:[{required:true,message:"联系方式不能为空",trigger:"blur",pattern:/.+/}],
                    CCARDTYPE:[{required:true,message:"证件类型不能为空",trigger:"change",pattern:/.+/}],
                    CCARDNO:[{required:true,message:"证件号码不能为空",trigger:"blur",pattern:/.+/}]
                },
                addFinaData:{
                    EcDate: "",
                    SignParts: [], 
                    xmlUrl: "",
                    token: '',
                    contractTypeId:""
                },
                signModal: false
	 		}
	 	},
	 	components:{
            Upload
        },
        created(){
            this.pageinfo.token = this.$cookieStore.getCookie( 'token');
        },
        mounted() {
            console.log(this.initData)
            console.log(this.initData.menuname)
            if(this.initData.menuname != ''){
                this.getTableList(this.initData.menuname,1,10)
            }
        },
        methods: {
            //获取主表表格数据
            getTableList(id, pageindex, pagesize){
                Model.tableList(id, pageindex, pagesize).then((res) => {
                    console.log(res);
                    this.baseData = res.message;
                    this.innitSearchData(res.message);
                    this.pageinfo.total_page = res.message.pageMessage.pageTotal * 10;
                    var tableMes = JSON.parse(res.message.tableMessage);
                    console.log(tableMes);
                    tableMes.tableHead.push(this.opration);
                    this.tableTit = tableMes.tableHead;
                    this.tableData = tableMes.tableBody;
                }).catch(error => {})
            },
            //初始化post表单字段内容
            innitSearchData(obj){
                if(obj.selects_Search != null){
                     for( var i=0; i < obj.selects_Search.length; i++ ) {
                        this.$set(this.searchData,obj.selects_Search[i].fieldName,'')
                     }
                }
                if(obj.dates_Search != null){
                     for( var i=0; i < obj.dates_Search.length; i++ ) {
                        this.$set(this.searchData,obj.dates_Search[i].fieldName,[])
                     }
                }
                if(obj.keys_Search != null){
                    this.$set(this.searchData,'keyword','');
                    this.pageinfo.placeholder = obj.keys_Search;
                }
                if(obj.xmlMessage != null){
                    this.pageinfo.xmlMessage = obj.xmlMessage;
                }
                console.log(this.searchData)
            },
            //主表table页码选择事件
            handleCurrentPage(page){
                this.searchApi(this.pageinfo.xmlMessage, '', '', page, this.pageinfo.pagesize, this.searchData);
            },
            //搜索按钮事件
            searchBtn(){
                this.searchApi(this.pageinfo.xmlMessage, '', '', 1, this.pageinfo.pagesize,this.searchData);
            },
            //下拉选择框选择事件
            onSelectChange(){
                this.searchApi(this.pageinfo.xmlMessage, '', '', 1, this.pageinfo.pagesize,this.searchData);
            },
            //时间选择事件
            onDateOk(){
                this.searchApi(this.pageinfo.xmlMessage, '', '', 1, this.pageinfo.pagesize, this.searchData);
            },
            //主表表格查看按钮事件
            signBtn (index) {
                console.log(index)
                this.signModal = true;
            },
            //主表表格查看按钮事件
            show (index) {
                // this.initData.guid = this.tableData[index].SYSID;
                // this.getCommonDetail(this.initData.xmlMessage, this.initData.guid)
                console.log(this.pageinfo.xmlMessage, this.tableData[index].SYSID)
                this.$router.push({
                    path: '/model/modeldetail',
                    query:{
                        xml: this.pageinfo.xmlMessage,
                        guid: this.tableData[index].SYSID
                    }
                })
            },
            //合同预览按钮事件
            conPriview(index){
                let routeUrl = this.$router.resolve({
                    path: "/model/modelpriview",
                    query: {
                        Guid: this.tableData[index].SYSID 
                    }
                });
                window.open(routeUrl .href, '_blank');
            },
            //主表表格删除按钮事件
            remove (params,index) {
                Model.DeteleContract(params.row.SYSID,this.pageinfo.token,this.pageinfo.xmlMessage).then((res) => {
                    console.log(res)
                    if(res.statusCode == 0){
                        this.tableData.splice(index, 1);
                        this.$Message.success('合同删除成功!');
                    }else {
                        this.$Message.error('合同删除失败！' + res.message);
                    }
                }).catch(error => {})
            },
            //签订状态模态框确定事件
            signModalBtn(){
                this.signModal = false;
            },
            //搜索接口函数
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
            //新增主表内容事件
            addContract() {
                if(this.baseData.vueTemplate){
                    console.log('有合同编辑模板')
                    let routeUrl = this.$router.resolve({
                        path: '/model/contractmodel',
                        query:{
                            modelName: this.baseData.vueTemplate,
                            Guid: this.baseData.companyGuid,
                            conGuid: this.baseData.contractTypeConfigGuid
                        }
                    })
                    window.open(routeUrl .href, '_blank');
                }else {
                    console.log('没有合同编辑模板')
                    this.addState = true;
                    Model.AddGetCommon(this.pageinfo.xmlMessage, '', '', this.baseData.contractTypeConfigGuid, this.baseData.companyGuid, this.baseData.contractTypeId,this.pageinfo.token).then((res) => {
                        console.log(res);
                        console.log(JSON.parse(res.message.validations),res.message.validations);
                        this.addRuleValidate = JSON.parse(res.message.validations);
                        if(res.message.mySigned){
                            this.signPersonInit(res.message.mySigned.content);
                        }
                        if(this.addRuleValidate.XYBDATE){
                            this.addRuleValidate.XYBDATE[0].pattern = /.+/;
                            this.addRuleValidate.XYEDATE[0].pattern = /.+/;
                        }
                        console.log(this.addRuleValidate);
                        this.innitAddData(res.message.tests);
                        this.addData = res.message.tests;
                        this.signData = res.message.mySigned.content;
                    }).catch(error => {})
                }
            },
            //新增主表内容确定事件
            addConfirm(){
                this.addFinaData.EcDate = Base64.encode(JSON.stringify(this.addPostData));
                this.addFinaData.xmlUrl = this.pageinfo.xmlMessage;
                this.addFinaData.token = this.pageinfo.token;
                this.addFinaData.contractTypeId = this.baseData.contractTypeId;
                console.log(this.$refs['addFinaData.SignParts[index]'])
                console.log(this.$refs['addPostData'])
                for( var i=0; i <this.$refs['addFinaData.SignParts[index]'].length; i++ ) {
                    this.$refs['addFinaData.SignParts[index]'][i].validate((valid) => {
                        console.log(valid);
                        console.log(i);
                        console.log(this.$refs['addFinaData.SignParts[index]'].length);
                        console.log(i == this.$refs['addFinaData.SignParts[index]'].length - 1);
                        if (!valid) {
                            this.$Message.error('新增失败!请将必填信息填写完整！');
                        }else if(i == this.$refs['addFinaData.SignParts[index]'].length - 1) {
                            console.log(i);
                            console.log(this.$refs['addFinaData.SignParts[index]'].length - 1);
                            this.$refs['addPostData'].validate((valid) => {
                                if (valid) {
                                    this.loadingbtn = true;
                                    Model.AddPostCommon(this.addFinaData).then((res) => {
                                            console.log(res)
                                            this.loadingbtn = false;
                                            if(res.statusCode == 0){
                                                this.addState = false;
                                                this.$Message.success('新增成功!');
                                            }else {
                                                this.$Message.error('新增失败!' + res.message);
                                            }
                                    }).catch(error => {})
                                } else {
                                    this.$Message.error('新增失败!请将必填信息填写完整！');
                                }
                            })
                        }
                    })
                }
            },
            //
            innitAddData(obj){
                this.addPostData = {};
                for( var i=0; i < obj.length; i++ ) {
                    if(obj[i].type == 12){
                        console.log(new Date())
                        this.$set(this.addPostData, obj[i].fieldName,  obj[i].value)
                    }else {
                        this.$set(this.addPostData, obj[i].fieldName, obj[i].value)
                    }
                }
                console.log(this.addPostData)
            },
            //
            signPersonInit(array){
                this.addFinaData.SignParts = [];
                for( var i=0; i < array.length; i++ ) {
                    this.addFinaData.SignParts.push({});
                    for( var j=0; j < array[i].tests.length; j++ ) {
                        this.$set(this.addFinaData.SignParts[i], array[i].tests[j].fieldName, array[i].tests[j].value)
                    }
                }
                console.log(this.addFinaData.SignParts)
            },
            baseFyImg(baseurl){
                console.log(Base64.decode(baseurl));
                return Base64.decode(baseurl)
            }
        }
	}
</script>
<style>
	
</style>