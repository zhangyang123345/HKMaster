<template>
    <div id="search">
        <div class="search">
            <input type="text" placeholder="请输入搜索网址" v-model="search" /><span><i class="fa fa-search"></i></span>
        </div>
        <p class="all">共有 {{items.length}} 个网址</p>
        <div class="select">
            <input type="radio" name="contacts" checked @click="selectStatu=1">所有网址
            <input type="radio" name="contacts" @click="selectStatu=2">SME
            <input type="radio" name="contacts" @click="selectStatu=3">MPC-采购
            <input type="radio" name="contacts" @click="selectStatu=4">MPC
          <input type="radio" name="contacts" @click="selectStatu=5">EHS-人员
          <input type="radio" name="contacts" @click="selectStatu=6">设备
          <!--<input type="radio" name="contacts" @click="selectStatu=6">设备系统-->
          <!--<input type="radio" name="contacts" @click="selectStatu=7">内部系统-->
        </div>
        <div class="ul" v-if="newItems.length">
            <contactItem
                v-for="item in newItems"
                :key="item.id"
                :item="item"
                @remove="removeTodo"
                @change="change"
            />
        </div>
        <p class="none" v-else>
            没有网址
        </p>
    </div>
</template>

<<script>
    import contactItem from './noteItem'
    export default {
      props: ['item'],
      data () {
        return {
          search: '',
          selectStatu: 1,
          items: [
            {name: 'K费用', tel: 'https://tm1.jabil.com/tm1web/applications.jsp?tm1server=JabilFinance', status: "MPC", imgSrc: '/static/img/2H.png'},
            {name: '2H&时效性报表', tel: 'http://10.128.19.168:8015/', status: "SME", imgSrc: '/static/img/2H.png'},
            {name: '体温查询', tel: 'https://cnwxic0foapp01/empbot.Web/', status: "MPC", imgSrc: '/static/img/tiwenchaxun.jpg'},
            {name: '耗材需求提报', tel: 'https://cnwxic0foapp01/MLMS//#!/', status: "MPC", imgSrc: '/static/img/haocaixuqiu.jpg'},
            {name: 'Trace(PVD)', tel: 'http://10.128.9.29/#/', status: "SME", imgSrc: '/static/img/Trace-PVD.png'},
            {name: 'Trace(Ano)', tel: 'http://10.128.9.27/#/', status: "SME", imgSrc: '/static/img/Trace-Ano.png'},
            {name: 'PIS(产能)', tel: 'http://cnctug0pdmsap01/pis_m', status: "SME", imgSrc: '/static/img/PIS-channeng.jpg'},
            // {name: 'PIS(工单)', tel: 'http://cnctug0pdmsap01/PISM21/login', status: "SME", imgSrc: '/static/img/PIS-beipinweixiu.jpg'},
            {name: 'ifactory', tel: 'https://jgp-ifactory-ctum/#/', status: "SME", imgSrc: '/static/img/ifactory.jpg'},
            {name: '备品维修看板', tel: 'http://cnctug0pdmsap01/PISM21/', status: "MPC", imgSrc: '/static/img/PIS-beipinweixiu.jpg'},
            {name: 'pvd内务系统', tel: 'http://op2pvdsvs:8002/#/home', status: "SME", imgSrc: '/static/img/PVD-neiwuxitong.jpg'},
            {name: 'RIS-门禁权限', tel: 'http://ris-prd.corp.jabil.org/risnew/index.aspx', status: "EHS-人员", imgSrc: '/static/img/RIS-menjinquanxian.jpg'},
            {name: 'ENDA保密协议', tel: 'https://cnwxic0foapp01/SEMS/', status: "EHS-人员", imgSrc: '/static/img/ENDAbaomixieyi.jpg'},
            {name: 'HRMS车间访客', tel: 'https://cnwxic0foapp01/HRMS/', status: "EHS-人员", imgSrc: '/static/img/HRMS-chejianfangke.jpg'},
            {name: 'E-GATE', tel: 'https://home.acloud.corp.jabil.org/#/index', status: "MPC-采购", imgSrc: '/static/img/E-GATE.jpg'},
            {name: 'E-form FACA', tel: 'https://cnwxic0foapp01/FactoryOpt/account/login', status: "MPC-采购", imgSrc: '/static/img/E-form FACA.jpg'},
            {name: 'RIS', tel: 'https://ris-prd.corp.jabil.org/ris_fixture_ctu/', status: "MPC-采购", imgSrc: '/static/img/RIS.jpg'},
            {name: 'BPM', tel: 'https://bpm.jabil.com/prweb/SAML/', status: "MPC-采购", imgSrc: '/static/img/BPM.jpg'},
            {name: 'COUPA', tel: 'https://jabil.coupahost.com/user/home', status: "MPC-采购", imgSrc: '/static/img/COUPA.png'},
            {name: 'Asset Tracker', tel: 'https://iact.apple.com/#/lines', status: "MPC-采购", imgSrc: '/static/img/Asset Tracker.png'},
            {name: '设备  Power BI', tel: 'https://app.powerbi.com/groups/me/reports/37f66d1a-98eb-476b-9db4-b4e392e2e5ba/ReportSection?redirectedFromSignup=1&ctid=bc876b21-f134-4c12-a265-8ed26b7f0f3b&openReportSource=ReportInvitation', status: "设备", imgSrc: '/static/img/Power BI.jpg'},
            {name: 'PIS 设备管理', tel: 'http://cnctug0pdmsap01/PISM21/emt/repair/charts/measure', status: "设备", imgSrc: '/static/img/PIS-beipinweixiu.jpg'},
            {name: 'PEGA 系统', tel: 'https://bpm.jabil.com/prweb/SAML/54anLfhyQoN4KvhnrUyqdg%5B%5B*/!STANDARD?pzPostData=-1706434030', status: "设备", imgSrc: '/static/img/PEGA_ST.png'},
            {name: 'Ano4.0', tel: 'http://10.128.17.169:8080/#/login', status: "SME", imgSrc: '/static/img/ano.png'}
          ]
        }
      },
      methods: {
        removeTodo (id) {
          this.$emit('remove', id);
        },
        change (obj) {
          this.$emit('change', obj);
        }
      },
      computed: {
        newItems: function () {
          if(this.items.length==0)
            return '';
          if (this.search) {
            return this.items.filter((item)=> {
              return (item.name.indexOf(this.search) != -1);
            });
          } else {
            switch (this.selectStatu) {
              case 1:
                return this.items;
                break;
              case 2:
                return this.items.filter(function (item) {
                  return item.status === 'SME';
                });
                break;
              case 3:
                return this.items.filter(function (item) {
                  return item.status === 'MPC-采购';
                });
                break;
              case 4:
                return this.items.filter(function (item) {
                  return item.status === 'MPC';
                });
                break;
              case 6:
                return this.items.filter(function (item) {
                  return item.status === '设备';
                });
                break;
              // case 6:
              //   return this.items.filter(function (item) {
              //     return item.status === '设备系统';
              //   });
              //   break;
              default:
                return this.items.filter(function (item) {
                  return item.status === 'EHS-人员';
                });
                break;
            }
          }
        }
      },
      components: {
        contactItem
      }
    }
</script>

<style scoped>
@import '../../../assets/css/notes.css';
</style>

