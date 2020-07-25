<template>
    <div class="net-error" v-if="isNetError">
      <img class="no-error-img" src="../../../assets/img/default/213_213/暂无网络.png" alt="">
      <div class="tips">网络错误</div>
      <div class="refresh long-btn" @click="refresh">刷新</div>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';

  const { mapState } = createNamespacedHelpers('global');

  export default {
    name: 'net-error',
    data () {
      return {
      };
    },
    computed: {
      ...mapState({
        isNetError: state => state.isNetError
      })
    },
    created () {
  
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      refresh () {
        window.location.reload();
      }
    }
  }
</script>

<style scoped src="./net-error.scss"></style>
