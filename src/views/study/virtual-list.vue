<template>
  <div class="virtual-list__container" ref="listRef" @scroll="scrollEvent">
    <div
      class="virtual-list__shade"
      :style="{
        height: `${listHeight}px`,
      }"
    ></div>
    <div class="virtual-list" :style="shadeStyle">
      <div
        class="virtual-list__item"
        v-for="item in visibleData"
        :key="item.id"
        @click="test(item)"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, Ref, ref } from "vue";
const data: IListData[] = [];
for (let index = 0; index < 10_000; index++) {
  data.push({
    value: index,
    id: `nnn${index}`,
  });
}

interface IListData {
  value: number;
  id: string;
}

interface IVirtualList {
  listData: Ref<IListData[]>;
  visibleData: Ref<IListData[]>;
  listHeight: Ref<number>;
  scrollEvent: () => void;
  listRef: Ref<HTMLElement | null>;
  shadeStyle: Ref<{ transform: string }>;
  test: (item: IListData) => void;
}

export default {
  setup(): IVirtualList {
    const listData = ref<IListData[]>(data); // 列表总高度
    const start = ref<number>(0); // 开始下标
    const end = ref<number>(0); // 结束下标
    const listRef = ref<HTMLElement | null>(null); // 当前盒子
    const screenHeight = ref(0); // 可是区域的高度
    const startOffset = ref(0); // 偏移量

    // 总高度
    const listHeight = computed(() => {
      return listData.value.length * 100;
    });
    // 可见的数据
    const visibleData = computed(() =>
      listData.value.slice(
        start.value,
        Math.min(end.value, listData.value.length)
      )
    );
    // 偏移样式
    const shadeStyle = computed(() => {
      return {
        transform: `translate3d(0, ${startOffset.value}px, 0)`,
      };
    });
    // 可以显示的列表数量
    const visibleCount = computed(() => Math.ceil(screenHeight.value / 100));

    onMounted(() => {
      if (listRef.value) {
        screenHeight.value = listRef.value.clientHeight;
        start.value = 0;
        end.value = start.value + visibleCount.value;
      }
    });

    const scrollEvent = () => {
      if (listRef.value) {
        const scrollTop = listRef.value.scrollTop;
        start.value = Math.floor(scrollTop / 100);
        end.value = start.value + visibleCount.value;
        startOffset.value = scrollTop - (scrollTop % 100);
      }
    };
    const test = (item: IListData) => {
      console.log("item :>> ", item.value);
    };
    return {
      listData,
      visibleData,
      listHeight,
      listRef,
      shadeStyle,
      scrollEvent,
      test,
    };
  },
};
</script>
<style lang="scss" scoped>
.virtual-list__container {
  height: 100vh;
  width: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.virtual-list__shade {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.virtual-list {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  width: 100%;
}
.virtual-list__item {
  line-height: 100px;
  height: 100px;
  padding: 10px;
  color: blueviolet;
  border-bottom: 1px solid blueviolet;
}
</style>
