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
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const newTodoText = ref('')

const todos = computed(() => store.state.todos)
const remainingTodos = computed(() => store.getteres.remainingTodos)

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
/* 將之前的 CSS 樣式貼到這裡 */
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    background-color: #f4f4f4;
    padding-top: 50px;
}
/* 注意這裡的 ID 是 app-container，因為 main.js 掛載的是 #app，而 App.vue 是其內部內容 */
#app-container {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}
h1 {
    text-align: center;
    color: #333;
    margin-bottom: 25px;
}
.input-section {
    display: flex;
    margin-bottom: 20px;
}
.input-section input[type="text"] {
    flex-grow: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-right: 10px;
}
.input-section button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}
.input-section button:hover {
    background-color: #45a049;
}
.todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.todo-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
}
.todo-item:last-child {
    border-bottom: none;
}
.todo-item span {
    flex-grow: 1;
    font-size: 18px;
    color: #555;
}
.todo-item.completed span {
    text-decoration: line-through;
    color: #aaa;
}
.todo-item .delete-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 15px;
}
.todo-item .delete-btn:hover {
    background-color: #f12727;
}
.todo-item input[type="checkbox"] {
    margin-right: 15px;
    transform: scale(1.3);
}
.footer-info {
    margin-top: 20px;
    text-align: right;
    padding-top: 10px;
    border-top: 1px solid #eee;
    color: #666;
    font-size: 14px;
}
</style>