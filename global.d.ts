import type { IStaticMethods } from "flyonui/flyonui";

declare global {
  interface Window {
    _: any;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable: any;
    Dropzone: any;
    HSStaticMethods: IStaticMethods;
  }
}
export {};
