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
            <li class="listitem listactive">
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
        <div class="righttit">企业盾(Ukey)管理</div>
        <div class="ukeytit">
          <div class="titleft">
            <div class="comavat">
              <img src="../../../assets/img/guowei2.png" alt="">
            </div>
            <div class="comname">
              {{ukeyInfo.companyName}}
              <span v-if="!ukeystate" style="color: #FC4037;">(请插入企业Ukey)</span>
              <span v-else style="color: #57BF6A;">(已插入Ukey)</span>
            </div>
          </div>
        </div>
        <div class="ukeycon">
          <div class="ukeyinfowrap">
            <div class="logowrap">
              <div class="logotxt">DN码：<span>{{baseData.name}}</span></div>
              <div class="logotxt">序列号：<span>{{baseData.serial_number}}</span></div>
              <div class="logotxt">颁发机构：<span>{{baseData.IssuerName}}</span></div>
              <div class="logotxt">有效期：<span>{{baseData.date_range}}</span></div>
              <div class="logotxt">公钥：<span>{{baseData.publickey}}</span></div>
            </div>
          </div>
        </div>
        <div class="ukeyopration">
          <div class="authed">已授权员工(4/10)<span class="check">查看</span></div>
          <div class="buyauth">购买授权名额</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Company from '@/api/company/company';
import $ from 'jquery';
var interval = null;
export default {
  	name: 'ukey',
  	data() {
  		return {
        ukeystate: true,
        token:'',
        timestamp: '',
        pin: '1234',
        baseData: {},
        ukeyInfo: {}
  		}
  	},
  	components: {

  	},
  	created(){
  		this.token = this.$cookieStore.getCookie( 'token');
      this.timestamp = parseInt(new Date().getTime()/1000);
      this.GetCryptSignHashString(this.timestamp, this.pin);
      // this.GetCertInfo();
      this.GetCertName();
  	},
  	mounted() {
      console.log(this.timestamp)
    },
    beforeDestroy() {
      clearInterval(interval);
    },
  	methods: {
  		UkeyCertification(toKen, timeStamp, signal) {
        Company.UkeyCertification(toKen, timeStamp, signal).then((res) => {
            console.log(res);
            if(res.statusCode == 0){
              this.GetCertInfo();
              this.ukeyInfo = res.message;
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
                  _this.UkeyCertification(_this.token,txt,data.rlt_data)
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
      GetCertInfo(){
        let _this = this;
        $.ajax({
            url: "http://localhost:9188/ETAuto199Service/GetCertInfo?jsoncallback=?",
            type: "get",
            data:null,
            dataType: "jsonp",
            success: function (data) {
                // alert(data.code+"/"+data.msg+"/"+data.rlt_data);

                console.log(data.rlt_data);
                _this.baseData = JSON.parse(data.rlt_data);
            },
            complete: function (XMLHttpRequest, textStatus) {
             var returnText = XMLHttpRequest.responseText;                    
            },
            error: function (err) {
               alert("溯证签安全盾服务访问失败！请联系管理人员！");
            } 
        });
      },
      GetCertName(){
        let _this = this;
        interval = setInterval(function () {
          $.ajax({
              url: "http://localhost:9188/ETAuto199Service/GetCertName?jsoncallback=?",
              type: "get",
              data:null,
              dataType: "jsonp",
              success: function (data) {
                  console.log(data.rlt_data)
                  if(data.rlt_data) {
                    _this.ukeystate = true;
                  }else {
                    _this.ukeystate = false;
                  }
              },
              complete: function (XMLHttpRequest, textStatus) {
               var returnText = XMLHttpRequest.responseText;                    
              },
              error: function (err) {
                 alert("溯证签安全盾服务访问失败！请联系管理人员！");
              } 
          });
        },2000)
      },
    },
    watch: {
      ukeystate:function(){
        if(this.ukeystate) {
          this.GetCryptSignHashString(this.timestamp, this.pin);
          // this.GetCertInfo();
        }else {
          this.baseData = {};
        }
      }
    }
}
</script>
<style lang="less">
</style>
