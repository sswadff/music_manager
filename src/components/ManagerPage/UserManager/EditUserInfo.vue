<template>
  <el-dialog :visible.sync="isDialogShow" title="用户信息">
    <el-form>
      <div class="input_row">
        <span class="input_label">用户名:</span>
        <el-input class="input" v-model="info.userName" placeholder="用户名" :disabled="isDisabled"/>
      </div>
      <div class="input_row">
        <span class="input_label">邮件:</span>
        <el-input class="input" v-model="info.email" placeholder="邮件" :disabled="isDisabled"/>
      </div>
      <div class="input_row">
        <span class="input_label">用户状态:</span>
        <el-radio-group v-model="info.isBan">
          <el-radio :label="1" :disabled="isDisabled">禁用</el-radio>
          <el-radio :label="0" :disabled="isDisabled">正常</el-radio>
        </el-radio-group>
      </div>
      <div class="input_row">
        <div class="input_label" style="margin-bottom: 1em">用户简介:</div>
        <el-input style="width: 20em" v-model="info.introduction" placeholder="简介" :disabled="isDisabled"
                  type="textarea"/>
      </div>
    </el-form>
    <div slot="footer">
      <el-button @click="switchEditMode" type="primary" class="el-icon-edit">编辑</el-button>
      <el-button @click="submit" type="success" class="el-icon-check">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editUserInfo } from '../../../api'

export default {
  name: 'EditUserInfo',
  data () {
    return {
      isDialogShow: false,
      isDisabled: true,
      info: {
        userID: null,
        userName: null,
        email: null,
        introduction: null,
        isBan: null
      }
    }
  },
  methods: {
    switchDialog (row) {
      if (this.isDialogShow === false) {
        this.info = row
      }
      this.isDialogShow = !this.isDialogShow
      this.isDisabled = true
    },
    switchEditMode () {
      this.isDisabled = !this.isDisabled
    },
    submit () {
      let params = {
        userID: this.info.userID,
        userName: this.info.userName,
        email: this.info.email,
        introduction: this.info.introduction,
        isBan: this.info.isBan
      }
      editUserInfo(params).then(resp => {
        this.$message.success(resp.data.msg)
        this.bus.$emit('user_manager_update')
      }, error => {
        this.$message.error(error.data.msg)
        this.checkNotify(error.data.notify)
        this.bus.$emit('user_manager_update')
      })
      this.switchDialog()
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

</style>
