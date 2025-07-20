<template>
  <div id="app">
    <ModeSelector
      :current-mode="currentMode"
      @changeMode="changeMode"
    />

    <TimerDisplay
      :current-time="time"
      :total-time="totalModeTime"
    />

    <Controls
      @start="startTimer"
      @pause="pauseTimer"
      @reset="resetTimer"
    />
  </div>
</template>

<script>
import TimerDisplay from './components/TimerDisplay.vue';
import ModeSelector from './components/ModeSelector.vue';
import Controls from './components/Controls.vue';

export default {
  name: 'App',
  components: {
    TimerDisplay,
    ModeSelector,
    Controls,
  },
  data() {
    return {
      // 根據設計稿，設定預設的時間
      times: {
        pomodoro: 25 * 60, // 25 分鐘
        shortBreak: 5 * 60, // 5 分鐘
        longBreak: 15 * 60, // 15 分鐘
      },
      currentMode: 'pomodoro', // 當前模式
      time: 25 * 60, // 當前模式剩餘時間
      timerInterval: null, // 定時器 ID
    };
  },
  computed: {
    // 當前模式的總時間
    totalModeTime() {
      return this.times[this.currentMode];
    },
  },
  watch: {
    // 監聽模式變化，自動重置時間
    currentMode() {
      this.resetTimer(); 
    }
  },
  methods: {
    changeMode(newMode) {
      this.pauseTimer(); // 切換模式時先暫停
      this.currentMode = newMode;
      // watch 會處理時間的重置
    },
    startTimer() {
      if (this.timerInterval) return; // 防止重複啟動

      this.timerInterval = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.pauseTimer();
          this.handleTimeUp(); // 時間結束處理
        }
      }, 1000);
    },
    pauseTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    },
    resetTimer() {
      this.pauseTimer(); // 先暫停
      this.time = this.totalModeTime; // 重置為當前模式的初始時間
    },
    handleTimeUp() {
      // 時間結束時的處理
      alert(`${this.currentMode === 'pomodoro' ? '番茄工作' : (this.currentMode === 'shortBreak' ? '短休息' : '長休息')}時間到！`);
      if (this.currentMode === 'pomodoro') {
          this.changeMode('shortBreak'); 
        } else {
          this.changeMode('pomodoro'); 
        }
    }
  },
  beforeUnmount() {
    this.pauseTimer(); // 組件銷毀前清除定時器
  },
  created() {
    this.time = this.times[this.currentMode];
  }
};
</script>

<style>
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