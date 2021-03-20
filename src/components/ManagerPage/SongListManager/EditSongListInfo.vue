<template>
  <el-dialog title="歌单信息" :visible.sync="isDialogShow">

    <div class="input_row">
      <span class="input_label">歌单名称:</span>
      <el-input class="input" v-model="info.songListName" placeholder="歌单名称" :disabled="isDisabled"/>
    </div>
    <div class="input_row">
      <div class="input_label" style="margin-bottom: 1em">歌单简介:</div>
      <el-input style="width: 20em" v-model="info.introduction" placeholder="简介" :disabled="isDisabled"
                type="textarea"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="switchEditMode" type="primary" class="el-icon-edit">编辑</el-button>
      <el-button @click="submit" type="success" class="el-icon-check">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editSongListInfo } from '../../../api'

export default {
  name: 'EditSongListInfo',
  data () {
    return {
      isDialogShow: false,
      isDisabled: true,
      info: {
        songListName: null,
        songListID: null,
        introduction: null,
        coverPicURL: null,
        creater: {
          avatarURL: null,
          userID: null,
          userName: null,
          isBan: null
        }
      }
    }
  },
  methods: {
    switchDialog (row) {
      if (this.isDialogShow === false) {
        this.info = row
      }
      this.isDialogShow = !this.isDialogShow
    },
    switchEditMode () {
      this.isDisabled = !this.isDisabled
    },
    submit () {
      let params = {
        songListID: this.info.songListID,
        songListName: this.info.songListName,
        introduction: this.info.introduction,
        coverPicURL: this.info.coverPicURL
      }
      console.log(params)
      editSongListInfo(params).then(resp => {
        this.$message.success(resp.data.msg)
      }, error => {
        this.$message.error(error.data.msg)
      })
      this.isDisabled = true
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
