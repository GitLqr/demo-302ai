import * as http from "./http";

const API_KEY = "Bearer sk-lYksXcSpPbeArbV9oUKPZsp6q9gnvyf0d1Ra7fRV49i5zMjf";

const ai302Header = {
  Authorization: API_KEY,
};

/**
 * 302.AI的API，来自于我们在云GPU上自己部署的模型。部分模型为开源模型，部分模型为我们自己微调或开发的。
 * 当一个任务超过30s没有完成，接口会自动返回任务id，请将id传递到这个接口，通过这个接口来获取任务结果。
 * 价格：0 PTC/次
 * @param id
 */
export function fetchTaskResult(id: string): Promise<AiTaskResult> {
  return http.get(`https://api.302.ai/302/task/${id}/fetch`, {}, ai302Header);
}

/**
 * 302.AI的API，来自于我们在云GPU上自己部署的模型。部分模型为开源模型，部分模型为我们自己微调或开发的。
 * 背景消除。来自于：https://github.com/hustvl/ViTMatte
 * 平均运行时长5-15s
 * 价格：0.01 PTC/次
 * @param imgFile
 * @returns
 */
export function removeBg(imgFile: ImgFile): Promise<AiTaskResult> {
  const filePath = imgFile.path;
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `https://api.302.ai/302/submit/removebg`,
      fileType: "image",
      filePath: filePath,
      header: ai302Header,
      name: "image",
      formData: {},
      success: (res: { data: any; statusCode: number }) => {
        const code = res.statusCode;
        if (code >= 200 && code < 400) {
          resolve(JSON.parse(res.data));
        } else {
          reject(`upload fail, statusCode = ${code}`);
        }
      },
      fail: (err) => reject(err),
    });
  });
}
