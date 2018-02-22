<template>
  <div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>Sign In</span>
      </template>
      <el-form v-if="login === false">
        <el-menu-item-group title="Email">
          <el-input
            type="email"
            size="small"
            placeholder="Input Your Email"
            v-model="formData.email"
            clearable>
          </el-input>
        </el-menu-item-group>
        <el-menu-item-group title="Password">
            <el-input
            type="password"
            size="small"
            placeholder="Input Your Password"
            v-model="formData.password"
            clearable>
          </el-input>
        </el-menu-item-group>
        <div class="flx-btn">
          <el-button
            @click="setSignin(formData)"
            type="submit"
            size="small"
            class="btn-log">
            Login
          </el-button>
        </div>
      </el-form>
      <!-- login with social media -->
      <el-submenu index="1-4">
        <template slot="title">Login With...</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-submenu>
    </el-submenu>
    <!-- sign up -->
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>Sign Up</span>
      </template>
      <el-form>
        <el-menu-item-group title="Username">
          <el-input
            type="text"
            size="small"
            placeholder="Input Your Username"
            v-model="formData.username"
            clearable>
          </el-input>
        </el-menu-item-group>
        <el-menu-item-group title="Email">
          <el-input
            type="email"
            size="small"
            placeholder="Input Your Email"
            v-model="formData.email"
            clearable>
          </el-input>
        </el-menu-item-group>
        <el-menu-item-group title="Password">
            <el-input
            type="password"
            size="small"
            placeholder="Input Your Password"
            v-model="formData.password"
            clearable>
          </el-input>
        </el-menu-item-group>
        <div class="flx-btn">
          <el-button
            @click="register(formData)"
            type="submit"
            size="small"
            class="btn-log">
            Sign Up
          </el-button>
        </div>
      </el-form>
    </el-submenu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      formData: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  methods: {
    ...mapActions([
      'signin',
      'signup',
    ])
  }
}
</script>

<style>

</style>
