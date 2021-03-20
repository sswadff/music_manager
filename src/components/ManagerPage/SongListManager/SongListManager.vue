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
    <el-table height="57em" :data="this.songListTableData.data" show-overflow-tooltip
              show-header size="small">
      <el-table-column label="歌单图">
        <template slot-scope="scope">
          <el-image style="width: 3em;height: 3em;background: #2c3e50" :src="scope.row.coverPicURL" fit="scale-down"/>
        </template>
      </el-table-column>
      <el-table-column prop="songListName" label="歌单名称"/>
      <el-table-column prop="introduction" label="简介"/>
      <el-table-column label="创建者">
        <template slot-scope="scope">
          <span>{{ scope.row.creater.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showTable(scope.row)" type="text" class="el-icon-search">查看</el-button>
          <el-button @click="editSongList(scope.row)" type="text" class="el-icon-edit">编辑</el-button>
          <el-button @click="dropSongList(scope.row)" type="text" class="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="opTable">
      <el-button @click="prevPage" type="text">上一页</el-button>
      <el-button @click="nextPage" type="text">下一页</el-button>
      <span class="pageNum">
        当前页码:{{ this.songListTableData.currPage }}
      </span>
    </div>
    <SongTable ref="song_table"/>
    <EditSongListInfo ref="edit_songlist_info"/>
    <AddSongListDialog ref="add_songlist_dialog"/>
  </div>
</template>

<script>
import { getSongListByPage, dropSongListBySongListID } from '../../../api'
import SongTable from './SongTable'
import EditSongListInfo from './EditSongListInfo'
import AddSongListDialog from './AddSongListDialog'

export default {
  name: 'SongListManager',
  components: { AddSongListDialog, EditSongListInfo, SongTable },
  data () {
    return {
      songListTableData: {
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
        pageSize: this.songListTableData.pageSize,
        currPage: this.songListTableData.currPage,
        searchInput: this.searchInput
      }
      getSongListByPage(params).then(resp => {
        this.songListTableData.data = resp.data.list
      }, error => {
        this.$message.error(error.data.msg)
      })
    },
    showTable (row) {
      this.$refs.song_table.switchDialog(row)
    },
    nextPage () {
      if (this.songListTableData.data.length < this.songListTableData.pageSize) {
        return
      }
      this.songListTableData.currPage++
    },
    prevPage () {
      if (this.songListTableData.currPage === 1) {
        return
      }
      this.songListTableData.currPage--
    },
    editSongList (row) {
      this.$refs.edit_songlist_info.switchDialog(row)
    },
    dropSongList (row) {
      let params = { songListID: row.songListID }
      dropSongListBySongListID(params).then(resp => {
        this.$message.success(resp.data.msg)
        let idx = this.songListTableData.data.indexOf(row)
        this.songListTableData.data.splice(idx, 1)
      }, error => {
        this.$message.error(error.data.msg)
      })
    },
    add () {
      this.$refs.add_songlist_dialog.switchDialog()
    }
  },
  mounted () {
    this.getPageData()
    setInterval(this.getPageData, 1000 * 60 * 10)
    this.bus.$on('song_list_manager_update', this.getPageData)
  },
  beforeRouteUpdate (to, from, next) {
    this.getPageData()
    next()
  },
  watch: {
    'songListTableData.currPage': {
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
