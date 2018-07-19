<template>
  <div class="dialog-store-creat-and-edit-page">
    <el-dialog title="配件详情" :visible.sync="dialogDetailStoreVisible" :close-on-click-modal="false" @close="clearData" width="50rem">
        <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="div-warp">
            <div class="div-left item-half">
              <el-form-item label="配件编号:">
                <span>{{partsData.appartno}}</span>
              </el-form-item>
              <el-form-item label="配件名称:" prop="apcname">
                <span>{{partsData.appartname}}</span>
              </el-form-item>
              <el-form-item label="配件标准:" prop="apcaddress">
                <span>{{partsData.appartattribute}}</span>
              </el-form-item>
              <el-form-item label="配件类别:" prop="apcphone">
                <span>{{partsData.apparttype}}</span>
              </el-form-item>
              <el-form-item label="品牌:">
                <span>{{partsData.appartbrand}}</span>
              </el-form-item>
            </div>
            <div class="div-right item-half">
              <el-form-item label="件号:" prop="apccontactname">
                <span>{{partsData.appartunionno}}</span>
              </el-form-item>
              <el-form-item label="规格:" prop="apccontacttelno">
                <span>{{partsData.appartspec}}</span>
              </el-form-item>
              <el-form-item label="单位:" prop="apcloginname">
                <span>{{partsData.appartunit}}</span>
              </el-form-item>
              <el-form-item label="销价:" prop="apcloginpwd">
                <span>{{partsData.appartprice}} 元</span>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="备注:" prop="appartremark">
              <span>{{partsData.appartremark}}</span>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>

</template>

<script>
import { partsDetail } from '@/api/Api'
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
        partsDetail(data).then(res => {
          if (res.status === 0) {
            this.partsData = res.data
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
