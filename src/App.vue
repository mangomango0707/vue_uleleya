<template>
    <div id="app">
      <!-- 路由占位符 -->
      <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
  
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    }
  },
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>

