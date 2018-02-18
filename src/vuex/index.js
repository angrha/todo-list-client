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
    getTodo (state, payload) {
      console.log(payload, 'ini todo')
      state.todos = payload
    }
  },
  actions: {
    addTodo ({commit}, payload) {
      axios.post(baseUrl + '/todos', {
        todos: payload
      })
        .then(response => {
          console.log(response.data.todo)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findAllTodos ({commit}) {
      axios.get(baseUrl + '/todos')
        .then(response => {
          commit('getTodo', response.data.todos)
          console.log(response.data.todos, 'ini axio')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

export default store
