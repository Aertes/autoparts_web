<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog title="账户详情" :visible.sync="dialogAddAndEditAccountVisible" :close-on-click-modal="false" @close="clearData" width="50rem">
        <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="姓名:">
                <span>{{companyData.apaccountname}}</span>
              </el-form-item>
              <el-form-item label="手机号:">
                <span>{{companyData.aptelno}}</span>
              </el-form-item>
              <el-form-item label="品牌:">
                <span v-for="(item , index) in companyData.brandList">{{item.acbbrandname}}&nbsp;&nbsp;&nbsp;</span>
              </el-form-item>
            </div>
            <div class="div-right item-half">
              <el-form-item label="公司名称:">
                <span>{{companyData.acompanyname}}</span>
              </el-form-item>
              <el-form-item label="公司电话:">
                <span>{{companyData.acompanytelno}}</span>
              </el-form-item>
              <el-form-item label="公司地址:">
                <span>{{companyData.acompanyaddress}}</span>
              </el-form-item>
            </div>
          </div>
        </el-form>
    </el-dialog>
  </div>

</template>

<script>
import { accountUserDetail } from '@/api/Api'
export default {
  name: 'detail',
  props: {
    dialogDetailShow: {
      type: Boolean,
      default: false
    },
    accountId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      companyData: ''
    }
  },
  computed: {
    dialogAddAndEditAccountVisible: {
      get() {
        if (this.dialogDetailShow) {
          this.userDetail()
        }
        return this.dialogDetailShow
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    userDetail() {
      const data = { apaccountid: this.accountId }
      return new Promise((resolve, reject) => {
        accountUserDetail(data).then(res => {
          if (res.status === 0) {
            this.companyData = res.data
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    clearData() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
