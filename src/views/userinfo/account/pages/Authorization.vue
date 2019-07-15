<template>
	<div class="authorization">
		<h2 class="authtit">法人代表授权</h2>
        <div class="authtable">
          <div class="subtable">
            <Table :columns="tableTit" :data="tableData"></Table>
            <div class="page">
              <Page :total="total_page" @on-change="handleCurrentPage" prev-text="上一页" next-text="下一页" />
          	</div>
          </div>
        </div>
		<Modal
        v-model="authState"
        title="法人代表授权"
        width="1000">
        	<div class="signModal">
        		<Row :class="index % 2 == 0 ? 'bgcolorDark' : 'bgcolorLight' " v-for="(item,index) in addBaseData.template">
		            <Col span="12" class="szl-sublabel">
		                {{item.name}}
		            </Col>
		            <Col span="12" class="szl-sublabel">
		                <RadioGroup v-model='item.legalType' @on-change="v=>{CheckBoxChange(v, item.sysid)}">
		                    <Radio :label="subitem.id" v-for="(subitem,index) in addBaseData.legalTime">
		                      <span>{{subitem.txt}}</span>
		                    </Radio>
		                </RadioGroup>
		            </Col>
		        </Row>
        	</div>
	        <div slot="footer"></div>
	    </Modal>
	</div>	
</template>
<script>
	import Company from '@/api/company/company';
	import $ from 'jquery';
	export default {
		data() {
	 		return {
	 			token:'',
		        timestamp: '',
		        pin: '',
		        baseData: {},
	 			authState: false,
	 			total_page: 100,
	 			tableTit: [
	 				{
		              title: '公司名称',
		              key: 'companyName'
		            },
	 				{
		              title: '被授权人',
		              key: 'realName'
		            },
		            {
		              title: '授权编号',
		              key: 'authorizationNo'
		            },
		            {
		              title: '总授权模板数',
		              key: 'templateTotalNumber'
		            },
		            {
		              title: '待授权模板数',
		              key: 'templateAuthorizationNumber'
		            },
		            {
		              title: '状态',
		              key: 'auditStateName'
		            },
		            {
		              title: '创建时间',
		              key: 'createdOn'
		            },
		            {
		              title: '操作',
		              key: 'action',
		              width: 130,
		              align: 'center',
		              render: (h, params) => {
		                  return h('div', {
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
		                          	attrs:{
		                              title:'授权',
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
		                                  this.authBtn(params.row.membersid,params.row.comAuthId)
		                              	}
		                          	}
		                      	}),
		                  	]);
		              	}
		          	}
	 			],
	 			tableData: [],
	 			addBaseData: [],
	 			addPostData: '',
	 			membersid: '',
	 			comAuthId: ''
	 		}
	 	},
	 	components:{
            
        },
        created(){
  			this.token = this.$cookieStore.getCookie( 'token');
  			this.pin = this.$cookieStore.getCookie( 'ukeyPin');
	      	this.timestamp = parseInt(new Date().getTime()/1000);
	      	this.getTableList(this.timestamp, this.pin);
	  	},
        mounted() {
        	
        },
        methods: {
        	getTableList(txt, pin){
        		let _this = this;
		        $.ajax({
		              url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
		              type: "get",
		              data:{'besigntxt':txt,'keypin':pin},
		              dataType: "jsonp",
		              success: function (data) {
		                console.log(data)
		                if(data.code == 0){
		                  _this.LegalAuthorization('1','10','', '-1',_this.token,txt,data.rlt_data)
		                }else {
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
        	LegalAuthorization(pageIndex, pageSize, filler, validationState, toKen, timeStamp, signa){
		        Company.LegalAuthorization(pageIndex, pageSize, filler, validationState, toKen, timeStamp, signa).then((res) => {
		            console.log(res);
		            if(res.statusCode == 0){
		              this.baseData = res.message;
		              this.total_page = res.message.pageMessage.pageTotal * 10;
		              // var tableMes = res.message.mlvm;
		              // tableMes.tableHead.push(this.subOpration);
		              this.tableData = res.message.mlvm;
		            }else {
		              this.$Message.error(res.message);
		            }
		        })
		    },
		    handleCurrentPage(){

		    },
		    authBtn(membersid, comAuthId) {
		    	this.membersid = membersid;
		    	this.comAuthId = comAuthId;
		    	console.log(membersid, comAuthId)
		    	let _this = this;
		        $.ajax({
		            url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
		            type: "get",
		            data:{'besigntxt':membersid,'keypin':_this.pin},
		            dataType: "jsonp",
		            success: function (data) {
		                console.log(data)
		                if(data.code == 0){
		                  _this.AddLegalAuthorization(_this.token,membersid,comAuthId,data.rlt_data)
		                }else {
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
	    	AddLegalAuthorization(toKen,membersid,comAuthId,signal){
	    		Company.AddLegalAuthorization(toKen,membersid,comAuthId,signal).then((res) => {
		            console.log(res);
		            if(res.statusCode == 0){
		            	this.authState = true;
		              	this.addBaseData = res.message;
		              	this.addPostData = res.message.value
		            }else {
		              this.$Message.error(res.message);
		            }
		        })
	    	},
	    	CheckBoxChange(v, sysid){
	    		this.addPostData += sysid + ',' + v + ';';
	    		let _this = this;
		        $.ajax({
		            url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
		            type: "get",
		            data:{'besigntxt':_this.membersid,'keypin':_this.pin},
		            dataType: "jsonp",
		            success: function (data) {
		                console.log(data)
		                if(data.code == 0){
		                  _this.SaveLegalTemplateAuthorization(_this.token,_this.membersid,_this.addPostData,_this.addBaseData.globalscmpSysid,data.rlt_data)
		                }else {
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
	    	SaveLegalTemplateAuthorization(toKen,membersid,selectValue,globalscmpSysid,signal){
	    		Company.SaveLegalTemplateAuthorization(toKen,membersid,selectValue,globalscmpSysid,signal).then((res) => {
		            console.log(res);
		            if(res.statusCode == 0){
		            	this.$Message.success(res.message);
		            }else {
		              this.$Message.error(res.message);
		            }
		        })
	    	},
        }
	}
</script>
<style>
	
</style>