<template>
  <div class="row">
    <div class="col-12">
      <div class="card card-custom gutter-b">
        <div class="card-header">
          <div class="card-title">
            <h3 class="card-label">گروه ها</h3>
          </div>
          <div class="card-title float-left">
            <b-button variant="primary" v-b-modal.modal-1>
              <i class="la la-plus"></i>افزودن گروه</b-button
            >

            <b-modal hide-footer id="modal-1" title="افزودن گروه محصولات">
              <div class="p-4">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <b-form-group
                    id="input-group-1"
                    label="عنوان گروه:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="عنوان گروه را وارد کنید"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-textarea
                    id="textarea"
                    v-model="form.description"
                    placeholder="توضیحات گروه در صورت لزوم ..."
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
                  <b-button
                    class="m-2 float-left"
                    type="reset"
                    variant="danger"
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
                  <th class="text-center">عنوان گروه</th>
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
                    {{ item.description }}
                  </td>
                  <td>
                    <a
                      @click="deleteItem(item.id)"
                      class="btn btn-icon btn-light btn-sm"
                    >
                      <span class="svg-icon svg-icon-md svg-icon-primary">
                        <!--begin::Svg Icon-->
                        <inline-svg
                          src="media/svg/icons/General/Trash.svg"
                        ></inline-svg>
                        <!--end::Svg Icon-->
                      </span>
                    </a>

                    <a
                      @click="getRow(item.id)"
                      class="btn btn-icon btn-light btn-sm"
                      style="margin-right: 10px"
                    >
                      <span class="svg-icon svg-icon-md svg-icon-primary">
                        <!--begin::Svg Icon-->
                        <inline-svg
                          src="media/svg/icons/General/Edit.svg"
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
// import axios from "axios";
import ApiService from "@/core/services/api.service";

export default {
  data() {
    return {
      items: {},
      form: {
        id: 0,
        typeId: 1,
        name: "",
        description: "",
        published: true,
      },
      defaultSearch: {
        page: {
          currentPage: 0,
          pageLength: 0,
        },
        searches: {
          searchAll: "",
          searches: [],
        },
        orders: [],
      },
      show: true,
    };
  },
  name: "group",
  components: {},
  methods: {
    getRow(id) {
      return new Promise((resolve) => {
        ApiService.get("Group", id)
          .then(({ data }) => {})
          .catch(({ response }) => {
            if (response == undefined) {
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
      if (evt.id == 0) {
        return new Promise((resolve) => {
          ApiService.setHeader();
          ApiService.post("Group/Add", this.form)
            .then(({ data }) => {
              Swal.fire({
                title: "",
                text: "گروه با موفقیت افزوده شد",
                icon: "success",
              });
              this.onReset(evt);
              this.getListTable();
            })
            .catch(({ response }) => {
              ApiService.unauthorizedUser(response.status, this);
              Swal.fire({
                title: "",
                text: response.data.Message,
                icon: "error",
              });
            });
        });
      } else {
        return new Promise((resolve) => {
          ApiService.setHeader();
          ApiService.post("Group/Edit", this.form)
            .then(({ data }) => {
              Swal.fire({
                title: "",
                text: "گروه با موفقیت ویرایش شد",
                icon: "success",
              });
              this.onReset(evt);
              this.getListTable();
            })
            .catch(({ response }) => {
              ApiService.unauthorizedUser(response.status, this);
              Swal.fire({
                title: "",
                text: response.data.Message,
                icon: "error",
              });
            });
        });
      }
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
      return new Promise((resolve) => {
        ApiService.setHeader();
        ApiService.post("Group/GetGroups", this.defaultSearch)
          .then(({ data }) => {
            this.items = data.data;
          })
          .catch(({ response }) => {
            if (response == undefined) {
              Swal.fire({
                title: "",
                text: "گروهی تعریف نشده است",
                icon: "error",
              });
            } else {
              ApiService.unauthorizedUser(response.status, this);
            }
          });
      });
    },
    deleteItem(id) {
      return new Promise((resolve) => {
        ApiService.setHeader();
        ApiService.post("Group/Delete?id=" + id)
          .then(({ data }) => {
            if (id == data) {
              Swal.fire({
                title: "",
                text: "گروه با موفقیت حذف شد",
                icon: "success",
              });
              this.getListTable();
              setTimeout(this.getListTable(), 5000);
            } else {
              Swal.fire({
                title: "",
                text: "گروه مورد نظر یافت نشد",
                icon: "error",
              });
            }
          })
          .catch(({ response }) => {
            ApiService.unauthorizedUser(response.status, this);
            Swal.fire({
              title: "",
              text: response.data,
              icon: "error",
            });
          });
      });
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "گروه ها" }]);
    this.getListTable();
  },
};
</script>
