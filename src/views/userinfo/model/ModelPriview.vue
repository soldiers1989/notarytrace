<template>
  <div class="modelpriview">
    <Header></Header>
    <div class="priviewcon">
      <embed type="application/pdf" :style="{ height: pdfHeight + 'px' }" :src="pdfSrc"></embed>
      <div class="operabtn">
        <div class="btnwrap">
          <Button type="primary" icon="ios-open-outline">发起签订</Button>
          <Button type="primary" icon="ios-trash-outline">作废</Button>
          <Button type="primary" icon="ios-print-outline">打印</Button>
          <Button type="primary" icon="ios-card-outline">签订状态</Button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Model from '@/api/model/model';
import Header from '@/components/minHeader.vue'
import Footer from '@/components/minFooter.vue'
export default {
  	name: 'modelpriview',
  	data() {
		return {
        guid:'',
        token:'',
        pdfSrc:'',
        pdfHeight: 0,
  		}
  	},
  	components: {
    	Header,Footer
  	},
  	created(){
      this.getParams();
      this.token = this.$cookieStore.getCookie( 'token');
      this.GetCommonPdf(this.guid, this.token);
  	},
  	mounted() {
  	},
  	methods: {
      getParams () {
          this.guid = this.$route.query.Guid;
      },
      GetCommonPdf(guid, token){
        this.$Spin.show();
        Model.GetCommonPdf(guid, token).then((res) => {
            console.log(res);
          this.$Spin.hide();
          if(res.statusCode == 0){
            let tempstr = res.message + '?token=' + this.token;
            this.pdfHeight = Number(res.pageNumber) * 1000 + 700;
            console.log(this.pdfheight);
            this.pdfSrc = tempstr;
            console.log(this.pdfSrc);
          }else {
            this.$Message.error('合同pdf加载失败！' + res.message);
          }
        }).catch(error => {})
      }
    },
}
</script>
<style lang="less">
	.modelpriview {
    background-color: #d5d5d5;
    .priviewcon {
      position: relative;
      width: 1200px;
      margin: 0 auto;
      padding: 100px;
      embed {
        width: 100%;
        min-height: 900px;
      }
      .operabtn {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: #ffffff;
        .btnwrap {
          width: 600px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
</style>
