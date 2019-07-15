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
            <li class="listitem listactive">
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
            <li class="listitem">
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
        <div class="righttit">用户管理</div>
        <div class="empsearch">
          <div class="addemp" @click='inviteStart'>邀请会员</div>
        </div>
        <div class="righttable">
          <Table ref="currentRowTable" :columns="tableTit" :data="tableData"></Table>
          <div class="page">
              <Page :total="pageInfo.total_page" @on-change="handleCurrentPage" prev-text="上一页" next-text="下一页" />
        </div>
        </div>
      </div>
    </div>
    <Modal
        v-model="inviteData.inviteState"
        title="邀请新会员"
        @on-cancel="inviteClose"
        width="1000">
        <div class="invitevip">
          <div class="formcon" v-if='!inviteData.inviteInfo'>
            <div>
                手机号：
                <Input prefix="ios-contact" v-model="inviteData.telnum" placeholder="请输入会员手机号" style="width: auto" />
            </div>
            <div class="inviteqrcode">
              <p>你还可以通过扫码加入</p>
              <div class="qrarea">
                <img src="../../../assets/img/codepic2.jpg" alt="">
              </div>
            </div>
          </div>
          <div class="inviteinfo" v-else>
            <div class="infoitem">
              <span>姓名：</span>
              <em>{{inviteData.inviteInfo[0].realName}}</em>
            </div>
            <div class="infoitem">
              <span>身份证：</span>
              <em>{{inviteData.inviteInfo[0].idcard}}</em>
            </div>
            <div class="infoitem">
              <span>验证信息：</span>
              <Input v-model="inviteData.inviveryfytxt" type="textarea" :rows="4" placeholder="请输入验证信息，以便对方通过验证" />
            </div>
            <div class="submitbtn" @click="sendInvite">发出邀请</div>
          </div>
        </div>
        <div slot="footer">
            <Button v-if='!inviteData.inviteInfo' type="primary" size="large" long :loading="inviteData.loadingbtn" @click="inviteConfirm">确定</Button>
        </div>
    </Modal>
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
              title: '序列号',
              key: 'ddsd'
            },
            {
              title: '会员名',
              key: 'realName'
            },
            {
              title: '会员手机',
              key: 'telPhone'
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
              title: '邀请',
              key: 'authtype',
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
                              marginRight: '5px',
                              display:(params.row.auditState==2)?"inline-block":"none",
                          },
                          on: {
                              click: () => {
                                  this.authfy(params)
                              }
                          }
                      }, '再次邀请'),
                      // h('Button', {
                      //     props: {
                      //         type: 'error',
                      //         size: 'small'
                      //     },
                      //     on: {
                      //         click: () => {
                      //             this.remove(params.index)
                      //         }
                      //     }
                      // }, 'Delete')
                  ]);
              }
          }
        ],
        tableData: [],
        pageInfo: {
          total_page: 100
        },
        inviteData: {
          inviteState: false,
          loadingbtn: false,
          telnum: '',
          inviteInfo: null,
          inviveryfytxt: ''
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
                  _this.MembersList('1','10','', '-1',_this.token,txt,data.rlt_data)
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
      MembersList(pageIndex, pageSize, filler, validationState, toKen, timeStamp, signa){
        Company.MembersList(pageIndex, pageSize, filler, validationState, toKen, timeStamp, signa).then((res) => {
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
      inviteStart() {
        this.inviteData.inviteState = true;
      },
      inviteClose() {
        this.inviteData.inviteInfo = null;
      },
      inviteConfirm(){

        let _this = this;
        $.ajax({
              url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
              type: "get",
              data:{'besigntxt':_this.inviteData.telnum,'keypin':_this.pin},
              dataType: "jsonp",
              success: function (data) {
                if(data.code == 0){
                  _this.SelectMembers(_this.token,_this.inviteData.telnum,data.rlt_data)
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
      sendInvite(){
        let _this = this;
        $.ajax({
              url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
              type: "get",
              data:{'besigntxt':_this.inviteData.inviteInfo[0].userid,'keypin':_this.pin},
              dataType: "jsonp",
              success: function (data) {
                if(data.code == 0){
                  _this.SendToMembers(_this.token,_this.inviteData.inviveryfytxt,_this.inviteData.inviteInfo[0].userid,data.rlt_data);
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
      SendToMembers(toKen,message,userid,signal){
        Company.SendToMembers(toKen,message,userid,signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
              this.$Message.success(res.message);
            }else {
              this.$Message.error(res.message);
            }
        })
      },
      SelectMembers(toKen,phone,signal){
        Company.SelectMembers(toKen,phone,signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
              this.inviteData.inviteInfo = res.message
            }else {
              this.$Message.error(res.message);
            }
        })
      },
      AgainInviteMembership(toKen,membersid,signal){
        Company.AgainInviteMembership(toKen,membersid,signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
              this.$Message.success('再次邀请成功!');
              this.GetCryptSignHashString(this.timestamp, this.pin);
            }else {
              this.$Message.error(res.message);
            }
        })
      },
      authfy(params){
        console.log(params);
        let _this = this;
        $.ajax({
              url: "http://localhost:9188/ETAuto199Service/GetCryptSignHashString?jsoncallback=?",
              type: "get",
              data:{'besigntxt':params.row.membersid,'keypin':_this.pin},
              dataType: "jsonp",
              success: function (data) {
                if(data.code == 0){
                  _this.AgainInviteMembership(_this.token,params.row.membersid,data.rlt_data);
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
      }
    }
}
</script>
<style lang="less">
</style>
