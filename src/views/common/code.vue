<template>
  <div class="divma">
    <vue-qr :logoSrc="imageUrl" text="http://www.zhangyang3160.cn:8080/static/index.html" :size="200"></vue-qr>
  </div>

</template>

<script>
  import vueQr from 'vue-qr'
  export default {
    name: "qrCode",
    data (){
      return {
        imageUrl: require("../../assets/img/zk.jpg")
      }
    },
    components: {
      vueQr
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
<style>
  .divma{
        width: 100px;
         height: 100px;
         position: absolute;
         left: 50%;
         top: 40%;
         margin: -50px 0 0 -50px;
     }
</style>
