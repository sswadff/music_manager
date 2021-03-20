<template>
  <div class="back">
    <el-card class="card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>音乐网站后台管理系统</span>
      </div>
      <div>
        <el-form class="input_form">
          <div>
            <div class="input_label">管理员名称:</div>
            <el-input v-model="adminName" class="input" placeholder="管理员名"></el-input>
          </div>
          <div>
            <div class="input_label">密码:</div>
            <el-input v-model="adminPass" class="input" placeholder="密码" show-password></el-input>
          </div>

        </el-form>
        <div>
          <el-button @click="showRegisterDialog" size="medium" type="danger">注册</el-button>
          <el-button size="medium" type="success" @click="submit">登录</el-button>
        </div>
      </div>
    </el-card>

    <RegisterDialog ref="register_dialog"/>
  </div>
</template>

<script>
import RegisterDialog from '@/components/LoginPage/RegisterDialog'
import { login } from '@/api'

export default {
  name: 'LoginPage',
  components: { RegisterDialog },
  data () {
    return {
      adminName: null,
      adminPass: null
    }
  },
  methods: {
    showRegisterDialog () {
      this.$refs.register_dialog.switchDialog()
    },
    submit () {
      let params = {
        adminName: this.adminName,
        adminPass: this.adminPass
      }
      if (!params.adminName) {
        this.$message.error('登录名不能为空')
        return
      }
      if (!params.adminPass) {
        this.$message.error('密码不能为空')
        return
      }

      login(params).then(resp => {
        this.$store.state.admin.isLogin = true
        this.$store.state.admin.info = resp.data.info
        this.$router.push({ name: 'ManagerPage', params: { adminID: this.$store.state.admin.info.adminID } })
        this.$message.success(resp.data.msg)
      }, error => {
        this.$message.error(error.data.msg)
      })
    }
  }
}
</script>

<style scoped>

.back {
  position: relative;
  height: 100%;
  width: 100%;
  background: wheat;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  margin: -15% 0 0 -25%;
}

.input {
  width: 15em;
  margin-bottom: 1em;
}

.input_form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input_label {
  display: inline-block;
  width: 8em;
}

</style>
