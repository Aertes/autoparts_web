<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog :title="parts ? '编辑配件' : '新建配件'" :visible.sync="dialogAddAndEditPartsVisible" :close-on-click-modal="false" @close="clearData('ruleForm')" width="50rem">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="配件编号:">
                <el-input v-model="ruleForm.apcno"  placeholder="新建后自动生成" disabled ></el-input>
              </el-form-item>
              <el-form-item label="配件名称:" prop="apcname">
                <el-input v-model="ruleForm.apcname" placeholder="请输入配件名称"></el-input>
              </el-form-item>
              <el-form-item label="配件标准:">
                <el-select v-model="ruleForm.region" placeholder="请选择配件标准">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="配件类别:">
                <el-select v-model="ruleForm.region" placeholder="请选择配件类别">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="品牌:" prop="apcaddress">
                <el-input v-model="ruleForm.apcaddress" placeholder="请输入配件地址"></el-input>
              </el-form-item>
            </div>
            <div class="div-right item-half">
              <el-form-item label="件号:" prop="apccontactname">
                <el-input v-model="ruleForm.apccontactname" placeholder="请输入件号"></el-input>
              </el-form-item>
              <el-form-item label="规格:" prop="apccontacttelno">
                <el-input v-model="ruleForm.apccontacttelno" placeholder="请输入规格"></el-input>
              </el-form-item>
              <el-form-item label="单位:" prop="apcloginname">
                <el-input v-model="ruleForm.apcloginname" placeholder="请输入单位"></el-input>
              </el-form-item>
              <el-form-item label="销价:" prop="apcloginpwd" class="input-flex">
                <el-input type="password" v-model="ruleForm.apcloginpwd" placeholder="请输入销价"></el-input>
                <span>元</span>
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
export default {
  name: 'add-edit',
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    parts: {
      type: String,
      default: ''
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
        apcno: '', // 配件编号
        apcname: '', // 配件名称
        apcaddress: '', // 配件地址
        apcphone: '', // 配件电话
        apccontactname: '', // 联系人
        apccontacttelno: '', // 联系人电话
        apcloginname: '', // 登录账号
        apcloginpwd: '', // 密码
        apcloginpwdsure: '', // 请确认密码
        apcremark: ''// 备注
      },
      rules: {
        apcname: [
          { required: true, message: '请输入配件名称', trigger: 'blur' }
        ],
        apcaddress: [
          { required: true, message: '请输入配件地址', trigger: 'change' }
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
    dialogAddAndEditPartsVisible: {
      get() {
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('close')
    },
    clearData(formName) {
      this.resetForm(formName)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
