<template>
  <div class="app-container">
    <el-form ref="form" :model="search" label-width="100px" class="clearfix">
      <div class="search-row clearfix">
        <el-form-item label="姓名:" class="fl">
          <el-input v-model="search.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" class="fl">
          <el-input v-model="search.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" class="fl">
          <el-input v-model="search.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="状态:" class="fl">
          <el-select v-model="search.region" placeholder="请选择状态" @change="initTableData">
            <el-option label="可用" value="0"></el-option>
            <el-option label="作废" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理品牌:" class="fl">
          <el-input v-model="search.name" placeholder="请输入管理品牌"></el-input>
        </el-form-item>
      </div>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" @click="create">新建</el-button>
    </el-row>
    <el-table :data="tableData" border-bottom style="width: 100%" v-loading="loading">
      <el-table-column prop="date" align="left" label="姓名"></el-table-column>
      <el-table-column prop="date" align="left" label="手机号"></el-table-column>
      <el-table-column prop="name" align="left" label="公司名称"></el-table-column>
      <el-table-column prop="name" align="left" label="公司电话"></el-table-column>
      <el-table-column prop="city" align="left" label="公司地址"></el-table-column>
      <el-table-column prop="zip" align="left" label="管理品牌"></el-table-column>
      <el-table-column prop="name" align="left" label="状态"></el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button @click.native.prevent="detail(scope.row)" type="primary" >查看</el-button>
          <el-button type="primary" @click.native.prevent="edit(scope.row)" plain >编辑</el-button>
          <el-button @click.native.prevent="invalid(scope.$index, scope.row, tableData)" plain class="del" >作废</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="search.page"
      :page-size="search.row"
      background
      layout="prev, pager, next, jumper"
      :total="search.total">
    </el-pagination>
    <add-edit-dialog :dialogShow="DialogShow" @close="DialogHide" @success="initTableData" :accountId='accountId'></add-edit-dialog>
    <detail-dialog :dialogDetailShow="DialogDetailShow" @close="DialogDetailHide" :accountId='accountId'></detail-dialog>
  </div>
</template>
<script>
import AddEditDialog from './user-add-edit'
import DetailDialog from './user-detail'
import { accountUserList, accountUserAbolish } from '@/api/Api'
export default {
  data() {
    return {
      search: {
        data: {
          apaccountname: '',
          appartname: '',
          appartattribute: '',
          appartbrand: '',
          apparttype: ''
        },
        page: 1,
        rows: 10,
        total: 0,
        sidx: '',
        sord: 'desc'
      },
      tableData: [],
      accountId: 0,
      DialogShow: false,
      DialogDetailShow: false,
      loading: false
    }
  },
  created() {
    this.initTableData()
  },
  methods: {
    initTableData() {
      this.loading = true
      return new Promise((resolve, reject) => {
        accountUserList(this.search).then(res => {
          this.loading = false
          if (res.status === 0) {
            this.search.page = res.currpage
            this.search.total = res.totalrecords
            this.tableData = res.datalist
            // console.log(this.tableData)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    onSearch() {
      this.$message('submit!')
    },
    onCancel() {
      const searchData = this.search
      Object.keys(searchData).forEach((key, i) => {
        searchData[key] = ''
      })
    },
    edit(row) {
      console.log(row)
      this.accountId = `${row.zip}`
      this.DialogShow = true
    },
    invalid(index, id, rows) {
      this.$confirm('此操作将永久作废该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '作废成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消作废'
        })
      })
    },
    create() {
      this.DialogShow = true
    },
    DialogHide() {
      this.DialogShow = false
      this.accountId = ''
    },
    detail(row) {
      this.DialogDetailShow = true
      console.log(row)
    },
    DialogDetailHide() {
      this.DialogDetailShow = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
  components: {
    AddEditDialog,
    DetailDialog
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.line{
  text-align: center;
}
.app-container{
  .w38{
    width: 39%;
  }
}
</style>

