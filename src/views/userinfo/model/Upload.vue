<template>
    <div class="idupload">
        <template v-if="upType == 'pics'">      
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
                        type="drag"
                        action="http://dev.zmyou.com:8030/PostFile?BussName=L05vdGFyeUJyaWRnZS9IV0hUX0dvb2RzQ29uc2lnbm1lbnROb3RlLnhtbA==&PlatName=溯证签&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YW5ndW9iaWFvIiwianRpIjoiNWI1MWQ5NmMtYzUyMi00ODU3LWJhMDItNjkxZThjOGMzYmQ0IiwiaWF0IjoiMjAxOS83LzIgMjo0MjozMyIsImV4cCI6MTU2MjAzNjkzMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MjU5MiIsImF1ZCI6IkFwaSJ9.vd_eZmif1_NnHtaLZVEThVlAYup1zfe8imBA2VBEZ54">
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
        </template>
        <template v-else>      
            <div class="uploadtit">
                上传附件
            </div>
            <ul class="ivu-upload-list">
                <li class="ivu-upload-list-file ivu-upload-list-file-finish" v-for="item in subuploadList">
                    <template v-if="item.status === 'finished'">
                        <span>
                            <i class="ivu-icon ivu-icon-ios-document"></i> {{item.name}}
                        </span>
                        <i class="ivu-icon ivu-icon-ios-close ivu-upload-list-remove"  @click="subhandleRemove(item)"></i>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </li>
            </ul>
            <div class="uploadarea">
                <div class="uploadcon">
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :default-file-list="subdefaultList"
                        :on-success="subhandleSuccess"
                        :format="['doc','docx','pdf','xls','xlsx','jpg','jpeg','png']"
                        :max-size="3072"
                        :on-format-error="subhandleFormatError"
                        :on-exceeded-size="subhandleMaxSize"
                        :before-upload="subhandleBeforeUpload"
                        multiple
                        type="drag"
                        action="http://dev.zmyou.com:8030/PostFile?BussName=L05vdGFyeUJyaWRnZS9IV0hUX0dvb2RzQ29uc2lnbm1lbnROb3RlLnhtbA==&PlatName=溯证签&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YW5ndW9iaWFvIiwianRpIjoiNWI1MWQ5NmMtYzUyMi00ODU3LWJhMDItNjkxZThjOGMzYmQ0IiwiaWF0IjoiMjAxOS83LzIgMjo0MjozMyIsImV4cCI6MTU2MjAzNjkzMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MjU5MiIsImF1ZCI6IkFwaSJ9.vd_eZmif1_NnHtaLZVEThVlAYup1zfe8imBA2VBEZ54">
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
        </template>
    </div>
</template>
<script>
    export default {
        props: {
            upType: {
                type: String,
                require: true
            },
            defaultData: {
                type: Array,
            },
            subDefaultData: {
                type: Array,
            },
        },
        data() {
            return {
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'multipart/form-data'
                },
                defaultList: [],
                uploadList: [],
                subdefaultList: [],
                subuploadList: []
            }
        },
        components:{
            
        },
        created(){
            this.defaultList = this.defaultData;
            this.subdefaultList = this.subDefaultData;
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
            this.subuploadList = this.$refs.upload.fileList;
            if(this.uploadList[0]){
                this.$emit('getPicsData',this.uploadList[0].fileid);
            }else {
                this.$emit('getPicsData', '');
            }
            this.$emit('getDocsData', this.formatDocs(this.subuploadList));
        },
        methods: {
            handleView (name) {
                console.log(name);
                console.log(name);
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.$emit('getPicsData','');
            },
            handleSuccess (res, file) {
                console.log(res, file);
                file.url = res.files[0].fileurl;
                file.fileid = res.files[0].fileid;
                this.$emit('getPicsData',this.uploadList[0].fileid);
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
                const check = this.uploadList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多上传1个文件'
                    });
                }
                return check;
            },
            subhandleView (name) {
                console.log(name);
                console.log(name);
            },
            subhandleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.$emit('getDocsData', this.formatDocs(this.subuploadList));
            },
            subhandleSuccess (res, file) {
                file.url = res.files[0].fileurl;
                file.fileid = res.files[0].fileid;
                file.name = res.files[0].filename;
                this.$emit('getDocsData', this.formatDocs(this.subuploadList));
            },
            subhandleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件名为 ' + file.name + ' 的格式不正确, 请选择 doc 或 docx 或 pdf.'
                });
            },
            subhandleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件大小过大',
                    desc: '文件名为  ' + file.name + ' 的体积过大, 要求小于3M.'
                });
            },
            subhandleBeforeUpload () {
                const check = this.subuploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多上传五个文件'
                    });
                }
                return check;
            },
            formatDocs(array){
                var Str = '';
                for( var i=0; i < array.length; i++ ) {
                    Str += array[i].name + '|' + array[i].fileid + ';'
                }
                return Str;
            }
        }
    }
</script>
<style lang="less">
    .idupload {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        margin-bottom: 20px;
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