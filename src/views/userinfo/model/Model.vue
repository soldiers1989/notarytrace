<template>
	<div class="model">
		<div class="modelcon clearfix">
            <div class="modelleft">
                <Menu accordion ref="menu" @on-select='getMenuName' @on-open-change='onMenuChange' mode="vertical" width="250">
                    <template v-for="(firstMenu,index) in leftMenuList">
                        <Submenu v-if="firstMenu.Childs" :name="firstMenu.idd">
                            <template slot="title">
                                <Icon type="ios-analytics" />
                                {{firstMenu.name}}
                            </template>
                            <template v-for="(secondMenu,secindex) in firstMenu.Childs">
                                <Submenu v-if="secondMenu.Childs" :name="secondMenu.idd">
                                    <template slot="title">{{secondMenu.name}}</template>
                                    <MenuItem :name="thirdMenu.idd" v-for="(thirdMenu,thirdindex) in secondMenu.Childs">{{thirdMenu.name}}</MenuItem>
                                </Submenu>
                                <MenuItem v-else :name="secondMenu.idd"
                                     :key="secondMenu.name"
                                     v-html="secondMenu.name">
                                </MenuItem>
                            </template>
                        </Submenu>
                        <MenuItem v-else :name="firstMenu.idd" :key="firstMenu.name" v-html="firstMenu.name">
                        </MenuItem>
                    </template>
                </Menu>
            </div>
            <div class="modelright" v-show="initData.subtit != ''">
                <router-view :initData="initData" ref="childModel"/>
            </div>
		</div>
	</div>	
</template>
<script>
	import $ from 'jquery';
    import Model from '@/api/model/model';
	export default {
		data() {
	 		return {
	 			initData: {
                    titList: [],
                    subtit:'',
                    dictionary:{},
                    menuname: '',
                    ecTypeWarrantGuid: ''
                },
                leftMenuList:[]
	 		}
	 	},
	 	components:{
            
        },
        created(){
            this.token = this.$cookieStore.getCookie( 'token');
        },
        mounted() {
            this.getLeftMenu(this.token);
        },
        methods: {
            //获取左侧菜单数据
            getLeftMenu(token){
                Model.leftMenu(token).then((res) => {
                    console.log(res);
                    console.log(res.message.menu);
                    this.initData.dictionary = res.message.dictionary;
                    this.leftMenuList = res.message.menu;
                    console.log(this.leftMenuList);
                }).catch(error => {})
            },
            //获取主表表格数据
            getTableList(id, pageindex, pagesize){
                Model.tableList(id, pageindex, pagesize).then((res) => {
                    console.log(res);
                    this.baseData = res.message;
                    this.innitSearchData(res.message);
                    this.initData.pageinfo.total_page = res.message.pageMessage.pageTotal * 10;
                    var tableMes = JSON.parse(res.message.tableMessage);
                    console.log(tableMes);
                    tableMes.tableHead.push(this.opration);
                    this.tableTit = tableMes.tableHead;
                    this.tableData = tableMes.tableBody;
                }).catch(error => {})
            },
            //左侧菜单合同选择事件
            getMenuName(name){
                console.log(name);
                this.initData.menuname = name;
                this.$router.push({
                    path: '/model'
                })
                this.initData.ecTypeWarrantGuid = name;
                for(let key in this.initData.dictionary){
                    if(name == key){
                        this.initData.subtit = this.initData.dictionary[key];
                    }
                }
                if(this.$refs.childModel.getTableList){
                    this.$refs.childModel.getTableList(name, 1, 10);
                }
            },
            //左侧菜单选择事件
            onMenuChange(namelist){
                console.log(namelist);
                this.initData.titList = [];
                console.log(this.initData.titList)
                for (var i = 0; i < namelist.length; i++) {
                    for(let key in this.initData.dictionary){
                        if(namelist[i] == key){
                            this.initData.titList.push(this.initData.dictionary[key])
                        }
                    }
                }
                if(namelist.length < 3){
                    this.initData.subtit = '';
                }
            }
        }
	}
</script>
<style>
	
</style>