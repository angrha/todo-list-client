import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from '../router'

Vue.use(Vuex)

// const fancyTodo = 'auth-fancy-todo'
const baseUrl = 'http://localhost:3000/api'

const store = new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    postTodo (state, payload) {
      console.log(payload, 'ini todo')
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
    }
  }
})

export default store
