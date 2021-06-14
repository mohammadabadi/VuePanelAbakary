<template>
  <div>
    <div class="row">
      <div class="col-11 form-inline" v-show="showSearch">
        <b-form-input
          id="input-Search"
          type="text"
          required
          placeholder="جستجو در تمام ستون ها"
        ></b-form-input>
        <!-- Search Button -->
        <a
          class="btn btn-icon btn-secondary btn-sm d-none d-sm-block"
          style="margin-right: 5px"
          data-toggle="tooltip"
          data-placement="top"
          title="جستجو"
        >
          <span class="svg-icon svg-icon-md svg-icon-dark">
            <!--begin::Svg Icon-->
            <inline-svg
              src="media/svg/icons/General/Search.svg"
              style="margin-top: 5px"
            ></inline-svg>
            <!--end::Svg Icon-->
          </span>
        </a>
      </div>
      <div class="col-1">
        <b-form-select
          required
          value="100"
          value-field="100"
          text-field="100"
          class="mt-2"
        >
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
          <option value="750">750</option>
          <option value="1000">1000</option>
          <option value="2000">2000</option>
        </b-form-select>
      </div>
    </div>
    <br />
    <div class="table-responsive">
      <table
        class="
          table
          table-head-custom
          table-head-bg
          table-borderless
          table-vertical-center
        "
      >
        <thead>
          <tr class="text-right text-uppercase">
            <th class="text-center" v-show="showRowNumber">ردیف</th>
            <th
              class="text-center"
              v-for="(column, index) in Columns"
              :key="index"
            >
              {{ column }}
              <!--begin::Svg Icon-->
              <inline-svg
                src="media/svg/icons/Navigation/Arrows-v.svg"
                v-show="showOrder"
                style="
                  margin-top: -5px;
                  width: 12px;
                  height: 12px;
                  cursor: pointer;
                "
              ></inline-svg>
              <!--end::Svg Icon-->
            </th>
            <th class="text-center" v-show="showButtons">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in Rows" :key="rowIndex">
            <td class="text-center" v-show="showRowNumber">
              {{ rowIndex + 1 }}
            </td>
            <td
              class="text-center"
              v-for="(column, columnIndex) in databaseColumns"
              :key="columnIndex"
            >
              {{ row[column] }}
            </td>
            <td class="text-center" v-show="showButtons">
              <a class="btn btn-icon btn-light btn-sm" @click="Delete(row.id)">
                <span class="svg-icon svg-icon-md svg-icon-primary">
                  <!--begin::Svg Icon-->
                  <inline-svg
                    src="media/svg/icons/General/Trash.svg"
                  ></inline-svg>
                  <!--end::Svg Icon-->
                </span>
              </a>

              <a
                class="btn btn-icon btn-light btn-sm"
                style="margin-right: 10px"
                v-b-modal.modal-1
                @click="Edit(row.id)"
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
    <!-- Pageing Buttons -->
    <div
      class="btn-toolbar"
      role="toolbar"
      aria-label="Toolbar with button groups"
      v-show="showPage"
    >
      <!-- First Page -->
      <div class="btn-group me-2" role="group">
        <button
          type="button"
          class="btn btn-icon btn-secondary btn-sm"
          style="width: 70px"
        >
          اولین صفحه
        </button>
      </div>
      <!-- First Page -->
      <div class="btn-group me-2" role="group">
        <button
          type="button"
          class="btn btn-icon btn-dark btn-sm"
          v-for="count in filter.page.lastPage"
          :key="count"
        >
          {{ count }}
        </button>
      </div>
      <!-- Last Page -->
      <div class="btn-group me-2" role="group">
        <button
          type="button"
          class="btn btn-icon btn-secondary btn-sm"
          style="width: 70px"
        >
          آخرین صفحه
        </button>
      </div>
      <!-- Last Page -->
    </div>
    <!-- Pageing Buttons -->
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: {
    Columns: Array,
    databaseColumns: Array,
    Rows: Array,
    showSearch: Boolean,
    showOrder: Boolean,
    showButtons: Boolean,
    showPage: Boolean,
    showRowNumber: Boolean,
    filter: Object,
  },
  mounted() {
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    Edit(evt) {
      this.$emit("onEditedRow", evt);
    },
    Delete(evt) {
      Swal.fire({
        title: "",
        text: "آیا مایلید رکورد مورد نظر حذف گردد؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("onDeletedRow", evt);
        }
      });
    },
  },
};
</script>

<style>
</style>