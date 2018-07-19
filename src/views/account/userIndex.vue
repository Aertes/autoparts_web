<template>
  <div class="app-container">
    <el-form ref="form" :model="search" label-width="100px" class="clearfix">
      <div class="search-row clearfix">
        <el-form-item label="姓名:" class="fl">
          <el-input v-model="search.data.apaccountname" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" class="fl">
          <el-input v-model="search.data.aptelno" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" class="fl">
          <el-input v-model="search.data.companyname" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="状态:" class="fl">
          <el-select v-model="search.data.apdelflag" placeholder="请选择状态" @change="initTableData">
            <el-option label="可用" :value=0></el-option>
            <el-option label="作废" :value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理品牌:" class="fl">
          <el-input v-model="search.data.brandname" placeholder="请输入管理品牌"></el-input>
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
      <el-table-column prop="apaccountname" align="left" label="姓名"></el-table-column>
      <el-table-column prop="aptelno" align="left" label="手机号"></el-table-column>
      <el-table-column prop="companyname" align="left" label="公司名称"></el-table-column>
      <el-table-column prop="companytelno" align="left" label="公司电话"></el-table-column>
      <el-table-column prop="companyaddress" align="left" label="公司地址"></el-table-column>
      <el-table-column prop="brandname" align="left" label="管理品牌"></el-table-column>
      <el-table-column prop="apdelflag" align="left" label="状态" width="80">
        <template slot-scope="scope">{{scope.row.apdelflag === 0 ? '可用' : '作废'}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button @click.native.prevent="detail(scope.row)" type="primary" >查看</el-button>
          <el-button type="primary" @click.native.prevent="edit(scope.row)" plain v-if="scope.row.apdelflag == 0" >编辑</el-button>
          <el-button @click.native.prevent="invalid(scope.$index, scope.row, 0)" type="danger" plain class="del" v-if="scope.row.apdelflag == 0" >作废</el-button>
          <!-- <el-button @click.native.prevent="invalid(scope.$index, scope.row, 1)"  plain class="del" v-if="scope.row.apdelflag == 0" >启用</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="tableData.length !== 0"
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
          apaccountname: '', // 姓名
          apdelflag: null, // 状态 0 可用 1不可用
          aptelno: '', // 电话
          brandname: '', // 品牌名称
          companyname: '' // 公司名称
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
      this.initTableData()
    },
    onCancel() {
      const searchData = this.search.data
      Object.keys(searchData).forEach((key, i) => {
        searchData[key] = ''
      })
      this.initTableData()
    },
    edit(row) {
      this.accountId = parseInt(row.apaccountid)
      this.DialogShow = true
    },
    invalid(index, id, flag) {
      let data = {}
      switch (flag) {
        case 0:
          id.apdelflag = 1
          data = { apaccountid: id.apaccountid, apdelflag: id.apdelflag }
          this.userflag(data)
          break
        default:
          id.apdelflag = 0
          data = { apaccountid: id.apaccountid, apdelflag: id.apdelflag }
          this.userflag(data)
          break
      }
    },
    userflag(data) {
      this.loading = true
      return new Promise((resolve, reject) => {
        accountUserAbolish(data).then(res => {
          this.loading = false
          if (res.status === 0) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    create() {
      this.DialogShow = true
      this.accountId = 0
    },
    DialogHide() {
      this.DialogShow = false
      this.accountId = 0
    },
    detail(row) {
      this.DialogDetailShow = true
      this.accountId = parseInt(row.apaccountid)
    },
    DialogDetailHide() {
      this.DialogDetailShow = false
    },
    handleSizeChange(val) {
      this.search.rows = val
      this.initTableData()
    },
    handleCurrentChange(val) {
      this.search.page = val
      this.initTableData()
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

