<template>
	<div class="companyrecord">
		<h2 class="contracttit">公司登记（备案）申请书</h2>
		<h3 class="subcontracttit">注：请仔细阅读本申请书《填写说明》，按要求填写。</h3>
		<div class="maintable">
			<div class="addsignperson" @click="addSignPerson">添加签署人</div>
			<Row>
		        <Col span="24" class="szl-label" style="border-right: none;font-weight: bold;color: #000000;">基本信息</Col>
		    </Row>
			<Row>
		        <Col span="4" class="szl-label">名称</Col>
		        <Col span="20" class="szl-blank">
					<Input v-model="contractData.L_CompanyForTheRecord.ClientName" placeholder="输入企业名称" style="width: 300px" />
		    	</Col>
		    </Row>
		    <Row>
		        <Col span="4" class="szl-label">名称预先核准文号</Col>
		        <Col span="20" class="szl-blank">
					<Input v-model="contractData.L_CompanyForTheRecord.MessageNo" placeholder="输入企业名称" style="width: 300px" />
		    	</Col>
		    </Row>
		    <Row>
		        <Col span="4" class="szl-label">住所</Col>
		        <Col span="20" class="szl-blank">
					<Input v-model="contractData.L_CompanyForTheRecord.Address" placeholder="输入企业名称" style="width: 300px" />
		    	</Col>
		    </Row>
		    <Row>
		        <Col span="4" class="szl-label">经营场所</Col>
		        <Col span="20" class="szl-blank">
					<Input v-model="contractData.L_CompanyForTheRecord.BusinessAddress" placeholder="输入企业名称" style="width: 300px" />
		    	</Col>
		    </Row>
		    <Row>
		        <Col span="4" class="szl-label">联系电话</Col>
		        <Col span="4" class="szl-blank szl-borderright">
		    		<Input v-model="contractData.L_CompanyForTheRecord.Phone" placeholder="输入企业名称" style="width: 150px" />
		    	</Col>
		        <Col span="4" class="szl-label">邮政编码</Col>
		        <Col span="4" class="szl-blank szl-borderright">
					<Input v-model="contractData.L_CompanyForTheRecord.ZipCode" placeholder="输入企业名称" style="width: 150px" />
		    	</Col>
		        <Col span="4" class="szl-label">从业人数</Col>
		        <Col span="4" class="szl-blank">
		    		<Input v-model="contractData.L_CompanyForTheRecord.EmployeesNumber" placeholder="输入企业名称" style="width: 150px" />
		    	</Col>
		    </Row>
			<template v-if='initData.BusinessType==0 || initData.BusinessType==3'>
				
			    <Row>
			        <Col span="24" class="szl-label" style="border-right: none;font-weight: bold;color: #000000;"><Checkbox v-model="initData.BusinessTypeArrow[0]" @on-change="checkBusType(0)">设立</Checkbox></Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">法定代表人姓名</Col>
			        <Col span="4" class="szl-blank szl-borderright"><Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.LegalName" placeholder="输入法定代表人姓名" style="width: 150px" /></Col>
			        <Col span="6" class="szl-label">职务</Col>
			        <Col span="10" class="szl-blank">
			        	<RadioGroup v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.Position">
					        <Radio v-for="item in initData.setPosition" :label="item.value" :key="item.value">
					        	<span>{{item.label}}</span>
					        </Radio>
					    </RadioGroup>
			        </Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">注册资本</Col>
			        <Col span="4" class="szl-blank szl-borderright"><Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.RegisteredMoney" placeholder="输入注册资本" style="width: 150px" /></Col>
			        <Col span="6" class="szl-label">公司类型</Col>
			        <Col span="10" class="szl-blank">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.CompanyType" placeholder="输入公司类型" style="width: 300px" />
			    	</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">联络人</Col>
			        <Col span="4" class="szl-blank szl-borderright">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.ContactName" placeholder="输入联络人" style="width: 150px" />
			    	</Col>
			        <Col span="6" class="szl-label">设立方式</Col>
			        <Col span="10" class="szl-blank">
			        	<RadioGroup v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.SetupWay">
			                <Radio v-for="item in initData.setUpWay" :label="item.value" :key="item.value">
			                	<span>{{item.label}}</span>
			                </Radio>
			            </RadioGroup>
			        </Col>
			    </Row>
			    <Row style="height: 200px;">
			        <Col span="4" class="szl-label" style="line-height: 200px;">经营范围</Col>
			        <Col span="20" class="szl-blank" style="height: 200px;box-sizing:border-box;padding:20px;line-height: 24px;">
			        	<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.BusinessScope" type="textarea" :rows="10" placeholder="输入经营范围" />
			        </Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">经营期限</Col>
			        <Col span="4" class="szl-borderright" style="font-weight: bold;color: #000000;padding-left: 20px;">
			        	<RadioGroup v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.BusinessTimeType">
			                <Radio label="0"><span>5年</span></Radio>
			                <Radio label="1"><span>长期</span></Radio>
			            </RadioGroup>
			        </Col>
			        <Col span="4" class="szl-label">申请执照副本数量</Col>
			        <Col span="4" class="szl-blank szl-borderright">
			        	<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.CopyNumber" placeholder="输入申请执照副本数量" style="width: 150px" />
			        </Col>
			        <Col span="4" class="szl-label">申领电子营业执照</Col>
			        <Col span="4" style="font-weight: bold;color: #000000;padding-left: 20px;">
			        	<RadioGroup v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordSetUp.IsElectronic">
			                <Radio label="true"><span>是</span></Radio>
			                <Radio label="false"><span>否</span></Radio>
			            </RadioGroup>
			        </Col>
			    </Row>
			</template>

			<template v-if='initData.BusinessType==1 || initData.BusinessType==3'>
				
			    <Row>
			        <Col span="24" class="szl-label" style="border-right: none;font-weight: bold;color: #000000;"><Checkbox v-model="initData.BusinessTypeArrow[1]" @on-change="checkBusType(1)">变更</Checkbox></Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">变更项目</Col>
			        <Col span="10" class="szl-label">原登记内容</Col>
			        <Col span="10" class="szl-label" style="border-right: none;">申请变更登记内容</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">变更项目</Col>
			        <Col span="10" class="szl-blank szl-borderright"  style="text-align: center;text-indent: 0em;">
			    		<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.OriginalName" placeholder="输入企业名称" style="width: 300px" />
			    	</Col>
			        <Col span="10" class="szl-blank" style="border-right: none;text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.ChangeName" placeholder="输入企业名称" style="width: 300px" />
			    	</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">住所</Col>
			        <Col span="10" class="szl-blank szl-borderright"  style="text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.OriginalAddress" placeholder="输入企业名称" style="width: 300px" />
			    	</Col>
			        <Col span="10" class="szl-blank" style="border-right: none;text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.ChangeAddress" placeholder="输入企业名称" style="width: 300px" />
			    	</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">注册资本<em class="szl-redtxt">(增资填写)</em></Col>
			        <Col span="10" class="szl-blank szl-borderright"  style="text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.OriginalAddCapital" placeholder="输入企业名称" style="width: 300px" />
			    	</Col>
			        <Col span="10" class="szl-blank" style="border-right: none;text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.ChangeAddCapital" placeholder="输入企业名称" style="width: 300px" />
			    	</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">注册资本<em class="szl-redtxt">(减资填写)</em></Col>
			        <Col span="10" class="szl-blank szl-borderright"  style="text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.OriginaDeletelCapital" placeholder="输入企业名称" style="width: 300px" />
			    	</Col>
			        <Col span="10" class="szl-blank" style="border-right: none;text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.ChangeDeleteCapital" placeholder="输入企业名称" style="width: 300px" />
			    	</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">股东名称</Col>
			        <Col span="10" class="szl-blank szl-borderright"  style="text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.LCompanyForTheRecordChangeDetail[0].OriginalShareholdersName" placeholder="输入股东名称" style="width: 300px" />
			   		</Col>
			        <Col span="10" class="szl-blank" style="border-right: none;text-align: center;text-indent: 0em;">
						<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordChange.LCompanyForTheRecordChangeDetail[0].ChangeShareholdersName" placeholder="输入股东名称" style="width: 300px" />
			    	</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">-</Col>
			        <Col span="10" class="szl-blank szl-borderright"  style="text-align: center;text-indent: 0em;">-</Col>
			        <Col span="10" class="szl-blank" style="border-right: none;text-align: center;">-</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">-</Col>
			        <Col span="10" class="szl-blank szl-borderright"  style="text-align: center;text-indent: 0em;">-</Col>
			        <Col span="10" class="szl-blank" style="border-right: none;text-align: center;">-</Col>
			    </Row>
			</template>
			
			<template v-if='initData.BusinessType==2 || initData.BusinessType==3'>
				
			    <Row>
			        <Col span="24" class="szl-label" style="border-right: none;font-weight: bold;color: #000000;"><Checkbox v-model="initData.BusinessTypeArrow[2]" @on-change="checkBusType(2)">备案</Checkbox></Col>
			    </Row>
			    <div class="specialrow">
			    	<div class="speleft">
			    		<div class="itemtxt">
			    			<label>分公司</label>
				            <RadioGroup v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.BranchType">
				                <Radio label="0"><span>增设</span></Radio>
				                <Radio label="1"><span>注销</span></Radio>
				            </RadioGroup>
	    				</div>
			    	</div>
			    	<div class="speright">
			    		<div class="rightitem">
			    			<div class="itemlabel">
			    				<div class="itemtxt">
			    					名称
			    				</div>
			    			</div>
			    			<div class="itemblank">
			    				<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.BranchName" placeholder="输入名称" style="width: 200px" />
			    			</div>
			    			<div class="itemlabel">
			    				<div class="itemtxt">
			    					注册号/统一社会信用代码
			    				</div>
			    			</div>
			    			<div class="itemblank" style="border-right: none;">
			    				<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.BranchMessageNo" placeholder="输入注册号" style="width: 200px" />
			    			</div>
			    		</div>
			    		<div class="rightitem">
			    			<div class="itemlabel">
			    				<div class="itemtxt">
			    					登记机关
			    				</div>
			    			</div>
			    			<div class="itemblank">
			    				<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.RegistrationAuthority" placeholder="输入登记机关" style="width: 200px" />
			    			</div>
			    			<div class="itemlabel">
			    				<div class="itemtxt">
			    					登记日期
			    				</div>
			    			</div>
			    			<div class="itemblank" style="border-right: none;">
			    				<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.RegistrationDate" placeholder="输入登记机关" style="width: 200px" />
			    			</div>
			    		</div>
			    	</div>
			    </div>
			    <div class="specialrow">
			    	<div class="speleft">
			    		<div class="itemtxt">
			    			<label>清算组</label>
	    				</div>
			    	</div>
			    	<div class="speright">
			    		<div class="rightitem">
			    			<div class="itemlabel">
			    				<div class="itemtxt">
			    					成员
			    				</div>
			    			</div>
			    			<div class="itemblank" style="width: 400px;border-right: none;">
			    				<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.Members" placeholder="输入登记成员" style="width: 300px" />
			    			</div>
			    		</div>
			    		<div class="rightitem">
			    			<div class="itemlabel">
			    				<div class="itemtxt">
			    					负责人
			    				</div>
			    			</div>
			    			<div class="itemblank">
			    				<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.MembersHead" placeholder="输入负责人" style="width: 150px" />
			    			</div>
			    			<div class="itemlabel">
			    				<div class="itemtxt">
			    					联系电话
			    				</div>
			    			</div>
			    			<div class="itemblank" style="border-right: none;">
			    				<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.HeadPhone" placeholder="输入联系电话" style="width: 150px" />
			    			</div>
			    		</div>
			    	</div>
			    </div>
			    <Row>
			        <Col span="4" class="szl-label">章程</Col>
			        <Col span="20" class="szl-blank">
			            <RadioGroup v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.ArticlesAssociation">
			                <Radio label="0"><span>修改后的章程</span></Radio>
			                <Radio label="1"><span>章程修正案</span></Radio>
			            </RadioGroup>
			        </Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-label">其他备案事项</Col>
			        <Col span="10" class="szl-label">原备案内容</Col>
			        <Col span="10" class="szl-label" style="border-right: none;">申请变更备案内容</Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-blank szl-borderright">
			        	<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.LCompanyForTheRecordRecordDetail[0].RecordMatters" placeholder="输入其他备案事项" style="width: 150px" />
			        </Col>
			        <Col span="10" class="szl-blank szl-borderright">
			        	<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.LCompanyForTheRecordRecordDetail[0].OriginalContent" placeholder="输入原备案内容" style="width: 300px" />
			        </Col>
			        <Col span="10" class="szl-blank" style="border-right: none;">
			        	<Input v-model="contractData.L_CompanyForTheRecord.LCompanyForTheRecordRecord.LCompanyForTheRecordRecordDetail[0].ChangeContent" placeholder="输入申请变更备案内容" style="width: 300px" />
			        </Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-blank szl-borderright"></Col>
			        <Col span="10" class="szl-blank szl-borderright"></Col>
			        <Col span="10" class="szl-blank" style="border-right: none;"></Col>
			    </Row>
			    <Row>
			        <Col span="4" class="szl-blank szl-borderright"></Col>
			        <Col span="10" class="szl-blank szl-borderright"></Col>
			        <Col span="10" class="szl-blank" style="border-right: none;"></Col>
			    </Row>
			</template>
		    <div class="inscription">
		    	<h2 class="instit">申请人声明</h2>
		    	<div class="inscon">
		    		<p class="instxt">本公司依照《公司法》、《公司登记管理条例》、《厦门经济特区商事登记条例》规定申请登记、备案，提交材料真实有效。通过联络人登录厦门市商事主体登记及信用信息公示平台向登记机关报送、向社会公示的企业信息为本企业提供、发布的信息，信息真实、有效。</p>
		    		<div class="insfooter">
		    			<div class="footitem">
		    				<div class="foottxt">
		    					法定代表人签字：
		    					<em style="color:#ffffff;">guid</em>
		    					<div id="guid"></div>
		    				</div>
		    				<div class="foottxt">
		    					（清算组负责人）签字：
		    					<em>洪××（签字）</em>
		    				</div>
		    			</div>
		    			<div class="footitem">
		    				<div class="foottxt">
		    					公司盖章
		    					<em>洪××（签字）</em>
		    				</div>
		    				<div class="foottxt">
		    					(201X年X月X日)
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    </div>
			<Row>
				<Col span="24" class="szl-blank" style="padding-left: 0; display: flex;justify-content: center;align-items: center;">
					<Button type="success"  style="width: 15%;height: 80%;" @click="saveBtn">保存</Button>
				</Col>
			</Row>
		</div>
		<Contributive></Contributive>
		<Proxy></Proxy>
		<Decision></Decision>
		<Modal
            v-model="editState"
            title="签署人信息"
            :loading="true"
            @on-ok="editConfirm">
            <div class="editarea">
         		<Form ref="signData[index]" :model="signData[index]" v-for="(item,index) in signData">
         			<h2 class="edittit">{{item.titleName}}</h2>
                    <FormItem :label="subitem.showName" v-for="subitem in item.tests" :label-width="80">
                        <Input v-if="subitem.type == 1"  v-model="finaData.SignParts[index][subitem.fieldName]" style="width: 350px"/>
                        <Select v-if="subitem.type == 5" v-model="finaData.SignParts[index][subitem.fieldName]" style="width: 350px">
                            <Option :value="subchilditem.key" v-for="subchilditem in subitem.dictionarys">{{subchilditem.value}}</Option>
                        </Select>
                        <Input v-if="subitem.type == 98||subitem.type==99" disabled v-model="finaData.SignParts[index][subitem.fieldName]" style="width: 350px"/>
                        <!-- <DatePicker v-if="item.type == 12" v-model="editPostData[item.fieldName]" type="datetime" placeholder="Select date and time" style="width: 300px"></DatePicker> -->
                    </FormItem>
                </Form>
            </div>
        </Modal>
	</div>	
</template>
<script>
	import Contributive from './Contributive.vue'
	import Proxy from './Proxy.vue'
	import Decision from './Decision.vue'
	import Contract from '@/api/contract/companychange';
	import Model from '@/api/model/model';
	let Base64 = require('js-base64').Base64;
	export default {
		data() {
	 		return {
	 			initData:{
	 				BusinessType: 3,
	 				BusinessTypeArrow: [false,false,false],
	 				setPosition:[
			          {
			            label:'董事长',
			            value:'0'
			          },{
			            label:'执行董事',
			            value:'1'
			          },{
			            label:'经理',
			            value:'2'
			          }
			        ],
			        setUpWay:[
			        	{
			            	label:'发起设立',
			            	value:'0'
			          	},{
			            	label:'募集设立',
			            	value:'1'
			          	},
			        ]
	 			},
				contractData: {
					"L_CompanyForTheRecord": {
						"ClientName": "任我游",
						"MessageNo": "1585485455",
						"Address": "厦门湖里",
						"BusinessAddress": "厦门湖里",
						"Phone": "15854585454",
						"ZipCode": "3524",
						"EmployeesNumber": 10,
						"BusinessType": 1,
						"LCompanyForTheRecordSetUp": {
							"FkName":"ForTheRecordId",
							"LegalName": "法定代表人姓名",
							"Position": "0",
							"RegisteredMoney": "300",
							"CompanyType": "公司类型",
							"ContactName": "联络人",
							"SetupWay": "0",
							"BusinessScope": "经营范围",
							"BusinessTimeType": "0",
							"BusinessTimeYear": "6",
							"CopyNumber": "30",
							"IsElectronic": "true"
						},
						"LCompanyForTheRecordChange": {
							"FkName":"ForTheRecordId",
							"OriginalName": "原登记名称",
							"ChangeName": "变更后登记名称",
							"OriginalAddress": "原登记地址",
							"ChangeAddress": "变更后登记地址",
							"OriginalAddCapital": "400",
							"ChangeAddCapital": "500",
							"OriginaDeletelCapital": "300",
							"ChangeDeleteCapital": "200",
							"LCompanyForTheRecordChangeDetail": [{
								"FkName":"ForTheRecordChangeId",
								"OriginalShareholdersName": "原股东名称",
								"ChangeShareholdersName": "变更后股东名称"
							}]
						},
						"LCompanyForTheRecordRecord": {
							"FkName":"ForTheRecordId",
							"BranchType": "0",
							"BranchName": "名称",
							"BranchMessageNo": "注册号",
							"RegistrationAuthority": "登记机关",
							"RegistrationDate": "登记日期",
							"Members": "成员",
							"MembersHead": "负责人",
							"HeadPhone": "联系电话",
							"ArticlesAssociation": "0",
							"LCompanyForTheRecordRecordDetail": [{
								"FkName":"ForTheRecordRecordId",
								"RecordMatters": "其他备案事项",
								"OriginalContent": "原备案内容",
								"ChangeContent": "申请变更备案内容"
							}]
						},
						"LCompanyForTheRecordShareholders": {
							"FkName":"ForTheRecordId",
							"ShareholdersName": "股东名称或姓名",
							"DocumentType": "证件类型",
							"DocumentNo": "证件号码",
							"CapitalDate": "认缴时间",
							"CapitalType": "出资方式",
							"CapitalAmount": "300",
							"CapitalProportion": "出资比例"
						}
					}
				},
				saveData:{},
				finaData:{
					"EcDate": "",
					"SignParts": [], 
					"Contract": {
						"ECTSYSID": "aa0367d6-2275-4c88-b85d-ba30189aeed1",
						"CONTRACTTYPEID": "28809B4A-73C1-4752-A4E8-C9EE4149A02D"
					},
					"Token": ''
				},
				editState: false,
				signData:[]
			}
	 	},
	 	components:{
            Contributive,Proxy,Decision
        },
        created(){
            this.finaData.Token = this.$cookieStore.getCookie( 'token');
            this.getParams();
        },
        mounted() {

        },
        methods: {
        	getParams () {
		        // this.id = this.$route.query.house_id;
		        console.log(this.$route.query.Guid,this.$route.query.conGuid)
		        Contract.getSignPerson(this.$route.query.Guid,this.$route.query.conGuid,this.finaData.Token).then((res) => {
        			console.log(res);
        			this.signData = res.message.content;
        			this.signPersonInit(this.signData);
        		}).catch(error => {})
		    },
        	checkBusType(index) {
        		if(index == 0){
        			this.initData.BusinessType = 0;
        		}
        		if(index == 1){
        			this.initData.BusinessType = 1;
        		}
        		if(index == 2){
        			this.initData.BusinessType = 2;
        		}
        		if(!this.initData.BusinessTypeArrow[0]&&!this.initData.BusinessTypeArrow[1]&&!this.initData.BusinessTypeArrow[2]){
        			this.initData.BusinessType = 3;
        		}
        	},
        	saveBtn(){
        		this.contractData.L_CompanyForTheRecord.BusinessType = this.initData.BusinessType;
        		if(this.initData.BusinessType == 3){
        			this.$Message.error('请勾选公司登记的方式！');
        		}else {
	        		if(this.initData.BusinessType == 0){
	        			this.saveData = JSON.parse(JSON.stringify(this.contractData));
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordChange');
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordRecord');
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordShareholders');
						console.log(this.saveData)
						console.log(this.contractData)
						this.submit(this.saveData)
	        		}
	        		if(this.initData.BusinessType == 1){
	        			this.saveData = JSON.parse(JSON.stringify(this.contractData));
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordSetUp');
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordRecord');
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordShareholders');
	        			console.log(this.saveData.L_CompanyForTheRecord)
	        			console.log(this.contractData)
	        			this.submit(this.saveData)
	        		}
	        		if(this.initData.BusinessType == 2){
	        			this.saveData = JSON.parse(JSON.stringify(this.contractData));
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordSetUp');
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordChange');
	        			this.$delete(this.saveData.L_CompanyForTheRecord,'LCompanyForTheRecordShareholders');
	        			console.log(this.saveData)
	        			console.log(this.contractData)
	        			this.submit(this.saveData)
	        		}
        		}
        	},
        	submit(obj){
        		console.log(Base64.encode(JSON.stringify(obj)));
        		this.finaData.EcDate = Base64.encode(JSON.stringify(obj))
        		console.log(this.finaData)
        		Contract.companyMark(this.finaData).then((res) => {
        			console.log(res);
        			if(res.statusCode == 0){
        				this.$Message.success('新增成功!');
        			}else {
        				this.$Message.error('新增失败' + res.message);
        			}
        		}).catch(error => {})
        	},
        	editConfirm(){
        		console.log(this.finaData.SignParts)
        		this.editState = false;
        	},
        	addSignPerson(){
        		this.editState = true;
        	},
        	signPersonInit(array){
        		for( var i=0; i < array.length; i++ ) {
        			this.finaData.SignParts.push({});
        			for( var j=0; j < array[i].tests.length; j++ ) {
        				this.$set(this.finaData.SignParts[i], array[i].tests[j].fieldName, array[i].tests[j].value)
        			}
                }
                console.log(this.finaData.SignParts)
        	}
        }
	}
</script>
<style>
	
</style>