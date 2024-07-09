import { defineStore } from 'pinia';

export const useEditorStore = defineStore('editor', {
  state: () => ({
    htmlContent: '<p>Initial content</p>',
  }),
  actions: {
    setHtmlContent(content) {
      this.htmlContent = content;
    },
  },
});

