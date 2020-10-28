<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item  prop="goodsName" label="商品名">
        <!--<el-input  v-model="dataForm.goodsName" placeholder="商品名" clearable></el-input>-->
        <el-autocomplete
          v-model="dataForm.goodsName"
          :fetch-suggestions="querySearchAsync"
          placeholder="商品名"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
    <el-form-item label="制程名" prop="processName">
      <el-input v-model="dataForm.processName" placeholder="制程名"></el-input>
    </el-form-item>
      <el-form-item label="日建浴量" prop="dayVolume">
        <el-input v-model="dataForm.dayVolume" placeholder="日建浴量"></el-input>
      </el-form-item>
      <el-form-item label="周期建浴量" prop="cycleVolume">
        <el-input v-model="dataForm.cycleVolume" placeholder="周期建浴量"></el-input>
      </el-form-item>
      <el-form-item label="周期时间" prop="keytwo">
        <el-date-picker
          v-model="dataForm.keytwo"
          unlink-panels
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item label="寿命类型" prop="type">-->
        <!--<el-select  v-model="dataForm.type" placeholder="请选择寿命类型">-->
          <!--<el-option v-for="(item,index) in typeArr" :key="index" :label="item.value" :value="index" >-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          processName: '',
          dayVolume: '',
          goodsId: '',
          goodsName: '',
          cycleVolume: '',
          msgId: '',
          cycle: '',
          keytwo: '',
          isFullscreen: false
        },
        columeTypeArr: [],
        dataRule: {
          goodsName: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          processName: [
            { required: true, message: '制程名不能为空', trigger: 'blur' }
          ],
          dayVolume: [
            { required: true, message: '日建浴量不能为空', trigger: 'blur' }
          ],
          cycleVolume: [
            { required: true, message: '周期建浴量不能为空', trigger: 'blur' }
          ],
          keytwo: [
            { required: true, message: '周期时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // getStoreId () {
      //   this.$http({
      //     url: this.$http.adornUrl('/store/stores/list'),
      //     method: 'get',
      //     data: this.$http.adornData(this.dataList, false)
      //   }).then(({data}) => {
      //     if (data && data.code === 0) {
      //     this.columeTypeArr = data.page.list
      //   } else {
      //   }
      // })
      // },
      init (id) {
        // this.getStoreId()
        this.dataForm.msgId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.msgId) {
            this.$http({
              url: this.$http.adornUrl(`/warning/buildbath/info/${this.dataForm.msgId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
              this.dataForm.goodsName = data.buildBathEntity.goodsName
              this.dataForm.goodsId = data.buildBathEntity.goodsId
              this.dataForm.processName = data.buildBathEntity.processName
              this.dataForm.dayVolume = data.buildBathEntity.dayVolume
              this.dataForm.cycleVolume = data.buildBathEntity.cycleVolume
              this.dataForm.keytwo = [data.buildBathEntity.lastTime, data.buildBathEntity.nextTime]
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        console.log(this.dataForm.keytwo)
        this.$refs['dataForm'].validate((valid) => {
          console.log(this.dataForm.keytwo)
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/warning/buildbath/${!this.dataForm.msgId ? 'save' : 'update'}`),
              method: 'get',
              params: this.$http.adornParams({
                'msgId': this.dataForm.msgId,
                'goodsId': this.dataForm.goodsId,
                'smallValue': this.dataForm.smallValue,
                'processName': this.dataForm.processName,
                'dayVolume': this.dataForm.dayVolume,
                'cycleVolume': this.dataForm.cycleVolume,
                'key_time': this.dataForm.keytwo + ''
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
            // this.$http({
            //   url: this.$http.adornUrl(`/warning/buildbath/${!this.dataForm.msgId ? 'save' : 'update'}`),
            //   method: 'get',
            //   params: this.$http.adornParams({
            //     'goodsId': this.dataForm.goodsId,
            //     'smallValue': this.dataForm.smallValue,
            //     'processName': this.dataForm.processName,
            //     'dayVolume': this.dataForm.dayVolume,
            //     'cycleVolume': this.dataForm.cycleVolume,
            //     'key_time': this.dataForm.keytwo
            //   })
            // }).then(({data}) => {
            //   if (data && data.code === 0) {
            //     this.$message({
            //       message: '操作成功',
            //       type: 'success',
            //       duration: 1500,
            //       onClose: () => {
            //         this.visible = false
            //         this.$emit('refreshDataList')
            //       }
            //     })
            //   } else {
            //     this.$message.error(data.msg)
            //   }
            // })
          }
        })
      },
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        this.$http({

          url: this.$http.adornUrl("/store/goods/goodsInfo"),

          method: "post",

          params: this.$http.adornParams({

            goods_name:queryString

          })

        }).then(({ data }) => {
          this.newrestaurants = data.list

        for(var i=0;i<data.list.length;i++){

          this.newrestaurants[i].value = this.newrestaurants[i].goodsName;

        }
        // console.log("this.newrestaurants="+JSON.stringify(this.newrestaurants))
        // var results = queryString ? data.page.list.filter(this.createStateFilter(queryString)) : data.page.list;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.newrestaurants);
      }, 100 * Math.random());
      });
      },
      handleSelect (item) {
        this.dataForm.goodsId = item.goodsId
        this.dataForm.goodsName = item.goodsName
        // this.dataForm.type = item.type
      }
    }
  }
</script>
