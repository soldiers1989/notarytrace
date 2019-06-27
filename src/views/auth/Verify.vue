<template>
	<div class="verifyarea">
        <div class="verifywrap">
            <div class="verifypic"></div>
            <div class="verifycon">
                <h2 class="authtit">验证中心</h2>
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="verifycode">
                        <Input type="text" v-model="formInline.verifycode" placeholder="请输入公证码">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem style="margin-bottom: 0;">
                        <Button type="primary" long @click="handleSubmit('formInline')">开始验证</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
	</div>
</template>
<script>
    import $ from 'jquery'; 
	export default {
		data() {
	 		return {
	 			formInline: {
                    verifymode: '0',
                    verifycode: ''
                },
                verifyList: [],
                ruleInline: {
                    verifycode: [
                        { required: true, message: '请填写公证码', trigger: 'blur' },
                        // { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
                screenHeight: 0
	 		}
	 	},
	 	components:{
            
        },
        mounted() {
            
        },
        methods: {
            onResize(){
                this.screenHeight = $(window).height()- 384;
                window.onresize = () => {
                    return (() => {
                        this.screenHeight = $(window).height() - 384;
                    })()
                }
            }
        }
	}
</script>