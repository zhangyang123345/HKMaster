<template>
  <div class="d-chart-item DashboardTitle">
    <p class="ptitle">PVD Data Visualization</p>
  </div>
</template>

<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'
  export default {
    name: 'DashboardTitle',
    components: {
      vueSeamlessScroll
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>

  .DashboardTitle {
    left: 37.5%;
    top: 0%;
    width: 25%;
    height: 5%;
    background: rgba(5, 44, 127, 0);
    border-top: none;
  }
  .ptitle{
    font-size: 200%;
    font-family: '宋体';
    color: #c1c1c2;
    font-style: italic;
    margin-top: 10%;
    font-weight: bold;
    position:relative;
    text-align:center;
  }
</style>
