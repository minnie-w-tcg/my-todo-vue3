<template>
  <div class="mode-selector">
    <button
      v-for="mode in modes"
      :key="mode.id"
      :class="{ active: currentMode === mode.id }"
      @click="$emit('changeMode', mode.id)"
    >
      {{ mode.label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentMode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modes: [
        { id: 'pomodoro', label: 'Pomodoro' },
        { id: 'shortBreak', label: 'Short Break' },
        { id: 'longBreak', label: 'Long Break' },
      ],
    };
  },
};
</script>

<style scoped>
.mode-selector {
  display: flex;
  justify-content: center;
  gap: 15px; /* 根據 XD 稿調整按鈕間距 */
  margin-bottom: 20px; /* 與上方 TimerDisplay 間距 */
}

.mode-selector button {
  padding: 12px 25px; /* 根據 XD 稿調整 */
  font-size: var(--font-size-button); /* 使用 CSS 變數 */
  font-family: var(--font-family-display);
  border: none;
  border-radius: 8px; /* 根據 XD 稿調整圓角 */
  cursor: pointer;
  background-color: var(--color-button-bg); /* 未選中按鈕背景 */
  color: var(--color-button-text); /* 未選中按鈕文字 */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.mode-selector button.active {
  background-color: var(--color-primary); /* 選中按鈕背景 */
  color: var(--color-text-light); /* 選中按鈕文字 */
}

.mode-selector button:hover:not(.active) {
  background-color: #ccc; /* 懸停效果 */
}
</style>