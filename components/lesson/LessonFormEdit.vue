<template>


      <div class="middle-content container-xxl p-0 mb-4">
        <div class="row layout-top-spacing">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="widget-content widget-content-area br-8 p-4">
                  <div class="widget-header">
                    <div class="row">
                      <div class="col-xl-10 col-sm-12 col-10">
                        <h4>{{ $t("lesson_head_edit") }}</h4>
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
                  {{cs_id}}
                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <label for="inputEmail4" class="form-label">
                        {{ $t("lesson_qui_lo") }}</label
                      ><span class="text-xs text-red-500" style="color: red">
                        *
                      </span>

                      <div class="col-md-12 mt-3">
                        <input
                          type="text"
                          class="form-control"
                          id="inputEmail4"
                          placeholder="ຄໍາຖາມ(Lo) *"
                          v-model="FormcreateEditlesson.cs_name_lo"
                          maxlength="20"
                          @input="validateField('cs_name_lo')"
                        />
                        <span
                          v-if="formErrors.cs_name_lo != true"
                          style="color: red"
                          >{{ formErrors.cs_name_lo }}</span
                        >

                        
                      </div>
                    </div>

                    <div class="col-md-12 mt-3">
                      <label for="inputEmail4" class="form-label">
                        {{ $t("lesson_qui_en") }}</label
                      ><span class="text-xs text-red-500" style="color: red">
                        *
                      </span>

                      <div class="col-md-12 mt-3">
                        <input
                          type="text"
                          class="form-control"
                          id="inputEmail4"
                          placeholder="ຄໍາຖາມ (En) *"
                          v-model="FormcreateEditlesson.cs_name_eng"
                          maxlength="20"
                          @input="validateField('cs_name_eng')"
                        />
                        <span
                          v-if="formErrors.cs_name_eng != true"
                          style="color: red"
                          >{{ formErrors.cs_name_eng }}</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <label for="inputEmail4" class="form-label">
                        {{ $t("lesson_answer_lo") }}</label
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
                      <span
                        v-if="formErrors.cs_description != true"
                        style="color: red"
                        >{{ formErrors.cs_description }}</span
                      >
                    </div>
                  </div>

                  <div class="col-md-12 mt-3">
                    <label for="inputEmail4" class="form-label">
                      {{ $t("lesson_group") }}</label
                    ><span class="text-xs text-red-500" style="color: red">
                      *
                    </span>

                    <div class="col-md-12 mt-3">
                      <v-select
                        v-model="store.formcreatelessonedit.cg_id"
                        :options="Group"
                        label="cg_name_lo"
                        placeholder="ເລືອກ"
                      ></v-select>
                      <span v-if="formErrors.cg_id" style="color: red">{{
                        formErrors.cg_id
                      }}</span>
                    </div>
                  </div>

                  <div class="col-md-12 mt-3">
                    <label for="inputEmail4" class="form-label">
                      {{ $t("lesson_yout") }}</label
                    >
                    <div class="col-md-12 mt-3">
                      <input
              type="text"
              class="form-control"
              id="recipient-name"
              v-model="store.cs_video"
              placeholder="https://youtu.be/DCh2jlZzC1g *"
              maxlength="100"
            />
                     
                    </div>
                  </div>

                  <!-- <div class="row">
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
                  </div> -->

                  <div class="form-group">
                    <input
                      type="file"
                      title=" - "
                      class="form-control-file"
                      id="exampleFormControlFilePdf"
                      @change="onFileChangeBackPdf"
                      ref="fileInputRef"
                      style="display: none"
                      accept=".pdf"
                    />
                  </div>

                  <div class="form-group p-2 mt-3">
                    <button class="btn btn-warning" @click="openFileInput">
                      {{ $t("menu_couse_f_title_pdf") }}
                    </button>
                  </div>

                  <div
                    class="row mb-4 g-3"
                    v-if="store.selectedFiles.length > 0"
                  >
                    <div class="table-responsive">
                      <table class="table table-hover table-bordered">
                        <thead>
                          <tr>
                            <th class="checkbox-area" scope="col">
                              <div class="form-check form-check-primary">
                                {{ $t("lesson_select_record") }}
                              </div>
                            </th>
                            <th>File Name</th>
                            <!-- <th>File Size</th>
          <th>Type</th> -->
                            <th>Manage</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            v-for="(file, index) in store.selectedFiles"
                            :key="index"
                          >
                            <td>{{ index + 1 }}</td>
                            <td>{{ file.name }}</td>
                            <!-- <td>{{ formatBytes(file.size) }}</td>
          <td>{{ file.type }}</td> -->
                            <td>
                              <div class="action-btns">
                                <a
                                  href="javascript:void(0);"
                                  class="action-btn btn-delete bs-tooltip"
                                  @click="remove(index)"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  aria-label="Delete"
                                  data-bs-original-title="Delete"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-trash-2"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                    ></path>
                                    <line
                                      x1="10"
                                      y1="11"
                                      x2="10"
                                      y2="17"
                                    ></line>
                                    <line
                                      x1="14"
                                      y1="11"
                                      x2="14"
                                      y2="17"
                                    ></line>
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {{ formErrors }}
                  <div class="form-group mb-4 mt-3">
      <label for="exampleFormControlFile1">{{ $t("menu_couse_f_title_picture") }}</label>
      <input
        type="file"
        class="form-control-file"
        id="exampleFormControlFile1"
        @change="onFileChangeBack"
        ref="fileupload"
        accept="image/png, image/jpeg" 
      />
    </div>



 
 {{ store.formcreatelessonedit }}

                    
 <span
                        v-if="formErrors.cs_cover != true"
                        style="color: red"
                        >{{ formErrors.cs_cover }}</span
                      >
   
  <div class="border p-2 mt-3">
        <p>{{ $t("menu_couse_f_title_display_picture") }}:</p>
        <template v-if="store.formcreatelesson.cs_cover">
          <div class="row">
            <div id="image-container" class="col-md-3 col-sm-4 col-6">
              <div class="image-wrapper">
                <img  :src="coverimage(store.formcreatelesson.cs_cover)" class="img-fluid" />
                <button @click="removeImage()" class="delete-button"><i class="bi bi-x-lg"></i></button>
              </div>
            </div>
          </div>
        </template>

        
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
import ApiService  from "../../services/api.service";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
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
  Underline,
  Undo,
  FontBackgroundColor,
  FontColor,
} from "ckeditor5";
import { SlashCommand } from "ckeditor5-premium-features";
import { useVuelidate } from "@vuelidate/core";
import { storeToRefs } from "pinia";
import {
  required,
  email,
  sameAs,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { defineComponent, computed, reactive } from "vue";
import { LessonStore } from "@/store/lesson";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { useToast } from "vue-toastification";

export default defineComponent({
  components: {
    ckeditor: CKEditor.component,
    "v-select": vSelect,
  },
  props: {
    cs_id: {
      type: String,
      required: true
    }
  },

  setup() {
    const store = LessonStore();
    const { locale, setLocale } = useI18n();
    const toast = useToast();
    const editorConfig = {
      plugins: [
        Style,
        Bold,
        Essentials,
        Italic,
        Mention,
        Paragraph,
        Undo,
        Table,
        Font,
        FontBackgroundColor,
        Autoformat,
        Code,
        Link,
        AutoImage,
        RemoveFormat,
        Heading,
        FontColor,
        SourceEditing,
        TableCaption,
        GeneralHtmlSupport,
        FindAndReplace,
        HorizontalLine,
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
        ImageCaption,
        ShowBlocks,
        Indent,
        IndentBlock,
      ],
      toolbar: [
        "heading",
        "fontfamily",
        "fontsize",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "code",
        "|",
        "alignment",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "indent",
        "outdent",
        "|",
        "blockQuote",
        "insertTable",
        "|",
        "link",
        "mediaEmbed",
        "|",
        "undo",
        "redo",
        "|",
        "imageInsert",
        "removeFormat",
        "|",
        "subscript",
        "superscript",
        "sourceEditing",
      ],
      image: {
        toolbar: [
          "imageTextAlternative",
          "imageStyle:full",
          "imageStyle:side",
          "imageInsert",
        ],
      },
      fontFamily: {
        options: [
          "Phetsarath OT",
          "default",
          "Arial, Helvetica, sans-serif",
          "Courier New, Courier, monospace",
          "Georgia, serif",
          "Lucida Sans Unicode, Lucida Grande, sans-serif",
          "Tahoma, Geneva, sans-serif",
          "Times New Roman, Times, serif",
          "Trebuchet MS, Helvetica, sans-serif",
          "Verdana, Geneva, sans-serif",
        ],
        supportAllValues: true,
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
      fontSize: {
        options: [10, 12, 14, 16, 18, 20, 22],
        supportAllValues: true,
      },
    };

    const editor = ClassicEditor;

    const content = store.EdithtmlContent; // assuming you have htmlContent in your store
    const content2 = store.EdithtmlContent; // assuming you have htmlContent in your store

    const onReadyTh = (editorInstance) => {
      editorInstance.model.document.on("change:data", () => {
        store.setHtmlContent2(editorInstance.getData());
      });
    };
    
    const onReadyLo = (editorInstance) => {
      editorInstance.model.document.on("change:data", () => {
        store.setHtmlContent(editorInstance.getData());
      });
    };

    const FormcreateEditlesson = computed(() => store.formcreatelessonedit);
    const rules = computed(() => store.rules);

    const Group = store.group;

    const Mygroup = store.myselect_group; // assuming you have htmlContent in your store

    const formErrors = reactive({
      cs_cover:"",
      cs_name_lo: "",
      cs_name_eng: "",
      cs_description: "",
      cg_id: "",
    });

    const validateField = (field) => {
      const validators = rules.value[field];
      formErrors[field] =
        validators
          .map((validator) => validator(store.formcreatelessonedit[field]))
          .find((error) => error) || "";
          
    };

    const validateAllFields = () => {
      Object.keys(FormcreateEditlesson.value).forEach((field) =>
        validateField(field)
      );
    };
   
    const savedata = async () => {
    validateAllFields();
    if (formErrors.cs_name_lo == true  && formErrors.cs_name_eng == true && formErrors.cg_id == true && formErrors.cs_cover == true  && formErrors.cs_description == true) {
      let uploadimage = await store.UploadfileLesson();   ///upload File รูป
      let uploadfile = await store.UploadfileLessonPdf();   ///upload File รูป
      let save = await store.saveformLesson();
      if(save == true){
      toast.success("ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ");
      store.ResetForm();
      formErrors.cs_name_lo = "";
      formErrors.cs_name_eng = "";
      formErrors.cg_id = "";
      formErrors.cs_description = "";
      formErrors.cs_cover = "";
      }else {
        toast.error('ລົ້ມເຫລວໃນການບັນທຶກຂໍ້ມູນ')
      }
    
      
      }
    };

    const onFileChangeBackPdf = async (event) => {
      Swal.fire({
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      var input = event.target;
      if (event.target.files.length > 0) {
        store.selectedFiles = [];
        for (var i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          if (file && file.type.startsWith("application/pdf")) {
            store.selectedFiles.push(event.target.files[i]);
          } else {
            store.selectedFilesError.push(event.target.files[i]);
          }
        }
      }

      setTimeout(() => Swal.close(), 500);
    };

    const fileInputRef = ref(null);
    const openFileInput = async () => {
      // fileInputRef.value.click();
      if (fileInputRef.value) {
        fileInputRef.value.click();
      }
    };

    const remove = async (e) => {
      store.selectedFiles = [];
    };


    const onFileChangeBack = async (event) => {
  var input = event.target;
  const file = event.target.files[0];
  const idxDot = file.name.lastIndexOf(".") + 1;
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const extFile = file.name.substr(idxDot, file.name.length).toLowerCase();

if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            //TO DO
            const reader = new FileReader();
    reader.onload = () => {
      //  this.imageUrl = reader.result;
      store.formcreatelesson.cs_cover = reader.result;
    };
    store.imagelist = input.files[0];
    reader.readAsDataURL(file);
} else {
          
  const input = document.querySelector('input[type="file"]');
  input.value = "";
    Swal.fire({
      text: 'Upload File Image PNG JPG!',
      icon: 'error',
    });
 }

};


function coverimage(i) {
  let result = i.slice(0, 6);
  if (result === "static") {
    let im = ApiService.image(i);
    return im;
  } else {
    return i;
  }
}


    return {
      editor,
      editorConfig,
      content,
      content2,
      savedata,
      onReadyTh,
      onReadyLo,
      formErrors,
      Mygroup,
      rules,
      FormcreateEditlesson,
      validateField,
      Group,
      vSelect,
      store,
      onFileChangeBackPdf,
      openFileInput,
      fileInputRef,
      remove,
      onFileChangeBack,coverimage,locale
    };
  },
});
</script>