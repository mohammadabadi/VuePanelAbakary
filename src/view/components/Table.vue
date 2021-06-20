<template>
  <div>
    <div class="row">
      <div class="col-11 form-inline" v-show="showSearch">
        <b-form-input
          id="input-Search"
          type="search"
          v-model="searchAll"
          placeholder="جستجو در تمام ستون ها"
          @input="onSearchAll()"
        ></b-form-input>
      </div>
      <div class="col-1">
        <b-form-select
          required
          value="100"
          value-field="100"
          text-field="100"
          class="mt-2"
          v-model="pageLength"
          @change="onChangePageLength()"
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
              v-bind:id="column.columnName"
            >
              {{ column.displayName }}
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
                @click="onChangeOrder(column.columnName)"
              ></inline-svg>
              <!--end::Svg Icon-->
            </th>
            <th class="text-center" v-show="showButtons">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in Rows" :key="rowIndex">
            <td class="text-center" v-show="showRowNumber">
              {{
                filter.page.pageLength * (filter.page.currentPage - 1) +
                rowIndex +
                1
              }}
            </td>
            <td
              class="text-center"
              v-for="(column, columnIndex) in Columns"
              :key="columnIndex"
            >
              {{ row[column.columnName] }}
            </td>
            <td class="text-center" v-show="showButtons">
              <a
                class="btn btn-icon btn-light btn-sm"
                @click="onDelete(row.id)"
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
                class="btn btn-icon btn-light btn-sm"
                style="margin-right: 10px"
                v-b-modal.modal-1
                @click="onEdit(row.id)"
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
      <div class="btn-group me-2" role="group">
        <button
          type="button"
          class="btn btn-icon btn-dark btn-sm"
          v-for="count in filter.page.lastPage <= 5 ? filter.page.lastPage : 5"
          :key="count"
          @click="onChangePage(count + firstPage)"
        >
          {{ count + firstPage }}
        </button>
      </div>
      <!-- Last Page -->
      <div class="btn-group me-2" role="group">
        <button
          type="button"
          class="btn btn-icon btn-secondary btn-sm"
          style="width: 120px"
          @click="onChangePage(filter.page.lastPage)"
        >
          آخرین صفحه ({{ filter.page.lastPage }})
        </button>
      </div>
      <!-- Last Page -->
      <!-- Specific Page -->
      <div class="btn-group me-2" role="group">
        <b-form-input
          style="margin-right: 10px; width: 70px; text-align: center"
          type="text"
          size="sm"
          :min="1"
          :max="filter.page.lastPage"
          :value="filter.page.currentPage"
          :disabled="true"
          @change="onChangePage(value)"
        >
        </b-form-input>
        <label style="margin-right: 10px; margin-top: 5px">
          از {{ filter.page.lastPage }} صفحه
        </label>
      </div>
      <!-- Specific Page -->
    </div>
    <!-- Pageing Buttons -->
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: {
    Columns: Array,
    Rows: Array,
    showSearch: Boolean,
    showOrder: Boolean,
    showButtons: Boolean,
    showPage: Boolean,
    showRowNumber: Boolean,
    filter: Object,
  },
  mounted() {},
  updated() {},
  data() {
    return {
      show: true,
      firstPage: 0,
      searchAll: "",
      Orders: [],
      pageLength: 100,
    };
  },
  methods: {
    onChangePageLength() {
      this.$emit("onChangePageLength", this.pageLength);
    },
    onChangePage(evt) {
      if (evt % 5 == 0) {
        this.firstPage = evt;
      } else {
        this.firstPage = evt - 5 - 1;
        if (this.firstPage < 0) {
          this.firstPage = 0;
        }
      }
      if (evt > this.filter.page.lastPage) {
        this.filter.page.currentPage = this.filter.page.lastPage;
        evt = this.filter.page.lastPage;
        this.firstPage = this.filter.page.lastPage - 5;
      }
      this.$emit("onChangePage", evt);
    },
    onSearchAll() {
      this.$emit("onSearchAll", this.searchAll);
    },
    onEdit(evt) {
      this.$emit("onEditedRow", evt);
    },
    onChangeOrder(evt) {
      let index = this.Orders.findIndex((x) => x.columnName === evt);
      if (index == -1) {
        this.Orders.push({
          columnName: evt,
          orderBy: 1,
        });
      } else {
        this.Orders[index].orderBy = this.Orders[index].orderBy == 1 ? 2 : 1;
      }
      this.$emit("onOrderColumns", this.Orders);
    },
    onDelete(evt) {
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