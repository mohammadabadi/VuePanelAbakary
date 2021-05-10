<template>
  <div class="row">
    <div class="col-12">
      <div class="card card-custom gutter-b">
        <div class="card-header">
          <div class="card-title">
            <h3 class="card-label">لیست محصولات</h3>
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
                    <th class="text-center">عنوان محصول</th>
                    <th class="text-center">دسته</th>
                    <th class="text-center">شناسه محصول</th>
                    <th class="text-center">توضیحات</th>
                    <th class="text-center">کلمات سئو</th>
                    <th class="text-center">لینک</th>
                    <th class="text-center">وزن</th>
                    <!-- <th class="text-center">حالت انتشار</th> -->
                    <th class="text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-center"
                    v-for="item in products"
                    :key="item.id"
                  >
                    <td>
                      {{ item.id }}
                    </td>
                    <td>
                      {{ item.productName }}
                    </td>
                    <td>
                      {{ item.categoryName }}
                    </td>
                    <td>
                      {{ item.productCode }}
                    </td>
                    <td>
                      {{ item.description }}
                    </td>
                    <td>
                      {{ item.seoKeywords }}
                    </td>
                    <td>
                      {{ item.link }}
                    </td>
                    <td>
                      {{ item.weight }}
                    </td>
                    <!-- <td>
                      {{ item.published }}
                    </td> -->
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
// import axios from "axios";
import Router from "vue-router";

export default {
  data() {
    return {
      products: {},
      form: {
        id: 0,
        shopID: 1,
        name: "",
        description: "",
        published: true,
      },
      show: true,
    };
  },
  name: "product",
  components: {},
  methods: {
    getListTable() {
          return new Promise(resolve => {
            ApiService.setHeader();
            ApiService.getList("Product?ShopId=1")
                .then(({ data }) => {
                   this.products = data.value;
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
            ApiService.post("Product/Delete?id="+ id)
                .then(({ data }) => {
                   if (id == data.value) {
                    Swal.fire({
                      title: "",
                      text: "محصول با موفقیت حذف شد",
                      icon: "success",
                    });
                    this.getListTable();
                  } else {
                    Swal.fire({
                      title: "",
                      text: "محصول مورد نظر یافت نشد",
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
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "لیست محصولات" }]);
    this.getListTable();
  },
};
</script>
