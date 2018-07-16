<template>
  <div class="app-container">
    <el-form ref="form" :model="search" label-width="100px" class="clearfix">
      <el-form-item label="门店编号:" class="fl">
        <el-input v-model="search.name" placeholder="请输入门店编号"></el-input>
      </el-form-item>
      <el-form-item label="门店名称:" class="fl">
        <el-input v-model="search.name" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item label="门店电话:" class="fl">
        <el-input v-model="search.name" placeholder="请输入门店电话"></el-input>
      </el-form-item>
      <el-form-item label="类别:" class="fl">
        <el-select v-model="search.region" placeholder="请选择类别">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:"  class="fl w38">
        <el-input  v-model="search.desc" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" @click="create">新建门店</el-button>
    </el-row>
    <el-table :data="tableData" border-bottom style="width: 100%" >
      <el-table-column prop="date" align="left" label="门店编号"></el-table-column>
      <el-table-column prop="name" align="left" label="门店名称"></el-table-column>
      <el-table-column prop="address" align="left" label="地址" width="300" ></el-table-column>
      <el-table-column prop="city" align="left" label="类别"></el-table-column>
      <el-table-column prop="zip" align="left" label="门店电话"></el-table-column>
      <el-table-column prop="name" align="left" label="联系人"></el-table-column>
      <el-table-column prop="zip" align="left" label="联系人电话"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="primary" >查看</el-button>
          <el-button type="primary" @click="edit(scope.row)" plain >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tablePage.page"
      :page-size="tablePage.row"
      background
      layout="prev, pager, next, jumper"
      :total="tablePage.total">
    </el-pagination>
    <add-edit-dialog :dialogShow="DialogShow" @close="DialogHide" @success="tableData" :storeId='storeId'></add-edit-dialog>
    <detail-dialog :dialogDetailShow="DialogDetailShow" @close="DialogDetailHide" :storeId='storeId'></detail-dialog>
  </div>
</template>
<script>
import AddEditDialog from './add-edit'
import DetailDialog from './detail'
export default {
  data() {
    return {
      search: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      tablePage: {
        page: 1,
        rows: 5,
        total: 100
      },
      storeId: '',
      DialogShow: false,
      DialogDetailShow: false
    }
  },
  methods: {
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
      this.storeId = `${row.zip}`
      this.DialogShow = true
    },
    create() {
      this.DialogShow = true
    },
    DialogHide() {
      this.DialogShow = false
      this.storeId = ''
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

