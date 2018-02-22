<template>
<div>
  <el-header style="text-align: right; font-size: 12px; background-color: #F56C6C;">
    <el-dropdown>
      <i class="el-icon-setting logout"></i>
      <el-dropdown-menu slot="dropdown">
        <el-button
          type="text"
          v-if="login"
          @click="signout"
          style="padding-left: 15px; padding-right: 15px;">
          Sign Out
        </el-button>
      </el-dropdown-menu>
    </el-dropdown>
    <span v-if="login" class="tracking-in-contract">Welcome {{ user.username }}</span>
  </el-header>
</div>
</template>

<script>
import Todo from '@/components/Todo'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Todo
  },
  computed: {
    ...mapState([
      'login',
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'signout'
    ])
  }
}
</script>

<style>

</style>
