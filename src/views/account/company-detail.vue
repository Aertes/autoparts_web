<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog title="账户详情" :visible.sync="dialogAddAndEditCompanyVisible" :close-on-click-modal="false" @close="clearData" width="50rem">
        <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="配件编号:">
                <span>{{storeData.apcno}}</span>
              </el-form-item>
              <el-form-item label="配件名称:" prop="apcname">
                <span>{{storeData.apcname}}</span>
              </el-form-item>
              <el-form-item label="配件标准:" prop="apcaddress">
                <span>{{storeData.apcaddress}}</span>
              </el-form-item>
              <el-form-item label="配件类别:" prop="apcphone">
                <span>{{storeData.apcphone}}</span>
              </el-form-item>
              <el-form-item label="品牌:">
                <span>{{storeData.region}}</span>
                <!-- <el-select v-model="storeData.region" placeholder="请选择门店类别">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select> -->
              </el-form-item>
            </div>
            <div class="div-right item-half">
              <el-form-item label="件号:" prop="apccontactname">
                <span>{{storeData.apccontactname}}</span>
              </el-form-item>
              <el-form-item label="规格:" prop="apccontacttelno">
                <span>{{storeData.apccontacttelno}}</span>
              </el-form-item>
              <el-form-item label="单位:" prop="apcloginname">
                <span>{{storeData.apcloginname}}</span>
              </el-form-item>
              <el-form-item label="销价:" prop="apcloginpwd">
                <span>{{storeData.apcloginpwd}} 元</span>
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
export default {
  name: 'detail',
  props: {
    dialogDetailShow: {
      type: Boolean,
      default: false
    },
    companyId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      storeData: {
        apcno: '123123', // 门店编号
        apcname: '123123', // 门店名称
        apcaddress: '123123', // 门店地址
        apcphone: '123123', // 门店电话
        apccontactname: '123123', // 联系人
        apccontacttelno: '123123', // 联系人电话
        apcloginname: '123123', // 登录账号
        apcloginpwd: '123123', // 密码
        apcloginpwdsure: '123123', // 请确认密码
        apcremark: '123123'// 备注
      }
    }
  },
  computed: {
    dialogAddAndEditCompanyVisible: {
      get() {
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
    clearData() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
