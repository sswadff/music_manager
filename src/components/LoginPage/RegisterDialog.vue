<template>
  <div>
    <el-dialog :visible.sync="isDialogShow" title="管理员注册">
      <div>
        <el-form class="input_form">
          <div class="input_row">
            <div class="input_label">管理员名称:</div>
            <el-input v-model="formData.adminName" class="input" placeholder="管理员名"></el-input>
          </div>
          <div class="input_row">
            <div class="input_label">密码:</div>
            <el-input v-model="formData.adminPass" class="input" placeholder="密码" show-password></el-input>
          </div>
          <div class="input_row">
            <div class="input_label">确认密码:</div>
            <el-input v-model="formData.adminPass2" class="input" placeholder="密码" show-password></el-input>
          </div>
          <div class="input_row">
            <div class="input_label">邮箱:</div>
            <el-input v-model="formData.email" class="input" placeholder="邮箱"></el-input>
          </div>
        </el-form>
      </div>
      <div>
        <el-button @click="switchDialog">取 消</el-button>
        <el-button type="primary" @click="submit">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { register } from '@/api'

export default {
  name: 'RegisterDialog',
  data () {
    return {
      isDialogShow: false,
      formData: {
        adminName: null,
        adminPass: null,
        adminPass2: null,
        email: null
      }
    }
  },
  methods: {
    switchDialog () {
      this.isDialogShow = !this.isDialogShow
    },
    submit () {
      let isNull = !(this.formData.adminName && this.formData.adminPass2 && this.formData.adminPass && this.formData.email)
      if (isNull) {
        this.$message.error('输入项不能为空')
        return
      }
      if (this.formData.adminPass !== this.formData.adminPass2) {
        this.$message.error('两次密码不一致')
        return
      }
      let params = {
        adminName: this.formData.adminName,
        adminPass: this.formData.adminPass,
        email: this.formData.email
      }
      register(params).then(resp => {
        this.$message.success(resp.data.msg)
      }, error => {
        this.$message.error(error.data.msg)
      })
      this.switchDialog()
    }
  }
}
</script>

<style scoped>
.input {
  width: 15em;
  margin-bottom: 1em;
}

.input_form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input_row {
  width: 50em;
}

.input_label {
  width: 8em;
  display: inline-block;
}
</style>
