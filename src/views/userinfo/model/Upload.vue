<template>
    <div class="idupload">
        <div class="uploadtit">
            上传身份证正反面图片
        </div>
        <div class="upimgarea" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url" alt="">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <div class="uploadarea">
            <div class="uploadcon">
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖入上传</p>
                    </div>
                </Upload>
                <div class="mobilebtn">
                    <Button type="primary">手机上传</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                uploadList: []
            }
        },
        components:{
            
        },
        created(){

        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
        },
        methods: {
            handleView (name) {
                // this.imgName = name;
                // this.visible = true;
                console.log(name);
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                console.log(res, file)
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件名为 ' + file.name + ' 的格式不正确, 请选择 jpg 或 png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件大小过大',
                    desc: '文件名为  ' + file.name + ' 的体积过大, 要求小于 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多五个文件同时上传'
                    });
                }
                return check;
            }
        }
    }
</script>
<style lang="less">
    .idupload {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        .uploadtit {
            width: 100%;
            font-size: 14px;
            color: #999999;
        }
        .upimgarea {
            position: relative;
            width: 301px;
            height: 201px;
            margin: 20px auto 0;
            box-sizing: border-box;
            border: 1px solid #E6E6E6;
            padding: 20px;
            img {
                display: block;
                width: 260px;
                height: 160px;
            }
        }
        .uploadarea {
            width: 301px;
            margin: 20px auto 0;
            box-sizing: border-box;
            border: 1px solid #E6E6E6;
            padding: 20px;
            .uploadcon {
                width: 260px;
            }
        }
        .mobilebtn {
            width: 100%;
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
        }
        .demo-upload-list-cover{
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.6);
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 200px
        }
        .upimgarea:hover .demo-upload-list-cover{
            display: block;
        }
        .demo-upload-list-cover i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
    }
</style>