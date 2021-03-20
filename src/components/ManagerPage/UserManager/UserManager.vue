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
    <el-table height="57em" :data="this.userTableData.data" show-overflow-tooltip
              show-header size="small">
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-avatar>
            <el-image :src="scope.row.avatarURL"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="introduction" label="简介"/>
      <el-table-column prop="isBan" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.isBan" style="color: darkred">禁用</span>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row)" type="text" class="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="opTable">
      <el-button @click="prevPage" type="text">上一页</el-button>
      <el-button @click="nextPage" type="text">下一页</el-button>
      <span class="pageNum">
        当前页码:{{ this.userTableData.currPage }}
      </span>
    </div>
    <EditUserInfo ref="edit_user_info"/>
    <AddUserDialog ref="add_user_dialog"/>
  </div>
</template>

<script>
import { getUserListByPage } from '../../../api'
import EditUserInfo from './EditUserInfo'
import AddUserDialog from './AddUserDialog'

export default {
  name: 'UserManager',
  components: { AddUserDialog, EditUserInfo },
  data () {
    return {
      userTableData: {
        data: [],
        currPage: 1,
        pageSize: 10
      },
      searchInput: null
    }
  },
  methods: {
    getPageData () {
      let params = {
        pageSize: this.userTableData.pageSize,
        currPage: this.userTableData.currPage,
        searchInput: this.searchInput
      }
      getUserListByPage(params).then(resp => {
        this.userTableData.data = resp.data.list
      }, error => {
        this.$message.error(error.data.msg)
      })
    },
    editUser (row) {
      this.$refs.edit_user_info.switchDialog(row)
    },
    nextPage () {
      if (this.userTableData.data.length < this.userTableData.pageSize) {
        return
      }
      this.userTableData.currPage++
    },
    prevPage () {
      if (this.userTableData.currPage === 1) {
        return
      }
      this.userTableData.currPage--
    },
    add () {
      this.$refs.add_user_dialog.switchDialog()
    }
  },
  mounted () {
    this.getPageData()
    setInterval(this.getPageData, 1000 * 60 * 10)
    this.bus.$on('user_manager_update', this.getPageData)
  },
  beforeRouteUpdate (to, from, next) {
    this.getPageData()
    next()
  },
  watch: {
    'userTableData.currPage': {
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
