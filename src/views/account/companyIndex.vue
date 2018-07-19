<template>
  <div class="app-container">
    <el-form ref="form" :model="search" label-width="100px" class="clearfix">
      <div class="search-row clearfix">
        <el-form-item label="公司名称:" class="fl">
          <el-input v-model="search.data.acompanyname" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="地址:" class="fl">
          <el-input v-model="search.data.acompanyaddress" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="电话:" class="fl">
          <el-input v-model="search.data.acompanytelno" placeholder="请输入公司电话"></el-input>
        </el-form-item>
        <el-form-item label="状态:" class="fl">
          <el-select v-model="search.data.acompanydelflag" placeholder="请选择状态" @change="initTableData">
            <el-option label="可用" :value=0></el-option>
            <el-option label="作废" :value=1></el-option>
          </el-select>
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
      <el-table-column prop="acompanyname" align="left" label="公司名称"></el-table-column>
      <el-table-column prop="acompanyaddress" align="left" label="地址"></el-table-column>
      <el-table-column prop="acompanytelno" align="left" label="电话"></el-table-column>
      <el-table-column prop="brandname" align="left" label="代理品牌"></el-table-column>
      <el-table-column prop="acompanydelflag" align="left" label="状态" width="80">
        <template slot-scope="scope">{{scope.row.acompanydelflag === 0? "可用" : "作废"}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button @click.native.prevent="detail(scope.row)" type="primary" >查看</el-button>
          <el-button type="primary" @click.native.prevent="edit(scope.row)" plain v-if="scope.row.acompanydelflag == 0">编辑</el-button>
           <el-button @click.native.prevent="invalid(scope.$index, scope.row, 0)" type="danger" plain class="del" v-if="scope.row.acompanydelflag == 0" >作废</el-button>
          <!-- <el-button @click.native.prevent="invalid(scope.$index, scope.row, 1)"  plain class="del" v-if="scope.row.acompanydelflag == 0" >启用</el-button> -->
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
    <add-edit-dialog :dialogShow="DialogShow" @close="DialogHide" @success="initTableData" :companyId='companyId'></add-edit-dialog>
    <detail-dialog :dialogDetailShow="DialogDetailShow" @close="DialogDetailHide" :companyId='companyId'></detail-dialog>
  </div>
</template>
<script>
import AddEditDialog from './company-add-edit'
import DetailDialog from './company-detail'
import { companyList, companyAbolish } from '@/api/Api'
export default {
  data() {
    return {
      search: {
        data: {
          acompanyname: '', // 名称
          acompanydelflag: null, // 状态 0 可用 1不可用
          acompanyaddress: '', // 地址
          acompanytelno: '' // 电话
        },
        page: 1,
        rows: 10,
        total: 0,
        sidx: '',
        sord: 'desc'
      },
      tableData: [],
      companyId: 0,
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
        companyList(this.search).then(res => {
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
      this.companyId = parseInt(row.acompanyid)
      this.DialogShow = true
    },
    invalid(index, id, flag) {
      let data = {}
      switch (flag) {
        case 0:
          id.acompanydelflag = 1
          data = { acompanyid: id.acompanyid, acompanydelflag: id.acompanydelflag }
          this.companyflag(data)
          break
        default:
          id.acompanydelflag = 0
          data = { acompanyid: id.acompanyid, acompanydelflag: id.acompanydelflag }
          this.companyflag(data)
          break
      }
    },
    companyflag(data) {
      this.loading = true
      return new Promise((resolve, reject) => {
        companyAbolish(data).then(res => {
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
      this.companyId = 0
      this.DialogShow = true
    },
    DialogHide() {
      this.companyId = 0
      this.DialogShow = false
    },
    detail(row) {
      this.DialogDetailShow = true
      this.companyId = parseInt(row.acompanyid)
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

