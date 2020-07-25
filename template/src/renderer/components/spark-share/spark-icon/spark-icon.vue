<template>
    <div class="icon-container" :style="style">
        <svg class="icon" aria-hidden="true" @mouseenter="hover = true" @mouseleave="hover = false">
            <use :xlink:href="href"></use>
        </svg>
    </div>
</template>

<script>
  export default {
    name: 'spark-icon',
    props: {
      name: {
        type: String,
        default: '',
        require: true
      },
      hoverName: {
        type: String,
        default: ''
      },
      fontSize: {
        type: Number
      }
    },
    data () {
      return {
        hover: false
      };
    },
    computed: {
      href () {
        const name = `#icon-${this.name}`;
        let hoverName = `#icon-${this.hoverName}`;
        if (!this.hoverName) {
          hoverName = name;
        }
        return this.hover ? hoverName : name;
      },
      style () {
        if (this.fontSize) {
          return { fontSize: this.fontSize + 'px' };
        } else {
          return {};
        }
      }
    },

    /**
     *  生命周期钩子---组件被创建
     */
    created () {
      this.bindEvents();
    },
    /**
     *  生命周期钩子---组件被挂载
     */
    mounted () {
    },
    /**
     *  生命周期钩子---组件被销毁
     */
    beforeDestroy () {
      this.bindEvents(true);
    },
    methods: {
      bindEvents (remove) {

      }
    }
  }
</script>

<style src="./spark-icon.scss"></style>
