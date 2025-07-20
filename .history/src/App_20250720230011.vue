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
/* src/assets/main.css 或 App.vue 的 <style> 區塊 */
:root {
  /* 從 XD 稿中獲取的顏色 */
  --color-primary: #B45454; /* 假設是主色調，例如進度條或活躍按鈕 */
  --color-background: #1A1A1A; /* 假設是整體背景色 */
  --color-text-light: #F0F0F0; /* 淺色文字 */
  --color-button-bg: #E0E0E0; /* 按鈕背景色 */
  --color-button-text: #333; /* 按鈕文字色 */

  /* 從 XD 稿中獲取的字體 */
  --font-family-display: 'Arial', sans-serif; /* 假設 XD 用了 Arial 或類似字體 */
  --font-size-timer: 8em; /* 計時器時間的大小 */
  --font-size-button: 1.2em; /* 按鈕文字大小 */
}

body {
  background-color: var(--color-background);
  color: var(--color-text-light);
  font-family: var(--font-family-display); /* 應用到全局 */
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#app {
  /* 移除預設的 margin-top，改為垂直居中 */
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; /* 組件間距 */
  padding: 20px;
}

h1 {
  color: var(--color-text-light);
  font-weight: normal; /* 根據設計調整 */
}
</style>