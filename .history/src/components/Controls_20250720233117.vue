<template>
  <div class="controls">
    <button @click="$emit('start')">Start</button>
    <button @click="$emit('pause')">Stop</button>
    <button @click="$emit('reset')">Reset</button>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  gap: 20px; 
}

};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  gap: 20px; /* 根據 XD 稿調整按鈕間距 */
}

.controls button {
  padding: 15px 40px; /* 根據 XD 稿調整 */
  font-size: var(--font-size-button); /* 使用 CSS 變數 */
  font-family: var(--font-family-display);
  border: none;
  border-radius: 8px; /* 根據 XD 稿調整圓角 */
  cursor: pointer;
  background-color: var(--color-primary); /* 主操作按鈕顏色 */
  color: var(--color-text-light);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 陰影效果 */
  transition: background-color 0.3s ease, transform 0.1s ease;
}

.controls button:hover {
  background-color: darken(var(--color-primary), 10%); /* 懸停效果 */
  transform: translateY(-2px);
}

.controls button:active {
  transform: translateY(0);
}

.controls button:nth-child(2) {
  background-color: #f39c12; 
}
.controls button:nth-child(3) {
  background-color: #c0392b; 
}
</style>