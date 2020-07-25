<template>
    <div class="loading" v-if="isShowLoading">     
      <div class="bg"></div> 
      <div class="spark-spin">
          <span class="spark-spin-dot">
              <i class="spark-spin-dot-item"></i>
              <i class="spark-spin-dot-item"></i>
              <i class="spark-spin-dot-item"></i>
              <i class="spark-spin-dot-item"></i>
          </span>
          <div class="spark-spin-tips">请稍候...</div>
      </div>
    </div>
</template>

<script>
  import bus from 'bus';

  export default {
    name: 'loading',
    data () {
      return {
        loadingItemCount: 0,
        isShowLoading: false
      };
    },
    computed: {
    },
    created () {
      this.bindEvents();
    },
    mounted () {
    },
    beforeDestroy () {
      this.bindEvents(true);
    },
    methods: {
      bindEvents (remove) {
        const method = remove ? '$off' : '$on';
        bus[method]('add-loading-item-count', this.onAddLoadingItemCount);
        bus[method]('decrease-loading-item-count', this.onDecreaseLoadingItemCount);
      },
      onAddLoadingItemCount () {
        this.loadingItemCount++;
      },
      onDecreaseLoadingItemCount () {
        this.loadingItemCount--;
      }
    },
    watch: {
      loadingItemCount: function (newValue, oldValue) {
        if (oldValue === 0 && newValue > 0) {
          // loading延迟300毫秒出现
          setTimeout(() => {
            if (this.loadingItemCount > 0) {
              this.isShowLoading = true;
            } else {
              this.isShowLoading = false;
            }
          }, 300)
        } else if (newValue > 0) {
          this.isShowLoading = true;
        } else if (newValue <= 0) {
          this.loadingItemCount = 0;
          this.isShowLoading = false;
        }
      }
    }
  }
</script>

<style scoped src="./loading.scss"></style>
