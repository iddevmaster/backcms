<template>
  <div id="content" class="main-content">
    <div class="layout-px-spacing">
      <div class="page-meta">
        <nav class="breadcrumb-style-one" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#"> {{ $t("lesson_head") }} </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("lesson_head_add") }}
            </li>
          </ol>
        </nav>
      </div>

      <div class="middle-content container-xxl p-0 mb-4">
        <div class="row layout-top-spacing">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-4">
                  <div class="widget-header">
                    <div class="row">
                      <div class="col-xl-10 col-sm-12 col-10">
                        <h4>{{ $t("lesson_head_add") }}</h4>
                      </div>
                      <div
                        class="col-xl-2 col-sm-12 col-12"
                        style="text-align: center"
                      >
                        <button
                          type="button"
                          class="btn btn-primary additem _effect--ripple waves-effect waves-light bt-back-mo"
                          @click="backtoLean()"
                        >
                          {{ $t("backto_lean") }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <label for="inputEmail4" class="form-label">
                        {{ $t("menu_couse_f_title_code") }}</label
                      ><span class="text-xs text-red-500" style="color: red">
                        *
                      </span>

                      <div class="col-md-12 mt-3">
                        <ckeditor
                          :editor="editor"
                          v-model="content"
                          :config="editorConfig"
                            @ready="onReadyLo"
                        ></ckeditor>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <label for="inputEmail4" class="form-label">
                        {{ $t("menu_couse_f_title_code") }}</label
                      ><span class="text-xs text-red-500" style="color: red">
                        *
                      </span>

                      <div class="col-md-12 mt-3">
                        <ckeditor
                          :editor="editor"
                          v-model="content2"
                          :config="editorConfig"
                        @ready="onReadyTh"
                        ></ckeditor>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="savedata()"
                      >
                        {{ $t("menu_couse_f_save") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Bootstrap 4 styling for CKEditor content area */
.ck.ck-editor__editable {
  min-height: 200px; /* Example height */
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
</style>



<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import {
	ClassicEditor,
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	BlockQuote,
	Bold,
	Base64UploadAdapter,
	CloudServices,
	Code,
	CodeBlock,
	CKBox,
	Essentials,
	FindAndReplace,
	Font,
	GeneralHtmlSupport,
	Heading,
	HorizontalLine,
	HtmlEmbed,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	Mention,
	PageBreak,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	RemoveFormat,
	ShowBlocks,
	SourceEditing,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextPartLanguage,
	TextTransformation,
	TodoList,
	Underline,Undo,FontBackgroundColor,FontColor
} from 'ckeditor5';
import { SlashCommand } from 'ckeditor5-premium-features';


import { defineComponent, computed } from "vue";
import { LessonStore } from "@/store/lesson";

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export default defineComponent({
  
  components: {
    ckeditor: CKEditor.component,
  },
  

  setup() {
    const store = LessonStore();

    const editorConfig = {
      plugins: [	Style, Bold, Essentials, Italic, Mention, Paragraph, Undo ,Table, Font,FontBackgroundColor,Autoformat,Code,Link,AutoImage,RemoveFormat,Heading,
      FontColor,SourceEditing,TableCaption,	GeneralHtmlSupport,	FindAndReplace,HorizontalLine,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextPartLanguage,
	TextTransformation,
	TodoList,
  Strikethrough,
	Subscript,
	Superscript,
  MediaEmbed,
  PageBreak,
  Image,
  ImageInsert,
  ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
  HtmlEmbed,
  PasteFromOffice,
	PictureEditing,
  Underline,
  AutoLink,
	BlockQuote,
  Alignment,
  Base64UploadAdapter,
	CloudServices,
  LinkImage,
	List,
	ListProperties,
  CodeBlock,
	CKBox,
  ImageCaption,	ShowBlocks,	Indent,
	IndentBlock,
  
    ],
      toolbar: ['heading',
      'fontfamily',
      'fontsize',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      '|',
      'alignment',
      '|',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'blockQuote',
      'insertTable',
      '|',
      'link',
      'mediaEmbed',
      '|',
      'undo',
      'redo',
      '|',
      'imageInsert',
      'removeFormat',
      '|',
      'subscript',
      'superscript','sourceEditing',
       ],
      image: {
        toolbar: [
          'imageTextAlternative',
          'imageStyle:full',
          'imageStyle:side',
          'imageInsert'
        ]
      },
      fontFamily: {
        options: [
            'Phetsarath OT',
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
         
        ],
        supportAllValues: true
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
    fontSize: {
        options: [ 10, 12, 14, 16, 18, 20, 22 ],
        supportAllValues: true
    },
    };

    const editor = ClassicEditor;

    const content = store.htmlContent; // assuming you have htmlContent in your store
    const content2 = store.htmlContent2; // assuming you have htmlContent in your store


    const savedata = () => {
      console.log(content2); // Save content logic
    };


const onReadyTh = (editorInstance) => {
  editorInstance.model.document.on('change:data', () => {
    store.setHtmlContent2(editorInstance.getData());
  });
};

const onReadyLo = (editorInstance) => {
  editorInstance.model.document.on('change:data', () => {
    store.setHtmlContent(editorInstance.getData());
  });
};
    return {
      editor,
      editorConfig,
      content,
      content2,
      savedata,
      onReadyTh,
      onReadyLo,
    };
  },

 
});

</script>