<template>
  <div class="timer-display">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="backgroundColor"
        :stroke-width="strokeWidth"
      ></circle>
      <circle
        class="progress-circle"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="progressColor"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="progressOffset"
        transform="rotate(-90)"
        :transform-origin="`${size / 2} ${size / 2}`"
      ></circle>
    </svg>
    <div class="time-text">{{ formattedTime }}</div>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: { // 來自父組件的當前時間 (秒)
      type: Number,
      required: true,
    },
    totalTime: { // 當前模式的總時間 (秒)
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      size: 300, // SVG 寬高
      strokeWidth: 15, // 進度條粗細
      backgroundColor: '#333', // 背景圓顏色 (根據 XD 稿調整)
      progressColor: 'var(--color-primary)', // 進度條顏色 (使用 CSS 變數)
    };
  },
  computed: {
    radius() {
      return (this.size - this.strokeWidth) / 2;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    progressOffset() {
      // 計算進度偏移量
      // (1 - (當前時間 / 總時間)) * 圓周長
      return this.circumference * (1 - this.currentTime / this.totalTime);
    },
    formattedTime() {
      const minutes = Math.floor(this.currentTime / 60);
      const seconds = this.currentTime % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
  },
};
</script>

<style scoped>
.timer-display {
  position: relative;
  width: 300px; /* 與 SVG 的 size 保持一致 */
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-text {
  position: absolute;
  font-size: var(--font-size-timer); /* 使用 CSS 變數 */
  font-family: var(--font-family-display);
  color: var(--color-text-light);
  /* 確保文字在圓圈中央 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none; /* 防止文字被選中 */
}

/* SVG 進度條的過渡效果 */
.progress-circle {
  transition: stroke-dashoffset 0.9s linear; /* 讓進度條平滑移動 */
}
</style>