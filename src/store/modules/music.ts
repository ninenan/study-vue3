/*
 * @Author: your name
 * @Date: 2021-06-06 17:53:36
 * @LastEditTime: 2021-06-20 22:41:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/store/modules/music.ts
 */
import { IMusicStore, PLAY_MODE, ISingerDetailsInfo } from "@/types/index";
import {
  SET_PLAYING_STATUE,
  SET_SEQUENCE_LIST,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_CURRENT_INDEX,
  SET_FULL_SCREEN,
} from "@/helpers/constant";
import { ActionContext } from "vuex";
import { shuffle } from "@/helpers/utils";

const state: IMusicStore = {
  sequenceList: [],
  playList: [],
  isPlaying: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  isFullScreen: false,
};

const getters = {
  currentSong: (state: IMusicStore): ISingerDetailsInfo => {
    return state.playList[state.currentIndex] || {};
  },
};

const mutations = {
  /**
   * 设置播放状态
   * @param state IMusicStore
   * @param isPlaying boolean
   */
  [SET_PLAYING_STATUE]: (state: IMusicStore, isPlaying: boolean): void => {
    state.isPlaying = isPlaying;
  },
  /**
   * 设置播放顺序列表
   * @param state IMusicStore
   * @param list unknown[]
   */
  [SET_SEQUENCE_LIST]: (
    state: IMusicStore,
    list: ISingerDetailsInfo[]
  ): void => {
    state.sequenceList = list;
  },
  /**
   * 设置播放列表
   * @param state IMusicStore
   * @param list unknown[]
   */
  [SET_PLAYLIST]: (state: IMusicStore, list: ISingerDetailsInfo[]): void => {
    state.playList = list;
  },
  /**
   * 设置播放模式
   * @param state IMusicStore
   * @param mode PLAY_MODE
   */
  [SET_PLAY_MODE]: (state: IMusicStore, mode: PLAY_MODE): void => {
    state.playMode = mode;
  },
  /**
   * 设置当前播放的歌曲下标
   * @param state IMusicStore
   * @param index number
   */
  [SET_CURRENT_INDEX]: (state: IMusicStore, index: number): void => {
    state.currentIndex = index;
  },
  /**
   * 设置是否全屏
   * @param state IMusicStore
   * @param isFullScreen boolean
   */
  [SET_FULL_SCREEN]: (state: IMusicStore, isFullScreen: boolean): void => {
    state.isFullScreen = isFullScreen;
  },
};

const actions = {
  /**
   * 顺序播放
   * @param context
   * @param param1
   */
  selectPlay: (
    context: ActionContext<IMusicStore, IMusicStore>,
    { list, index }: { list: unknown[]; index: number }
  ): void => {
    context.commit(SET_PLAYING_STATUE, true);
    context.commit(SET_SEQUENCE_LIST, list);
    context.commit(SET_PLAYLIST, list);
    context.commit(SET_CURRENT_INDEX, index);
    context.commit(SET_FULL_SCREEN, true);
    context.commit(SET_PLAY_MODE, PLAY_MODE.sequence);
  },
  /**
   * 随机播放
   * @param context
   * @param param1
   */
  randomPlay: (
    context: ActionContext<IMusicStore, IMusicStore>,
    { list }: { list: unknown[]; index: number }
  ): void => {
    context.commit(SET_PLAYING_STATUE, true);
    context.commit(SET_SEQUENCE_LIST, list);
    context.commit(SET_PLAYLIST, shuffle(list));
    context.commit(SET_CURRENT_INDEX, 0);
    context.commit(SET_FULL_SCREEN, true);
    context.commit(SET_PLAY_MODE, PLAY_MODE.random);
  },
  /**
   * 改变播放模式
   * @param context
   * @param mode
   * @returns
   */
  changeMode: (
    context: ActionContext<IMusicStore, IMusicStore>,
    mode: PLAY_MODE
  ): void => {
    const currentId = context.getters.currentSong.id;
    if (mode === PLAY_MODE.random) {
      context.commit(SET_PLAYLIST, shuffle(context.state.sequenceList));
    } else {
      context.commit(SET_PLAYLIST, context.state.sequenceList);
    }
    const currentIndex = context.state.playList.findIndex(
      (song) => song.id === currentId
    );
    context.commit(SET_CURRENT_INDEX, currentIndex);
    context.commit(SET_PLAY_MODE, mode);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
