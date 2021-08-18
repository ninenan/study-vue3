/*
 * @Author: NineNan
 * @Date: 2021-07-17 21:39:03
 * @LastEditTime: 2021-08-18 21:09:07
 * @LastEditors: Please set LastEditors
 * @Description: WrapScroll scroll 高阶组件简单实现
 * @FilePath: \study-vue3\src\components\WrapScroll\WrapScroll.ts
 */
import Scroll from "@/components/base/scroll/Scroll.vue";
import IBScroll from "@better-scroll/core/dist/types/index";

import {
  h,
  mergeProps,
  renderSlot,
  withCtx,
  ref,
  computed,
  watch,
  nextTick,
} from "vue";
import { useStore } from "@/store/index";

export default {
  name: "WrapScroll",
  props: Scroll.props,
  emits: Scroll.emits,
  setup() {
    const scrollRef = ref<IBScroll | null>(null);
    const store = useStore();
    const playList = computed(() => store.state.music.playList);
    const scroll = computed(() => scrollRef.value?.scroll); // 如果页面未渲染直接 return scroll 的话，会拿不到值，所以可以使用 computed 来做处理

    watch(playList, async () => {
      await nextTick();
      scroll.value?.refresh();
    });

    return {
      scrollRef,
      scroll,
    };
  },
  render(ctx: any) {
    return h(
      Scroll,
      mergeProps({ ref: "scrollRef" }, ctx.$props, {
        onScroll: (e: TouchEvent) => {
          ctx.$emit("scroll", e);
        },
      }),
      {
        default: withCtx(() => {
          return [renderSlot(ctx.$slots, "default")];
        }),
      }
    );
  },
};
