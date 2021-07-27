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
          <TableCore
            :Columns="Columns"
            :Rows="Object.keys(this.items).length === 0 ? null : this.items"
            :showSearch="true"
            :showOrder="true"
            :showButtons="true"
            :showPage="true"
            :showRowNumber="true"
            :filter="this.Search"
            @onEditedRow="onEditedRow($event)"
            @onDeletedRow="onDeletedRow($event)"
            @onChangePageLength="onChangePageLength($event)"
            @onChangePage="onChangePage($event)"
            @onSearchAll="onSearchAll($event)"
            @onOrderColumns="onOrderColumns($event)"
          ></TableCore>
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
import TableCore from "@/view/components/table.vue";
import ErrorVue from "../error/Error.vue";

export default {
  data() {
    return {
      Columns: [
        { columnName: "name", displayName: "نام" },
        { columnName: "description", displayName: "توضیحات" },
      ],
      items: {},
      form: {
        id: 0,
        typeId: 1,
        name: "",
        description: "",
        published: true,
      },
      Search: {
        page: {
          currentPage: 1,
          pageLength: 100,
          lastPage: 0,
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
  computed: {},
  name: "group",
  components: { TableCore },
  methods: {
    getRow(id) {
      return new Promise((resolve) => {
        ApiService.get("Group", id)
          .then(({ data }) => {
            this.form = data;
          })
          .catch(({ response }) => {
            if (response == undefined) {
              Swal.fire({
                title: "",
                text: response.data,
                icon: "error",
              });
            }
          });
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (evt.id == 0 || evt.id == undefined) {
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
                text: response.data,
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
        this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
      });
    },
    getListTable() {
      return new Promise((resolve) => {
        ApiService.setHeader();
        ApiService.post("Group/GetGroups", this.Search)
          .then(({ data }) => {
            this.items = null;
            this.items = data.data;
            this.Search = data.filterSetting;
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
    onEditedRow(evt) {
      this.getRow(evt);
    },
    onDeletedRow(evt) {
      this.deleteItem(evt);
    },
    onChangePageLength(evt) {
      debugger;
      this.Search.page.pageLength = parseInt(evt);
      this.getListTable();
    },
    onChangePage(evt) {
      this.Search.page.currentPage = evt;
      this.getListTable();
    },
    onSearchAll(evt) {
      this.Search.searches.searchAll = evt;
      this.getListTable();
    },
    onOrderColumns(evt) {
      this.Search.orders = evt;
      this.getListTable();
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "گروه ها" }]);
    this.getListTable();
  },
};
</script>
