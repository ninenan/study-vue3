<!--
 * @Author: NineNan
 * @Date: 2021-05-08 17:19:50
 * @LastEditTime: 2021-05-16 22:52:44
 * @LastEditors: Please set LastEditors
 * @Description: study watch
 * @FilePath: \study-vue3\src\views\StudyWatch.vue
-->
<template>
  <div class="study-watch">
    <h1>study watch</h1>
    <div class="one">
      <p>监听单个值</p>
      <p>
        {{ count }}
      </p>
      <a-button @click="addCount" type="primary">addCount</a-button>
    </div>
    <div class="two">
      <p>监听对象中的属性</p>
      <p>
        {{ stateCount }}
      </p>
      <a-button @click="addStateCount" type="primary">addStateCount</a-button>
    </div>
    <div class="three">
      <p>监听多个属性</p>
      <p>
        {{ stateCount }}
      </p>
      <p>
        {{ count }}
      </p>
      <a-button @click="addStateCount" type="primary">addStateCount</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, Ref, ref, toRefs, watch } from "vue";

interface IStudyWatch {
  count: Ref<number>;
  addCount: () => void;
  addStateCount: () => void;
  stateCount: Ref<number>;
}

interface IState {
  stateCount: number;
}

export default {
  setup(): IStudyWatch {
    const count = ref(0);
    const addCount = () => {
      count.value++;
    };

    watch(count, (newVal, oldVal) => {
      console.log("newVal :>> ", newVal);
      console.log("oldVal :>> ", oldVal);
    });

    const state: IState = reactive({
      stateCount: 0,
    });
    const addStateCount = () => {
      state.stateCount++;
    };

    watch(
      () => state.stateCount,
      (newVal, oldVal) => {
        console.log("stateCount-newVal :>> ", newVal);
        console.log("stateCount-oldVal :>> ", oldVal);
      },
      { immediate: true, deep: true } // 开启深度监听和初始化立马监听
    );

    watch([() => state.stateCount, count], (newVal, oldVal) => {
      console.log("more-newVal :>> ", newVal); // 返回的两个值组成的数组
      console.log("more-oldVal :>> ", oldVal); // 返回的两个值组成的数组
    });

    return {
      count,
      addCount,
      ...toRefs(state),
      addStateCount,
    };
  },
};
</script>
<style lang="scss" scoped>
.study-watch {
  display: flex;
  align-items: center;
  flex-direction: column;
}
@mixin box($color) {
  color: $color;
  border: 1px solid $color;
  width: 200px;
  padding: 20px;
  margin-bottom: 20px;
}
.one {
  @include box(#3d71ff);
}
.two {
  @include box(#42b983);
}
.three {
  @include box(#13c2c2);
}
</style>
