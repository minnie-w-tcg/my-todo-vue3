// src/store/index.js
import { createStore }  from 'vuex'


const STORAGE_KEY = 'vue-todo-list-vuex'; // 確保鍵名唯一

export default createStore({
  state: {
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  getters: {
    remainingTodos: state => {
      return state.todos.filter(todo => !todo.completed).length;
    }
  },
  mutations: {
    addTodo(state, todoText) {
      state.todos.push({
        id: Date.now(),
        text: todoText,
        completed: false
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    },
    toggleTodoCompletion(state, id) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    }
  },
  actions: {
    addTodo({ commit }, todoText) {
      if (todoText.trim()) {
        commit('addTodo', todoText.trim());
      }
    },
    removeTodo({ commit }, id) {
      commit('removeTodo', id);
    },
    toggleTodoCompletion({ commit }, id) {
      commit('toggleTodoCompletion', id);
    }
  },
  modules: {
    
  }
})