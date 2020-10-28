<template>
  <el-dialog
    :title="'选择仓库'"
    :close-on-click-modal="false"
    :show-close="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item prop="storeId">
        <el-select  v-model="dataForm.index" placeholder="请选择仓库" @change="currentSel">
          <el-option v-for="(item,index) in columeTypeArr" :key="index" :label="item.storename" :value="index" >
          </el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="寿命类型" prop="type">-->
        <!--<el-select  v-model="dataForm.type" placeholder="请选择寿命类型">-->
          <!--<el-option v-for="(item,index) in typeArr" :key="index" :label="item.value" :value="index" >-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import screenfull from 'screenfull'
  export default {
    data () {
      return {
        columeTypeArr: [],
        visible: false,
        dataForm: {
          storeId: '',
          index: '',
          storename: '',
          isFullscreen: false
        }
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      currentSel (selVal) {
        this.dataForm.storeId = this.columeTypeArr[selVal].storeId
        this.dataForm.storename = this.columeTypeArr[selVal].storename
      },
      // 获取数据列表
      init () {
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/store/stores/list'),
          method: 'get',
          data: this.$http.adornData(this.dataList, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.columeTypeArr = data.page.list
        } else {
        }
      })
      },
      dataFormSubmit () {
        if(this.dataForm.storeId == '' || this.dataForm.storeId == undefined){
          this.$message.error('请选择仓库')
          return
        }
        var map = {}
        map.storeId = this.dataForm.storeId
        map.storename = this.dataForm.storename
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
          this.visible = false
        this.$emit('refreshDataList', map)
      }
      })
      }
    }
  }
</script>
