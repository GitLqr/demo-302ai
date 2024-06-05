/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImgFile {
  path: string; //	本地文件路径
  size: number; // 本地文件大小，单位：B
  name?: string; // 包含扩展名的文件名称，仅H5支持
  type?: string; // 文件类型，仅H5支持
}
