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
    user: {
      id: null,
      username: null
    },
    unique: {
      author: null,
      quote: null
    }
  },
  mutations: {
    isLogin (state, payload) {
      state.login = payload
    },
    loginUser (state, payload) {
      state.login = true
      state.user = payload
      console.log(state.user.id, 'ini loginuser mutat')
    },
    postTodo (state, payload) {
      state.todos.push(payload)
    },
    destroyTodo (state, payload) {
      let index = state.todos.findIndex(x => {
        return x === payload
      })
      state.todos.splice(index, 1)
    },
    getTodo (state, payload) {
      state.todos = payload
    },
    sendQuote (state, payload) {
      state.unique = payload
    }
  },
  actions: {
    addTodo ({ commit }, payload) {
      axios.post(baseUrl + '/todos', { // middleware on
        todos: payload
      }, {
        headers: {
          token: localStorage.getItem(fancyTodo)
        }
      })
        .then(response => {
          commit('postTodo', response.data.todo)
        })
        .catch(err => {
          swal({
            title: 'need login first',
            text: `${err}`,
            icon: 'warning',
            button: 'next'
          })
          console.log(err)
        })
    },
    removeTodo ({ commit }, payload) {
      axios.delete(baseUrl + `/todos/${payload._id}`, {
        headers: {
          token: localStorage.getItem(fancyTodo)
        }
      }) // middlewar on
        .then(response => {
          console.log(response.data)
          commit('destroyTodo', payload)
        })
        .catch(err => {
          swal({
            text: `${err.response.data.message}`,
            icon: 'error',
            button: 'next'
          })
          console.log(err)
        })
    },
    finishEdit ({ commit }, payload) { // middleware on
      payload.todos = payload.todos.trim()
      axios.put(baseUrl + `/todos/${payload._id}`, {
        todos: payload.todos
      }, {
        headers: {
          token: localStorage.getItem(fancyTodo)
        }
      })
        .then(response => {
          console.log(response.data, 'ini axios')
        })
        .catch(err => {
          console.log(err)
        })
    },
    finishEditTitle ({ commit }, payload) { // middleware on
      payload.title = payload.title.trim()
      axios.put(baseUrl + `/todos/${payload._id}`, {
        title: payload.title
      }, {
        headers: {
          token: localStorage.getItem(fancyTodo)
        }
      })
        .then(response => {
          console.log(response.data, 'finish edit title')
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
      }, {
        headers: {
          token: localStorage.getItem(fancyTodo)
        }
      })
        .then(response => {
          console.log(response.data, 'ini axios')
        })
        .catch(err => {
          swal({
            text: `${err.response.data.message}`,
            icon: 'error',
            button: 'next'
          })
          console.log(err)
        })
    },
    signin ({ commit }, payload) {
      axios.post(baseUrl + '/users/signin', payload)
        .then(response => {
          localStorage.setItem(fancyTodo, response.data.token)
          let objUser = {
            id: response.data.userId,
            username: response.data.username
          }
          commit('loginUser', objUser)
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
    getUser ({ commit }) {
      axios.get(baseUrl + '/users/user', {
        headers: {
          token: localStorage.getItem(fancyTodo)
        }
      })
        .then(response => {
          let objUser = {
            id: response.data.userId,
            username: response.data.username
          }
          commit('loginUser', objUser)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signout ({ commit }) {
      localStorage.clear()
      commit('isLogin', false)
      router.push({name: 'Home'})
      swal({
        text: 'you have logged out',
        icon: 'info',
        button: 'next'
      })
    },
    signup ({ commit }, payload) {
      console.log(payload.username, 'ini payload')
      axios.post(baseUrl + '/users/signup', payload)
        .then(response => {
          swal({
            text: 'Thanks for resgister',
            icon: 'success',
            button: 'next'
          })
        })
        .catch(err => {
          swal({
            text: `${err.response.data.message}`,
            icon: 'error',
            button: 'next'
          })
          console.log(err)
        })
    },
    findUserTodos ({commit, state}) {
      console.log(state.user.id, 'ini find user todos')
      axios.get(baseUrl + `/todos/${state.user.id}`, {
        headers: {
          token: localStorage.getItem(fancyTodo)
        }
      })
        .then(response => {
          commit('getTodo', response.data.todos)
        })
        .catch(err => {
          swal({
            text: `${err.response.data.message}`,
            icon: 'error',
            button: 'next'
          })
          console.log(err)
        })
    },
    uniqueFeature ({ commit }) {
      axios.get('https://favqs.com/api/qotd')
        .then(response => {
          let objQuote = {
            author: response.data.quote.author,
            quote: response.data.quote.body
          }
          commit('sendQuote', objQuote)
        })
    }
  }
})

export default store
