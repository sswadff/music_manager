<template>
  <div class="back">
    <el-row class="head">
      <span class="function_zone">
        <el-button @click="add" type="info" size="small" class="el-icon-plus">添加</el-button>
      </span>
      <span class="search_component">
        <el-input @change="getPageData" prefix-icon="el-icon-search" v-model="searchInput" placeholder="搜索栏"
                  class="search_input"
                  size="small"/>
        <!--                <el-button @click="getPageData" class="search_btn" size="small" type="warning">搜索</el-button>-->
      </span>
    </el-row>
    <el-table height="57em" :data="this.songTableData.data" show-overflow-tooltip
              show-header size="small">
      <el-table-column prop="songName" label="歌曲名称"/>
      <el-table-column label="歌手">
        <template slot-scope="scope">
          <span>{{ scope.row.singer.singerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="play(scope.row)" type="text" class="el-icon-video-play">试听</el-button>
          <el-button @click="editSong(scope.row)" type="text" class="el-icon-edit">编辑</el-button>
          <el-button @click="dropSong(scope.row)" type="text" class="el-icon-video-play">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="opTable">
      <el-button @click="prevPage" type="text">上一页</el-button>
      <el-button @click="nextPage" type="text">下一页</el-button>
      <span class="pageNum">
        当前页码:{{ this.songTableData.currPage }}
      </span>
    </div>
    <EditSongInfo ref="edit_song_info"/>
    <AddSong ref="add_song"/>
  </div>
</template>

<script>
import { getSongByPage, dropSongBySongID } from '../../../api'
import EditSongInfo from './EditSongInfo'
import AddSong from './AddSong'

export default {
  name: 'SongManager',
  components: { AddSong, EditSongInfo },
  data () {
    return {
      songTableData: {
        data: [],
        currPage: 1,
        pageSize: 20
      },
      searchInput: null
    }
  },
  methods: {
    getPageData () {
      let params = {
        pageSize: this.songTableData.pageSize,
        currPage: this.songTableData.currPage,
        searchInput: this.searchInput
      }
      getSongByPage(params).then(resp => {
        this.songTableData.data = resp.data.list
      }, error => {
        this.$message.error(error.data.msg)
      })
    },
    showTable (row) {
      this.$refs.song_table.switchDialog(row)
    },
    nextPage () {
      if (this.songTableData.data.length < this.songTableData.pageSize) {
        return
      }
      this.songTableData.currPage++
    },
    prevPage () {
      if (this.songTableData.currPage === 1) {
        return
      }
      this.songTableData.currPage--
    },
    play (row) {
      this.bus.$emit('play_event', row.url)
    },
    dropSong (row) {
      let params = {
        songID: row.songID
      }
      dropSongBySongID(params).then(resp => {
        this.$message.success(resp.data.msg)
        let idx = this.songTableData.data.indexOf(row)
        this.songTableData.data.splice(idx, 1)
      }, error => {
        this.$message.error(error.data.msg)
      })
    },
    add () {
      this.$refs.add_song.switchDialog()
    },
    editSong (row) {
      this.$refs.edit_song_info.switchDialog(row)
    }
  },
  mounted () {
    this.getPageData()
    setInterval(this.getPageData, 1000 * 60 * 10)
    this.bus.$on('song_manager_update', this.getPageData)
  },
  beforeRouteUpdate (to, from, next) {
    this.getPageData()
    next()
  },
  watch: {
    'songTableData.currPage': {
      handler (newVal, oldVal) {
        this.getPageData()
      },
      deep: true
    }
  }
}
</script>

<style scoped>

.opTable {
  position: absolute;
  right: 10em;
}

.pageNum {
  font-size: small;
  margin-left: 1em;
}

.head {
  display: flex;
  flex-direction: row;
}

.search_component {
  display: flex;
  flex-direction: row;
  margin: 0 1em;
}

.search_component * {
  margin: 0 0.1em;
}

.function_zone {
  width: 90%;
  display: flex;
  flex-direction: row-reverse;
}

.function_zone * {
  margin: 0 1em;
}

</style>
