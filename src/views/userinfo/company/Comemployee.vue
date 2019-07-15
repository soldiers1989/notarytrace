<template>
  <div class="company">
    <div class="comcon clearfix">
      <div class="comleft">
        <div class="listgroup">
          <div class="listbtn">
            <span>企业管理</span>
            <em></em>
          </div>
          <ul class="listcon">
            <li class="listitem">
              <router-link tag="a" :to="{path:'/company'}">
                <div class="listicon">
                  <img src="../../../assets/img/comicon1.png" alt="">
                </div>
                <div class="listtxt">企业认证</div>
              </router-link>
            </li>
            <li class="listitem">
              <div class="listicon">
                <img src="../../../assets/img/comicon2.png" alt="">
              </div>
              <div class="listtxt">企业设置</div>
            </li>
            <li class="listitem">
              <div class="listicon">
                <img src="../../../assets/img/comicon2.png" alt="">
              </div>
              <div class="listtxt">模板管理</div>
            </li>
          </ul>
        </div>
        <div class="listgroup">
          <div class="listbtn">
            <span>用户管理</span>
            <em></em>
          </div>
          <ul class="listcon">
            <li class="listitem">
              <router-link tag="a" :to="{path:'/company/user'}">
                <div class="listicon">
                  <img src="../../../assets/img/comicon4.png" alt="">
                </div>
                <div class="listtxt">用户管理</div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="listgroup">
          <div class="listbtn">
            <span>授权管理</span>
            <em></em>
          </div>
          <ul class="listcon">
            <li class="listitem">
              <router-link tag="a" :to="{path:'/company/ukey'}">
                <div class="listicon">
                  <img src="../../../assets/img/comicon3.png" alt="">
                </div>
                <div class="listtxt">企业盾(Ukey)管理</div>
              </router-link>
            </li>
            <li class="listitem listactive">
              <router-link tag="a" :to="{path:'/company/employee'}">
                <div class="listicon">
                  <img src="../../../assets/img/comicon5.png" alt="">
                </div>
                <div class="listtxt">企业员工授权</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="comright">
        <div class="righttit">企业员工授权</div>
        <div class="empsearch">
          <div class="addemp" @click="addAuth">新增授权</div>
        </div>
        <div class="righttable">
          <Table :columns="tableTit" :data="tableData"></Table>
          <div class="page">
              <Page :total="pageInfo.total_page" @on-change="handleCurrentPage" prev-text="上一页" next-text="下一页" />
          </div>
        </div>
      </div>
      <Modal
        v-model="addData.addState"
        title="新增授权"
        width="1000">
        <div class="signModal">
          <template>
              <Select v-model="addData.addPostEmberid" style="width:200px;margin-bottom: 20px;">
                  <Option v-for="item in addData.addSelectData" :value="item.membersId" :key="item.membersId">{{ item.membersName }}</Option>
              </Select>
          </template>
          <Row style="background-color: #0058A6">
              <Col span="7" class="szl-label">普通授权</Col>
              <Col span="7" class="szl-label">法人授权</Col>
              <Col span="10" class="szl-label">模板名称</Col>
          </Row>
          <Row :class="index % 2 == 0 ? 'bgcolorDark' : 'bgcolorLight' " v-for="(item,index) in addData.addBaseData">
              <Col span="14" class="szl-sublabel">
                <CheckboxGroup  v-model='item.check' @on-change="v=>{CheckBoxChange(v, item.sysid, index)}">
                    <Checkbox label="1" :disabled='item.check.length == 2'>
                      <span>普通授权</span>
                    </Checkbox>
                    <Checkbox label="2" style="margin-left: 200px">
                      <span>法人授权</span>
                    </Checkbox>
                </CheckboxGroup>
              </Col>
              <Col span="10" class="szl-sublabel">
                {{item.name}}
              </Col>
          </Row>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long :loading="addData.loadingbtn" @click="addAuthConfirm">确定</Button>
        </div>
      </Modal>
      <Modal
        v-model="editData.editState"
        title="授权编辑"
        width="1000">
        <div class="signModal">
          <div class="editinfo" v-if="editData.subBaseData">
            <p class="infoitem"><span>授权模板总数：<em>{{editData.subBaseData.templateTotal}}</em></span></p>
            <p class="infoitem" style="margin-bottom: 0px;"><span style="margin-right: 20px;">法人授权模板数：<em>{{editData.subBaseData.templateLegal}}</em></span><span>普通授权模板数：<em>{{editData.subBaseData.templateOrdinary}}</em></span></p>
            <div class="addemp" @click="subAddAuth(editData.submembersid)">新增授权</div>
          </div>
          <div class="subtable">
            <Table :columns="editData.subtableTit" :data="editData.subtableData"></Table>
          </div>
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Company from '@/api/company/company';
import $ from 'jquery';
export default {
  	name: 'employee',
  	data() {
  		return {
        token:'',
        timestamp: '',
        pin: '',
        baseData: {},
        tableTit: [
            {
              title: '员工姓名',
              key: 'realName'
            },
            {
              title: '电话号码',
              key: 'telPhone'
            },
            {
              title: '模板总数',
              key: 'templateTotalNumber'
            },
            {
              title: '待法人授权模板数',
              key: 'templateAuthorizationNumber'
            },
            {
              title: '状态',
              key: 'auditStateName'
            },
            {
              title: '授权时间',
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
                              title:'授权编辑',
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
                                  this.authEditBtn(params.row.membersid)
                              }
                          }
                      }),
                  ]);
              }
          }
        ],
        tableData: [],
        pageInfo: {
          total_page: 100
        },
        addData: {
          addState: false,
          loadingbtn: false,
          addBaseData: [],
          addSelectData: [],
          addPostAuthtype: '',
          addPostEmberid: '',
          check: '1'
        },
        editData: {
          editState: false,
          subBaseData: null,
          subtableTit: [
            {
              title: '序号',
              key: 'no'
            },
            {
              title: '模板名称',
              key: 'templateName'
            },
            {
              title: '类型',
              key: 'templateType'
            },
            {
              title: '状态',
              key: 'templateStateName'
            },
            {
              title: '时间',
              key: 'effective'
            },
            {
              title: '操作',
              key: 'action',
              width: 130,
              align: 'center',
              render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              display:(params.row.templateState==4)?"inline-block":"none",
                          },
                          on: {
                              click: () => {
                                  this.subOprationBtn(params.row)
                              }
                          }
                      }, '重新提交'),
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              display:(params.row.templateState==2)?"inline-block":"none",
                          },
                          on: {
                              click: () => {
                                  this.subOprationBtn(params.row)
                              }
                          }
                      }, '暂停'),
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              display:(params.row.templateState==3)?"inline-block":"none",
                          },
                          on: {
                              click: () => {
                                  this.subOprationBtn(params.row)
                              }
                          }
                      }, '恢复'),
                  ]);
              }
            }
          ],
          subtableData:[],
          total_page: 100,
          submembersid: ''
        }
  		}
  	},
  	components: {

  	},
  	created(){
  		this.token = this.$cookieStore.getCookie( 'token');
      this.pin = this.$cookieStore.getCookie( 'ukeyPin');
      this.timestamp = parseInt(new Date().getTime()/1000);
      this.GetCryptSignHashString(this.timestamp, this.pin);
  	},
  	mounted() {
      console.log(this.timestamp)
    },
    beforeDestroy() {

    },
  	methods: {
  		handleCurrentPage(){

      },
      subHandleCurrentPage(){

      },
      GetCryptSignHashString(txt, pin){
        let _this = this;
        $.ajax({
              url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
              type: "get",
              data:{'besigntxt':txt,'keypin':pin},
              dataType: "jsonp",
              success: function (data) {
                console.log(data)
                if(data.code == 0){
                  _this.MembersAuthorization('1','10','', '-1',_this.token,txt,data.rlt_data)
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
      MembersAuthorization(pageIndex, pageSize, filler, validationState, toKen, timeStamp, signa){
        Company.MembersAuthorization(pageIndex, pageSize, filler, validationState, toKen, timeStamp, signa).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
              this.baseData = res.message;
              this.pageInfo.total_page = res.message.pageMessage.pageTotal * 10;
              // var tableMes = res.message.mlvm;
              // tableMes.tableHead.push(this.subOpration);
              this.tableData = res.message.mlvm;
              console.log(this.tableData);
            }else {
              this.$Message.error(res.message);
            }
        })
      },
      addPostDataInit(){
        this.addData.addPostEmberid = '';
        this.addData.addPostAuthtype = '';
      },
      addAuth(){
        let _this = this;
        this.addPostDataInit();
        $.ajax({
              url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
              type: "get",
              data:{'besigntxt':_this.timestamp,'keypin':_this.pin},
              dataType: "jsonp",
              success: function (data) {
                console.log(data)
                if(data.code == 0){
                  _this.AddAuthorization(_this.token,_this.timestamp,data.rlt_data)
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
      subAddAuth(membersid){
        let _this = this;
        this.addPostDataInit();
        $.ajax({
              url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
              type: "get",
              data:{'besigntxt':membersid,'keypin':_this.pin},
              dataType: "jsonp",
              success: function (data) {
                console.log(data)
                if(data.code == 0){
                  _this.EditAuthorization(_this.token,membersid,data.rlt_data)
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
      AddAuthorization(toKen,timeStamp,signal){
        Company.AddAuthorization(toKen,timeStamp,signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
                this.addData.addBaseData = res.message.template;
                this.addData.addSelectData = res.message.members;
                this.addData.addState = true;
            }else {
              this.$Message.error(res.message);
            }
        })
      },
      EditAuthorization(toKen,membersid,signal){
        Company.EditAuthorization(toKen,membersid,signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
                this.addData.addBaseData = res.message.template;
                this.addData.addSelectData = res.message.members;
                this.addData.addPostEmberid = res.message.members[0].membersId;
                this.addData.addPostAuthtype = res.message.checkString;
                this.addData.addState = true;
            }else {
              this.$Message.error(res.message);
            }
        })
      },
      addAuthConfirm() {
        console.log(this.addData.addPostEmberid,this.addData.addPostAuthtype);
        let _this = this;
        this.addData.loadingbtn = true;
        $.ajax({
              url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
              type: "get",
              data:{'besigntxt':_this.addData.addPostEmberid,'keypin':_this.pin},
              dataType: "jsonp",
              success: function (data) {
                console.log(data)
                if(data.code == 0){
                  _this.SaveTemplateAuthorization(_this.token,_this.addData.addPostEmberid,_this.addData.addPostAuthtype,data.rlt_data)
                }else {
                  _this.$Message.error(data.msg);
                }
              },
              complete: function (XMLHttpRequest, textStatus) {
               var returnText = XMLHttpRequest.responseText;                    
              },
              error: function (err) {
                _this.addData.loadingbtn = false;
                alert("溯证签安全盾服务访问失败！请联系管理人员！");
              } 
          });
      },
      SaveTemplateAuthorization(toKen,membersid,selectValue,signal){
        Company.SaveTemplateAuthorization(toKen,membersid,selectValue,signal).then((res) => {
            console.log(res);
            this.addData.loadingbtn = false;
            if(res.statusCode == 0){
              this.addData.addState = false;
              this.$Message.success('授权成功！');
              this.authEditBtn(this.editData.submembersid);
            }else {
              this.$Message.error(res.message);
            }
        })
      },
      CheckBoxChange(typeArray,sysid,index) {
        if(typeArray.length == 0){
          let tempArray = this.addData.addPostAuthtype.split(";"),
              subtempArray = null;
              console.log(tempArray)
          for (var i = 0;i < tempArray.length; i++){
              subtempArray = tempArray[i].split(",");
              if(sysid == subtempArray[0]) {
                delete tempArray[i];
                console.log(tempArray)
              }
          }
          tempArray = tempArray.filter(function(item) {
               return item != ""
          });
          this.addData.addPostAuthtype = tempArray.join(";") + ';';
        }else if(typeArray.length == 1) {
          if(typeArray[0] == 2) {
            this.addData.addBaseData[index].check = ['1', '2'];
            this.addData.addPostAuthtype += sysid + ',' + '2' + ';';
          }else {
            this.addData.addPostAuthtype += sysid + ',' + '1' + ';';
          }
        } else if(typeArray.length == 2) {
            this.addData.addBaseData[index].check = ['1', '2'];
            this.addData.addPostAuthtype += sysid + ',' + '2' + ';';
        }
      },
      authEditBtn(params){
        this.editData.submembersid = params;
        this.editData.editState = true;
        let _this = this;
        $.ajax({
            url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
            type: "get",
            data:{'besigntxt':params,'keypin':_this.pin},
            dataType: "jsonp",
            success: function (data) {
              console.log(data)
              if(data.code == 0){
                _this.MembersTemplateDetail(_this.token,params,data.rlt_data)
              }else {
                _this.$Message.error(data.msg);
              }
            },
            complete: function (XMLHttpRequest, textStatus) {
             var returnText = XMLHttpRequest.responseText;                    
            },
            error: function (err) {
              _this.addData.loadingbtn = false;
              alert("溯证签安全盾服务访问失败！请联系管理人员！");
            } 
        });
      },
      MembersTemplateDetail(toKen,membersid,signal){
        Company.MembersTemplateDetail(toKen,membersid,signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
               this.editData.subBaseData = res.message;
               this.editData.subtableData = res.message.templateList;
            }else {
              this.$Message.error(res.message);
            }
        })
      },
      subOprationBtn(params){
        console.log(params);
        let _this = this;
        $.ajax({
            url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
            type: "get",
            data:{'besigntxt':_this.editData.submembersid,'keypin':_this.pin},
            dataType: "jsonp",
            success: function (data) {
              console.log(data)
              if(data.code == 0){
                _this.MembershipTemplateState(_this.token,_this.editData.submembersid,params.templateGuid,params.anNiuState,data.rlt_data)
              }else {
                _this.$Message.error(data.msg);
              }
            },
            complete: function (XMLHttpRequest, textStatus) {
             var returnText = XMLHttpRequest.responseText;                    
            },
            error: function (err) {
              _this.addData.loadingbtn = false;
              alert("溯证签安全盾服务访问失败！请联系管理人员！");
            } 
        });
      },
      MembershipTemplateState(toKen,membersid,template,state,signal){
        Company.MembershipTemplateState(toKen,membersid,template,state,signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
              this.authEditBtn(this.editData.submembersid);
            }else {
              this.$Message.error(res.message);
            }
        })
      },
    }
}
</script>
<style lang="less">
</style>
