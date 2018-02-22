<template>
<el-container style="height: 650px; border: 1px solid #B3C0D1">
  <!-- side navigation bar -->
  <el-aside width="200px" style="background-color: #F56C6C; border: 1px solid #B3C0D1">
    <el-menu
      default-active="3"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- login -->
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
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span>Todo List</span>
      </el-menu-item>
    </el-menu>
    <h3 class="text-focus-in"> {{ unique.quote }} </h3>
    <h5 class="text-focus-in"> - {{ unique.author }} </h5>
  </el-aside>
  <!-- header -->
  <el-container>
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
    <!-- main content here -->
    <el-main style="background-color: #545c64;">
      <Todo></Todo>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Todo from '@/components/Todo'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Todo
  },
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
      'login',
      'user',
      'clear',
      'unique'
    ])
  },
  methods: {
    ...mapActions([
      'findUserTodos',
      'signin',
      'signup',
      'signout',
      'checkLogin',
      'getUser',
      'uniqueFeature'
    ]),
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    setSignin (user) {
      this.signin(user)
        .then(() => {
          this.formData.email = ''
          this.formData.password = ''
        })
        .catch(err => console.log(err))
    },
    register (user) {
      this.signup(user)
        .then(() => {
          this.formData.username = ''
          this.formData.email = ''
          this.formData.password = ''
        })
        .catch(err => console.log(err))
    }
  },
  created () {
    this.checkLogin()
    this.getUser()
    this.uniqueFeature()
  },
  mounted () {
    this.findUserTodos()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-input {
  width: 90%;
}

.flx-btn {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 2%;
  margin-right: 5%;
}

.btn-log {
  background-color: #F56C6C;
  color: #fff;
}

.logout {
  margin-right: 15px;
  cursor: pointer;
}

.text-focus-in {
-webkit-animation: text-focus-in 2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
        animation: text-focus-in 2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}
.tracking-in-contract {
  -webkit-animation: tracking-in-contract 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
          animation: tracking-in-contract 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2018-2-21 21:42:34
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-focus-in
 * ----------------------------------------
 */
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2018-2-21 21:51:33
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation tracking-in-contract
 * ----------------------------------------
 */
@-webkit-keyframes tracking-in-contract {
  0% {
    letter-spacing: 1em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    letter-spacing: normal;
    opacity: 1;
  }
}
@keyframes tracking-in-contract {
  0% {
    letter-spacing: 1em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    letter-spacing: normal;
    opacity: 1;
  }
}

</style>
