<!--
 * @Author: NineNan
 * @Date: 2021-05-03 10:05:31
 * @LastEditTime: 2021-05-07 22:09:56
 * @LastEditors: Please set LastEditors
 * @Description: study vue03
 * @FilePath: /study_vue03/src/views/About.vue
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ count }}</h2>
    <h2>double{{ double }}</h2>
    <h3>name: {{ name }}</h3>
    <p>
      <span>x: {{ x }}</span>
      <span>y: {{ y }}</span>
    </p>
    <div v-if="isShowLoading">loading...</div>
    <div class="image-box" v-else>
      <img :src="result.message" alt="" />
    </div>
    <a-button type="primary" @click="addCount">+1</a-button>
  </div>
</template>
<script lang="ts">
import { computed, reactive, toRefs, ref, watch } from "vue";
import useMousePosition from "@/hooks/useMousePosition";
import useURLLoader from "@/hooks/useURLLoader";
interface INewCountObj {
  count: number;
  double: number;
  addCount: () => void;
}
interface IDogResult {
  message: string;
  status: string;
}

export default {
  setup() {
    const name = ref("NineNan");
    const newCountObj: INewCountObj = reactive({
      count: 0,
      double: computed(() => {
        return newCountObj.count * 2;
      }),
      addCount: () => {
        newCountObj.count++;
      },
    });
    const { x, y } = useMousePosition();
    const { result, isShowLoading, error } = useURLLoader<IDogResult>(
      "https://dog.ceo/api/breeds/image/random"
    );
    watch(
      () => newCountObj.count,
      (newVal) => {
        if (newVal === 4) {
          name.value = "NNN";
        }
      }
    );

    return {
      ...toRefs(newCountObj),
      name,
      x,
      y,
      result,
      isShowLoading,
      error,
    };
  },
};
</script>
<style lang="scss" scoped>
span {
  color: blue;
}
.image-box {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
