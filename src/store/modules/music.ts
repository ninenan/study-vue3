/*
 * @Author: NineNan
 * @Date: 2021-06-06 17:53:36
 * @LastEditTime: 2021-07-06 21:52:56
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
  SET_FAVORITES_LIST,
  STORAGE,
  ADD_SONG_LYRIC,
} from "@/helpers/constant";
import { ActionContext } from "vuex";
import { shuffle } from "@/helpers/utils";
import { load } from "@/helpers/storage";

const state: IMusicStore = {
  sequenceList: [],
  playList: [],
  isPlaying: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  isFullScreen: false,
  favoritesList: load(STORAGE.favorites),
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
  /**
   * 设置收藏列表
   * @param state IMusicStore
   * @param favoritesList ISingerDetailsInfo[]
   */
  [SET_FAVORITES_LIST]: (
    state: IMusicStore,
    favoritesList: ISingerDetailsInfo[]
  ): void => {
    state.favoritesList = favoritesList;
  },
  /**
   * 设置歌曲的歌词
   * @param state IMusicStore
   * @param param1 { song: ISingerDetailsInfo; lyric: string; }
   */
  [ADD_SONG_LYRIC]: (
    state: IMusicStore,
    {
      song,
      lyric,
    }: {
      song: ISingerDetailsInfo;
      lyric: string;
    }
  ): void => {
    state.sequenceList.map((item) => {
      if (item.mid === song.mid) {
        item.lyric = lyric;
      }
      return item;
    });
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
  /**
   * 删除歌曲
   * @param {ActionContext<IMusicStore, IMusicStore>} context
   * @param {ISingerDetailsInfo} song
   * @returns
   */
  removeSong(
    context: ActionContext<IMusicStore, IMusicStore>,
    song: ISingerDetailsInfo
  ): void {
    const sequenceList = context.state.sequenceList.slice();
    const playList = context.state.playList.slice();
    const sequenceIndex = findIndex(sequenceList, song);
    const playIndex = findIndex(playList, song);

    console.log("sequenceIndex :>> ", sequenceIndex);
    console.log("playIndex :>> ", playIndex);

    if (sequenceIndex < 0 || playIndex < 0) {
      return;
    }

    sequenceList.splice(sequenceIndex, 1);
    playList.splice(playIndex, 1);

    let currentIndex = state.currentIndex;
    if (playIndex < currentIndex || currentIndex === playList.length) {
      currentIndex--;
    }

    context.commit(SET_SEQUENCE_LIST, sequenceList);
    context.commit(SET_PLAYLIST, playList);
    context.commit(SET_CURRENT_INDEX, currentIndex);
    if (!playList.length) {
      context.commit(SET_PLAYING_STATUE, false);
    }
  },
};

function findIndex(
  list: ISingerDetailsInfo[],
  song: ISingerDetailsInfo
): number {
  return list.findIndex((item) => item.id === song.id);
}

export default {
  state,
  getters,
  mutations,
  actions,
};
