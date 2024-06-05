export function get<T>(url: string, params: object, header = {}): Promise<T> {
  return request(url, params, "GET", header);
}

export function postJson<T>(
  url: string,
  params: object,
  header = {}
): Promise<T> {
  // 默认 content-type 就是 application/json
  return request(url, params, "POST", header);
}

export function postForm<T>(
  url: string,
  params: object,
  header = {}
): Promise<T> {
  Object.assign(header, {
    "content-type": "application/x-www-form-urlencoded",
  });
  return request(url, params, "POST", header);
}

export function request<T>(
  url: string,
  params: object,
  method:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT"
    | undefined,
  header: {}
): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: handleParams(params),
      header: header,
      // header: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      //   "X-Requested-With": "XMLHttpRequest",
      // },
      method: method,
      // sslVerify: true,
      success: ({ data, statusCode, header }) => {
        if (statusCode === 200) {
          resolve(data as T);
        } else {
          reject("request err, statusCode is " + statusCode);
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}

/**
 * 小程序请求参数null或undefined到后台变成字符串处理
 * https://blog.csdn.net/weixin_48877974/article/details/126060336
 * @param params
 * @returns
 */
function handleParams(params: any): any {
  if (typeof params == "object") {
    for (let key of Object.keys(params)) {
      if (params[key] == null || params[key] == undefined) {
        delete params[key];
      }
      if (params[key] instanceof Array) {
        const arr = [];
        const list = params[key];
        for (let listElement of list) {
          const abj = handleParams(listElement);
          abj && arr.push(abj);
        }
        params[key] = arr;
      }
    }
  }
  return params;
}
