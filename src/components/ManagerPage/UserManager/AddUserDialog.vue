<template>
  <el-dialog :visible.sync="isDialogShow" title="添加用户">
    <div class="form">
      <div class="input_row" id="avatar_row">
        <span class="input_label">头像:</span>
        <el-avatar>
          <el-image :src="user.avatarURL"/>
        </el-avatar>
      </div>
      <div class="input_row">
        <span class="input_label">用户名:</span>
        <el-input class="input" v-model="user.userName" placeholder="用户名"/>
      </div>
      <div class="input_row">
        <span class="input_label">密码:</span>
        <el-input class="input" show-password v-model="user.userPass" placeholder="密码"/>
      </div>
      <div class="input_row">
        <span class="input_label">邮箱:</span>
        <el-input class="input" v-model="user.email" placeholder="邮箱"/>
      </div>
      <div class="input_row">
        <span class="input_label">简介:</span>
        <el-input type="textarea" class="input" v-model="user.introduction" placeholder="简介"/>
      </div>
      <div class="input_row">
        <span class="input_label">用户状态:</span>
        <el-radio-group v-model="user.isBan">
          <el-radio :label="1">禁用</el-radio>
          <el-radio :label="0">启用</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="add" type="success">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUser } from '../../../api'

export default {
  name: 'AddUserDialog',
  data () {
    return {
      isDialogShow: false,
      user: {
        userName: null,
        userPass: null,
        introduction: null,
        email: null,
        isBan: 0,
        avatarURL: 'http://192.168.200.1:8888/public/user.png'
      }
    }
  },
  methods: {
    switchDialog () {
      if (this.isDialogShow === false) {
        this.clearInput()
      }
      this.isDialogShow = !this.isDialogShow
    },
    add () {
      let params = {
        userName: this.user.userName,
        userPass: this.user.userPass,
        introduction: this.user.introduction,
        email: this.user.email,
        isBan: this.user.isBan,
        avatarURL: this.user.avatarURL
      }
      addUser(params).then(resp => {
        this.$message.success(resp.data.msg)
        this.bus.$emit('user_manager_update')
        this.switchDialog()
      }, error => {
        this.$message.error(error.data.msg)
        this.checkNotify(error.data.notify)
        this.clearInput()
      })
    },
    clearInput () {
      this.user.userName = null
      this.user.userPass = null
      this.user.introduction = null
      this.user.email = null
      this.user.isBan = 0
      this.user.avatarURL = 'http://192.168.200.1:8888/public/user.png'
    }
  }
}
</script>

<style scoped>
.input {
  width: 15em;
}

.input_label {
  display: inline-block;
  width: 5em;
  margin-right: 3em;
}

.input_row {
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
}

.form {
  display: flex;
  flex-wrap: wrap;
}

#avatar_row {
  width: 100%;
}
</style>
