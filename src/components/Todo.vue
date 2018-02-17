<template>
  <div>
    <el-container style="height: 80px; border: 1px solid #eee;">
      <el-form class="flx-td">
        <el-form-item >
          <el-input v-model="newTodo" class="in-td" placeholder="What needs to be done?"></el-input>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newTodo: ''
    }
  }
}
</script>

<style>
.flx-td {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10% 0% 0% 25%;
}
.in-td {
  width: 200%;
  border: solid 3px #eee;
  border-radius: 3px;
}
</style>
