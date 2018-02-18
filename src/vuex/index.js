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
      state.todos.push(payload)
    }
  },
  actions: {
    addTodo ({commit}, payload) {
      axios.post(baseUrl + '/todos', {
        title: payload
      })
        .then(response => {
          commit('postTodo', response.data.todo)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

export default store
