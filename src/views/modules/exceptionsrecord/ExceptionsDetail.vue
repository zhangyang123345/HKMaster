<template>
  <el-dialog
    title="ExceptionsDetail"
    :visible.sync="showDialog"
    width="80%"
    @close="handleClose">
    <el-form :inline="true" :model="detailForm" :rules="dataRule" ref="detailForm" label-width="90px">
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="5">
              <el-form-item label="大类" prop="exception_type2" label-width="60px">
                <el-select v-model="detailForm.exception_type2" clearable placeholder="请选择" style="width:140px" @change="init(1,1)">
                  <el-option label="品质" value="1"></el-option>
                  <el-option label="Trace" value="2"></el-option>
                  <el-option label="EHS" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="二类" prop="exception_type" label-width="60px">
                <el-select v-model="detailForm.exception_type" clearable placeholder="请选择"  style="width:140px">
                  <el-option
                    v-if="detailForm.exception_type2 === '0'"
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                  <el-option
                    v-if="detailForm.exception_type2 === '2'"
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                  <el-option
                    v-if="detailForm.exception_type2 === '1'"
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="发生日期" prop="happen_date" label-width="80px">
                <el-date-picker  style="width:22vh"
                                 v-model="detailForm.happen_date"
                                 type="datetime"
                                 placeholder="选择日期时间"
                                 align="right"
                                 :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="完成日期" prop="finish_date" label-width="80px">
                <el-date-picker style="width:22vh"
                                v-model="detailForm.finish_date"
                                type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <el-form-item label="楼栋" prop="building" label-width="60px">
                <el-select v-model="detailForm.building" clearable placeholder="请选择" style="width:140px" @change="getStation(detailForm.building)">
                  <el-option label="_E3.2F" value="1"></el-option>
                  <el-option label="_E4.1F" value="2"></el-option>
                  <el-option label="_E4.2F" value="3"></el-option>
                  <el-option label="_D4.1F" value="4"></el-option>
                  <el-option label="_A5" value="5"></el-option>
                  <el-option label="_B1.2F" value="6"></el-option>
                  <el-option label="_B4.1F" value="7"></el-option>
                  <el-option label="_B6.2F" value="8"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="区域主管" prop="dri" label-width="90px">
                <el-input v-model="detailForm.dri" style="width:21vh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="班别" prop="class_no" label-width="50px">
                <el-select v-model="detailForm.class_no" clearable placeholder="请选择" style="width:155px">
                  <el-option label="白班" value="1"></el-option>
                  <el-option label="晚班" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="稽核人" prop="ordinance_man" label-width="80px">
                <el-input v-model="detailForm.ordinance_man" style="width:22vh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <div class="traceBlock" v-if="this.detailForm.exception_type2 === '2'">
            <el-row>
              <el-col :span="6">

                <el-form-item label="专案" prop="project" label-width="60px">
                  <el-select v-model="detailForm.project" clearable placeholder="请选择" style="width:180px">
                    <el-option label="boston" value="1"></el-option>
                    <el-option label="toronto" value="2"></el-option>
                    <el-option label="zurich" value="3"></el-option>
                    <el-option label="Generva" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="原因分析" prop="analysis" label-width="80px">
                  <el-input v-model="detailForm.analysis" style="width:722px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="quantityBlock" v-if="this.detailForm.exception_type2 === '1'">
            <el-row>
              <el-col :span="6">
                <!--todo-->
                <el-form-item label="专案" prop="project" label-width="60px">
                  <el-select v-model="detailForm.project" clearable placeholder="请选择" style="width:180px">
                    <el-option label="boston" value="1"></el-option>
                    <el-option label="toronto" value="2"></el-option>
                    <el-option label="zurich" value="3"></el-option>
                    <el-option label="Generva" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="制程" prop="q_process" label-width="60px">
                  <el-select v-model="detailForm.q_process" clearable placeholder="请选择" style="width:180px">
                    <el-option label="Q3" value="1"></el-option>
                    <el-option label="Q4" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="版本" prop="version" label-width="60px">
                  <el-select type="text" v-model="detailForm.version" clearable style="width:180px">
                    <el-option label="SF" value="1"></el-option>
                    <el-option label="NSF" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="颜色" prop="color" label-width="60px">
                  <el-select type="text" v-model="detailForm.color" clearable style="width:180px">
                    <el-option label="蓝色" value="1"></el-option>
                    <el-option label="金色" value="2"></el-option>
                    <el-option label="灰色" value="1"></el-option>
                    <el-option label="银色" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="投入" prop="put_in" label-width="60px">
                  <el-input v-model="detailForm.put_in" style="width:180px"></el-input>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="膜前" prop="before_coating" label-width="60px">
                  <el-input v-model="detailForm.before_coating" style="width:180px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="膜后" prop="after_coating" label-width="60px">
                  <el-input v-model="detailForm.after_coating" style="width:180px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="不良数" prop="detailForm.total" label-width="60px">
                  {{ parseInt(detailForm.before_coating) + parseInt(detailForm.after_coating)}}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="ehsBlock" v-if="this.detailForm.exception_type2 === '0'">
            <el-row>
              <el-col :span="5">
                <el-form-item label="工站" prop="station" label-width="60px">
                  <el-select v-model="detailForm.station" clearable placeholder="请选择" style="width:140px">
                    <el-option
                      v-for="item in buildOptions"
                      :key="item.id"
                      :label="item.station"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="当事人工号" prop="client_no" label-width="90px">
                  <el-input v-model="detailForm.client_no" style="width:21vh"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="惩处" prop="pu_measures" label-width="50px">
                  <el-select type="text" v-model="detailForm.pu_measures" clearable style="width:155px">
                    <el-option label="口头警告" value="1"></el-option>
                    <el-option label="书面警告" value="2"></el-option>
                    <el-option label="书面检讨" value="3"></el-option>
                    <el-option label="解除合同" value="4"></el-option>
                    <el-option label="退回劳务公司" value="5"></el-option>
                    <el-option label="严重书面警告" value="6"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="确认人" prop="identify_man" label-width="80px">
                  <el-input v-model="detailForm.identify_man" style="width:22vh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="责任班长" prop="monitor" label-width="90px">
                  <el-input v-model="detailForm.monitor" style="width:160px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="责任股长" prop="unit_chief" label-width="90px">
                  <el-input v-model="detailForm.unit_chief" style="width:160px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="责任课长" prop="section" label-width="90px">
                  <el-input v-model="detailForm.section" style="width:160px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="责任理级" prop="manager" label-width="90px">
                  <el-input v-model="detailForm.manager" style="width:150px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="隐患类型" prop="hazard_type" label-width="90px">
                  <el-select v-model="detailForm.hazard_type" clearable placeholder="请选择" style="width:155px" @change="getOrdinance(detailForm.hazard_type)">
                    <el-option label="培训教育" value="1"></el-option>
                    <el-option label="消防应急" value="2"></el-option>
                    <el-option label="设备设施" value="3"></el-option>
                    <el-option label="电气安全" value="4"></el-option>
                    <el-option label="作业安全" value="5"></el-option>
                    <el-option label="职业健康" value="6"></el-option>
                    <el-option label="三废管理" value="7"></el-option>
                    <el-option label="化学品管理" value="8"></el-option>
                    <el-option label="5S标准化" value="9"></el-option>
                    <el-option label="施工作业" value="10"></el-option>
                    <el-option label="挂牌上锁" value="11"></el-option>
                    <el-option label="运输车辆" value="12"></el-option>
                    <el-option label="劳动纪律" value="13"></el-option>
                    <el-option label="疫情防控" value="14"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="稽核条例">
                  <el-select v-model="detailForm.ordinance" clearable placeholder="请选择"  style="width: 712px" @change="setPunish(detailForm.ordinance)">
                    <el-option
                      v-for="item in ordinance_group"
                      :key="item.id"
                      :label="item.audit_ordinance"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item>
                <el-upload
                  :show-file-list="false"
                  accept=".bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp"
                  action=""
                  multiple
                  v-if="isAuth('image:import')"
                  :on-success="fileUploadSuccess"
                  :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在上传'"
                  :before-upload="beforeFileUpload" style="display: inline">
                  <el-button  type="success" :loading="fileUploadBtnText=='正在上传'"><i class="fa fa-lg fa-level-up"
                                                                                     style="margin-right: 5px"></i>{{fileUploadBtnText}}
                  </el-button>
                </el-upload>
                <el-popover
                  placement="left"
                  width="700"
                  top="200px"
                  left="600px">
                  <div style="text-align: center; margin: 0">
                    <img  :src="requsUrl" style="width: 658px;height:567px;"/>
                  </div>
                  <el-button slot="reference" @click="seeQR(detailForm.img_url)">查看</el-button>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="已改善">
                <el-switch v-model="detailForm.delivery"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="24">
              <el-form-item label="异常描述"prop="exception_describe">
                <el-input type="textarea" v-model="detailForm.exception_describe" style="width:40vh" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="整改措施" prop="up_measures">
                <el-input v-model="detailForm.up_measures" type="textarea" style="width:40vh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="创建人">
                <el-input v-model="detailForm.create_man" :disabled="true" style="width:40vh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取 消</el-button>
      <el-button type="primary" v-if="this.formStatus !== 0" @click="submitForm('detailForm')">确 定</el-button>
    </span>

  </el-dialog>
</template>


<script>
  export default {
    // 接受父组件传递的值
    props:{
      addOrUpdateVisible:{
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        ordinance_group: [],
        ordinceOptions: [],
        buildOptions: [],
        requsUrl: '',
        // 控制弹出框显示隐藏
        showDialog: false,
        fileUploadBtnText: '上传',
        excepType: '',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        formStatus: 0,
        // todo
        detailForm: {
          color: '',
          put_in: 0,
          q_process: '',
          version: '',
          station: '',
          analysis: '',
          project: '',
          before_coating: 0,
          after_coating: 0,
          class_no: '',
          monitor: '',
          unit_chief: '',
          client_no: '',
          section: '',
          manager: '',
          hazard_type: '',
          id: '',
          exception_type: '',
          exception_describe: '',
          up_measures: '',
          happen_date: '',
          building: '',
          dri: '',
          exception_type2: '',
          ordinance: '',
          pu_measures: '',
          current_situation: 0,
          finish_date: '',
          ordinance_man: '',
          identify_man: '',
          client: '',
          img_url: '',
          create_man: '',
          audit_man: this.$store.state.user.director,
          audit_status: 0,
          delivery: false
        },
        dataRule: {
          exception_type: [
            { required: true, message: '异常类型不能为空', trigger: 'blur' }
          ],
          exception_describe: [
            { required: true, message: '异常描述不能为空', trigger: 'blur' }
          ],
          happen_date: [
            { required: true, message: '发生日期不能为空', trigger: 'blur' }
          ],
          building: [
            { required: true, message: '位置不能为空', trigger: 'blur' }
          ],
          dri: [
            { required: true, message: 'DRI不能为空', trigger: 'blur' }
          ],
          current_situation: [
            { required: true, message: '当前情况不能为空', trigger: 'blur' }
          ],
          exception_type2: [
            { required: true, message: '大类不能为空', trigger: 'blur' }
          ],
          class_no: [
            { required: true, message: '班别不能为空', trigger: 'blur' }
          ],
          up_measures: [
            { required: true, message: '整改措施不能为空', trigger: 'blur' }
          ]
        },
        options1: [{
          value: '1',
          label: '异常情况'
        }, {
          value: '2',
          label: '内部稽核'
        }, {
          value: '3',
          label: '外部稽核'
        }, {
          value: '4',
          label: '工伤事件'
        }, {
          value: '6',
          label: '违纪'
        }],
        options2: [{
          value: '7',
          label: 'Trace异常'
        }],
        options3: [{
          value: '8',
          label: '品质异常'
        }]
      }
    },
    methods: {
      setPunish (val) {
        // forEach( item in this.ordinance_group) {
        //   console.log(item.id)
        //   if (item.id === val) {
        //     this.detailForm.pu_measures = item.punishment_measure.toString()
        //     alert(this.detailForm.pu_measures)
        //   }
        // }
        for (let i= 0; i<this.ordinance_group.length - 1 ; i++){
          if (this.ordinance_group[i].id === val){
            this.detailForm.pu_measures = this.ordinance_group[i].punishment_measure.toString()
          }
        }
      },
      getStation (val) {
        this.$http({
          url: this.$http.adornUrl(`/exceptionsRecord/searchStation`),
          method: 'get',
          params: this.$http.adornParams({
            'building': val
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.buildOptions = data.station
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      getOrdinance (val) {
        this.$http({
          url: this.$http.adornUrl(`/exceptionsRecord/searchOrdinance`),
          method: 'get',
          params: this.$http.adornParams({
            'hazard_type': val
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.ordinance_group = data.ordinance
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      seeQR (data) {
        var baseUrl = window.SITE_CONFIG.baseUrl
        this.requsUrl = baseUrl + data
      },
      fileUploadSuccess (response, file, fileList) {
        if (response) {
          this.$message({type: response.status, message: response.msg})
        }
        // this.loadEmps()
        this.fileUploadBtnText = '上传数据'
      },
      fileUploadError (err, file, fileList) {
        this.fileUploadBtnText = '上传数据'
      },
      beforeFileUpload (fileList) {
        this.fileUploadBtnText = '正在上传'
        let formData = new FormData()
        formData.append('fileItem', fileList)
        this.$http.post(this.$http.adornUrl('/exceptionsRecord/import'), formData)
          .then(({data}) => {
            if (data && data.code === 0) {
              this.detailForm.img_url = data.urllist[0].toString()
              alert(this.detailForm.img_url)
              this.$message({
                message: '上传成功！',
                type: 'success'
              })
              this.getDataList()
            } else {
              this.$message.error(data.msg)
            }
            this.fileUploadBtnText = '上传数据'
          })
      },
      init (val, val1) {
        this.showDialog = true
        if (val1 === 1) {
          this.detailForm.color = ''
          this.detailForm.put_in = 0
          this.detailForm.q_process = ''
          this.detailForm.version = ''
          this.detailForm.station = ''
          this.detailForm.analysis = ''
          this.detailForm.project = ''
          this.detailForm.before_coating = 0
          this.detailForm.after_coating = 0
          this.detailForm.class_no = ''
          this.detailForm.monitor = ''
          this.detailForm.unit_chief = ''
          this.detailForm.section = ''
          this.detailForm.manager = ''
          this.detailForm.hazard_type = ''
          this.detailForm.id = ''
          this.detailForm.exception_type = ''
          this.detailForm.exception_describe = ''
          this.detailForm.up_measures = ''
          this.detailForm.happen_date = ''
          this.detailForm.building = ''
          this.detailForm.dri = ''
          this.detailForm.ordinance = ''
          this.detailForm.pu_measures = ''
          this.detailForm.current_situation = 0
          this.detailForm.finish_date = ''
          this.detailForm.ordinance_man = this.$store.state.user.realname
          this.detailForm.identify_man = ''
          this.detailForm.client_no = ''
          this.detailForm.create_man = this.$store.state.user.realname
          this.detailForm.audit_man = this.$store.state.user.director
          this.detailForm.audit_status = 0
          this.detailForm.img_url = ''
          this.detailForm.delivery = false
          this.formStatus = 1
        } else if (val1 === 2) {
          this.$nextTick(() => {
            this.detailForm.color = val.color !== null ? val.color.toString() : ''
            this.detailForm.put_in = val.put_in !== null ? val.put_in.toString() : ''
            this.detailForm.q_process = val.q_process !== null ? val.q_process.toString() : ''
            this.detailForm.version = val.version !== null ? val.version.toString() : ''
            this.detailForm.station = val.station !== null ? val.station.toString() : ''
            this.detailForm.analysis = val.analysis
            this.detailForm.project = val.project !== null ? val.project.toString() : ''
            this.detailForm.before_coating = val.before_coating
            this.detailForm.after_coating = val.after_coating
            this.detailForm.class_no = val.class_no !== null ? val.class_no.toString() : ''
            this.detailForm.monitor = val.monitor
            this.detailForm.unit_chief = val.unit_chief
            this.detailForm.section = val.section
            this.detailForm.manager = val.manager
            this.detailForm.hazard_type = val.hazard_type !== null ? val.hazard_type.toString() : ''
            this.detailForm.exception_type = val.exception_type !== null ? val.exception_type.toString() : ''
            this.detailForm.exception_describe = val.exception_describe
            this.detailForm.up_measures = val.up_measures
            this.detailForm.happen_date = val.happen_date
            this.detailForm.building = val.building !== null ? val.building.toString() : ''
            this.detailForm.dri = val.dri
            this.detailForm.img_url = val.img_url
            this.detailForm.exception_type2 = val.exception_type2 !== null ? val.exception_type2.toString() : ''
            this.detailForm.ordinance = val.ordinance
            this.detailForm.pu_measures = val.pu_measures !== null ? val.pu_measures.toString() : ''
            this.detailForm.current_situation = val.current_situation
            this.detailForm.finish_date = val.finish_date
            this.detailForm.ordinance_man = val.ordinance_man
            this.detailForm.identify_man = val.identify_man
            this.detailForm.client = val.client
            this.detailForm.create_man = this.$store.state.user.realname
            this.detailForm.audit_man = this.$store.state.user.director
            this.detailForm.audit_status = val.audit_status
            this.detailForm.id = val.id
            if (val.current_situation === 1){
              this.detailForm.delivery = true
            } else {
              this.detailForm.delivery = false
            }
            this.showDialog = true
            this.formStatus = 2
          })
        } else if (val1 === 0) {
          this.detailForm.color = val.color !== null ? val.color.toString() : ''
          this.detailForm.put_in = val.put_in !== null ? val.put_in.toString() : ''
          this.detailForm.q_process = val.q_process !== null ? val.q_process.toString() : ''
          this.detailForm.version = val.version !== null ? val.version.toString() : ''
          this.detailForm.station = val.station !== null ? val.station.toString() : ''
          this.detailForm.analysis = val.analysis
          this.detailForm.project = val.project !== null ? val.project.toString() : ''
          this.detailForm.before_coating = val.before_coating
          this.detailForm.after_coating = val.after_coating
          this.detailForm.class_no = val.class_no !== null ? val.class_no.toString() : ''
          this.detailForm.monitor = val.monitor
          this.detailForm.unit_chief = val.unit_chief
          this.detailForm.section = val.section
          this.detailForm.manager = val.manager
          this.detailForm.hazard_type = val.hazard_type !== null ? val.hazard_type.toString() : ''
          this.detailForm.exception_type = val.exception_type !== null ? val.exception_type.toString() : ''
          this.detailForm.exception_describe = val.exception_describe
          this.detailForm.up_measures = val.up_measures
          this.detailForm.happen_date = val.happen_date
          this.detailForm.building = val.building !== null ? val.building.toString() : ''
          this.detailForm.dri = val.dri
          this.detailForm.img_url = val.img_url
          this.detailForm.exception_type2 = val.exception_type2 !== null ? val.exception_type2.toString() : ''
          this.detailForm.ordinance = val.ordinance
          this.detailForm.pu_measures = val.pu_measures !== null ? val.pu_measures.toString() : ''
          this.detailForm.current_situation = val.current_situation
          this.detailForm.finish_date = val.finish_date
          this.detailForm.ordinance_man = val.ordinance_man
          this.detailForm.identify_man = val.identify_man
          this.detailForm.client = val.client
          this.detailForm.create_man = this.$store.state.user.realname
          this.detailForm.audit_man = this.$store.state.user.director
          this.detailForm.audit_status = val.audit_status
          this.detailForm.id = val.id
          if (val.current_situation === 1) {
            this.detailForm.delivery = true
          } else {
            this.detailForm.delivery = false
          }
          this.showDialog = true
          this.formStatus = 0
        }
      },
      //校验
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataFormSubmit()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      dataFormSubmit () {
        if (this.detailForm.delivery) {
          this.detailForm.current_situation = 1
        }
        this.$confirm('是否确认保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl(`/exceptionsRecord/saveExceptionsRecord`),
            method: 'post',
            data: this.$http.adornData({
              //todo
              'color': this.detailForm.color,
              'put_in': this.detailForm.put_in,
              'q_process': this.detailForm.q_process,
              'version': this.detailForm.version,
              'station': this.detailForm.station,
              'analysis': this.detailForm.analysis,
              'project': this.detailForm.project,
              'before_coating': this.detailForm.before_coating,
              'after_coating': this.detailForm.after_coating,
              'class_no': this.detailForm.class,
              'monitor': this.detailForm.monitor,
              'unit_chief': this.detailForm.unit_chief,
              'client_no': this.detailForm.client_no,
              'section': this.detailForm.section,
              'manager': this.detailForm.manager,
              'hazard_type': this.detailForm.hazard_type,
              'id': this.detailForm.id,
              'exception_type': this.detailForm.exception_type,
              'exception_describe': this.detailForm.exception_describe,
              'up_measures': this.detailForm.up_measures,
              'happen_date': this.detailForm.happen_date,
              'building': this.detailForm.building,
              'dri': this.detailForm.dri,
              'exception_type2': this.detailForm.exception_type2,
              'ordinance': this.detailForm.ordinance,
              'pu_measures': this.detailForm.pu_measures,
              'current_situation': this.detailForm.current_situation,
              'finish_date': this.detailForm.finish_date,
              'ordinance_man': this.detailForm.ordinance_man,
              'identify_man': this.detailForm.identify_man,
              'create_man': this.detailForm.create_man,
              'audit_man': this.detailForm.audit_man,
              'img_url': this.detailForm.img_url
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: data.message,
                type: 'success'
              })
              this.showDialog = false
            } else {
              this.$message({
                message: data.message,
                type: 'error'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      // 弹出框关闭后触发
      handleClose () {
        // 子组件调用父组件方法，并传递参数
        this.$emit('changeShow','false')
      }
    },
    watch: {
      // 监听 addOrUpdateVisible 改变
      addOrUpdateVisible(){
        this.showDialog = this.addOrUpdateVisible
      }
    }
  }
</script>

