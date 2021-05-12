<!--
 * @Author: NineNan
 * @Date: 2021-05-12 11:04:37
 * @LastEditTime: 2021-05-12 14:48:25
 * @LastEditors: Please set LastEditors
 * @Description: Study Vuex Modules
 * @FilePath: \study-vue3\src\views\StudyVuexModules.vue
-->
<template>
  <div class="vuex-modules">
    <h1>Study Vuex Modules</h1>
    <div class="test mb-20">
      <p>test module</p>
      <p>count: {{ count }}</p>
      <div class="mb-20">
        <a-button @click="addCount">addCount</a-button>
      </div>
      <div>
        <a-button @click="asyncAddCount">asyncAddCount</a-button>
      </div>
    </div>
    <div class="user">
      <p>user module</p>
      <p>name: {{ user.name }}</p>
      <p>height: {{ user.height }}</p>
      <p>address: {{ user.address }}</p>
      <p>pet: {{ user.pet.join() }}</p>
      <div class="mb-20">
        <a-button @click="syncEditPet">syncEditPet</a-button>
      </div>
      <div class="mb-20">
        <a-button @click="asyncEditPet">asyncEditPet</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ADD_COUNT, EDIT_PET } from "@/helpers/constant";
import { computed, ComputedRef } from "vue";
import { IUser } from "@/types";
import { useStore } from "@/store/index";

interface IStudyVuexModules {
  addCount: () => void;
  count: ComputedRef<number>;
  asyncAddCount: () => void;
  user: ComputedRef<IUser>;
  syncEditPet: () => void;
  asyncEditPet: () => void;
}

export default {
  setup(): IStudyVuexModules {
    const store = useStore();
    const count = computed(() => {
      return store.state.test.count;
    });
    const addCount = () => {
      return store.commit(ADD_COUNT, 3);
    };
    const asyncAddCount = () => {
      return store.dispatch("addCount", 5);
    };
    const user = computed(() => {
      return store.state.user;
    });

    return {
      addCount,
      count,
      asyncAddCount,
      user,
      syncEditPet: () => store.commit(EDIT_PET, ["cat", "dog"]),
      asyncEditPet: () => {
        return store.dispatch("editPet", [
          "dog",
          "bird",
          "cat",
          "fish",
          "tortoise",
        ]);
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.vuex-modules {
  color: $themeColor;
}
.test,
.user {
  width: 200px;
  min-height: 200px;
  border: 1px solid #ccc;
  @include FlexCenter();
  flex-direction: column;
  padding: 10px;
}
</style>
