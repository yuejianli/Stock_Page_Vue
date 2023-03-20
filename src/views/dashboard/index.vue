<template>
  <div class="dashboard-container">
    <div class="dashboard-text">谢谢你那么帅还访问我</div>
    <div class="dashboard-text"><a href="https://www.yueshushu.top/" target="_blank"><span class="dang">查看档案</span></a> </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dang {
  font-size: 30px;
  color: red;
}
</style>
