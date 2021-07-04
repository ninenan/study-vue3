/*
 * @Author: NineNan
 * @Date: 2021-06-20 11:51:50
 * @LastEditTime: 2021-07-04 23:18:20
 * @LastEditors: Please set LastEditors
 * @Description: useMode 歌曲播放模式
 * @FilePath: /study_vue03/src/hooks/useMode.ts
 */
import { useStore } from "@/store/index";
import { computed, Ref } from "vue";
import { PLAY_MODE } from "@/types/index";

export interface IUseMode {
  modeIcon: Ref<string>;
  modeText?: Ref<string>;
  changeMode: () => void;
}

export default function useMode(): IUseMode {
  const store = useStore();
  const playMode = computed(() => {
    return store.state.music.playMode;
  });
  const modeIcon = computed(() => {
    const playModeValue = playMode.value;
    if (playModeValue === PLAY_MODE.loop) {
      return "icon-loop-play";
    }
    if (playModeValue === PLAY_MODE.random) {
      return "icon-random-play";
    }
    return "icon-sequence-play";
  });

  const modeText = computed(() => {
    const playModeValue = playMode.value;
    if (playModeValue === PLAY_MODE.loop) {
      return "循环播放";
    }
    if (playModeValue === PLAY_MODE.random) {
      return "随机播放";
    }
    return "顺序播放";
  });

  const changeMode = () => {
    const mode = (playMode.value + 1) % 3;
    store.dispatch("changeMode", mode);
  };
  return {
    modeIcon,
    modeText,
    changeMode,
  };
}
