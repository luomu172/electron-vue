<template>
  <pop-up-dialog 
      :isShow="isShow"
      :size="'small'"
      :isShowMask="isShowMask"
      v-on:confirm="onConfirm"
      v-on:close="onClose"
  >    
    <div>{{content}}</div>
  </pop-up-dialog>
</template>

<script>

import bus from 'bus';

export default {
  props: {
  },
  data () {
    return {
      isShow: false,
      content: '',
      confirmCallback: null,
      closeCallback: null,
      isShowMask: true
    };
  },
  created () {
    bus.$on('pop-up-dialog', this.popUpDialog);
  },
  beforeDestroy () {
    bus.$off('pop-up-dialog', this.popUpDialog);
  },

  computed: {},

  mounted () {},

  methods: {
    popUpDialog (data) {
      this.content = data.content;
      this.confirmCallback = data.confirmCallback;
      this.closeCallback = data.closeCallback;
      this.isShowMask = !data.hideMask;
      this.isShow = true;
    },
    onClose (args) {
      this.isShow = false;
      this.closeCallback && this.closeCallback(args);
    },
    onConfirm (args) {
      this.isShow = false;
      this.confirmCallback && this.confirmCallback(args);
    }
  }
};
</script>
