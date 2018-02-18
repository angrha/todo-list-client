<template>
  <div>
    <el-container class="flx-cnt">
      <el-card class="box-card" v-for="(todo, index) in todos" :key="todo._id">
        <div slot="header" class="clearfix">
          <span>{{'title ' + index }}</span>
          <el-button class="el-icon-close" style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div v-for="t in todo.todos" :key="t._id" class="text item">
          <p>
            <el-checkbox style="float: left;"></el-checkbox>
            {{t}}
          </p>
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'todos'
    ])
  },
  methods: {
    ...mapActions([
      'findAllTodos'
    ])
  },
  watch: {
    id: function () {
      this.findAllTodos()
    }
  }
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
  margin-bottom: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.flx-cnt {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.box-card {
  width: 250px;
  margin-top: 4%;
  margin-right: 0.5%;
}
</style>
