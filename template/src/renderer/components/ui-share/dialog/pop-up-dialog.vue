<template>
  <div class="dialog-container" :class="{'show-mask': isShowMask}" v-show="isShow">

    <div :style="style" :class="size" class="dialog">
      <div class="head" v-show="size!='small'">
        <div class="title">{{title}}</div>

        <div class="close" v-show="isShowClose" @click="onClose">          
          <spark-icon :fontSize="18"  :name="'close_default'" :hover-name="'close_hover'"></spark-icon>
        </div>
      </div>

      <div class="content-wrapper scrollbar">
        <div class="content-area" :class="{'expend-to-btn-panel': isShowClose}">
          <slot></slot>
        </div>
      </div>

      <div class="btn-panel" v-show="isShowBtn">
        <div @click="onClose" v-if="isShowCancelBtn" class="cancel short-btn cancel-btn">{{cancelText}}</div>
        <div @click="onConfirm" class="confirm short-btn">{{confirmText}}</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  props: {
    /**
     * 对话框类型 默认小
     * 可选项：
     *  small  小
     *  middle 中
     *  big    大
     *  ultra  超大
    **/
    size: {
      type: String,
      required: false,
      default: 'small'
    },

    title: {
      type: String,
      required: false,
      default: ''
    },

    confirmText: {
      type: String,
      required: false,
      default: '确定'
    },
    cancelText: {
      type: String,
      required: false,
      default: '取消'
    },

    isShowMask: {
      type: Boolean,
      required: false,
      default: true
    },

    isShowClose: {
      type: Boolean,
      required: false,
      default: false
    },

    isShowBtn: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowCancelBtn: {
      type: Boolean,
      required: false,
      default: true
    },
    isShow: {
      type: Boolean,
      required: true,
      default: false
    },
    width: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
    };
  },
  created () {
  },
  beforeDestroy () {
  },

  computed: {
    style () {
      if (this.width) {
        return {
          width: this.width + 'px'
        }
      }
      return null;
    }
  },

  mounted () {},

  methods: {
    onConfirm () {
      this.$emit('confirm');
    },
    onClose () {
      this.$emit('close');
    }
  }
};
</script>

<style>
</style>
<style scoped src="./pop-up-dialog.scss"></style>
