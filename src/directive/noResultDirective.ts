/*
 * @Author: NineNan
 * @Date: 2021-06-05 22:53:07
 * @LastEditTime: 2021-06-05 22:58:57
 * @LastEditors: Please set LastEditors
 * @Description: noResultDirective
 * @FilePath: /study_vue03/src/directive/noResultDirective.ts
 */
import BaseNoResult from "@/components/base/BaseNoResult/BaseNoResult.vue";
import useCreateLoadingLikeDirective from "@/hooks/useCreateLoadingLikeDirective";

const noResultDirective = useCreateLoadingLikeDirective(BaseNoResult);

export default noResultDirective;
