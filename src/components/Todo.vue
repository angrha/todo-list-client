<template>
  <div>
    <el-container style="height: 80px;">
      <el-form class="flx-td">
        <el-form-item >
          <el-input type="text"
            v-model="newTodo"
            @keyup.enter.native="submitTodo(newTodo)"
            class="in-td"
            placeholder="What needs to be done?"
            autofocus>
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
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
    ]),
    submitTodo (e) {
      this.addTodo(e)
      this.newTodo = ''
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
}
</style>
