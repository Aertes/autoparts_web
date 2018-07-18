<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog title="配件详情" :visible.sync="dialogDetailStoreVisible" :close-on-click-modal="false" @close="clearData" width="50rem">
        <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="配件编号:">
                <span>{{partsData.appartno}}</span>
                <!-- <el-input v-model="partsData.apcno"  placeholder="新建后自动生成" disabled ></el-input> -->
              </el-form-item>
              <el-form-item label="配件名称:" prop="apcname">
                <span>{{partsData.appartname}}</span>
                <!-- <el-input v-model="partsData.apcname" placeholder="请输入门店名称"></el-input> -->
              </el-form-item>
              <el-form-item label="配件标准:" prop="apcaddress">
                <span>{{partsData.appartattribute}}</span>
                <!-- <el-input v-model="partsData.apcaddress" placeholder="请输入门店地址"></el-input> -->
              </el-form-item>
              <el-form-item label="配件类别:" prop="apcphone">
                <span>{{partsData.apparttype}}</span>
                <!-- <el-input v-model="partsData.apcphone" placeholder="请输入门店电话"></el-input> -->
              </el-form-item>
              <el-form-item label="品牌:">
                <span>{{partsData.appartbrand}}</span>
                <!-- <el-select v-model="partsData.region" placeholder="请选择门店类别">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select> -->
              </el-form-item>
            </div>
            <div class="div-right item-half">
              <el-form-item label="件号:" prop="apccontactname">
                <span>{{partsData.appartunionno}}</span>
                <!-- <el-input v-model="partsData.apccontactname" placeholder="请输入联系姓名"></el-input> -->
              </el-form-item>
              <el-form-item label="规格:" prop="apccontacttelno">
                <span>{{partsData.appartspec}}</span>
                <!-- <el-input v-model="partsData.apccontacttelno" placeholder="请输入联系人电话"></el-input> -->
              </el-form-item>
              <el-form-item label="单位:" prop="apcloginname">
                <span>{{partsData.appartunit}}</span>
                <!-- <el-input v-model="partsData.apcloginname" placeholder="请输登录账号"></el-input> -->
              </el-form-item>
              <el-form-item label="销价:" prop="apcloginpwd">
                <span>{{partsData.appartprice}} 元</span>
                <!-- <el-input type="password" v-model="partsData.apcloginpwd" placeholder="请输入密码" auto-complete="off"></el-input> -->
              </el-form-item>
              <!-- <el-form-item label="确认密码:" prop="apcloginpwdsure">
                <el-input type="password" v-model="partsData.apcloginpwdsure" placeholder="请输入确认密码" auto-complete="off"></el-input>
              </el-form-item> -->
            </div>
          </div>
          <el-form-item label="备注:" prop="apcremark">
              <span>{{partsData.apcremark}}</span>
              <!-- <el-input type="textarea" v-model="partsData.apcremark" placeholder="请输入备注"></el-input> -->
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>

</template>

<script>
import { partDetail } from '@/api/Api'
export default {
  name: 'detail',
  props: {
    dialogDetailShow: {
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
      partsData: ''
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
      const data = { appartid: this.partsId }
      return new Promise((resolve, reject) => {
        partDetail(data).then(res => {
          if (res.status === 0) {
            this.partsData = res.data
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
    clearData() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
