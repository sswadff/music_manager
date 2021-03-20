<template>
  <el-dialog :visible.sync="isDialogShow" title="添加歌单">
    <div class="form">
      <div class="input_row" id="avatar_row">
        <span class="input_label">歌单图:</span>
        <el-image style="width: 3em;height: 3em;background: #2c3e50" :src="songList.coverPicURL" fit="scale-down"/>
      </div>
      <div class="input_row">
        <span class="input_label">歌单名称:</span>
        <el-input class="input" v-model="songList.songListName" placeholder="歌单名称"/>
      </div>
      <div class="input_row">
        <span class="input_label">简介:</span>
        <el-input type="textarea" class="input" v-model="songList.introduction" placeholder="简介"/>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="add" type="success">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSongList } from '../../../api'

export default {
  name: 'AddSongListDialog',
  data () {
    return {
      isDialogShow: false,
      songList: {
        songListName: null,
        introduction: null,
        coverPicURL: 'http://192.168.200.1:8888/private/1/109951163858422257.jpg',
        createrID: null
      }
    }
  },
  methods: {
    switchDialog () {
      if (this.isDialogShow === false) {
        this.clearInput()
      }
      this.bus.$emit('song_list_manager_update')
      this.isDialogShow = !this.isDialogShow
    },
    add () {
      let params = {
        songListName: this.songList.songListName,
        introduction: this.songList.introduction,
        coverPicURL: this.songList.coverPicURL,
        createrID: this.songList.createrID
      }
      addSongList(params).then(resp => {
        this.$message.success(resp.data.msg)
      }, error => {
        this.$message.error(error.data.msg)
        this.checkNotify(error.data.notify)
      })
      this.switchDialog()
    },
    clearInput () {
      this.songList.createrID = null
      this.songList.coverPicURL = 'http://192.168.200.1:8888/private/1/109951163858422257.jpg'
      this.songList.introduction = null
      this.songList.songListName = null
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
