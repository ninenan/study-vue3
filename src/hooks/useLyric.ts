/*
 * @Author: NineNan
 * @Date: 2021-06-23 22:46:19
 * @LastEditTime: 2021-06-23 23:20:22
 * @LastEditors: Please set LastEditors
 * @Description: useLyric
 * @FilePath: /study_vue03/src/hooks/useLyric.ts
 */
import { watch, computed, Ref } from "vue";
import { useStore } from "@/store";
import { getLyric } from "@/api/song";
import { ADD_SONG_LYRIC } from "@/helpers/constant";
import { ISingerDetailsInfo } from "@/types";

export default function useLyric(): void {
  const store = useStore();
  const currentSong: Ref<ISingerDetailsInfo> = computed(
    () => store.getters.currentSong
  );

  watch(currentSong, async (newCurrentSong: ISingerDetailsInfo) => {
    // 错误的歌曲直接return
    if (!newCurrentSong.url || !newCurrentSong.url) {
      return;
    }

    const lyric = await getLyric(newCurrentSong);
    store.commit(ADD_SONG_LYRIC, {
      song: newCurrentSong,
      lyric,
    });

    if (currentSong.value.lyric !== lyric) {
      return;
    }
  });
}
