<template>
  <div class="app-container">
    <el-form ref="form" :model="search" label-width="100px" class="clearfix">
      <div class="search-row clearfix">
        <el-form-item label="门店编号:" class="fl">
          <el-input v-model="search.data.apcno" placeholder="请输入门店编号"></el-input>
        </el-form-item>
        <el-form-item label="门店名称:" class="fl">
          <el-input v-model="search.data.apcname" placeholder="请输入门店名称"></el-input>
        </el-form-item>
        <el-form-item label="门店电话:" class="fl">
          <el-input v-model="search.data.apcphone" placeholder="请输入门店电话"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类别:" class="fl">
          <el-select v-model="search.region" placeholder="请选择类别">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注:"  class="fl w38">
          <el-input  v-model="search.data.apcremark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </div>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" @click="create">新建门店</el-button>
    </el-row>
    <el-table :data="tableData" border-bottom style="width: 100%" v-loading="loading">
      <el-table-column prop="apcno" align="left" label="门店编号"></el-table-column>
      <el-table-column prop="apcname" align="left" label="门店名称"></el-table-column>
      <el-table-column prop="apcaddress" align="left" label="地址"></el-table-column>
      <!-- <el-table-column prop="apcdelflag" align="left" label="类别"></el-table-column> -->
      <el-table-column prop="apcphone" align="left" label="门店电话"></el-table-column>
      <el-table-column prop="apccontactname" align="left" label="联系人"></el-table-column>
      <el-table-column prop="apccontacttelno" align="left" label="联系人电话"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="primary" >查看</el-button>
          <el-button type="primary" @click="edit(scope.row)" plain >编辑</el-button>
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
    <add-edit-dialog :dialogShow="DialogShow" @close="DialogHide" @success="tableData" :storeId='storeId'></add-edit-dialog>
    <detail-dialog :dialogDetailShow="DialogDetailShow" @close="DialogDetailHide" :storeId='storeId'></detail-dialog>
  </div>
</template>
<script>
import AddEditDialog from './add-edit'
import DetailDialog from './detail'
import { storeList } from '@/api/Api'
export default {
  data() {
    return {
      search: {
        data: {
          apcno: '', // 门店编号
          apcname: '', // 门店名称
          apcphone: '', // 门店电话
          apcremark: '' // 备注
        },
        page: 1,
        rows: 10,
        total: 0,
        sidx: 'apccreatedate',
        sord: 'desc'
      },
      tableData: [],
      storeId: 0,
      DialogShow: false,
      DialogDetailShow: false
    }
  },
  created() {
    this.initTableData()
  },
  methods: {
    initTableData() {
      this.loading = true
      const data = this.search
      return new Promise((resolve, reject) => {
        storeList(data).then(res => {
          this.loading = false
          if (res.status === 0) {
            this.search.page = res.currpage
            this.search.total = res.totalrecords
            this.tableData = res.datalist
          } else {
            this.$notify({
              showClose: true,
              message: res.msg,
              type: 'warning',
              offset: 100,
              duration: 2000
            })
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
      this.storeId = parseInt(row.apcid)
      this.DialogShow = true
    },
    create() {
      this.storeId = 0
      this.DialogShow = true
    },
    DialogHide() {
      this.DialogShow = false
      this.storeId = 0
    },
    detail(row) {
      this.storeId = parseInt(row.apcid)
      this.DialogDetailShow = true
    },
    DialogDetailHide() {
      this.DialogDetailShow = false
    },
    handleSizeChange(val) {
      this.search.rows = val
      this.initTableData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.search.page = val
      this.initTableData()
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

