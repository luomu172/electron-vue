<template>
  <div class="toast" v-show="isShowed" :class="{ 'is-in': this.isIn }">
      <span>{{msg}}</span>
  </div>
</template>

<script>
import bus from 'bus';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('global');

export default {
  data () {
    return {
      msg: '',
      isIn: false,
      tipType: 'success',
      isShowed: false
    };
  },
  created () {
    bus.$on('toast', this.showToast);
    bus.$on('closeToast', this.close);
    bus.$on('set-net-error', this.onSetNetError);
  },
  beforeDestroy () {
    bus.$off('toast', this.showToast);
    bus.$off('closeToast', this.close);
    bus.$off('set-net-error', this.onSetNetError);
  },

  computed: {
    ...mapState({
      isNetError: state => state.isNetError
    })
  },

  mounted () {},

  methods: {
    ...mapActions([
      'setIsNetError'
    ]),
    onSetNetError (isNetError) {
      this.setIsNetError(isNetError);
      isNetError && this.showToast({ type: 'error', msg: '网络异常', lastTime: 2 });
    },
    /**
     * 通用toast组件
     * @param msg
     * type: 提示类型  成功success  错误error  警告warn  加载loading
     * msg: 提示文本 支持html类型
     * lastTime 提示出现时间 默认2s  传0则不消失
     */
    showToast (msg) {
      this.tipType = msg.type;
      this.showTips(msg);
    },
    // 展示Tips，如果不指定时间，则2000ms之后消失, 时间指定0则不关闭toast
    showTips (msg) {
      this.msg = msg.msg;
      this.isIn = true;
      this.isShowed = true;
      if (msg.lastTime !== 0) {
        setTimeout(() => {
          this.close();
        }, msg.lastTime * 1000 || 2000);
      }
    },
    // 关闭弹窗
    close () {
      this.isIn = false;
      this.tipType = 'success';
      this.isShowed = false;
      this.msg = '';
    }
  }
};
</script>

<style scoped src="./toast.scss"></style>
