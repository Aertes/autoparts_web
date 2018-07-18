<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog :title="storeId ? '编辑门店' : '新建门店'" :visible.sync="dialogAddAndEditStoreVisible" :close-on-click-modal="false" @close="clearData('ruleForm')" width="50rem">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="门店编号:">
                <el-input v-model="ruleForm.apcno"  placeholder="新建后自动生成" disabled ></el-input>
              </el-form-item>
              <el-form-item label="门店名称:" prop="apcname">
                <el-input v-model="ruleForm.apcname" placeholder="请输入门店名称"></el-input>
              </el-form-item>
              <el-form-item label="地址:" prop="apcaddress">
                <el-input v-model="ruleForm.apcaddress" placeholder="请输入门店地址"></el-input>
              </el-form-item>
              <el-form-item label="电话:" prop="apcphone">
                <el-input v-model="ruleForm.apcphone" placeholder="请输入门店电话"></el-input>
              </el-form-item>
              <!-- <el-form-item label="类别:">
                <el-select v-model="ruleForm.region" placeholder="请选择门店类别">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->
            </div>
            <div class="div-right item-half">
              <el-form-item label="联系人:" prop="apccontactname">
                <el-input v-model="ruleForm.apccontactname" placeholder="请输入联系姓名"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话:" prop="apccontacttelno">
                <el-input v-model="ruleForm.apccontacttelno" placeholder="请输入联系人电话"></el-input>
              </el-form-item>
              <el-form-item label="登录账号:" prop="apcloginname">
                <el-input v-model="ruleForm.apcloginname" placeholder="请输入登录账号"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="apcloginpwd">
                <el-input type="password" v-model="ruleForm.apcloginpwd" placeholder="请输入密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="apcloginpwdsure">
                <el-input type="password" v-model="ruleForm.apcloginpwdsure" placeholder="请输入确认密码" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="备注:" prop="apcremark">
              <el-input type="textarea" v-model="ruleForm.apcremark" placeholder="请输入备注"></el-input>
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
import { storeDetail } from '@/api/Api'
export default {
  name: 'add-edit',
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    storeId: {
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
      } else if (value !== this.ruleForm.apcloginpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        apcno: '', // 门店编号
        apcname: '', // 门店名称
        apcaddress: '', // 门店地址
        apcphone: '', // 门店电话
        apccontactname: '', // 联系人
        apccontacttelno: '', // 联系人电话
        apcloginname: '', // 登录账号
        apcloginpwd: '', // 密码
        apcloginpwdsure: '', // 请确认密码
        apcremark: ''// 备注
      },
      apcloginname: true,
      apcloginpwd: true,
      apcloginpwdsure: true,
      rules: {
        apcname: [
          { required: true, message: '请输入门店名称', trigger: 'blur' }
        ],
        apcaddress: [
          { required: true, message: '请输入门店地址', trigger: 'change' }
        ],
        apcphone: [
          { trigger: 'change' }
        ],
        apccontactname: [
          { required: true, message: '请输入联系姓名', trigger: 'change' }
        ],
        apccontacttelno: [
          { required: true, message: '请输入联系人电话', trigger: 'change' }
        ],
        apcloginname: [
          { required: true, message: '请输登录账号', trigger: 'change' }
        ],
        apcloginpwd: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        apcloginpwdsure: [
          { required: true, validator: validatePass2, trigger: 'change' }
        ],
        apcremark: [
          { trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    dialogAddAndEditStoreVisible: {
      get() {
        if (this.dialogShow) {
          switch (this.storeId) {
            case 0:
              // 创建
              console.log(this.storeId)
              break
            default:
              // 编辑
              this.editInfo()
              break
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
    editInfo() {
      const data = { apcid: this.storeId }
      return new Promise((resolve, reject) => {
        storeDetail(data).then(res => {
          if (res.status === 0) {
            console.log(res.data)
            this.ruleForm = res.data
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
          reject(error)
        })
      })
    },
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('close')
    },
    clearData(formName) {
      this.resetForm(formName)
      this.$emit('close')
      // this.ruleForm = {
      //   apcno: '', // 门店编号
      //   apcname: '', // 门店名称
      //   apcaddress: '', // 门店地址
      //   apcphone: '', // 门店电话
      //   apccontactname: '', // 联系人
      //   apccontacttelno: '', // 联系人电话
      //   apcloginname: '', // 登录账号
      //   apcloginpwd: '', // 密码
      //   apcloginpwdsure: '', // 请确认密码
      //   apcremark: ''// 备注
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
