<template>
  <el-dialog :visible.sync="isDialogShow" title="歌曲信息">
    <el-form>
      <div class="content">
        <div class="input_row">
          <el-upload
              ref="upload"
              class="upload-demo"
              :auto-upload="false"
              :show-file-list="true"
              drag
              :data="{singerID:file.singer.singerID}"
              :limit="5"
              :on-preview="onPreview"
              :on-remove="onRemove"
              :on-success="onSuccess"
              :action="action">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
        <div>
          <div class="input_row">
            <span class="input_label">歌名:</span>
            <el-input class="input" v-model="file.name" placeholder="歌名" :disabled="true"/>
          </div>
          <div class="input_row">
            <span class="input_label">歌手:</span>
            <el-select
                v-model="file.singer.singerID"
                :disabled="isDisabled"
                filterable
                remote
                placeholder="未知歌手"
                automatic-dropdown
                :remote-method="getSelectOptionData">
              <el-option
                  v-for="item in singerOptions"
                  :key="item.singerID" :label="item.singerName"
                  :value="item.singerID"/>
            </el-select>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer">
      <el-button @click="submit" type="success" class="el-icon-check">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSingerBySearch } from '../../../api'
import url from '../../../api/url'

export default {
  name: 'AddSong',
  data () {
    return {
      isDialogShow: false,
      isDisabled: true,
      singerOptions: [],
      action: url.addSong,
      file: {
        singer: { singerID: null, singerName: null },
        name: null
      }
    }
  },
  methods: {
    switchDialog () {
      if (this.isDialogShow === false) {
        this.getSelectOptionData('')
      }
      this.isDialogShow = !this.isDialogShow
    },
    submit () {
      this.$refs.upload.submit()
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
    },
    onPreview (file) {
      if (file.singer === undefined) {
        file.singer = { singerID: null, singerName: null }
      }
      this.isDisabled = false
      this.file.singer = file.singer
      this.file.name = file.name
    },
    onRemove (file) {
      if (file.name === this.file.name) {
        this.file = {
          singer: { singerID: null, singerName: null },
          name: null
        }
        this.isDisabled = true
      }
    },
    onSuccess (resp, file) {
      if (resp.success) {
        this.$message.success(resp.msg)
        this.bus.$emit('song_manager_update')
      } else {
        this.$message.error(resp.msg)
        this.checkNotify(resp.notify)
        file.status = 'ready'
      }
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

.content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

</style>
