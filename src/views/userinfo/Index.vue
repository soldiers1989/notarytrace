<template>
  <div class="userindex">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/minHeader.vue'
import Footer from '@/components/minFooter.vue'
import $ from 'jquery';
export default {
  	name: 'home',
  	data() {
  		return {
  			screenHeight: 0
  		}
  	},
  	components: {
    	Header,Footer
  	},
  	created(){
  		
  	},
  	mounted() {
  		this.onResize();
  	},
  	methods: {
  		onResize(){
        this.screenHeight = $(window).height();
        window.onresize = () => {
              return (() => {
            this.screenHeight = $(window).height();
              })()
          }
      }
    },
}
</script>
<style lang="less">
	.userindex {
    background-color: #f5f5f5;
  }
</style>
