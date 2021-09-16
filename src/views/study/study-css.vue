<template>
  <div class="study-css">
    <div class="title-box" @click="onClick">我是titleBox</div>
    <div class="position-box">
      <div class="position-box-content" :style="moveStyle">
        <p @click="test">我是position-box-content</p>
      </div>
    </div>
    <div
      class="mask"
      :style="{
        opacity: isMove ? 1 : 0,
      }"
    ></div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "vue";
export default {
  setup() {
    const isMove = ref(false);
    const moveStyle = computed(() => {
      if (isMove.value) {
        return {
          transform: "translate3d(0, 0, 0)",
          //   zIndex: 1,
          opacity: 1,
        };
      } else {
        return null;
      }
    });
    const onClick = () => {
      isMove.value = !isMove.value;
    };
    const test = () => {
      console.log(222);
    };

    return { isMove, moveStyle, onClick, test };
  },
};
</script>
<style lang="scss" scoped>
.study-css {
  padding-top: 20px;
  height: 100%;
  width: 100%;
  position: relative;

  .title-box {
    width: 100%;
    background-color: $color-theme;
    text-align: center;
    line-height: 50px;
  }
  .position-box {
    position: relative;
    .position-box-content {
      position: absolute;
      width: 100%;
      left: 0;
      height: 200px;
      background-color: $color-theme-d;
      transform: translate3d(0, -250px, 0);
      z-index: -1;
      opacity: 0;
      transition: transform 0.3s, opacity 0.3s;
    }
  }
  .mask {
    position: absolute;
    background-color: rgba($color: #ffffff, $alpha: 0.1);
    z-index: -2;
    width: 100%;
    height: 500px;
    transition: opacity 0.3s;
  }
}
</style>
