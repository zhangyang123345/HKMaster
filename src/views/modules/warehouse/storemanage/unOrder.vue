<template>
  <el-dialog
    width="90%"
    top="5vh"
    :show-close="false"
    :title="入库"
    :close-on-click-modal="false"
    :before-close="close"
    :close-on-press-escape="false"
    :visible.sync="instore">
    <el-form :model="underForm"  ref="UnOrder" label-width="80px">
      <el-row>
          <el-col :span="12">
            <el-form-item label="扫码输入">
              <el-input v-model="underForm.scan_data" @keyup.enter.native="scanSubmit()" placeholder="扫码输入">
              </el-input>
            </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item label="处理金额">
            <el-input v-model="underForm.reall_total" placeholder="处理金额" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="scanList"
            border
            height="700"
            v-loading="dataListLoading"
            style="width: 100%;">
            <el-table-column
              fixed="left"
              header-align="center"
              align="center"
              width="80"
              label=" ">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="remove(scope.row.id)">移除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="goods_no"
              header-align="center"
              align="center"
              width="300"
              label="物品编码">
            </el-table-column>
            <el-table-column
              prop="article_name"
              header-align="center"
              align="center"
              label="物品名称">
            </el-table-column>
            <el-table-column
              prop="manufacturer_name"
              header-align="center"
              align="center"
              label="厂商">
            </el-table-column>
            <el-table-column
              prop="tempNum"
              header-align="center"
              align="center"
              label="规格总量">
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="inventory"-->
              <!--header-align="center"-->
              <!--align="center"-->
              <!--label="规格余量">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="inventory"
              header-align="center"
              align="center"
              label="操作数量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.inventory" type="number" size="small" :ref="scope.row.goods_no"
                            @change="checkNum(scope.row.goods_no,scope.row.inventory,scope.row.tempNum)"></el-input>
                </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              header-align="center"
              align="center"
              label="操作金额">
            </el-table-column>
            <el-table-column
              prop="price"
              header-align="center"
              align="center"
              label="单价">
            </el-table-column>
            <el-table-column
              prop="unit_name"
              header-align="center"
              align="center"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="specs_name"
              header-align="center"
              align="center"
              label="规格">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="unStoreSubmit()">补码</el-button>
      <el-button type="primary" @click="underFormSubmit(false)">保存入库</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        instore: false,
        underForm: {
          scan_data: '',
          order_no: '',
          order_type: 1,
          reall_total: 0
        },
        dataForm: {
          scan_data: '',
          order_no: '',
          order_type: 1,
          reall_total: 0
        },
        details: [],
        scanList: [],
        stata: '',
        showT: false,
        dataListLoading: false,
        addOrUpdateinstore: false
        // dataRule: {
        //   name: [
        //     { required: true, message: '商品名称不能为空', trigger: 'blur' }
        //   ],
        //   intro: [
        //     { required: true, message: '介绍不能为空', trigger: 'blur' }
        //   ],
        //   price: [
        //     { required: true, message: '价格不能为空', trigger: 'blur' }
        //   ],
        //   num: [
        //     { required: true, message: '数量不能为空', trigger: 'blur' }
        //   ]
        // }
      }
    },
    components: {
    },
    mounted () {
      // window.addEventListener( 'beforeunload', e => this.browerStatus() );
      // TODO
    },
    methods: {
      S4 () {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      },
      guid () {
        return this.S4()+this.S4()+this.S4()+this.S4()+this.S4();
      },
      open (){
        this.instore = true
        this.dataForm.order_no = this.guid().toUpperCase()
        this.underForm.reall_total = 0
        this.underForm.scan_data = ''
      },
      remove (id){
        this.$http({
          url: this.$http.adornUrl(`/inoutmsg/deleCache`),
          method: 'post',
          params: this.$http.adornParams({"ids": id})
        }).then(({data}) => {
          if(data && data.code === 0){
          for(var ind in this.scanList){
            if(this.scanList[ind].id == id){
              var mount = this.scanList[ind].inventory * this.scanList[ind].price
              this.underForm.reall_total = this.underForm.reall_total - mount
              this.underForm.reall_total = parseFloat(this.underForm.reall_total.toFixed(2))
              this.scanList.splice(ind,1)
              break
            }
          }
        }else{
          this.$message({
            message: data.msg,
            type: 'error'
          });
        }
      })
      },
      //输入检测->入缓存
      checkNum(goods_no,input,qunatity){
        if (input > qunatity) {
          this.$message({
            message: "操作数量不可大于规格总量！",
            type: 'error'
          })
        } else if (input <= 0) {
          this.$message({
            message:  "操作数量不可小于1！" ,
            type: 'error'
          })
        } else {
          var dataS = null ;
          for (var index in this.scanList) {
            if (this.scanList[index].goods_no == goods_no) {
              this.scanList[index].operation = input
              //TODO
              dataS = this.scanList[index]
            }
          }
          //TODO
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/saveCache`),
            method: 'post',
            params: this.$http.adornParams({ "goods": JSON.stringify(dataS) ,
              "order_no":this.dataForm.order_no,
              "order_type":this.dataForm.order_type})
          }).then(({data}) => {
            if (data && data.code === 0) {
            dataS.id = data.goods.id
            this.learning()
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
        })
        }
      },
      // 表单提交
      underFormSubmit (buff) {
        var msg = buff?"是否确认结单？":"是否确认保存？"
        this.$confirm(msg, '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          if(this.scanList.length>0){
          if(buff)this.dataForm.order_state = 6
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/unOrder`),
            method: 'post',
            params: this.$http.adornParams({
              "order_no": this.dataForm.order_no,
              "order_type": this.dataForm.order_type
            })
          }).then(({data}) => {
            if(data && data.code === 0){
            if(buff)this.instore = false
            this.scanList.splice(0,this.scanList.length)
            this.underForm.reall_total = 0
            this.underForm.scan_data = ''
            this.$message({
              message: data.msg,
              type: 'success'
            });
          }else{
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
        })
        } else {
          if (buff) {
            this.$http({
              url: this.$http.adornUrl(`/orders/complete`),
              method: 'post',
              params: this.$http.adornParams({
                "order_no": this.dataForm.order_no
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
              this.instore = false
            } else {
              this.$message({
                message: data.msg,
                type: 'error'
              });
            }
          })
          }else{
            this.$message({
              message: "请先扫码！",
              type: 'error'
            });
          }
        }
      }).catch(action => {
        });
      },
      // 补码提交
      unStoreSubmit () {
        this.$confirm("确认补码提交！", '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          if (this.scanList.length>0) {
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/unOrder`),
            method: 'post',
            params: this.$http.adornParams({
              'order_no': this.dataForm.order_no,
              'order_type': this.dataForm.order_type,
              'unStore': true
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.scanList.splice(0,this.scanList.length)
            this.underForm.reall_total = 0
            this.underForm.scan_data = ''
            this.$message({
              message: data.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            })
          }
        })
        }
      }).catch(action => {
        });
      },
      //扫码提交
      scanSubmit () {
        var buff = false
        if(this.underForm.scan_data.length > 27 && this.underForm.scan_data.length < 36){
            buff = true
        }
        if (buff){
          this.dataForm.scan_data = this.underForm.scan_data
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/inoutStore`),
            method: 'post',
            params: this.$http.adornParams({
              "order_no": this.dataForm.order_no,
              "order_type": this.dataForm.order_type,
              "goods_no": this.dataForm.scan_data
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
            data.article.amount = (data.article.operation * data.article.price).toFixed(2)
            data.article.tempNum = data.article.inventory
            this.scanList.unshift(data.article)
            var mount = data.article.operation * data.article.price
            this.underForm.reall_total = this.underForm.reall_total + mount
            this.underForm.reall_total = parseFloat(this.underForm.reall_total.toFixed(2))
            this.underForm.scan_data = ''
          } else {
            this.underForm.scan_data = ''
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
        })
        }else{
          this.underForm.scan_data = ''
          this.$message({
            message: '编码错误或不符合本订单!',
            type: 'error'
          });
        }
      },
      // 计算
      learning () {
        var num = 0
        for (var ind in this.scanList) {
          this.scanList[ind].amount = (this.scanList[ind].operation * this.scanList[ind].price).toFixed(2)
          num += parseFloat(this.scanList[ind].amount)
        }
        this.underForm.reall_total = num.toFixed(2)
      },
      //浏览器关闭监控
      browerStatus(){
        this.$message({
          message: '确定关闭？',
          type: 'error'
        })
        return false;
      },
      //关闭弹窗
      close(){
        if(this.scanList.length > 0){
          this.$confirm('关闭则清除当前扫码数据，确认关闭？', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '关闭',
            cancelButtonText: '取消'
          }).then(() => {
            var ids = ""
            for (var index in this.scanList) {
            ids += this.scanList[index].id + ','
          }
          this.$http({
            url: this.$http.adornUrl(`/inoutmsg/deleCache`),
            method: 'post',
            params: this.$http.adornParams({"ids": ids})
          }).then(({data}) => {
            if(data && data.code === 0){
            this.instore = false
            this.scanList.splice(0,this.scanList.length)
          }else{
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
        });
        }).catch(action => {
          });
        }else{
          this.instore = false
        }
      }
    }
  }
</script>
<style scoped>
  .el-col{
    margin-bottom:0px;
  }
</style>
