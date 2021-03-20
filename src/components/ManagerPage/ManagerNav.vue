<template>
  <div>
    <el-menu v-if="isShowNav"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="1">
        <el-avatar>
          <el-image :src="this.$store.state.admin.info.avatarURL"/>
        </el-avatar>
      </el-menu-item>
      <el-menu-item index="2">用户管理</el-menu-item>
      <el-menu-item index="3">歌单管理</el-menu-item>
      <el-menu-item index="4">歌曲管理</el-menu-item>
      <el-menu-item index="5">评论管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ManagerNav',
  methods: {
    handleSelect (key) {
      switch (key) {
        case '1':
          /* 进入统计页面 */
          break
        case '2':
          /* 用户管理 */
          this.$router.push({ name: 'UserManager' })
          break
        case '3':
          /* 歌单管理 */
          this.$router.push({ name: 'SongListManager' })
          break
        case '4':
          /* 歌曲管理 */
          this.$router.push({ name: 'SongManager' })
          break
        case '5':
          /* 评论管理 */
          break
      }
    }
  },
  computed: {
    isShowNav () {
      return this.$store.state.admin.isLogin
    }
  }
}
</script>

<style scoped>

</style>
