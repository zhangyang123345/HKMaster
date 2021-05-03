<template>
  <el-dialog
    title="ExceptionsDetail"
    :visible.sync="showDialog"
    width="70%"
    @close="handleClose">
    <el-form :inline="true" :model="detailForm" :rules="dataRule" ref="detailForm" label-width="100px">
      <el-row>
        <el-col :span="14">
          <el-row>
            <el-col :span="12">
              <el-form-item label="大类" prop="exception_type2">
                <el-select v-model="detailForm.exception_type2" clearable placeholder="请选择" style="width:25vh">
                  <el-option label="品质" value="1"></el-option>
                  <el-option label="Trace" value="2"></el-option>
                  <el-option label="EHS" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="楼栋" prop="building">
                <el-select v-model="detailForm.building" clearable placeholder="请选择" style="width:25vh">
                  <el-option label="E3-1F" value="1"></el-option>
                  <el-option label="E3-2F" value="2"></el-option>
                  <el-option label="D4-1F" value="3"></el-option>
                  <el-option label="D4-2F" value="4"></el-option>
                  <el-option label="B6-2F" value="5"></el-option>
                  <el-option label="B1-1F" value="6"></el-option>
                  <el-option label="B1-2F" value="7"></el-option>
                  <el-option label="E4-1F" value="8"></el-option>
                  <el-option label="E4-2F" value="9"></el-option>
                  <el-option label="E3-1.5F" value="10"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="异常类型" prop="exception_type" autocomplete="off">
                <el-select v-model="detailForm.exception_type" clearable placeholder="请选择"  style="width:25vh">
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
            <el-col :span="12">
              <el-form-item label="DRI" prop="dri">
                <el-input v-model="detailForm.dri" style="width:25vh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发生时间" prop="happen_date">
                <el-date-picker  style="width:25vh"
                                 v-model="detailForm.happen_date"
                                 type="datetime"
                                 placeholder="选择日期时间"
                                 align="right"
                                 :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="完成时间">
                <el-date-picker style="width:25vh"
                                v-model="detailForm.finish_date"
                                type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="惩处措施" >
                <el-select type="area" v-model="detailForm.pu_measures" clearable style="width:25vh">
                  <el-option label="口头警告" value="1"></el-option>
                  <el-option label="书面警告" value="2"></el-option>
                  <el-option label="书面检讨" value="3"></el-option>
                  <el-option label="解除合同" value="4"></el-option>
                  <el-option label="退回劳务公司" value="5"></el-option>
                  <el-option label="严重书面警告" value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="稽核人">
                <el-input v-model="detailForm.ordinance_man" style="width:25vh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="确认人工号">
                <el-input v-model="detailForm.identify_man" style="width:25vh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="当事人工号">
                <el-input v-model="detailForm.client"style="width:25vh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="已改善">
                <el-switch v-model="detailForm.delivery"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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


          </el-row>
        </el-col>
        <el-col :span="10">
          <el-row>
            <el-col :span="24">
              <el-form-item label="异常描述"prop="exception_describe">
                <el-input type="textarea" v-model="detailForm.exception_describe" style="width:45vh" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="整改措施">
                <el-input v-model="detailForm.up_measures" type="textarea" style="width:45vh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="稽核条例">
                <el-input v-model="detailForm.ordinance" style="width:45vh"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="创建人">
                <el-input v-model="detailForm.create_man" :disabled="true" style="width:45vh"></el-input>
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
      <el-button type="primary" v-if="this.detailForm.audit_status !== 1 && this.formStatus !== 0" @click="submitForm('detailForm')">确 定</el-button>
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
    data(){
      return{
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
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        formStatus: 0,
        detailForm: {
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
        if (val1 === 1) {
          this.showDialog = true
          this.detailForm.id = ''
          this.detailForm.exception_type = ''
          this.detailForm.exception_describe = ''
          this.detailForm.up_measures = ''
          this.detailForm.happen_date = ''
          this.detailForm.building = ''
          this.detailForm.dri = ''
          this.detailForm.exception_type2 = ''
          this.detailForm.ordinance = ''
          this.detailForm.pu_measures = ''
          this.detailForm.current_situation = 0
          this.detailForm.finish_date = ''
          this.detailForm.ordinance_man = ''
          this.detailForm.identify_man = ''
          this.detailForm.client = ''
          this.detailForm.create_man = this.$store.state.user.realname
          this.detailForm.audit_man = this.$store.state.user.director
          this.detailForm.audit_status = 0
          this.detailForm.img_url = ''
          this.detailForm.delivery = false
          this.formStatus = 1
        } else if (val1 === 2) {
          this.$nextTick(() => {
            this.detailForm.exception_type = val.exception_type.toString()
            this.detailForm.exception_describe = val.exception_describe
            this.detailForm.up_measures = val.up_measures
            this.detailForm.happen_date = val.happen_date
            this.detailForm.building = val.building.toString()
            this.detailForm.dri = val.dri
            this.detailForm.img_url = val.img_url
            this.detailForm.exception_type2 = val.exception_type2.toString()
            this.detailForm.ordinance = val.ordinance
            if (val.pu_measures === 0) {
              this.detailForm.pu_measures = ''
            } else {
              this.detailForm.pu_measures = val.pu_measures.toString()
            }
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
          this.detailForm.exception_type = val.exception_type.toString()
          this.detailForm.exception_describe = val.exception_describe
          this.detailForm.up_measures = val.up_measures
          this.detailForm.happen_date = val.happen_date
          this.detailForm.building = val.building.toString()
          this.detailForm.dri = val.dri
          this.detailForm.img_url = val.img_url
          this.detailForm.exception_type2 = val.exception_type2.toString()
          this.detailForm.ordinance = val.ordinance
          if (val.pu_measures === 0) {
            this.detailForm.pu_measures = ''
          } else {
            this.detailForm.pu_measures = val.pu_measures.toString()
          }
          this.detailForm.current_situation = val.current_situation
          this.detailForm.finish_date = val.finish_date
          this.detailForm.ordinance_man = val.ordinance_man
          this.detailForm.identify_man = val.identify_man
          this.detailForm.client = val.client
          this.detailForm.create_man = val.create_man
          this.detailForm.audit_man = val.audit_man
          this.detailForm.audit_status = val.audit_status
          this.detailForm.id = val.id
          if (val.current_situation === 1){
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
        this.$confirm('是否确认保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$http({
            url: this.$http.adornUrl(`/exceptionsRecord/saveExceptionsRecord`),
            method: 'post',
            data: this.$http.adornData({
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
              'client': this.detailForm.client,
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

