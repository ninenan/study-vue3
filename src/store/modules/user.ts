/*
 * @Author: NineNan
 * @Date: 2021-05-11 21:29:29
 * @LastEditTime: 2021-05-12 11:38:15
 * @LastEditors: Please set LastEditors
 * @Description: user
 * @FilePath: /study_vue03/src/store/modules/user.ts
 */
import { IUser } from "@/types";
import { ActionContext } from "vuex";
import { EDIT_PET } from "@/helpers/constant";
const state: IUser = {
  name: "NineNan",
  height: 180,
  address: "address",
  pet: ["cat"],
  id: 1111,
  isLogin: false,
};

const mutations = {
  [EDIT_PET]: (state: IUser, payload: string[]): void => {
    state.pet = payload;
  },
};

const actions = {
  editPet: (context: ActionContext<IUser, IUser>, payload: string[]): void => {
    context.commit(EDIT_PET, payload);
  },
};

export default {
  state,
  mutations,
  actions,
};
