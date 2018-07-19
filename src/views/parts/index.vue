<template>
  <div class="app-container">
    <el-form ref="form" :model="search" label-width="100px" class="clearfix">
      <div class="search-row clearfix">
        <el-form-item label="配件编号:" class="fl">
          <el-input v-model="search.data.appartno" placeholder="请输入配件编号"></el-input>
        </el-form-item>
        <el-form-item label="配件名称:" class="fl">
          <el-input v-model="search.data.appartname" placeholder="请输入配件名称"></el-input>
        </el-form-item>
        <el-form-item label="配件标准:" class="fl">
          <el-select v-model="search.data.appartattribute" placeholder="请选择配件标准">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌:" class="fl">
          <el-input v-model="search.data.appartbrand" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="配件类型:" class="fl">
          <el-select v-model="search.data.apparttype" placeholder="请选择配件类型">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
    <el-row class="clearfix">
      <el-button type="primary" @click="create" class="create">新建</el-button>
      <el-upload
        class="upload-demo"
        :action='uploadUrl'
        :show-file-list="false"
        :on-success="fileUploadSuccess"
        :before-upload="beforeFileUpload"
        :headers="headers"
        method:="post"
        accept=''>
        <el-button type="primary">导入</el-button>
      </el-upload>
      <!-- <el-button type="primary" @click="importFile">导入</el-button> -->
    </el-row>
    <el-table :data="tableData" border-bottom style="width: 100%" v-loading="loading">
      <el-table-column prop="appartno" align="left" label="配件编号"></el-table-column>
      <el-table-column prop="appartname" align="left" label="配件名称"></el-table-column>
      <el-table-column prop="apparttype" align="left" label="配件类别"></el-table-column>
      <el-table-column prop="appartbrand" align="left" label="品牌"></el-table-column>
      <el-table-column prop="appartunionno" align="left" label="件号"></el-table-column>
      <el-table-column prop="appartspec" align="left" label="规格"></el-table-column>
      <el-table-column prop="appartunit" align="left" label="单位"></el-table-column>
      <el-table-column prop="appartattribute" align="left" label="配件标准"></el-table-column>
      <el-table-column prop="appartprice" align="left" label="销价"></el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template slot-scope="scope">
          <el-button @click.native.prevent="detail(scope.row)" type="primary" >查看</el-button>
          <el-button type="primary" @click.native.prevent="edit(scope.row)" plain >编辑</el-button>
          <el-button @click.native.prevent="del(scope.$index, scope.row, tableData)" plain class="del" >删除</el-button>
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
    <add-edit-dialog :dialogShow="DialogShow" @close="DialogHide" @success="initTableData" :partsId='partsId'></add-edit-dialog>
    <detail-dialog :dialogDetailShow="DialogDetailShow" @close="DialogDetailHide" :partsId='partsId'></detail-dialog>
  </div>
</template>
<script>
import AddEditDialog from './add-edit'
import DetailDialog from './detail'
import { getToken } from '@/utils/auth'
import { partsList, partsDel } from '@/api/Api'
export default {
  data() {
    return {
      search: {
        data: {
          appartno: '',
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
      partsId: 0,
      DialogShow: false,
      DialogDetailShow: false,
      loading: false,
      uploadUrl: process.env.BASE_API + '/files/upload',
      headers: { auth: JSON.stringify({ accesstoken: getToken(), status: 1 }) }
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
        partsList(data).then(res => {
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
      this.partsId = parseInt(row.appartid)
      this.DialogShow = true
    },
    del(index, id, rows) {
      const appartid = id.appartid
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          partsDel({ appartid: appartid }).then(res => {
            rows.splice(index, 1)
            this.$message.success(res.msg)
          })
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    create() {
      this.partsId = 0
      this.DialogShow = true
    },
    fileUploadSuccess(res, file) {
      console.log(res)
      if (res.status === 0) {
        this.initTableData()
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeFileUpload(file) {
      console.log(this.headers)
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return true
      } else {
        this.$message.error('请导入正确的Excel表格')
        return false
      }
    },
    DialogHide() {
      this.DialogShow = false
      this.partsId = 0
    },
    detail(row) {
      this.partsId = parseInt(row.appartid)
      this.DialogDetailShow = true
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

