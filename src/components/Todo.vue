<template>
  <div>
    <el-container style="height: 80px; border: 1px solid #eee;">
      <el-form class="flx-td" @submit.prevent>
        <el-form-item >
          <el-input v-model="newTodo"
          @keyup.enter.native="addTodo(newTodo)"
          class="in-td"
          placeholder="What needs to be done?"
          autofocus></el-input>
        </el-form-item>
      </el-form>
    </el-container>
    <!-- todo-list component -->
    <TodoList/>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'
import { mapActions } from 'vuex'
export default {
  components: {
    TodoList
  },
  data () {
    return {
      newTodo: ''
    }
  },
  methods: {
    ...mapActions([
      'addTodo'
    ])
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
