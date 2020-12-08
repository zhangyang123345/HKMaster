<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.material_no" placeholder="料号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.manufacturer" placeholder="厂商" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.specs" placeholder="规格" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.unit" placeholder="单位" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.kind" placeholder="二类" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.class" placeholder="三类" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <div style="display:none">
          <xy-vue-qr ref="xyQR" :text="qrMsg" :logoSrc="imageUrl" :size="150" :margin="5" :callback="getQUrlX"
                     :dotScale="1"></xy-vue-qr>
        </div>
        <el-dialog
          width="90%"
          top="1vh"
          :show-close="false"
          :close-on-click-modal="false"
          :visible.sync="visible">
          <div id = "imgDiv"  style="text-align: center;width:750px;margin:auto;">
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="article_no"
        header-align="center"
        align="center"
        width="250"
        label="商品编码">
      </el-table-column>
      <el-table-column
        prop="material_no"
        header-align="center"
        align="center"
        width="150"
        label="料号">
      </el-table-column>
      <el-table-column
        align="center"
        label="二维码下载">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            width="220">
            <div style="text-align: center; margin: 0">
              <xy-vue-qr ref="qr" :text="scope.row.article_no" :logoSrc="imageUrl" :size="200" :margin="5"
                         :dotScale="1"></xy-vue-qr>
              <el-row class="quCell">
                <el-col span="14" class="quCell">
                    <el-input v-model="dataForm.qrNun" placeholder="25,30,24,...." clearable></el-input>
                </el-col>
                <el-col span="10" class="quCell">
                    <el-button type="primary" size="small" @click="downloadQR(scope.row)">下载</el-button>
                </el-col>
              </el-row>
            </div>
            <el-button slot="reference" @click="seeQR(scope.row)">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="article_name"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="manufacturer_name"
        header-align="center"
        align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="fam_name"
        header-align="center"
        align="center"
        label="大类">
      </el-table-column>
      <el-table-column
        prop="kin_name"
        header-align="center"
        align="center"
        label="二类">
      </el-table-column>
      <el-table-column
        prop="clas_name"
        header-align="center"
        align="center"
        label="三类">
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
      <el-table-column
        prop="life"
        header-align="center"
        align="center"
        label="寿命(天)">
      </el-table-column>
      <el-table-column
        prop="create_time"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </div>
</template>
<script>
  import xyVueQr from 'vue-qr'
  import html2canvas from 'html2canvas'
  export default {
    mounted () {
    },
    activated () {
      this.getDataList()
    },
    components: {
      xyVueQr ,
      html2canvas ,
    },
    data () {
      return {
        dataForm: {
          key: '',
          material_no: '',
          manufacturer: '',
          specs: '',
          unit: '',
          class: '',
          kind: '',
          qrNun: '',
          qrNumb: 0,
          qrNumR: []
        },
        qrMsg: '',
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        emptyText: '',
        tableData: [],
        imageUrl: require("../../../../assets/img/favicon3.png"),
        posterBase64: '', //  转化后的base64编码
        rowData: '',
        cavenList: [],
        visible: false
      }
    },
    // computed: {
    //   isAdmin() {
    //     switch (this.$store.state.contextUser.role) {
    //       case 'BRAND' :
    //         this.filter.brandId = this.$store.state.contextUser.id;
    //         break;
    //     }
    //   },
    //   //判断当前选择的是门店
    //   isRentTreeStore() {
    //     return this.filter.storeId !== undefined;
    //   }
    // },
    methods: {
      //*索引排序*/
      // indexMethod(index) {
      //   if (this.pageNo > this.pageTotal / this.pageSize) {
      //     if (this.pageTotal % this.pageSize === 0) {
      //       this.pageNo = parseInt(this.pageTotal / this.pageSize);
      //     } else {
      //       this.pageNo = parseInt(this.pageTotal / this.pageSize) + 1;
      //     }
      //   }
      //   return index + this.pageSize * (this.pageNo - 1) + 1;
      // },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/code/queryArtic'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'goods_name': this.dataForm.key,
            'material_no': this.dataForm.material_no,
            'manufacturer_name':this.dataForm.manufacturer,
            'specs_name':this.dataForm.specs,
            'unit_name':this.dataForm.unit,
            'kind_name':this.dataForm.kind,
            'classification_name':this.dataForm.class
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.tableData = data.article.list
          this.totalPage = data.article.total
        } else {
          this.tableData = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.totalPage = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      //导出数据
      exportArt () {
        this.$http({
          url: this.$http.adornUrl('/code/export'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'goods_name': this.dataForm.key,
            'manufacturer_name':this.dataForm.manufacturer,
            'specs_name':this.dataForm.specs,
            'unit_naem':this.dataForm.unit,
            'kind_naem':this.dataForm.kind,
            'classification_name':this.dataForm.class
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          var cacheData = data.list
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel')
            const tHeader = ['物品编码', '品名', '厂商代码', '厂商', '保质期', '单价', '规格', '单位', '一类', '二类', '三类']
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['article_no', 'article_name', 'manufacturer_no', 'manufacturer_name', 'life', 'price', 'specs_name', 'unit_name', 'fam_name', 'kin_name', 'clas_name']
            const data = this.formatJson(filterVal, cacheData)
            export_json_to_excel(tHeader, data, '物品详细信息')
        })
        } else {
          this.$message.error(data.msg)
        }
      })
      },
      /**
       * 数据加载
       */
      loadData: function (filter) {
        let params = Object.assign(this.filter, {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }, filter);
        this.$ajax.get("joint/uPay/paging", {
          params: params
        }).then(res => {
          if (res.code === '0') {
          this.tableData = res.data;
          this.pageTotal = res.count;
          this.emptyText = res.msg;
        } else {
          this.$message.error(res.msg);
        }
      })
      },
      /**
       * 当表格有一行选中事件
       */
      selectionChangeHandle: function (selection) {

      },
      /**
       * 修改事件
       */
      editHandle: function (row) {
        this.$emit('onEdit', row);
      },
      /**
       * 查看二维码
       * @author YJX
       **/
      seeQR: function (row) {
        // for (var i in this.tableData) {
        //   if (this.tableData[i].article_no.indexOf(row.article_no) >= 0) {
        //     console.log("TEXT")
        //     this.tableData[i].qrMsg = row.article_no + (this.S4() + this.S4())
        //   }
        // }
        // this.config.logo = row.icon; //中间的图标
      },
      S4 () {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      },
      getQUrlX: function (url) {
        // let a = document.createElement('a');
        // // 下载图名字
        // a.download = this.rowData.article_name + "-" + this.rowData.article_no;
        // a.href = url;
        // //合成函数，执行下载
        // a.dispatchEvent(new MouseEvent('click'))
        //this.cavenList.push(url)
        var div = document.getElementById("imgDiv")
        var idiv = document.createElement("div")
        let image = document.createElement('img')
        idiv.setAttribute("style","height:180px;width:180px;display:inline-block")
        image.setAttribute("src", url)
        idiv.appendChild(image)

        var ipmt = document.createElement("div")
        var ipsp = document.createElement("span")
        ipsp.innerHTML = this.rowData.material_no
        ipmt.appendChild(ipsp)
        idiv.appendChild(ipmt)

        var ipmt = document.createElement("div")
        var ipsp = document.createElement("span")
        ipsp.innerHTML = this.rowData.article_name
        ipmt.appendChild(ipsp)
        idiv.appendChild(ipmt)

        var ipmt = document.createElement("div")
        var ipsp = document.createElement("span")
        ipsp.innerHTML = this.rowData.specs_name+"     数量："+this.dataForm.qrNumR[this.dataForm.qrNumb]
        ipmt.appendChild(ipsp)
        idiv.appendChild(ipmt)

        div.appendChild(idiv)
        if (this.dataForm.qrNumb > 0) {
          this.downloadQRD(this.rowData)
        } else {
          setTimeout( ()=> html2canvas(document.getElementById('imgDiv'),{
            logging: true,
            scrollY: 0, //  为了解决顶部偏移出现白边，初始化时就直接设置往上偏移-20位置
            scrollX: 0,
            allowTaint: false,
            useCORS: true// 运行跨域图片资源
          }).then((canvas) => {
              var image = canvas.toDataURL('img');
              let a = document.createElement('a');
              // 下载图名字
              a.download = this.rowData.article_name + "-" + this.rowData.article_no;
              //url
              a.href = image;//this.$refs.qr.$el.src;
              //合成函数，执行下载
              a.dispatchEvent(new MouseEvent('click'))
              document.getElementById('imgDiv').innerHTML = "";
              this.visible = false
            }),1000);
         }
      },
      getQUrl: function (url) {
        var div = document.getElementById("imgDiv")
        var idiv = document.createElement("div")
        let image = document.createElement('img')
        idiv.setAttribute("style","height:180px;width:180px;display:inline-block")
        image.setAttribute("src", url)
        idiv.appendChild(image)

        var ipmt = document.createElement("div")
        var ipsp = document.createElement("span")
        ipsp.innerHTML = this.rowData.material_no
        ipmt.appendChild(ipsp)
        idiv.appendChild(ipmt)

        var ipmt = document.createElement("div")
        var ipsp = document.createElement("span")
        ipsp.innerHTML = this.rowData.article_name
        ipmt.appendChild(ipsp)
        idiv.appendChild(ipmt)

        var ipmt = document.createElement("div")
        var ipsp = document.createElement("span")
        ipsp.innerHTML = this.rowData.specs_name+"     数量："+this.dataForm.qrNun
        ipmt.appendChild(ipsp)
        idiv.appendChild(ipmt)

        div.appendChild(idiv)
        setTimeout( ()=> html2canvas(document.getElementById('imgDiv'),{
          logging: true,
          scrollY: 0, //  为了解决顶部偏移出现白边，初始化时就直接设置往上偏移-20位置
          scrollX: 0,
          allowTaint: false,
          useCORS: true// 运行跨域图片资源
        }).then((canvas) => {
            var image = canvas.toDataURL('img');
            let a = document.createElement('a');
            // 下载图名字
            a.download = this.rowData.article_name + "-" + this.rowData.article_no;
            //url
            a.href = image;//this.$refs.qr.$el.src;
            //合成函数，执行下载
            a.dispatchEvent(new MouseEvent('click'))
            document.getElementById('imgDiv').innerHTML = "";
            this.visible = false
          }),1000);
    },
      downloadQR: function (row) {
        if (this.dataForm.qrNun != '' ) {
          this.dataForm.qrNumR = this.dataForm.qrNun.split(",")
          this.dataForm.qrNumb = this.dataForm.qrNumR.length
          this.downloadQRD(row)
        }
      },
      downloadQRD: function (row) {
        this.visible = true ;
        this.rowData = row
        // let div = document.createElement('div');
        // div.setAttribute("id", "imgDiv");
        // document.body.appendChild(div)
        var code = (this.S4() + this.S4())
        this.qrMsg = row.article_no + code
        this.dataForm.qrNumb --
      }
    }
    // watch: {},
    // filters: {
    //   appSecretIsDefault(val) {
    //     return val === true ? "默认" : "非默认";
    //   }
    // },
    // beforeDestroy() {
    // }
  }
  </script>
  <style>
    .quCell{
      margin-bottom: 0px!important;
    }
  </style>
 <!--// imageUrl: require("../../../../assets/img/favicon3.png")-->
<!--// <style >-->
<!--//   .divma{-->
<!--//         width: 100px;-->
<!--//          height: 100px;-->
<!--//          position: absolute;-->
<!--//          left: 50%;-->
<!--//          top: 40%;-->
<!--//          margin: -50px 0 0 -50px;-->
<!--//      }-->
<!--// </style>-->
