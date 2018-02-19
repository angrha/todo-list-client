<template>
  <div>
    <el-container class="flx-cnt">
      <el-card class="box-card" v-for="(todo, index) in todos" :key="todo._id">
        <div slot="header" class="clearfix">
          <span>{{'title ' + index }}</span>
          <el-button class="el-icon-close" type="text" @click="removeTodo(todo)"> </el-button>
        </div>
        <div v-if="!editedTodo">
          <el-checkbox style="float: left;"></el-checkbox>
          <p @dblclick="editTodo(todo)">
            {{todo.todos}}
          </p>
        </div>
        <el-input type="text"
          v-if="editedTodo"
          v-model="todo.todos"
          @blur="doneEdit(todo)"
          @keyup.enter.native="doneEdit(todo)">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
        </el-input>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      editedTodo: null
    }
  },
  computed: {
    ...mapState([
      'todos'
    ])
  },
  methods: {
    ...mapActions([
      'removeTodo',
      'finishEdit'
    ]),
    editTodo (todo) {
      this.editedTodo = todo
    },
    doneEdit (todo) {
      if (!this.editedTodo) {
        return
      }
      this.finishEdit(todo)
      this.editedTodo = null
      if (!todo.todos) {
        this.removeTodo(todo)
      }
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

.el-icon-close{
  float: right;
  padding: 3px 0
}
</style>
