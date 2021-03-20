<template>
  <el-dialog title="歌单列表" :visible.sync="isDialogShow">
    <div class="func_zone">
      <div class="input_row">
        <el-select
            v-model="songID"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            size="mini">
          <el-option
              v-for="item in options"
              :key="item.songID"
              :label="item.songName"
              :value="item.songID">
          </el-option>
        </el-select>
        <el-button type="primary" @click="add" size="mini">添加</el-button>
      </div>

    </div>
    <el-table height="35em" :data="songTableData" show-overflow-tooltip size="mini">
      <el-table-column prop="songName" label="歌曲名称"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="play(scope.row)" class="el-icon-video-play" type="text">试听</el-button>
          <el-button @click="remove(scope.row)" class="el-icon-delete" type="text">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { removeSongInSongList, getSongBySearch, addToList, getSongListByID } from '../../../api'

export default {
  name: 'SongTable',
  data () {
    return {
      isDialogShow: false,
      songTableData: [],
      songListID: null,
      options: [],
      songID: null
    }
  },
  methods: {
    getTableData () {
      getSongListByID({ songListID: this.songListID }).then(resp => {
        this.songTableData = resp.data.info.songs
      }, error => {
        this.$message.error(error.data.msg)
      })
    },
    switchDialog (row) {
      if (this.isDialogShow === false) {
        this.songTableData = row.songs
        this.songListID = row.songListID
        this.remoteMethod('')
      }
      this.isDialogShow = !this.isDialogShow
    },
    play (row) {
      this.bus.$emit('play_event', row.url)
    },
    remove (row) {
      let params = {
        songListID: this.songListID,
        songID: row.songID
      }
      removeSongInSongList(params).then(resp => {
        this.$message.success(resp.data.msg)
        let idx = this.songTableData.indexOf(row)
        this.songTableData.splice(idx, 1)
      }, error => {
        this.$message.error(error.data.msg)
      })
    },
    add () {
      let params = {
        songID: this.songID,
        songListID: this.songListID
      }
      addToList(params).then(resp => {
        this.$message.success(resp.data.msg)
        this.getTableData()
      }, error => {
        this.$message.error(error.data.msg)
      })
    },
    remoteMethod (query) {
      let params = { searchInput: query }
      getSongBySearch(params).then(resp => {
        this.options = resp.data.list
      }, error => {
        this.$message.error(error.data.msg)
      })
    }
  }
}
</script>

<style scoped>

.func_zone {
  display: flex;
  flex-direction: row-reverse;

}

</style>
