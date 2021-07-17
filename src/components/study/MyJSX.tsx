/*
 * @Author: NineNan
 * @Date: 2021-05-28 16:27:06
 * @LastEditTime: 2021-06-30 17:48:55
 * @LastEditors: Please set LastEditors
 * @Description: MyJSX
 * @FilePath: \study-vue3\src\components\study\MyJSX.tsx
 */
import { onMounted } from "vue";
import { defineComponent, render } from "vue";
import { h, ref } from "vue";

export default defineComponent({
  props: {
    name: String,
    num: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const root = ref<HTMLElement | null>(null);

    const slots = {
      bar: () => <span>B</span>,
    };

    onMounted(() => {
      console.log("root :>> ", root.value?.clientWidth);
    });

    function addNum() {
      context.emit("addNum");
    }

    return () => (
      <div>
        <div ref={root}>{props.name}</div>
        <div>
          <p>{props.num}</p>
          <button onClick={addNum}>+1</button>
        </div>
        <h1>{context.slots.default ? context.slots.default() : "默认插槽"}</h1>
        <h2>{context.slots.header ? context.slots.header() : "具名插槽"}</h2>
      </div>
    );
  },
});
