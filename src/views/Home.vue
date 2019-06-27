<template>
  <div class="home">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  	name: 'home',
  	data() {
		return {
      
		}
	},
  	components: {
    	Header,Footer
  	},
  	created(){
  		
  	},
  	mounted() {
  	},
  	methods: {
    },
}
</script>
<style lang="less">
	
</style>
