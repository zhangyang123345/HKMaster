<template>
  <el-dialog
    width= "90%"
    top="5vh"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    :before-close="close"
    :visible.sync="visible">
    <el-form :model="dataForm" class="orderStyle"  ref="dataForm"  label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订 单 号" prop="order_no">
            <el-input v-model="dataForm.order_no"  placeholder="订单号" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预计需求时间" prop="exp_date">
            <el-date-picker v-model="dataForm.exp_date"
                            type="datetime"
                            style="width:100%;"
                            @change="dateCheck"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结单时间" prop="etime">
            <el-input v-model="dataForm.etime" placeholder="结单时间" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="创建时间" prop="stime">
            <el-input v-model="dataForm.stime" placeholder="创建时间" readonly></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="5" v-if=dataFormState >-->
        <!--<el-form-item label="发起人姓名">-->
        <!--<el-input v-model="dataForm.name" placeholder="发起人姓名" :disabled=dataFormState></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" v-if=dataFormState>-->
          <!--<el-form-item label="审核人" prop="review_fir">-->
            <!--<el-input v-model="dataForm.review_fir" placeholder="审核人" :disabled=true></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5" v-if=dataFormState>-->

      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单金额" prop="alltotal">
            <el-input v-model="dataForm.alltotal" placeholder="总金额" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="实际金额" prop="reall_total">
            <el-input v-model="dataForm.reall_total" placeholder="实际金额" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单类型" prop="order_type">
            <el-select v-model="dataForm.order_type" placeholder="订单类型" style="width:100%;">
              <el-option v-for="(item,index) in typeOption"
                         :key="index"
                         :label="item.lable"
                         :value="item.value"></el-option>
            </el-select>
            <!--<el-input v-if="dataForm.order_type===1">待EHS审核</el-input>-->
            <!--<el-input v-if="dataForm.order_type===2">待主管审核</el-input>-->
            <!--<el-input v-if="dataForm.order_type===3">待经理审核</el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item  label="订单状态" prop="order_state">
            <template slot-scope="scope">
              <el-input v-if="dataForm.order_state==-2" value = "订单异常结束"></el-input>
              <el-input v-if="dataForm.order_state==-1"  value = "退单"></el-input>
              <el-input v-if="dataForm.order_state==0"  value = "待提交"></el-input>
              <el-input v-if="dataForm.order_state==1"  value = "待EHS审核"></el-input>
              <el-input v-if="dataForm.order_state==2"  value = "待主管审核"></el-input>
              <el-input v-if="dataForm.order_state==3"  value = "待经理审核"></el-input>
              <el-input v-if="dataForm.order_state==4"  value = "待厂长审核"></el-input>
              <el-input v-if="dataForm.order_state==5"   value = "待处理"></el-input>
              <el-input v-if="dataForm.order_state==6"  value = "待结单"></el-input>
              <el-input v-if="dataForm.order_state==7"  value = "完成"></el-input>
            </template>
          </el-form-item>
        </el-col>
        <!--<el-col :span="5" v-if=dataFormState >-->
          <!--<el-form-item label="审核类型" prop="exam_type">-->
            <!--<el-input v-model="dataForm.exam_type" placeholder="审核类型" :disabled=dataFormState>-->
              <!--<template slot-scope="scope">-->
                <!--<div v-if="dataForm.exam_type==1">待EHS审核</div>-->
                <!--<div v-if="dataForm.exam_type==2">待主管审核</div>-->
                <!--<div v-if="dataForm.exam_type==3">待经理审核</div>-->
                <!--<div v-if="dataForm.exam_type==4">待厂长审核</div>-->
              <!--</template>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-row>
      <el-row>
        <el-col :span="6" >
          <el-form-item label="发 起 人" prop="name">
            <el-input v-model="dataForm.name" placeholder="发起人" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" >
          <el-form-item label="主     管" prop="name">
            <el-input v-model="dataForm.director" placeholder="主     管" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" >
          <el-form-item label="备    注" prop="remarks">
            <el-input v-model="dataForm.remarks" placeholder="备注" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <!--<el-button v-if="stata=='待提交'" type="primary" @click="addOrUpdateHandle()">新增子订单</el-button>-->
        <el-table
          height="550"
          :data="tableData"
          border
          v-loading="dataListLoading"
          align="left"
          style="width: 100%;">
          <!--<el-table-column-->
            <!--prop="id"-->
            <!--header-align="center"-->
            <!--align="center"-->
            <!--label="序号"-->
            <!--width="80">-->
            <!--<template slot-scope="scope">-->
                <!--<span v-if="scope.$index === 0 && dataForm.order_state == 0"></span>-->
                <!--<span v-else>{{scope.$index}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column
            prop="article_no"
            header-align="center"
            align="center"
            label="物品编码"
            width="250">
          </el-table-column>
          <el-table-column
            prop="article_name"
            header-align="center"
            align="center"
            label="物品名称"
            width="240">
            //:render-header="renderHeader"
            <template slot-scope="scope" width="100%" align="left">
                <el-autocomplete v-if="scope.row.edit"
                                 v-model="scope.row.article_name"
                                 :fetch-suggestions="querySearchAsync"
                                 popper-class="autoComp"
                                 placeholder="物品名称"
                                 @select="handleSelect"
                >
                  <template slot-scope="{ item }">
                    <div>
                        <div class="inputA">{{ item.material_no }}</div>
                        <div class="inputA">{{ item.article_name }}</div>
                        <div class="inputM">{{ item.manufacturer_name }}</div>
                        <div class="inputP">{{ item.price }}</div>
                        <div class="inputS">{{ item.specs_name }}</div>
                        <div class="inputN">{{ item.goods_num }}</div>
                        <div class="inputU">{{ item.unit_name }}</div>
                    </div>
                  </template>
                </el-autocomplete>
                <span v-else>{{scope.row.article_name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="manufacturer_name"
            header-align="center"
            align="center"
            label="厂商"
            width="120">
          </el-table-column>
          <el-table-column
            prop="qunatity"
            header-align="center"
            align="center"
            label="订单数量"
            width="140">
            <template slot-scope="scope" width="100%">
                <span v-if="scope.$index === 0 || (dataForm.order_state != 0 && dataForm.order_state != -1)">{{scope.row.qunatity}}</span>
                <el-input v-else  maxlength="6" v-model="scope.row.qunatity" type="number"  @change="calAmount"  placeholder="订单数量" ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            header-align="center"
            align="center"
            label="订单金额"
            width="140">
          </el-table-column>
          <el-table-column
            prop="actual_qunatity"
            header-align="center"
            align="center"
            label="已处理数量"
            width="140">
          </el-table-column>
          <el-table-column
            prop="actual_mount"
            header-align="center"
            align="center"
            label="已处理金额"
            width="140">
          </el-table-column>
          <el-table-column
            prop="unit_name"
            header-align="center"
            align="center"
            label="单位"
            width="80">
          </el-table-column>
          <el-table-column
            prop="price"
            header-align="center"
            align="center"
            label="单价"
            width="80">
          </el-table-column>
          <el-table-column
            prop="specs_name"
            header-align="center"
            align="center"
            label="规格"
            width="100">
          </el-table-column>
          <el-table-column
            prop="dremark"
            header-align="center"
            align="center"
            label="备注">
            <template slot-scope="scope" width="100%" >
                <span v-if="scope.$index === 0 || (dataForm.order_state != 0 && dataForm.order_state != -1)">{{scope.row.dremark}}</span>
                <el-input style="width: 100%" v-else v-model="scope.row.dremark" placeholder="备注"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
                <span v-if="scope.$index === 0 || (dataForm.order_state != 0 && dataForm.order_state != -1)"></span>
                <el-button v-else type="text" size="medium" @click="deleteData(scope.row,scope.$index)">移除</el-button>
            </template>
          </el-table-column>

          <!--<el-table-column-->
          <!--fixed="right"-->
          <!--header-align="center"-->
          <!--align="center"-->
          <!--width="150"-->
          <!--label="操作">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="text" size="small" @click="Details(scope.row.goodsId)">查看详情</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
    </el-form>
    <el-divider></el-divider>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
      <el-button  v-if="dataForm.order_state == 0 || dataForm.order_state == -1" type="primary" @click="saveOrUpdateData('dataForm')">保存</el-button>
      <el-button  v-if="dataForm.order_state == 0 || dataForm.order_state == -1" @click="subData('dataForm')">提交</el-button>
      <el-button  v-if="dataForm.order_state == 6 "  type="primary" @click="complet">结单</el-button>
    </span>
  </el-dialog>
</template>
<style>
  .my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
  .autoComp{ width:870px;}
  .autoComp  .el-scrollbar{
    width:870px;
  }
  .inputA{
     float:left;
     width: 24%;
  }
  .inputM{
     float:left;
     width: 14%;
  }
  .inputP{
     float:left;
     width: 10%;
  }
  .inputU{
     float:left;
     text-align: center;
     width: 6%;
  }
  .inputS{
     float:left;
     width: 12%;
  }
  .inputN{
    float:left;
    text-align: center;
    width: 10%;
  }
  .orderStyle{

  }
  .orderStyle .el-form-item,.el-col{
    margin-bottom:0px!important;
  }
  .orderStyle .el-row{
    margin-bottom: 20px;
  }
</style>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: '',
          order_no: '',
          order_type: 2,
          job_no: '',
          alltotal: '',
          reall_total: '',
          stime: '',
          order_state: 0,
          exam_type: 2,
          exam_firs: 0,
          review_fir: '',
          remarks: '',
          etime: '',
          name: '',
          exp_date: '',
          director: ''
        },
        tableData: [],
        dataFormState: false,
        dataListLoading: false,
        tableDataCache: [],
        newrestaurants: [],
        typeOption: [{value: 1 ,lable:"入库"} , {value: 2 ,lable:"出库"} , {value: 3 ,lable:"报废"}],
        dataRule: {
          goodsName: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      querySearchAsync (queryString, cb) {
        this.$http({
          url: this.$http.adornUrl('/code/queryArtic'),
          method: 'get',
          params: this.$http.adornParams({
            material_no: queryString
          })
        }).then(({data}) => {
          this.newrestaurants = data.article.list
          // for (var i = 0; i < data.article.list.length; i++) {
          //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
          //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
          // }
        // console.log("this.newrestaurants="+JSON.stringify(this.newrestaurants))
        // var results = queryString ? data.page.list.filter(this.createStateFilter(queryString)) : data.page.list;
        clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
              cb(this.newrestaurants)
        }, 100 * Math.random())
      })
      },
      //表头
      renderHeader (h,{column}){
        this.normalizeComponent(
          // src_autocompletevue_type_script_lang_js_,
          // autocompletevue_type_template_id_152f2ee6_render,
          // autocompletevue_type_template_id_152f2ee6_staticRenderFns,
          // false,
          null,
          null,
          null
        )
        var _vm = this
        var _h = _vm.$createElement
        var _c = _vm._self._c || _h
        return h  (
          "div",
          {
            class: [
              _vm.type === "textarea" ? "el-textarea" : "el-input",
              _vm.inputSize ? "el-input--" + _vm.inputSize : "",
              {
                "is-disabled": _vm.inputDisabled,
                "is-exceed": _vm.inputExceed,
                "el-input-group": _vm.$slots.prepend || _vm.$slots.append,
                "el-input-group--append": _vm.$slots.append,
                "el-input-group--prepend": _vm.$slots.prepend,
                "el-input--prefix": _vm.$slots.prefix || _vm.prefixIcon,
                "el-input--suffix":
                  _vm.$slots.suffix ||
                  _vm.suffixIcon ||
                  _vm.clearable ||
                  _vm.showPassword
              }
            ],
            on: {
              mouseenter: function($event) {
                _vm.hovering = true
              },
              mouseleave: function($event) {
                _vm.hovering = false
              }
            }
          },
          [
            _vm.type !== "textarea"
              ? [
                _vm.$slots.prepend
                  ? _c(
                  "div",
                  { staticClass: "el-input-group__prepend" },
                  [_vm._t("prepend")],
                  2
                  )
                  : _vm._e(),
                _vm.type !== "textarea"
                  ? _c(
                  "input",
                  _vm._b(
                    {
                      ref: "input",
                      staticClass: "el-input__inner",
                      attrs: {
                        tabindex: _vm.tabindex,
                        type: _vm.showPassword
                          ? _vm.passwordVisible
                            ? "text"
                            : "password"
                          : _vm.type,
                        disabled: _vm.inputDisabled,
                        readonly: _vm.readonly,
                        autocomplete: _vm.autoComplete || _vm.autocomplete,
                        "aria-label": _vm.label
                      },
                      on: {
                        compositionstart: _vm.handleCompositionStart,
                        compositionend: _vm.handleCompositionEnd,
                        input: _vm.handleInput,
                        focus: _vm.handleFocus,
                        blur: _vm.handleBlur,
                        change: _vm.handleChange
                      }
                    },
                    "input",
                    _vm.$attrs,
                    false
                  )
                  )
                  : _vm._e(),
                _vm.$slots.prefix || _vm.prefixIcon
                  ? _c(
                  "span",
                  { staticClass: "el-input__prefix" },
                  [
                    _vm._t("prefix"),
                    _vm.prefixIcon
                      ? _c("i", {
                        staticClass: "el-input__icon",
                        class: _vm.prefixIcon
                      })
                      : _vm._e()
                  ],
                  2
                  )
                  : _vm._e(),
                _vm.getSuffixVisible()
                  ? _c("span", { staticClass: "el-input__suffix" }, [
                    _c(
                      "span",
                      { staticClass: "el-input__suffix-inner" },
                      [
                        !_vm.showClear ||
                        !_vm.showPwdVisible ||
                        !_vm.isWordLimitVisible
                          ? [
                            _vm._t("suffix"),
                            _vm.suffixIcon
                              ? _c("i", {
                                staticClass: "el-input__icon",
                                class: _vm.suffixIcon
                              })
                              : _vm._e()
                          ]
                          : _vm._e(),
                        _vm.showClear
                          ? _c("i", {
                            staticClass:
                              "el-input__icon el-icon-circle-close el-input__clear",
                            on: { click: _vm.clear }
                          })
                          : _vm._e(),
                        _vm.showPwdVisible
                          ? _c("i", {
                            staticClass:
                              "el-input__icon el-icon-view el-input__clear",
                            on: { click: _vm.handlePasswordVisible }
                          })
                          : _vm._e(),
                        _vm.isWordLimitVisible
                          ? _c("span", { staticClass: "el-input__count" }, [
                            _c(
                              "span",
                              { staticClass: "el-input__count-inner" },
                              [
                                _vm._v(
                                  "\n            " +
                                  _vm._s(_vm.textLength) +
                                  "/" +
                                  _vm._s(_vm.upperLimit) +
                                  "\n          "
                                )
                              ]
                            )
                          ])
                          : _vm._e()
                      ],
                      2
                    ),
                    _vm.validateState
                      ? _c("i", {
                        staticClass: "el-input__icon",
                        class: ["el-input__validateIcon", _vm.validateIcon]
                      })
                      : _vm._e()
                  ])
                  : _vm._e(),
                _vm.$slots.append
                  ? _c(
                  "div",
                  { staticClass: "el-input-group__append" },
                  [_vm._t("append")],
                  2
                  )
                  : _vm._e()
              ]
              : _c(
              "textarea",
              _vm._b(
                {
                  ref: "textarea",
                  staticClass: "el-textarea__inner",
                  style: _vm.textareaStyle,
                  attrs: {
                    tabindex: _vm.tabindex,
                    disabled: _vm.inputDisabled,
                    readonly: _vm.readonly,
                    autocomplete: _vm.autoComplete || _vm.autocomplete,
                    "aria-label": _vm.label
                  },
                  on: {
                    compositionstart: _vm.handleCompositionStart,
                    compositionend: _vm.handleCompositionEnd,
                    input: _vm.handleInput,
                    focus: _vm.handleFocus,
                    blur: _vm.handleBlur,
                    change: _vm.handleChange
                  }
                },
                "textarea",
                _vm.$attrs,
                false
              )
              ),
            _vm.isWordLimitVisible && _vm.type === "textarea"
              ? _c("span", { staticClass: "el-input__count" }, [
                _vm._v(_vm._s(_vm.textLength) + "/" + _vm._s(_vm.upperLimit))
              ])
              : _vm._e()
          ],
          2
        )
      },
      getSuffixVisible () {
        return this.$slots.suffix || this.suffixIcon || this.showClear || this.showPassword || this.isWordLimitVisible || this.validateState && this.needStatusIcon;
      },
      calAmount () {
        var alltotal = 0
        for (var i = 1; i < this.tableData.length; i++) {
          if (this.tableData[i].price != null && this.tableData[i].price != '') {
            if (this.tableData[i].qunatity != null && this.tableData[i].qunatity != '') {
              this.tableData[i].amount = (this.tableData[i].price * this.tableData[i].qunatity).toFixed(2)
              alltotal = parseFloat(this.tableData[i].amount) + parseFloat(alltotal)
            }
          }
        }
        this.dataForm.alltotal = alltotal
        if (alltotal >= 100000) {
          this.dataForm.exam_type = 4
        } else if (alltotal >= 10000) {
          this.dataForm.exam_type = 3
        } else {
          this.dataForm.exam_type = 2
        }
        console.log(this.dataForm.exam_type)
      },
      close () {
        this.visible = false
        this.$emit('refreshDataList')
      },
      dateCheck () {
        var date = new Date()
        if (date > this.dataForm.exp_date) {
           this.dataForm.exp_date = ''
            this.$message({
              message: "预计需求时间不可小于当前时间！",
              type: 'error'
            });
        }
      },
      complet () {
        //complete
        this.$http({
          url: this.$http.adornUrl("/orders/complete"),
          method: "post",
          params: this.$http.adornParams({'order_no':this.dataForm.order_no , 'recheck':true })
        }).then(({ data }) => {
          if (data.code === 0) {
            this.$message({
              message: '成功！',
              type: 'success',
              duration: 1500
            })
          this.visible = false
          this.$emit('refreshDataList')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
      handleSelect (item) {
        var msg ;
        var buff = true ;
        for (var i = 1 , len = this.tableData.length ; i < len ; i ++) {
          if (this.tableData[i].article_no.indexOf(item.article_no) >= 0 ) {
            buff = false ;
            msg = "此物品列表已存在！";
          }
        }
        if (buff) {
          this.tableData.push(item)
          this.tableData[0].article_name = ''
          console.log(item)
          if (item.clas_name.indexOf("刀") >= 0 || item.clas_name.indexOf("鞋") >= 0) {
            this.dataForm.exam_firs = 1 ;
          }
        } else {
          this.$message({
            message: msg,
            type: 'error'
          });
        }
      },
      confirmAdd (row, index) {
      },
      subData (formName) {
        if (this.check()) {
              this.tableData.shift()
              if (this.dataForm.exam_firs == 1) {
                this.dataForm.order_state = 1
              } else {
                this.dataForm.order_state = 2
              }
              this.$http({
                url: this.$http.adornUrl("/orders/addOrUpdate"),
                method: "post",
                data: this.$http.adornData({
                  "order_no": this.dataForm.order_no,
                  "order_state": this.dataForm.order_state,
                  "id": this.dataForm.id,
                  "order_type": this.dataForm.order_type,
                  "exam_firs": this.dataForm.exam_firs,
                  "exam_type": this.dataForm.exam_type,
                  "job_no": this.dataForm.job_no,
                  "director": this.dataForm.director,
                  "alltotal": this.dataForm.alltotal,
                  "exp_date": this.dataForm.exp_date,
                  "remarks": this.dataForm.remarks,
                  "detail": JSON.stringify(this.tableData)
                })
              }).then(({data}) => {
                if (data.code === 0 ) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500
                  })
                  this.tableData.unshift({edit: true})
                  this.visible = false
                  this.$emit('refreshDataList')
                } else {
                  this.$message({
                    message: data.msg,
                    type: 'error',
                    duration: 1500
                  })
                }
            })
        }
      },
      check () {
          var buff = true
          var cmsg = ""
          if (this.dataForm.order_type == null || this.dataForm.order_type === "") {
            cmsg = "订单类型不可为空！"
            buff = false
          }

          for (var i = 1; i < this.tableData.length; i++) {
            if (this.tableData[i].price != null && this.tableData[i].price != '') {
              if (this.tableData[i].qunatity <= 0) {
                cmsg = "所有物品数量必须大于零！"
                buff = false
              }
            }
          }
          if (!buff) {
            this.$message.error(cmsg)
          }
          return buff;
      },
      saveOrUpdateData (formName) {
        if (this.check()) {
              this.tableData.shift()
              this.$http({
                url: this.$http.adornUrl('/orders/addOrUpdate'),
                method: 'post',
                data: this.$http.adornData({
                  "order_no": this.dataForm.order_no,
                  "order_state": 0,
                  "id": this.dataForm.id,
                  "order_type": this.dataForm.order_type,
                  "exam_firs": this.dataForm.exam_firs,
                  "exam_type": this.dataForm.exam_type,
                  "job_no": this.dataForm.job_no,
                  "alltotal": this.dataForm.alltotal,
                  "director": this.dataForm.director,
                  "exp_date": this.dataForm.exp_date,
                  "remarks": this.dataForm.remarks,
                  "detail": JSON.stringify(this.tableData)
                })
              }).then(({data}) => {
                // this.newrestaurants = data.article.list
                // for (var i = 0; i < data.article.list.length; i++) {
                //   this.newrestaurants[i].value = this.newrestaurants[i].article_name
                // }
                if ( data.code === 0 ) {
                  this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1500
                  })
                  this.init(data.order, 2)
                  this.tableData.unshift({edit: true})
                } else {
                  this.$message.error(data.msg)
                }
              })
          }
      },
      init (val, val1) {
        if (val1 === 1) {
          this.dataForm.id = ''
          this.dataForm.order_no = ''
          this.dataForm.order_type = 2
          this.dataForm.order_state = 0
          this.dataForm.exam_firs = 0
          this.dataForm.job_no = ''
          this.dataForm.alltotal = ''
          this.dataForm.reall_total = ''
          this.dataForm.stime = ''
          this.dataForm.exam_type = ''
          this.dataForm.review_fir = ''
          this.dataForm.etime = ''
          this.dataForm.name = this.$store.state.user.realname
          this.dataForm.director = this.$store.state.user.director
          this.tableData = []
          this.dataForm.exp_date = ''
          this.dataForm.remarks = ''
          this.visible = true
          this.dataListLoading = false
          this.tableData.push({
            edit: true
          })
        } else if (val1 === 2) {
          this.$nextTick( () => {
            this.visible = true
              this.$http({
                url: this.$http.adornUrl(`/orders/getDetail`),
                method: 'post',
                params: this.$http.adornParams({
                  'order_no': val.order_no
                })
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.dataForm.id = data.orders.id
                  this.dataForm.order_no = data.orders.order_no
                  this.dataForm.order_type = data.orders.order_type
                  this.dataForm.order_state = data.orders.order_state
                  this.dataForm.exam_firs = data.orders.exam_firs
                  this.dataForm.job_no = data.orders.job_no
                  this.dataForm.alltotal = data.orders.alltotal
                  this.dataForm.reall_total = data.orders.reall_total
                  this.dataForm.stime = data.orders.stime
                  this.dataForm.exam_type = data.orders.exam_type
                  this.dataForm.review_fir = data.orders.review_fir
                  this.dataForm.etime = data.orders.etime
                  this.dataForm.name = data.orders.name
                  this.dataForm.director = data.orders.director
                  this.tableData = data.orders.detail
                  this.dataForm.exp_date = data.orders.exp_date
                  this.dataForm.remarks = data.orders.remarks
                  this.dataListLoading = false
                  if (data.orders.order_state == 0 || data.orders.order_state == -1) this.tableData.unshift({edit: true})
                }
              })
          })
        }
      },
      addData () {
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].edit = false
        }
        this.tableData.push({
          edit: true
        })
        // console.log(this.dataForm.tableData)
      },
      deleteData (row, index) {
        this.tableData.splice(index, 1)
        this.tableDataCache.splice(index, 1)
        this.calAmount ()
      },
      editData (row) {
        row.edit = true
      }
    }
  }
</script>
