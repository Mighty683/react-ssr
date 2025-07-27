import { h, hydrate as hydrateVue } from "vue";

export const hydrate = async (element: HTMLElement, data?: Record<string, string>) => {
  const MfApp = await import("./App.vue");
  const node = h(MfApp.default, {
    serverData: data || {},
  });
  // @ts-ignore
  hydrateVue(node, element);
};
