/*
 * @Author: NineNan
 * @Date: 2021-07-01 11:25:23
 * @LastEditTime: 2021-07-01 11:26:43
 * @LastEditors: Please set LastEditors
 * @Description: useTeleportNode
 * @FilePath: \study-vue3\src\hooks\useTeleportNode.ts
 */

export default function useTeleportNode(nodeName: string) {
  const node = document.createElement("div");
  node.id = nodeName;
  document.body.appendChild(node);

  return {
    node,
  };
}
