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
        <div class="empsearch"></div>
        <div class="righttable">
          <Table ref="currentRowTable" :columns="tableTit" :data="tableData"></Table>
          <div class="page">
              <Page :total="pageInfo.total_page" @on-change="handleCurrentPage" prev-text="上一页" next-text="下一页" />
        </div>
        </div>
      </div>
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
        pin: '1234',
        baseData: {},
        tableTit: [
            {
              title: '企业员工',
              key: 'realName'
            },
            {
              title: '手机号码',
              key: 'telPhone'
            },
            {
              title: '验证状态',
              key: 'auditStateName'
            },
            {
              title: '授权时间',
              key: 'createdOn'
            },
            {
              title: '权限授权',
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
                              marginRight: '5px'
                          },
                          on: {
                              click: () => {
                                  this.authfy(params)
                              }
                          }
                      }, '模板授权'),
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
        }
  		}
  	},
  	components: {

  	},
  	created(){
  		this.token = this.$cookieStore.getCookie( 'token');
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
      authfy(params){
        console.log(params)
      }
    }
}
</script>
<style lang="less">
</style>
