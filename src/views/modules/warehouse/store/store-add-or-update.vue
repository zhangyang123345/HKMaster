<template>
  <el-dialog
    :title="!dataForm.store_id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="仓库名称" prop="store_name">
        <el-input v-model="dataForm.store_name" placeholder="仓库名称"></el-input>
      </el-form-item>
      <el-form-item label="仓库容量" prop="store_volume">
        <el-input v-model="dataForm.store_volume" placeholder="仓库容量"></el-input>
      </el-form-item>
      <el-form-item label="仓库位置" prop="store_addr">
        <el-input v-model="dataForm.store_addr" placeholder="仓库位置"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="store_type">
        <el-select  v-model="dataForm.store_type" placeholder="请选择类型">
          <el-option v-for="(item,index) in typeArr" :key="index" :label="item.value" :value="item.id" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="仓库负责人" prop="duty_name">
        <!--<el-input v-model="dataForm.duty_name" placeholder="仓库负责人"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <el-autocomplete
          v-model="dataForm.duty_name"
          :fetch-suggestions="emplosearch"
          style="width: 100%;"
          placeholder="请输入查找"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div >
              <div class="inputC">{{ item.jobNo }}</div>
              <div class="inputC">{{ item.name }}</div>
              <div class="inputC">{{ item.department }}</div>
              <div class="inputC">{{ item.position }}</div>
              <div class="inputC">{{ item.director }}</div>
            </div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="负责人工号" prop="duty_user">
        <el-input v-model="dataForm.duty_user" placeholder="负责人工号" readonly></el-input>
      </el-form-item>
      <el-form-item label="负责人电话" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="负责人电话"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<style >
  .inputC{
    float:left;
    width:20%;
  }
</style>
<script>
  export default {
    data () {
      return {
        typeArr: [{id: 0, value: '其他'}, {id: 1, value: '耗材'}, {id: 2, value: '化学'}],
        visible: false,
        dataForm: {
          store_id: 0,
          store_name: '',
          store_volume: '',
          store_addr: '',
          duty_user: '',
          duty_name: '',
          phone: '',
          store_type: ''
        },
        dataRule: {
          store_name: [
            { required: true, message: '仓库名称', trigger: 'blur' }
          ],
          store_volume: [
            { required: true, message: '介绍不能为空', trigger: 'blur' }
          ],
          store_addr: [
            { required: true, message: '仓库位置不能为空', trigger: 'blur' }
          ],
          store_type: [
            { required: true, message: '仓库类型不能为空', trigger: 'blur' }
          ],
          duty_user: [
            { required: true, message: '负责人工号不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '负责人电话不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.storeId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        if (this.dataForm.storeId) {
          this.$http({
            url: this.$http.adornUrl(`/store/store/getStore`),
            method: 'get',
            params: this.$http.adornParams({"store_id":id})
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.dataForm.store_name = data.storeData.store_name
            this.dataForm.store_volume = data.storeData.store_volume
            this.dataForm.store_addr = data.storeData.store_addr
            this.dataForm.duty_name = data.storeData.duty_name
            this.dataForm.duty_user = data.storeData.duty_user
            this.dataForm.phone = data.storeData.phone
            this.dataForm.store_type = data.storeData.store_type
            }
        })
        }
      })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/store/store/update`),
              method: 'post',
              data: this.$http.adornData({
                'store_id': this.dataForm.store_id || undefined,
                'store_name': this.dataForm.store_name,
                'store_volume': this.dataForm.store_volume,
                'store_addr': this.dataForm.store_addr,
                'duty_user': this.dataForm.duty_user,
                'store_type': this.dataForm.store_type,
                'phone': this.dataForm.phone
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                this.visible = false
              this.$emit('refreshDataList')
            }
            })
            } else {
              this.$message.error(data.msg)
            }
          })
          }
        })
      },
      emplosearch (queryString , cb) {
        var restaurants = null
        this.$http({
          url: this.$http.adornUrl('/employee/search'),
          method: 'post',
          params: this.$http.adornParams({
            'page': 1,
            'rows': 10,
            'name': this.dataForm.duty_name
            })
          }).then(({data}) => {
              if (data && data.code === 0) {
               cb(data.data.list)
            }
          })
      },
      handleSelect (item) {
        this.dataForm.duty_user = item.jobNo
        this.dataForm.duty_name = item.name
        this.dataForm.phone = item.phone
      }
    }
  }
</script>
