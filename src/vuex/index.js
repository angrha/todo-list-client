import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from '../router'

Vue.use(Vuex)

const fancyTodo = 'auth-fancy-todo'
const baseUrl = 'http://localhost:3000/api'

const store = new Vuex.Store({
  state: {
    todos: [],
    login: false,
    user: null
  },
  mutations: {
    postTodo (state, payload) {
      state.todos.push(payload)
    },
    getTodo (state, payload) {
      state.todos = payload
    },
    destroyTodo (state, payload) {
      let index = state.todos.findIndex(x => {
        return x === payload
      })
      state.todos.splice(index, 1)
    },
    isLogin (state, payload) {
      state.login = payload
    },
    loginUser (state, payload) {
      state.user = payload
      console.log(state.user)
    }
  },
  actions: {
    addTodo ({ commit }, payload) {
      axios.post(baseUrl + '/todos', { // middleware off
        todos: payload
      })
        .then(response => {
          commit('postTodo', response.data.todo)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findAllTodos ({ commit }) {
      axios.get(baseUrl + '/todos')
        .then(response => {
          commit('getTodo', response.data.todos)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeTodo ({ commit }, payload) {
      axios.delete(baseUrl + `/todos/${payload._id}`) // middlewar off
        .then(response => {
          console.log(response.data)
          commit('destroyTodo', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    finishEdit ({ commit }, payload) { // middleware off
      payload.todos = payload.todos.trim()
      axios.put(baseUrl + `/todos/${payload._id}`, {
        todos: payload.todos
      })
        .then(response => {
          console.log(response.data, 'ini axios')
        })
        .catch(err => {
          console.log(err)
        })
    },
    mark ({ commit }, payload) {
      let stat = ''
      if (payload.status) {
        stat = 'completed'
      } else {
        stat = 'uncompleted'
      }
      axios.put(baseUrl + `/todos/${payload._id}/mark`, {
        status: stat
      })
        .then(response => {
          console.log(response.data, 'ini axios')
        })
        .catch(err => {
          console.log(err)
        })
    },
    signin ({ commit }, payload) {
      axios.post(baseUrl + '/users/signin', payload)
        .then(response => {
          localStorage.setItem(fancyTodo, response.data.token)
          commit('isLogin', true)
          commit('loginUser', response.data.user)
        })
        .catch(err => {
          swal({
            text: `${err.response.data.message}`,
            icon: 'error',
            button: 'next'
          })
        })
    },
    checkLogin ({ commit }) {
      if (localStorage.getItem(fancyTodo)) {
        commit('isLogin', true)
      }
    },
    signout ({ commit }) {
      console.log('masuk sini')
      localStorage.clear()
      commit('isLogin', false)
      router.push({name: 'Home'})
      swal({
        text: 'you have logged out',
        icon: 'info',
        button: 'next'
      })
    }
  }
})

export default store
