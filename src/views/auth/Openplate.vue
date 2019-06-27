<template>
	<div class="openarea">
		<div class="openpic"></div>
		<Login></Login>
	</div>
</template>
<script>
    import Login from './Login.vue'
	var interval = null;
	export default {
		data() {
	 		return {
	 			formInline: {
                    verifymode: '0',
                    verifycode: ''
                },
	 		}
	 	},
	 	components:{
            Login
        },
        mounted() {
        	
        },
        methods: {
        
        }
	}
</script>