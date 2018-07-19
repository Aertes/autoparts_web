<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog :title="partsId ? '编辑配件' : '新建配件'" :visible.sync="dialogAddAndEditPartsVisible" :close-on-click-modal="false" @close="clearData('ruleForm')" width="50rem">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="配件编号:" prop="appartno">
                <el-input v-model="ruleForm.appartno"  placeholder="新建后自动生成" disabled ></el-input>
              </el-form-item>
              <el-form-item label="配件名称:" prop="appartname">
                <el-input v-model="ruleForm.appartname" placeholder="请输入配件名称"></el-input>
              </el-form-item>
              <el-form-item label="配件标准:" prop="appartattribute">
                <el-select v-model="ruleForm.appartattribute" placeholder="请选择配件标准">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="配件类别:" prop="apparttype">
                <el-select v-model="ruleForm.apparttype" placeholder="请选择配件类别">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="品牌:" prop="appartbrand">
                <el-input v-model="ruleForm.appartbrand" placeholder="请输入配件品牌"></el-input>
              </el-form-item>
            </div>
            <div class="div-right item-half">
              <el-form-item label="件号:" prop="appartunionno">
                <el-input v-model="ruleForm.appartunionno" placeholder="请输入件号"></el-input>
              </el-form-item>
              <el-form-item label="规格:" prop="appartspec">
                <el-input v-model="ruleForm.appartspec" placeholder="请输入规格"></el-input>
              </el-form-item>
              <el-form-item label="单位:" prop="appartunit">
                <el-input v-model="ruleForm.appartunit" placeholder="请输入单位"></el-input>
              </el-form-item>
              <el-form-item label="销价:" prop="appartprice" class="input-flex">
                <el-input type="number" v-model="ruleForm.appartprice" placeholder="请输入销价"></el-input>
                <span>元</span>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="备注:" prop="appartremark">
              <el-input type="textarea" v-model="ruleForm.appartremark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
import { partsDetail, partsAddOrEdit } from '@/api/Api'
export default {
  name: 'add-edit',
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    partsId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      ruleForm: {
        appartid: this.partsId,
        appartno: '', // 配件编号
        appartname: '', // 配件名称
        appartattribute: '', // 配件标准
        apparttype: '', // 配件类别
        appartbrand: '', // 配件品牌
        appartunionno: '', // 配件件号
        appartspec: '', // 配件规格
        appartunit: '', // 配件单位
        appartprice: '', // 配件销价
        appartremark: ''// 备注
      },
      rules: {
        appartno: [
          { trigger: 'blur' }
        ],
        appartname: [
          { required: false, message: '请输入配件名称', trigger: 'change' }
        ],
        appartattribute: [
          { required: false, message: '请选择配件标准', trigger: 'change' }
        ],
        apparttype: [
          { required: false, message: '请选择配件类别', trigger: 'change' }
        ],
        appartbrand: [
          { required: false, message: '请输入配件品牌', trigger: 'change' }
        ],
        appartunionno: [
          { required: false, message: '请输入配件件号', trigger: 'change' }
        ],
        appartspec: [
          { required: false, message: '请输入配件规格', trigger: 'change' }
        ],
        appartunit: [
          { required: false, message: '请输入配件单位', trigger: 'change' }
        ],
        appartprice: [
          { required: false, message: '请输入配件销价', trigger: 'change' }
        ],
        appartremark: [
          { trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    dialogAddAndEditPartsVisible: {
      get() {
        if (this.dialogShow) {
          if (this.partsId !== 0) {
            this.editInfo()
          }
        }
        return this.dialogShow
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return new Promise((resolve, reject) => {
            partsAddOrEdit(this.ruleForm).then(res => {
              if (res.status === 0) {
                this.$message.success('修改成功')
                this.$emit('success')
                this.$emit('close')
              } else {
                this.$message.error(res.msg)
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editInfo() {
      const data = { appartid: this.partsId }
      return new Promise((resolve, reject) => {
        partsDetail(data).then(res => {
          if (res.status === 0) {
            this.ruleForm = res.data
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('close')
      this.ruleForm.appartno = ''
      this.ruleForm.appartid = 0
    },
    clearData(formName) {
      this.resetForm(formName)
      this.$emit('close')
      this.ruleForm.appartno = ''
      this.ruleForm.appartid = 0
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
