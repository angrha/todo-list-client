<template>
  <div v-if="login">
    <el-container class="flx-cnt">
      <el-card class="box-card" v-for="todo in todos" :key="todo._id">
        <div slot="header" class="clearfix">
          <span @dblclick="editTitle" v-if="!editedTitle">{{ todo.title }}</span>
          <el-input type="text"
            v-if="editedTitle"
            v-model="todo.title"
            @blur="doneEditTitle(todo)"
            @keyup.enter.native="doneEditTitle(todo)"
            style="width: 80%;"
            clearable>
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
          <el-button class="el-icon-close" type="text" @click="removeTodo(todo)"> </el-button>
        </div>
        <div :class="{complete: todo.status}" v-if="!editedTodo">
          <label for="check">
            <el-checkbox
            id="check"
            v-model="todo.status"
            @change="mark(todo)"
            style="float: left;">
          </el-checkbox>
          </label>
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
      editedTodo: null,
      editedTitle: null
    }
  },
  computed: {
    ...mapState([
      'todos',
      'login'
    ])
  },
  methods: {
    ...mapActions([
      'removeTodo',
      'finishEdit',
      'finishEditTitle',
      'mark'
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
    },
    editTitle (todo) {
      this.editedTitle = todo
    },
    doneEditTitle (todo) {
      if (!this.editedTitle) {
        return
      }
      this.finishEditTitle(todo)
      this.editedTitle = null
      if (!todo.title || todo.title === '') {
        todo.title = 'title'
        this.finishEditTitle(todo)
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

.complete {
  text-decoration: line-through;
  color: rgb(40, 89, 153);
}
</style>
