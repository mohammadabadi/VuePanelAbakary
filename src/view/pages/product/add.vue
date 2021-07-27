<template>
  <div class="row">
    <div class="col-12">
      <div class="card card-custom gutter-b">
        <div class="card-header">
          <div class="card-title">
            <h3 class="card-label">افزودن محصولات</h3>
          </div>
        </div>
        <div class="card-body">
          <div class="pt-3 pb-3">
            <b-form
              class="w-100"
              @submit="onSubmit"
              @reset="onReset"
              v-if="show"
            >
              <div class="row">
                <div class="col-12 col-sm-12 col-md-6">
                  <b-form-group
                    id="input-group-1"
                    label="عنوان محصول:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.current.productName"
                      type="text"
                      required
                      placeholder="عنوان محصول را وارد کنید"
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-12 col-sm-12 col-md-6">
                  <b-form-group
                    id="input-group-1"
                    label="دسته محصول:"
                    label-for="input-1"
                  >
                    <b-form-select v-model="categorySelect" class="mb-3">
                      <option :value="null">دسته محصول را انتخاب کنید</option>
                      <option
                        v-for="item in categoryOptions"
                        :key="item.id"
                        v-bind:value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </b-form-select>
                  </b-form-group>
                </div>

                <div class="col-12 col-sm-12 col-md-6">
                  <b-form-group
                    id="input-group-2"
                    label="وزن (گرم):"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="form.current.weight"
                      type="number"
                      required
                      placeholder="وزن محصول(گرم) را وارد کنید"
                    ></b-form-input>
                  </b-form-group>
                </div>
                 <div class="col-12 col-sm-12 col-md-6">
                  <b-form-group
                    id="input-group-2"
                    label="شناسه یا کد محصول:"
                    label-for="input-3"
                  >
                    <b-form-input
                      id="input-3"
                      v-model="form.current.productCode"
                      type="text"
                      required
                      placeholder="شناسه یا کد محصول را وارد کنید"
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-12 col-sm-12 col-md-12">
                  <b-form-file
                    v-model="selectedFile"
                    class="mt-4"
                    plain
                    @change="onSelectImage"
                  ></b-form-file>
                  <b-button class="mt-2 mb-2" @click="uploadImage" variant="primary"
                    >
                    <i class="menu-icon flaticon-upload"></i>آپلود</b-button
                  >
                </div>
                <div class="img-box-upload col-12 mt-1 mr-4 ml-4 mb-4 p-4">
                   <img class="image-upload" v-if="showImg" v-bind:src="'http://'+imageLinkUpload" alt="" />
                </div>
                <div class="col-12 col-sm-12 col-md-6 mb-4">
                  <b-form-textarea
                    id="textarea"
                    v-model="form.current.description"
                    placeholder="توضیحات محصول را وارد کنید"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </div>
                <div class="col-12 col-sm-12 col-md-6 mb-4">
                  <b-form-textarea
                    id="textarea-1"
                    v-model="form.current.seoKeywords"
                    placeholder="کلمات کلیدی محصول ..."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </div>
                <hr />
                <div class="w-100 text-center">
                  <b-button
                    class="m-2 float-left"
                    type="submit"
                    variant="success"
                    >
                    <i class="la la-check"></i>
                    ذخیره</b-button
                  >
                  <b-button class="m-2 float-left" type="reset" variant="danger"
                    >
                    <i class="la la-close"></i>
                    پاک کردن فرم</b-button
                  >
                </div>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
#preview {
  max-width: 300px;
  width: 300px;
  display: inline-block;
}
#prevuew img {
  max-width: 100%;
}
.image-upload{
  width: 300px;
  max-height: 300px;
  object-fit: contain;
  border-radius: 5px;
}
.img-box-upload{
    max-height: 400px;
    background: rgb(240 241 249 / 36%);
    border: 2px dashed #e4e6ef;
    border-radius: 5px;
    min-height: 100px;
    max-width: 98%;
}
</style>
<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Swal from "sweetalert2";
//import axios from "axios";
import ApiService from "@/core/services/api.service";
export default {
  data() {
    return {
      items: {},
      categorySelect: null,
      categoryOptions: [],
      selectedFile: null,
      imageLinkUpload: "",
      showImg:false,
      form: {
        current: {
          published: true,
          id: 0,
          shopId: 1,
          categoryId: null,
          productCode: "",
          productName: "",
          description: "",
          seoKeywords: "",
          link: "",
          weight: null,
        },
        images: [
          {
            published: true,
            id: 0,
            imageLink: "",
          },
        ],
      },
      show: true,
    };
  },
  name: "addProduct",
  components: {},
  methods: {
    getCategory(evt) {
      return new Promise((resolve) => {
        ApiService.setHeader();
        ApiService.post("Category/GetCategories?ShopId=1")
          .then(({ data }) => {
            this.categoryOptions = data.value;
          })
          .catch(({ response }) => {
            Swal.fire({
              title: "",
              text: "اشکال در بارگزاری دسته های محصول",
              icon: "error",
            });
          });
      });
    },
    onSelectImage(evt) {
      this.selectedFile = evt.target.files[0];
      //console.log(this.categorySelect);
    },
    uploadImage() {
      const fd = new FormData();
      fd.append("files", this.selectedFile, this.selectedFile.name);
      return new Promise((resolve) => {
        ApiService.setHeader();
        ApiService.post("FileTransfer/FileUpload?Directory=TestUpload", fd)
          .then(({ data }) => {
            Swal.fire({
              title: "",
              text: "آپلود با موفقیت انجام شد",
              icon: "success",
            });
            this.imageLinkUpload = data.value.url;
            this.showImg = true;
          })
          .catch(({ response }) => {
            Swal.fire({
              title: "",
              text: "لطفا مجدد امتحان کنید",
              icon: "error",
            });
          });
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.form.images[0].imageLink = this.imageLinkUpload;
      this.form.current.categoryId = this.categorySelect;
      this.form.current.weight = parseInt(this.form.current.weight);
      return new Promise((resolve) => {
        ApiService.setHeader();
        ApiService.post("Product/Add", this.form)
          .then(({ data }) => {
            Swal.fire({
              title: "",
              text: "محصول با موفقیت افزوده شد",
              icon: "success",
            });
            // setTimeout(this.onReset(), 5000);
            // if (data.statusCode == 200){
            //   return data;
            // }
          })
          .catch(({ response }) => {
            Swal.fire({
              title: "",
              text: "افزودن محصول با خطا مواجه شد،لطفا مجدد لحظاتی بعد مجدد سعی کنید.",
              icon: "error",
            });
          });
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.current.productName = "";
      this.form.current.description = "";
      this.form.current.categoryId = "";
      this.form.current.productCode = "";
      this.form.current.seoKeywords = "";
      this.form.images.imageLink = "";
      this.form.current.published = [];
      this.form.images.published = [];
      this.imageLinkUpload = "";
      this.form.current.weight= null,
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "محصولات", route: "add" },
      { title: "افزودن" },
    ]);
    this.getCategory();
  },
};
</script>
