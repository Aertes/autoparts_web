<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px" class="clearfix">
      <el-form-item label="门店编号:" class="fl">
        <el-input v-model="form.name" placeholder="请输入门店编号"></el-input>
      </el-form-item>
      <el-form-item label="门店名称:" class="fl">
        <el-input v-model="form.name" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item label="门店电话:" class="fl">
        <el-input v-model="form.name" placeholder="请输入门店电话"></el-input>
      </el-form-item>
      <el-form-item label="类别:" class="fl">
        <el-select v-model="form.region" placeholder="请选择类别">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:"  class="fl w38">
        <el-input  v-model="form.desc" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
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

