<template>
    <div class="li" @click="open">
        <div v-if="show">
            <div class="text">
                <img :src="item.imgSrc"/>
                <div>
                    <h1 class="name">{{item.name}}</h1>
                    <!--<p class="tel">{{item.tel}}</p>-->
                </div>
            </div>
            <!--<button class="edit" @click="show=false"><i class="fa fa-edit"></i></button>-->
            <!--<button class="delete" @click="toRemove"><i class="fa fa-trash-o"></i></button>-->
        </div>
        <div v-else>
            <div class="text">
                <img :src="items.imgSrc"/>
                <div>
                    <input class="name" type="text" v-model="name"/>
                    <input class="tel" type="text" v-model="tel"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['item'],
    data () {
        return {
            show: true,
            name: this.item.name,
            tel: this.item.tel,
            oldName: this.item.name,
            oldTel: this.item.tel
        }
    },
    methods: {
        open () {
          window.open(this.item.tel);
      }
    }
}
</script>

<style scoped>
.li {
    width: 300px;
    margin-right: 60px;
    list-style: none;
    height: 80px;
    margin-bottom: 25px;
    display: inline-block;
}
.li .contain {
    display: inline-block;
}
.li .text {
    width: 250px;
    padding: 3px 0;
    padding-left: 5px;
    display: inline-block;
}
.text > div {
    margin-top: 3px;
    display: inline-block;
    vertical-align: middle;
}
.text img {
    width: 80px;
    height: 80px;
    margin-right: 2px;
    vertical-align: middle;
}
.text input {
    display: block;
    border: none;
}
.text .name {
    width: 90px;
    margin-bottom: 3px;
    font-size: 18px;
    margin-top: 0;
}
.text .tel {
    width: 105px;
    font-size: 15px;
    margin: 0;
}
.li button {
    height: 32px;
    padding: 0;
    margin-top: 11px;
    border: none;
    color: #0f88eb;
    background: none;
    border-radius: 4px;
    cursor: pointer;
    display: none;
}
.delete {
    color: rgb(216, 17, 17) !important;
}
.save, .edit {
    margin-right: 3px;
}
.li button:focus, .text input:focus {
    outline: none;
}
.li i {
    font-size: 20px;
}
.li:hover {
    border: 1px solid #0f88eb;
    border-radius: 5px;
}
.li:hover button {
    display: inline-block;
}
</style>
