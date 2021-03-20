<template>
  <el-dialog :visible.sync="isDialogShow" title="歌曲信息">
    <el-form>
      <div class="input_row">
        <span class="input_label">歌曲名称:</span>
        <el-input class="input" v-model="info.songName" placeholder="歌曲名称" :disabled="isDisabled"/>
      </div>
      <div class="input_row">
        <span class="input_label">歌手:</span>
        <el-select
            v-model="info.singerID" :disabled="isDisabled"
            filterable
            remote
            :placeholder="info.singer.singerName"
            automatic-dropdown
            :remote-method="getSelectOptionData">
          <el-option
              v-for="item in singerOptions"
              :key="item.singerID" :label="item.singerName"
              :value="item.singerID"
          />
        </el-select>
      </div>
    </el-form>
    <div slot="footer">
      <el-button @click="switchEditMode" type="primary" class="el-icon-edit">编辑</el-button>
      <el-button @click="submit" type="success" class="el-icon-check">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editSongInfo, getSingerBySearch } from '../../../api'

export default {
  name: 'EditSongInfo',
  data () {
    return {
      isDialogShow: false,
      isDisabled: true,
      info: {
        songID: null,
        songName: null,
        coverPicURL: null,
        url: null,
        singerID: null,
        singer: { singerID: null, singerName: null }
      },
      singerOptions: []
    }
  },
  methods: {
    switchDialog (row) {
      if (this.isDialogShow === false) {
        this.info = row
        this.info.singerID = null
        this.getSelectOptionData('')
      }
      this.isDialogShow = !this.isDialogShow
      this.isDisabled = true
    },
    switchEditMode () {
      this.isDisabled = !this.isDisabled
    },
    submit () {
      let params = {
        songID: this.info.songID,
        songName: this.info.songName,
        coverPicURL: this.info.coverPicURL,
        singerID: this.info.singerID,
        url: this.info.url
      }
      editSongInfo(params).then(resp => {
        this.$message.success(resp.data.msg)
        this.bus.$emit('song_manager_update')
      }, error => {
        this.$message.error(error.data.msg)
        this.checkNotify(error.data.notify)
        this.bus.$emit('song_manager_update')
      })
      this.switchDialog()
    },
    getSelectOptionData (query) {
      let params = {
        searchInput: query
      }
      getSingerBySearch(params).then(resp => {
        this.singerOptions = resp.data.list
      }, error => {
        this.$message.error(error.data.msg)
      })
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
