<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog :title="accountId ? '编辑账户' : '新建账户'" :visible.sync="dialogAddAndEditAccountVisible" :close-on-click-modal="false" @close="clearData('ruleForm')" width="50rem">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="姓名:" prop="apaccountname">
                <el-input v-model="ruleForm.apaccountname"  placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="aptelno">
                <el-input v-model="ruleForm.aptelno" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="apaccountpwd">
                <el-input type="password" v-model="ruleForm.apaccountpwd" placeholder="请输入密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="apcloginpwdsure">
                <el-input type="password" v-model="ruleForm.apcloginpwdsure" placeholder="请输入确认密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="品牌:" prop="apcaddress">
                <!-- <span v-for="(item , index) in companyData.brandList">{{item.acbbrandname}}&nbsp;&nbsp;&nbsp;</span> -->
                <!-- <el-input v-model="ruleForm.apcaddress" placeholder="请输入配件地址"></el-input> -->
              </el-form-item>
            </div>
            <div class="div-right item-half">
              <el-form-item label="公司名称:" prop="apcompanyid">
                <el-select v-model="ruleForm.apcompanyid" placeholder="请选择公司">
                  <el-option label="区域一" :value="1"></el-option>
                  <el-option label="区域二" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司电话:" prop="companytelno">
                <el-input v-model="ruleForm.companytelno" disabled placeholder="请输入规格"></el-input>
              </el-form-item>
              <el-form-item label="公司地址:" prop="companyaddress">
                <el-input v-model="ruleForm.companyaddress" disabled placeholder="请输入单位"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
import { accountUserDetail, accountUserAddOrEdit, getCompanySelect } from '@/api/Api'
export default {
  name: 'add-edit',
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    accountId: {
      type: Number,
      default: 0
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.apcloginpwdsure !== '') {
          this.$refs.ruleForm.validateField('apcloginpwdsure')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.apaccountpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        apaccountid: 0,
        apaccountname: '', // 姓名
        aptelno: '', // 手机号
        apaccountpwd: '', // 密码
        apcloginpwdsure: '', // 确认密码
        apccontactname: '', // 品牌
        apcompanyid: '', // 公司名称
        companytelno: '', // 公司电话
        companyaddress: '' // 公司地址
      },
      rules: {
        apaccountname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        aptelno: [
          { required: true, message: '请输入手机号', trigger: 'change' }
        ],
        apaccountid: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        apaccountpwd: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        apcloginpwdsure: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    dialogAddAndEditAccountVisible: {
      get() {
        if (this.dialogShow) {
          if (this.accountId !== 0) {
            this.editInfo()
          }
          this.companySelect()
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
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editInfo() {
      const data = { apaccountid: this.accountId }
      return new Promise((resolve, reject) => {
        accountUserDetail(data).then(res => {
          if (res.status === 0) {
            console.log(res.data)
            this.ruleForm = res.data
            this.ruleForm.apcloginpwdsure = res.data.apaccountpwd
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    companySelect() {
      return new Promise((resolve, reject) => {
        getCompanySelect().then(res => {
          debugger
          if (res.status === 0) {
            console.log(res.data)
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
      this.ruleForm.apaccountid = 0
    },
    clearData(formName) {
      this.resetForm(formName)
      this.$emit('close')
      this.ruleForm.apaccountid = 0
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
