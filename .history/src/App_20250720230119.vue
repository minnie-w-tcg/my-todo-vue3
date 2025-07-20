<template>
  <div id="app-container"> <h1>我的待辦事項</h1>
    <div class="input-section">
      <input type="text" v-model="newTodoText" @keyup.enter="addTodo" placeholder="新增待辦事項..">
      <button @click="addTodo">新增</button>
    </div>

    <ul class="todo-list">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }" >
        <input type="checkbox" :checked="todo.completed" @change="toggleTodoCompletion(todo.id)">
        <span>{{ todo.text }}</span>
        <button class="delete-btn" @click="removeTodo(todo.id)">刪除</button>
      </li>
    </ul>
    <div class="footer-info">
      <span> <strong>{{ remainingTodos }}</strong> 個任務未完成</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const newTodoText = ref('')

const todos = computed(() => store.state.todos)
const remainingTodos = computed(() => store.getters.remainingTodos)

function addTodo(){
  if (newTodoText.value.trim()){
    store.dispatch('addTodo', newTodoText.value)
    newTodoText.value = ''
  }
}

function removeTodo(id) {
  store.dispatch('removeTodo', id)
}

function toggleTodoCompletion(id) {
  store.dispatch('toggleTodoCompletion', id)
}
</script>

<style>
:root {
  --color-primary: #B45454; 
  --color-background: #1A1A1A; 
  --color-text-light: #F0F0F0;
  --color-button-bg: #E0E0E0; 
  --color-button-text: #333; 

  --font-family-display: 'Arial', sans-serif; 
  --font-size-timer: 8em; 
  --font-size-button: 1.2em; 
}

body {
  background-color: var(--color-background);
  color: var(--color-text-light);
  font-family: var(--font-family-display); 
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#app {
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; 
  padding: 20px;
}

h1 {
  color: var(--color-text-light);
  font-weight: normal; 
}
</style>