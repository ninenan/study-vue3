<!--
 * @Author: NineNan
 * @Date: 2021-05-28 16:07:07
 * @LastEditTime: 2021-06-30 17:57:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\views\study\StudyJSX.vue
 * 侦听模板引用的变更可以替代前面例子中演示使用的生命周期钩子。
 * 但与生命周期钩子的一个关键区别是，watch() 和 watchEffect() 
 * 副作用是在 DOM 被挂载或更新之前运行的，所以当侦听器运行副作用时，模板引用还没有被更新。
-->
<template>
  <div>
    <h1>StudyJSX</h1>
    <MyJSX :name="'NineNan'" :num="num" @add-num="addNum">
      <template #header>
        <div>header</div>
      </template>
    </MyJSX>
    <div class="mt-20">
      <div
        v-for="(item, i) in list"
        :key="item"
        :ref="
          (el) => {
            if (el) divs[i] = el;
          }
        "
      >
        {{ item }}
      </div>
      <div class="mt-20" ref="rootRef">rootRef</div>
    </div>
  </div>
</template>
<script lang="ts">
import MyJSX from "@/components/study/MyJSX.tsx";
import {
  onBeforeUpdate,
  onMounted,
  reactive,
  ref,
  Ref,
  watchEffect,
} from "vue";

export interface IStudyJSX {
  list: number[];
  divs: Ref<Array<HTMLElement>>;
  rootRef: Ref<HTMLElement | null>;
  num: Ref<number>;
  addNum: () => void;
}

export default {
  components: {
    MyJSX,
  },

  setup(): IStudyJSX {
    const list = reactive<number[]>([1, 2, 3]);
    const divs = ref([]);
    const rootRef = ref<HTMLElement | null>(null);
    const num = ref(3);

    watchEffect(
      () => {
        // 这个副作用在 DOM 更新之前运行，因此，模板引用还没有持有对元素的引用。
        console.log(rootRef.value); // null 不增加flush
        // 增加flush 返回DOM
      },
      {
        flush: "post",
      }
    );

    function addNum() {
      console.log("1111 :>> ", 1111);
      num.value++;
    }

    onBeforeUpdate(() => {
      divs.value = [];
    });

    onMounted(() => {
      console.log("divs :>> ", divs);
    });

    return {
      list,
      divs,
      rootRef,
      num,
      addNum,
    };
  },
};
</script>
<style lang="scss" scoped></style>
