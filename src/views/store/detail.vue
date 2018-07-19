<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog title="门店详情" :visible.sync="dialogDetailStoreVisible" :close-on-click-modal="false" @close="clearData" width="50rem">
        <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="门店编号:">
                <span>{{storeData.apcno}}</span>
              </el-form-item>
              <el-form-item label="门店名称:" prop="apcname">
                <span>{{storeData.apcname}}</span>
              </el-form-item>
              <el-form-item label="地址:" prop="apcaddress">
                <span>{{storeData.apcaddress}}</span>
              </el-form-item>
              <el-form-item label="电话:" prop="apcphone">
                <span>{{storeData.apcphone}}</span>
              </el-form-item>
              <el-form-item label="类别:">
                <span>{{storeData.region}}</span>
              </el-form-item>
            </div>
            <div class="div-right item-half">
              <el-form-item label="联系人:" prop="apccontactname">
                <span>{{storeData.apccontactname}}</span>
              </el-form-item>
              <el-form-item label="联系人电话:" prop="apccontacttelno">
                <span>{{storeData.apccontacttelno}}</span>
              </el-form-item>
              <el-form-item label="登录账号:" prop="apcloginname">
                <span>{{storeData.apcloginname}}</span>
              </el-form-item>
              <el-form-item label="密码:" prop="apcloginpwd">
                <span>{{storeData.apcloginpwd}}</span>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="备注:" prop="apcremark">
              <span>{{storeData.apcremark}}</span>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>

</template>

<script>
import { storeDetail } from '@/api/Api'
export default {
  name: 'detail',
  props: {
    dialogDetailShow: {
      type: Boolean,
      default: false
    },
    storeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      storeData: ''
    }
  },
  computed: {
    dialogDetailStoreVisible: {
      get() {
        if (this.dialogDetailShow) {
          this.detail()
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
    detail() {
      const data = { apcid: this.storeId }
      return new Promise((resolve, reject) => {
        storeDetail(data).then(res => {
          if (res.status === 0) {
            console.log(res.data)
            this.storeData = res.data
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
