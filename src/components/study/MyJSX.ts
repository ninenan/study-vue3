import { h, ref } from "vue";

export default {
  setup() {
    const root = ref(null);

    return () =>
      h(
        "div",
        {
          class: "mt-20",
          ref: root,
        },
        "hello jsx"
      );
  },
};
