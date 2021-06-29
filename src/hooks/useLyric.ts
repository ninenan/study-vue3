/*
 * @Author: NineNan
 * @Date: 2021-06-23 22:46:19
 * @LastEditTime: 2021-06-29 11:09:22
 * @LastEditors: Please set LastEditors
 * @Description: useLyric
 * @FilePath: /study_vue03/src/hooks/useLyric.ts
 */
import { watch, computed, Ref, ref, HtmlHTMLAttributes } from "vue";
import { useStore } from "@/store";
import { getLyric } from "@/api/song";
import { ADD_SONG_LYRIC } from "@/helpers/constant";
import { ISingerDetailsInfo } from "@/types";
import Lyric from "lyric-parser";
// import IBScroll from "@better-scroll/core/dist/types/index";

export interface IUseLyric {
  currentLyric: Ref<null>;
  currentLineNum: Ref<number>;
  lyricScrollRef: Ref<any | null>;
  lyricListRef: Ref<HTMLElement | null>;
  pureMusicLyric: Ref<string>;
  playingLyric: Ref<string>;
}

export default function useLyric(
  isSongReady: Ref<boolean>,
  currentTime: Ref<number>
) {
  const store = useStore();
  const currentLyric = ref<any | null>(null);
  const currentLineNum = ref(0);
  const lyricScrollRef = ref<any | null>(null);
  const lyricListRef = ref<HTMLElement | null>(null);
  const pureMusicLyric = ref("");
  const playingLyric = ref(""); // 当前正在播放的歌词

  const currentSong: Ref<ISingerDetailsInfo> = computed(
    () => store.getters.currentSong
  );

  watch(currentSong, async (newCurrentSong: ISingerDetailsInfo) => {
    // 错误的歌曲直接return
    if (!newCurrentSong.url || !newCurrentSong.url) {
      return;
    }

    stopLyric();
    currentLyric.value = null;
    currentLineNum.value = 0;
    pureMusicLyric.value = "";
    playingLyric.value = "";

    const lyric = await getLyric(newCurrentSong);
    store.commit(ADD_SONG_LYRIC, {
      song: newCurrentSong,
      lyric,
    });

    if (currentSong.value.lyric !== lyric) {
      return;
    }

    currentLyric.value = new Lyric(lyric, handleLyric);
    const isHasLyric = currentLyric.value.lines.length;
    if (isHasLyric) {
      if (isSongReady.value) {
        playLyric();
      }
    } else {
      pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, "");
    }
  });
  /**
   * 滚动歌词
   * @param
   */
  const handleLyric = ({ lineNum, txt }: any) => {
    currentLineNum.value = lineNum;

    // const scrollCom = lyricScrollRef.value as {
    //   scroll: IBScroll;
    // };
    const scrollCom = lyricScrollRef.value;
    const listEl = lyricListRef.value;
    playingLyric.value = txt;

    if (!listEl) {
      return;
    }
    if (lineNum > 5) {
      const lineEl = listEl?.children[lineNum - 5];
      scrollCom.scroll.scrollToElement(lineEl, 1000);
    } else {
      scrollCom.scroll.scrollTo(0, 0, 1000);
    }
  };
  /**
   * 播放歌词
   */
  const playLyric = () => {
    const currentLyricValue = currentLyric.value;
    if (currentLyricValue) {
      currentLyricValue.seek(currentTime.value * 1000);
    }
  };
  /**
   * 暂停播放歌词
   */
  const stopLyric = () => {
    const currentLyricValue = currentLyric.value;
    if (currentLyricValue) {
      currentLyricValue.stop();
    }
  };

  return {
    currentLyric,
    currentLineNum,
    lyricScrollRef,
    lyricListRef,
    pureMusicLyric,
    playingLyric,
    stopLyric,
    playLyric,
  };
}
