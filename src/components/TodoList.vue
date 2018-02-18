<template>
  <div>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="6" v-for="o in 6" :key="o">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{'title ' + o }}</span>
              <el-button class="el-icon-close" style="float: right; padding: 3px 0" type="text"></el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              <p>
                <el-checkbox v-model="checked" style="float: left;"></el-checkbox>
                {{'list item ' + o }}
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 250px;
  margin-top: 4%;
}
</style>
