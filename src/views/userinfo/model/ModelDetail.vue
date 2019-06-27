<template>
	<div class="modeldetail">
		<div class="righttit">
            <Breadcrumb>
                <BreadcrumbItem to="/model">模板管理</BreadcrumbItem>
                <BreadcrumbItem v-for="item in initData.titList">{{item}}</BreadcrumbItem>
                <BreadcrumbItem>{{initData.subtit}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="detailinfo" v-for="(item,index) in subSignData">
            <div class="infotit">
                <div class="infotitxt">{{item.titleName}}</div>
                <!-- <div class="infoeditbtn" @click="editClick"><span></span></div> -->
            </div>
            <div class="infowrap">
                <template v-for="subitem in item.tests">
                    <div class="infoitem" v-if="subitem.type !== 99&&subitem.type !== 98">
                        <div class="infolabel">{{subitem.key}}</div>
                        <div class="infotxt">{{subitem.value}}</div>
                    </div>
                    <div class="imgarea" v-if="subitem.type == 98">
                        <img class="comimg" :src="baseFyImg(subitem.text)" alt="">
                        <img class="signimg" :src="baseFyImg(subitem.signatureImg)" alt="">
                    </div>
                </template>
            </div>
        </div>
        <div class="detailinfo">
            <div class="infotit">
                <div class="infotitxt">{{initData.subtit}}</div>
                <div class="infoeditbtn" @click="editClick"><span></span></div>
            </div>
            <div class="infowrap">
                <div class="infoitem" v-for="item in subBodyData">
                    <div class="infolabel">{{item.key}}</div>
                    <div class="infotxt">{{item.value}}</div>
                </div>
            </div>
        </div>
        <div class="tabarea" v-if="subTabList.length > 0">
            <Tabs type="card" @on-click="subTabClick">
                <TabPane :label="item.showName"  v-for="item in subTabList">
                    <Table ref="currentRowTable" :columns="subTableTit" :data="subTableData"></Table>
                    <div class="page">
                        <Page :total="pageinfo.total_page" @on-change="subHandleCurrentPage" prev-text="上一页" next-text="下一页" />
                        <div class="addbtn" @click="addContract">新增</div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
        <Modal
            v-model="editState"
            title="合同信息编辑"
            width="1000"
            class-name="vertical-center-modal">
            <div class="addarea" v-if="signData != null">
                <Form v-for="(item,index) in signData" ref="signParts[index]" :model="signParts[index]" :rules="signRuleValidate">
                    <h2 class="edittit">{{item.titleName}}</h2>
                    <template v-for="subitem in item.tests">
                        <FormItem v-if="subitem.type !== 99&&subitem.type !== 98" :label="subitem.showName" :label-width="100" :prop="subitem.fieldName">
                            <Input v-if="subitem.type == 1"  v-model="signParts[index][subitem.fieldName]"/>
                            <Select v-if="subitem.type == 5" v-model="signParts[index][subitem.fieldName]">
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
                <Form v-if="editData != null" ref="editPostData" :model="editPostData" :rules="ruleValidate">
                    <h2 class="edittit">{{initData.subtit}}</h2>
                    <FormItem :label="item.showName" v-for="item in editData" :label-width="100" :prop="item.fieldName">
                        <Input v-if="item.type == 1"  v-model="editPostData[item.fieldName]"/>
                        <Select v-if="item.type == 5" v-model="editPostData[item.fieldName]">
                            <Option :value="subitem.key" v-for="subitem in item.dictionarys">{{subitem.value}}</Option>
                        </Select>
                        <DatePicker v-if="item.type == 12" v-model="editPostData[item.fieldName]" type="datetime" placeholder="Select date and time"></DatePicker>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="loadingbtn" @click="editConfirm">确定</Button>
            </div>
        </Modal>
        <Modal
            v-model="addState"
            title="子表新增"
            class-name="vertical-center-modal">
            <div class="addsubarea">
               <Form v-if="addData!=null" ref="addPostData" :model="addPostData" :rules="addRuleValidate">
                    <h2 class="edittit">{{addData.xmlNikeName}}</h2>
                    <FormItem :label="item.showName" v-for="item in addData.tests" :label-width="150" :prop="item.fieldName">
                        <Input v-if="item.type == 1"  v-model="addPostData[item.fieldName]"/>
                        <Select v-if="item.type == 5" v-model="addPostData[item.fieldName]">
                            <Option :value="subitem.key" v-for="subitem in item.dictionarys">{{subitem.value}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="addLoadingBtn" @click="addConfirm">确定</Button>
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
                <Button type="primary" size="large" long @click="subSignModalBtn">确定</Button>
            </div>
        </Modal>
	</div>
</template>
<script>
	import Model from '@/api/model/model';
    let Base64 = require('js-base64').Base64;
	export default {
        props: {
            initData: Object,
        },
		data() {
	 		return {
                pageinfo: {
                    total_page: 100,
                    pagesize: 10,
                    xmlMessage: '',
                    guid: '',
                    fkName: '',
                    token: ''
                },
                subBodyData: [],
                subSignData: [],
                subTabList: [],
                subTableTit: [],
                subTableData: [],
                subBaseData: [],
                subOpration: {
                    title: '操作',
                    key: 'action',
                    width: 130,
                    align: 'center',
                    render: (h, params) => {
                        return h('div',{
                            style: {
                                display: 'flex',
                                justifyContent: 'space-around',
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
                                        this.subSignBtn(params.index)
                                    }
                                }
                            },[h('em','签订状态')]),
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
                                        this.subShow(params.index)
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
                                        this.subRemove(params,params.index)
                                    }
                                }
                            },[h('em','删除')])
                        ]);
                    }
                },
                loadingbtn: false,
                editState: false,
                editData: null,
                signData: null,
                editPostData: {},
                signParts: [],
                ruleValidate: {
                },
                signRuleValidate: {
                    CNAME:[{required:true,message:"姓名不能为空",trigger:"blur",pattern:/.+/}],
                    CPHONE:[{required:true,message:"联系方式不能为空",trigger:"blur",pattern:/.+/}],
                    CCARDTYPE:[{required:true,message:"证件类型不能为空",trigger:"change",pattern:/.+/}],
                    CCARDNO:[{required:true,message:"证件号码不能为空",trigger:"blur",pattern:/.+/}]
                },
                addState: false,
                addData: null,
                addLoadingBtn: false,
                addPostData: {},
                addRuleValidate: {},
                addFinaData:{
                    EcDate: "",
                    xmlUrl: "",
                    token: '',
                    fkName:'',
                    fkGuid:''
                },
                signModal: false
	 		}
	 	},
	 	components:{
           
        },
        created() {    
            this.getParams()
        },
        mounted() {
        	console.log(this.initData)
            this.getCommonDetail(this.pageinfo.xmlMessage, this.pageinfo.guid)
        },
        methods: {
        	getParams() {
		        this.pageinfo.xmlMessage = this.$route.query.xml;
                this.pageinfo.guid = this.$route.query.guid;
                this.pageinfo.token = this.$cookieStore.getCookie( 'token');
		    },
        	subHandleCurrentPage(){

        	},
            //从表tab点击事件
            subTabClick(index){
                console.log('tab');
                console.log(this.subTabList[index].xmlUrl);
                this.pageinfo.fkName = this.subTabList[index].fkName;
                Model.parentSearch(this.subTabList[index].xmlUrl, this.subTabList[index].fkName, this.pageinfo.guid, 1, this.pageinfo.pagesize, {}).then((res) => {
                        console.log(res);
                        this.subBaseData = res.message;
                        this.pageinfo.total_page = res.message.pageMessage.pageTotal * 10;
                        var tableMes = JSON.parse(res.message.tableMessage);
                        console.log(tableMes)
                        tableMes.tableHead.push(this.subOpration);
                        this.subTableTit = tableMes.tableHead;
                        this.subTableData = tableMes.tableBody;
                        
                    }).catch(error => {})
            },
            //从表表格查看按钮事件
            subSignBtn (index) {
                console.log(index)
                this.signModal = true;
            },
            //从表表格查看事件
            subShow(index){
                let routeUrl = this.$router.resolve({
                    path: "/model/modeldetail",
                    query: {
                        xml: this.subBaseData.xmlMessage,
                        guid: this.subTableData[index].SYSID 
                    }
                });
                window.open(routeUrl .href, '_blank');
            },
            subRemove(params,index){
                Model.DeteleContract(params.row.SYSID,this.pageinfo.token,this.subBaseData.xmlMessage).then((res) => {
                    console.log(res)
                    if(res.statusCode == 0){
                        this.subTableData.splice(index, 1);
                        this.$Message.success('合同删除成功!');
                    }else {
                        this.$Message.error('合同删除失败！' + res.message);
                    }
                }).catch(error => {})
            },
            subSignModalBtn(){
                this.signModal = false;
            },
            //获取从表内容
            getCommonDetail(xmlUrl, guid){
                Model.GetCommonDetail(xmlUrl, guid).then((res) => {
                    console.log(res);
                    this.subBodyData = res.message.bodyDetail;
                    this.subTabList = res.message.childTable;
                    this.subSignData = res.message.mySigned;
                    this.initData.subtit = res.message.xmlName;
                    this.pageinfo.fkName = res.message.childTable[0].fkName;
                    //获取签约人信息
                    // this.GetCommonDetailEdit();
                    //给第一个tab表格拉取数据
                    Model.parentSearch(res.message.childTable[0].xmlUrl,res.message.childTable[0].fkName, guid, 1, this.pageinfo.pagesize, {}).then((res) => {
                        console.log(res);
                        this.subBaseData = res.message;
                        this.pageinfo.total_page = res.message.pageMessage.pageTotal * 10;
                        var tableMes = JSON.parse(res.message.tableMessage);
                        console.log(tableMes)
                        tableMes.tableHead.push(this.subOpration);
                        this.subTableTit = tableMes.tableHead;
                        this.subTableData = tableMes.tableBody;
                        
                    }).catch(error => {})
                }).catch(error => {})
            },
            editClick() {
                console.log(this.editState);
                this.editState = true;
                this.GetCommonDetailEdit();
            },
            editConfirm() {

                for( var i=0; i <this.$refs['signParts[index]'].length; i++ ) {
                    this.$refs['signParts[index]'][i].validate((valid) => {
                        console.log(valid);
                        if (!valid) {
                            this.$Message.error('新增失败!请将必填信息填写完整！');
                        }else if(i == this.$refs['signParts[index]'].length - 1) {
                            this.$refs['editPostData'].validate((valid) => {
                                if (valid) {
                                    this.loadingbtn = true;
                                    Model.PostCommonDetailEdit(this.pageinfo.xmlMessage, this.pageinfo.guid,this.editPostData,this.signParts).then((res) => {
                                        this.loadingbtn = false;
                                        if(res.statusCode == 0){
                                            this.getCommonDetail(this.pageinfo.xmlMessage, this.pageinfo.guid);
                                            this.editState = false;
                                            this.$Message.success('提交成功!');
                                        }else {
                                            this.$Message.error('提交失败!' + res.message);
                                        }
                                        console.log(res)
                                    }).catch(error => {})
                                } else {
                                    this.$Message.error('提交失败!请将必填信息填写完整！');
                                }
                            })
                        }
                    })
                }

            },
            GetCommonDetailEdit(){
                Model.GetCommonDetailEdit(this.pageinfo.xmlMessage, this.pageinfo.guid).then((res) => {
                    console.log(res);
                    this.ruleValidate = JSON.parse(res.message.validations);
                    if(res.message.mySigned){
                        this.innitSignData(res.message.mySigned.content);
                    }
                    if(this.ruleValidate.XYBDATE){
                        this.ruleValidate.XYBDATE[0].pattern = /.+/;
                        this.ruleValidate.XYEDATE[0].pattern = /.+/;
                    }
                    if(this.ruleValidate.CREATEDON){
                        this.ruleValidate.CREATEDON[0].pattern = /.+/;
                    }
                    this.innitEditData(res.message.tests);
                    console.log(this.ruleValidate);
                    this.editData = res.message.tests;
                    this.signData = res.message.mySigned.content;
                }).catch(error => {})
            },
            innitEditData(obj){
                console.log(obj)
                for( var i=0; i < obj.length; i++ ) {
                    if(obj[i].type == 12){
                        this.$set(this.editPostData, obj[i].fieldName,  obj[i].value)
                    }else {
                        this.$set(this.editPostData, obj[i].fieldName, obj[i].value)
                    }
                }
                console.log(this.editPostData)
            },
            innitSignData(array){
                console.log(array)
                this.signParts = [];
                for( var i=0; i < array.length; i++ ) {
                    this.signParts.push({});
                    for( var j=0; j < array[i].tests.length; j++ ) {
                        this.$set(this.signParts[i], array[i].tests[j].fieldName, array[i].tests[j].value)
                    }
                }
                console.log(this.signParts)
            },
            baseFyImg(baseurl){
                console.log(Base64.decode(baseurl));
                return Base64.decode(baseurl)
            },
            addContract(){
                this.addState = true;
                Model.AddGetCommon(this.subBaseData.xmlMessage, this.pageinfo.fkName, this.pageinfo.guid,'','','',this.pageinfo.token).then((res) => {
                        console.log(res);
                        this.addRuleValidate = JSON.parse(res.message.validations);
                        console.log(this.addRuleValidate);
                        this.innitAddData(res.message.tests);
                        this.addData = res.message;
                    }).catch(error => {})
            },
            addConfirm(){
                this.addFinaData.EcDate = Base64.encode(JSON.stringify(this.addPostData));
                this.addFinaData.xmlUrl = this.subBaseData.xmlMessage;
                this.addFinaData.token = this.pageinfo.token;
                this.addFinaData.fkName = this.pageinfo.fkName;
                this.addFinaData.fkGuid = this.pageinfo.guid;
                this.$refs['addPostData'].validate((valid) => {
                    if (valid) {
                        this.addLoadingBtn = true;
                        Model.AddPostCommon(this.addFinaData).then((res) => {
                                console.log(res)
                                this.addLoadingBtn = false;
                                if(res.statusCode == 0){
                                    this.addState = false;
                                    Model.parentSearch( this.addFinaData.xmlUrl,this.addFinaData.fkName, this.addFinaData.fkGuid, 1, this.pageinfo.pagesize, {}).then((res) => {
                                        console.log(res);
                                        this.subBaseData = res.message;
                                        this.pageinfo.total_page = res.message.pageMessage.pageTotal * 10;
                                        var tableMes = JSON.parse(res.message.tableMessage);
                                        console.log(tableMes)
                                        tableMes.tableHead.push(this.subOpration);
                                        this.subTableTit = tableMes.tableHead;
                                        this.subTableData = tableMes.tableBody;
                                        
                                    }).catch(error => {})
                                    this.$Message.success('新增成功!');
                                }else {
                                    this.$Message.error('新增失败!' + res.message);
                                }
                        }).catch(error => {})
                    } else {
                        this.$Message.error('新增失败!请将必填信息填写完整！');
                    }
                })
            },
            innitAddData(obj){
                this.addPostData = {};
                for( var i=0; i < obj.length; i++ ) {
                    if(obj[i].type == 12){
                        this.$set(this.addPostData, obj[i].fieldName,  obj[i].value)
                    }else {
                        this.$set(this.addPostData, obj[i].fieldName, obj[i].value)
                    }
                }
                console.log(this.addPostData)
            },

        }
	}
</script>
<style>
	
</style>