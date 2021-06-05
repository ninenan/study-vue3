/*
 * @Author: NineNan
 * @Date: 2021-05-23 19:39:44
 * @LastEditTime: 2021-06-05 22:49:04
 * @LastEditors: Please set LastEditors
 * @Description: loadingDirective
 * @FilePath: /study_vue03/src/directive/loadingDirective.ts
 */
import Loading from "@/components/base/loading/Loading.vue";
import useCreateLoadingLikeDirective from "@/hooks/useCreateLoadingLikeDirective";

const loadingDirective = useCreateLoadingLikeDirective(Loading);

export default loadingDirective;
