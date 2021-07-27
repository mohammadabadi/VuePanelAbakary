<template>
  <div class="row">
    <div class="col-12">
      <div class="card card-custom gutter-b">
        <div class="card-header">
          <div class="card-title">
            <h3 class="card-label">دسته بندی</h3>
          </div>
          <div class="card-title float-left">
            <b-button variant="primary" v-b-modal.modal-1> <i class="la la-plus"></i>افزودن دسته</b-button>

            <b-modal hide-footer id="modal-1" title="افزودن دسته بندی محصول">
              <div class="p-4">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <b-form-group
                    id="input-group-1"
                    label="عنوان دسته:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="عنوان دسته را وارد کنید"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    id="input-group-2"
                    label="گروه:"
                    label-for="input-2"
                  >
                    <b-form-select v-model="groupSelect"  id="input-2">
                      <option :value="null">گروه را انتخاب کنید</option>
                      <option
                        v-for="item in groupOptions"
                        :key="item.id"
                        v-bind:value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </b-form-select>
                  </b-form-group>
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="fatherStatus"
                    name="checkbox-1"
                    value= true
                    unchecked-value= false
                    class="mb-3"
                  >
                    دسته پدر نمی باشد
                  </b-form-checkbox>
                   <b-form-group
                    id="input-group-3"
                    label="دسته پدر:"
                    label-for="input-3"
                    v-show="fatherStatus"
                  >
                    <b-form-select v-model="fatherSelect" class="mb-3" id="input-3">
                      <option :value="null">دسته پدر را انتخاب کنید</option>
                      <option
                        v-for="item in fatherOptions"
                        :key="item.id"
                        v-bind:value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </b-form-select>
                  </b-form-group>
                  <b-form-textarea
                    id="textarea"
                    v-model="form.description"
                    placeholder="توضیحات دسته در صورت لزوم ..."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                  <!-- <div class="pt-4 pb-4">
                    <b-form-group id="input-group-4">
                      <b-form-checkbox-group
                        v-model="form.published"
                        id="checkboxes-4"
                      >
                        <b-form-checkbox value="false"
                          >عدم نمایش دسته</b-form-checkbox
                        >
                      </b-form-checkbox-group>
                    </b-form-group>
                  </div> -->
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
                </b-form>
              </div>
            </b-modal>
          </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
              <table
                class="table table-head-custom table-head-bg table-borderless table-vertical-center"
              >
                <thead>
                  <tr class="text-right text-uppercase">
                    <th class="text-center">ردیف</th>
                    <th class="text-center">عنوان دسته</th>
                    <th class="text-center">دسته پدر</th>
                    <th class="text-center">شناسه فروشگاه</th>
                    <th class="text-center">گروه</th>
                     <th class="text-center">توضیحات</th>
                    <th class="text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center" v-for="item in items" :key="item.id">
                    <td>
                      {{ item.id }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.categoryFatherName }}
                    </td>
                    <td>
                      {{ item.shopId }}
                    </td>
                    <td>
                      {{ item.groupName }}
                    </td>
                    <td>
                      {{ item.description }}
                    </td>
                    <td>
                      <!-- <a
                        @click="showEditModal(item.id)"
                        class="btn btn-icon btn-light btn-sm mx-3"
                        id="toggle-modal"
                      >
                        <span class="svg-icon svg-icon-md svg-icon-primary">
                         
                          <inline-svg
                            src="media/svg/icons/Communication/Write.svg" title="ویرایش"
                          ></inline-svg>
      
                        </span>
                      </a> -->
                      <b-modal hide-footer hide-header-close
                        :ref="'my-modal'+ item.id" 
                        title="ویرایش دسته بندی محصول"
                      >
                        <div class="p-4">
                          <b-form
                            @submit="onSubmitEdit()"
                            @reset="hideModal(item.id)"
                            v-if="show"
                          >
                            <b-form-group
                              id="input-group-1"
                              label="عنوان دسته:"
                              label-for="input-1"
                            >
                              <b-form-input
                                id="input-1"
                                v-model="item.name"
                                type="text"
                                required
                                placeholder="عنوان دسته را وارد کنید"
                              ></b-form-input>
                            </b-form-group>
                            <b-form-group
                              id="input-group-1"
                              label="گروه:"
                              label-for="input-1"
                            >
                              <b-form-select v-model="groupSelect" class="mb-3">
                                <option :value="null">گروه را انتخاب کنید</option>
                                <option
                                  v-for="item in groupOptions"
                                  :key="item.id"
                                  v-bind:value="item.id"
                                >
                                  {{ item.name }}
                                </option>
                              </b-form-select>
                            </b-form-group>
                            <b-form-textarea
                              id="textarea"
                              v-model="item.description"
                              placeholder="توضیحات دسته در صورت لزوم ..."
                              rows="3"
                              max-rows="6"
                            ></b-form-textarea>
                            <b-button
                              class="m-2 float-left"
                              type="submit"
                              variant="success"
                              >ویرایش</b-button
                            >
                            <b-button
                              class="m-2 float-left"
                              type="reset"
                              variant="danger"
                              >بستن</b-button
                            >
                          </b-form>
                        </div>
                      </b-modal>
                      <a
                        @click="deleteItem(item.id)"
                        class="btn btn-icon btn-light btn-sm"
                      >
                        <span class="svg-icon svg-icon-md svg-icon-primary">
                          <!--begin::Svg Icon-->
                          <inline-svg
                            src="media/svg/icons/General/Trash.svg" title="حذف"
                          ></inline-svg>
                          <!--end::Svg Icon-->
                        </span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service";


export default {
  data() {
    return {
      items: {},
      editForm : {},
      groupSelect: null,
      groupOptions: [],
      fatherStatus: false,
      fatherSelect: null,
      fatherOptions: [],
      form: {
        id: 0,
        shopId: 4,
        name: "",
        description: "",
        published: true,
        groupId: null,
        fId: 0,
      },
      show: true,
    };
  },
  name: "category",
  components: {},
  methods: {
     getGroup() {
          return new Promise(resolve => {
            ApiService.setHeader();
            ApiService.get("Group")
                .then(({ data }) => {
                   this.groupOptions = data.value;
                })
                .catch(({ response }) => {
                    if (response == undefined){
                    Swal.fire({
                      title: "",
                      text: "گروهی تعریف نشده است",
                      icon: "error",
                    });
                    }
                });
            });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.form.groupId = this.groupSelect;
      this.form.fId = this.fatherSelect;
         return new Promise(resolve => {
            ApiService.setHeader();
            ApiService.post("Category/Add", this.form)
                .then(({ data }) => {
                      Swal.fire({
                        title: "",
                        text: "دسته بندی با موفقیت افزوده شد",
                        icon: "success",
                      });
                      this.onReset(evt);
                      this.getListTable();
                })
                .catch(({ response }) => {
                      Swal.fire({
                        title: "",
                        text: response.data.value,
                        icon: "error",
                      });
                });
            });
    },
    showEditModal(id) {
      let modalId = this.$refs['my-modal' + id][0];
      console.log(modalId);
      modalId.isHidden = false;
      modalId.isShow = true;
      modalId.isVisible = true;
      modalId.isBlock = true;
      modalId.isBodyOverflowing = true;
      modalId.isClosing = true;
      modalId.isModalOverflowing = true;
      modalId.isOpening = true;
      modalId.isTransitioning = true;
      modalId.isTop = false;
      modalId = ''
    },
     hideModal(id) {
      let modalId = this.$refs['my-modal' + id][0];
      console.log(modalId);
      modalId.isHidden = true;
      modalId.isShow = false;
      modalId.isVisible = false;
      modalId.isBlock = false;
      modalId.isBodyOverflowing = false;
      modalId.isClosing = false;
      modalId.isModalOverflowing = false;
      modalId.isOpening = false;
      modalId.isTransitioning = false;
      modalId.isTop = true;
      modalId = ''
     },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.description = "";
      this.form.published = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getListTable() {
          return new Promise(resolve => {
            ApiService.setHeader();
            ApiService.get("Category")
                .then(({ data }) => {
                   this.items = data.value;
                })
                .catch(({ response }) => {
                      Swal.fire({
                        title: "",
                        text: "خطا در برقراری ارتباط با سرور",
                        icon: "error",
                      });
                });
            });
    },
    deleteItem(id) {
         return new Promise(resolve => {
            ApiService.setHeader();
            ApiService.post("Category/Delete?id="+ id)
                .then(({ data }) => {
                   if (id == data.value) {
                    Swal.fire({
                      title: "",
                      text: "دسته بندی با موفقیت حذف شد",
                      icon: "success",
                    });
                    this.getListTable();
                  } else {
                    Swal.fire({
                      title: "",
                      text: "دسته بندی مورد نظر یافت نشد",
                      icon: "error",
                    });
                  }
                })
                .catch(({ response }) => {
                    Swal.fire({
                      title: "",
                      text: response.data.Message,
                      icon: "error",
                    });
                });
            });
    },
      onSubmitEdit(id) {
      this.editForm = {
        id: id,
        shopID: 4,
        name: this.form.name,
        description: this.form.description,
        published: true,
      }
         return new Promise(resolve => {
            ApiService.setHeader();
            ApiService.post("Category/Edit", this.editForm)
                .then(({ data }) => {
                      Swal.fire({
                        title: "",
                        text: "دسته بندی با موفقیت ویرایش شد",
                        icon: "success",
                      });
                      this.hideModal(this.editForm.id);
                      this.getListTable();
                })
                .catch(({ response }) => {
                      Swal.fire({
                        title: "",
                        text: response.data.value,
                        icon: "error",
                      });
                });
            });
    },
    getFather(){
      return new Promise(resolve => {
            ApiService.setHeader();
            ApiService.get("Category")
                .then(({ data }) => {
                   this.fatherOptions = data.value;
                })
                .catch(({ response }) => {
                      Swal.fire({
                        title: "",
                        text: "خطا در برقراری ارتباط با سرور",
                        icon: "error",
                      });
                });
            });
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "دسته بندی" }]);
    this.getListTable();
    this.getGroup();
    this.getFather();
  },
};
</script>
