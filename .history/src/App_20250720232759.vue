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
    currentMode(newMode) {
      this.resetTimer(); // 切換模式時，重置為新模式的初始時間
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
      // 這裡可以播放音效、發送通知、或自動切換模式
      // 例如：
      // if (this.currentMode === 'pomodoro') {
      //   this.changeMode('shortBreak'); // 工作結束自動轉短休息
      // } else {
      //   this.changeMode('pomodoro'); // 休息結束自動轉工作
      // }
    }
  },
  beforeUnmount() {
    this.pauseTimer(); // 組件銷毀前清除定時器
  },
  created() {
    // 組件創建時確保時間是正確的初始值
    this.time = this.times[this.currentMode];
  }
};
</script>

<style>
/* 這裡放全局樣式，例如 body, #app 的樣式，以及 CSS 變數 */
/* 請將上方 `b. 全局樣式與顏色變數` 中的 CSS 貼到這裡或單獨的 CSS 檔案 */
</style>