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
            <li class="listitem listactive">
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
        <div class="righttit">企业认证</div>
        <div class="detailinfo">
            <div class="infotit">
                <div class="infotitxt">企业基本信息</div>
            </div>
            <div class="infowrap">
                <div class="infoitem">
                    <div class="infolabel">营业执照号</div>
                    <div class="infotxt">{{baseData.businessLicenseNo }}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">企业名称</div>
                    <div class="infotxt">{{baseData.companyName}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">注册地址</div>
                    <div class="infotxt">{{baseData.registAddress}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">法定人代表</div>
                    <div class="infotxt">{{baseData.legalPerson}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">注册资金</div>
                    <div class="infotxt">{{baseData.registCapital}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">法人手机号</div>
                    <div class="infotxt">{{baseData.legalPhone}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">法人证件类型</div>
                    <div class="infotxt">{{baseData.legalCardType}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">法人证件号</div>
                    <div class="infotxt">{{baseData.legalCardNo}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">公司类型</div>
                    <div class="infotxt">{{baseData.companyType}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">登记机关</div>
                    <div class="infotxt">{{baseData.registAuthority}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">成立日期</div>
                    <div class="infotxt">{{baseData.establishDate}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">营业期限</div>
                    <div class="infotxt">{{baseData.businessTerm}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">经营范围</div>
                    <div class="infotxt">{{baseData.businessScope}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">税务登记号</div>
                    <div class="infotxt">{{baseData.taxRegistNo}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">组织机构代码证</div>
                    <div class="infotxt">{{baseData.organizationalCode}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">联系地址</div>
                    <div class="infotxt">{{baseData.contactAddress}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">邮编</div>
                    <div class="infotxt">{{baseData.postalCode}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">电话</div>
                    <div class="infotxt">{{baseData.telephone}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">传真</div>
                    <div class="infotxt">{{baseData.fax}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">基本账户开户行</div>
                    <div class="infotxt">{{baseData.openingBank}}</div>
                </div>
                <div class="infoitem">
                    <div class="infolabel">基本账户号</div>
                    <div class="infotxt">{{baseData.bankAccount}}</div>
                </div>
            </div>
        </div>
        <div class="detailinfo">
            <div class="infotit">
                <div class="infotitxt">企业相关材料（双击图片显示大图）</div>
            </div>
            <div class="imgwrap">
              <img :src="baseData.businessLicenseIMG" alt="">
              <img :src="baseData.busLicIMG" alt="">
              <img :src="baseData.legalCardFaceIMG" alt="">
              <img :src="baseData.legalCardOppoIMG" alt="">
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
  	name: 'home',
  	data() {
  		return {
        token:'',
        timestamp: '',
        pin: '1234',
        baseData: {}
  		}
  	},
  	components: {

  	},
  	created(){
  		this.token = this.$cookieStore.getCookie( 'token');
      this.timestamp = parseInt(new Date().getTime()/1000);
      this.GetCryptSignHashString(this.timestamp, this.pin)
  	},
  	mounted() {
      console.log(this.timestamp)
    },
  	methods: {
  		EnterpriseCertification(toKen, timeStamp, signal) {
        Company.EnterpriseCertification(toKen, timeStamp, signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
              this.baseData = res.message;
            }else {
              this.$Message.error(res.message);
            }
        })
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
                  _this.EnterpriseCertification(_this.token,txt,data.rlt_data)
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
    },
}
</script>
<style lang="less">
</style>
