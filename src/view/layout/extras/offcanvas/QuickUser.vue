<template>
  <div class="topbar-item">
    <div
      class="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
      id="kt_quick_user_toggle"
    >
      <span
        class="text-muted font-weight-bold font-size-base d-md-inline mr-1"
      >
        سلام,
      </span>
      <span
        class="text-dark-50 font-weight-bolder font-size-base d-md-inline mr-3"
      >
        {{firstName}}
      </span>
      <span class="symbol symbol-35 symbol-light-success">
        <span v-if="true" class="symbol-label font-size-h5 font-weight-bold">
          {{id}}
        </span>
      </span>
    </div>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
         پروفایل کاربری
          <!-- <small class="text-muted font-size-sm ml-2">12 messages</small> -->
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <!-- <img class="symbol-label" :src="picture" alt="" /> -->
            <span id="imgUser" ref="imgUser">{{intials}}</span>
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <a
              href="#"
              class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
             {{fullName}}
            </a>
            <div class="text-muted mt-2">نام کاربری : {{userName}}</div>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-4">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/Communication/Call.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary">
                    {{phoneNumber}}
                  </span>
                </span>
              </a>
            </div>
         
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed mt-8 mb-5"></div>
           <button class="btn btn-light-danger btn-bold" @click="onLogout">
               <i class="la la-sign-out-alt"></i>
              خروج از حساب کاربری
            </button>
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
#imgUser{
    background: #e1f0ff;
    width: 100px;
    height: 100px;
    border-radius: 5%;
    font-size: 35px;
    color: #3699ff;
    text-align: center;
    line-height: 100px;
    display: block;
}
</style>

<script>
import { LOGOUT } from "@/core/services/store/auth.module";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
//import ApiService from "@/core/services/api.service";
//import Swal from "sweetalert2";
import JwtService from "@/core/services/jwt.service";

export default {
  name: "KTQuickUser",
  data() {
    return {
      firstName:'',
      lastName:'',
      userName:'',
      phoneNumber:'',
      fullName:'',
      intials:'',
      id:null,
      list:[]
    };
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    },
    getAccount() {     
      setTimeout(() => {
        this.firstName = JwtService.getName();
        this.id = JwtService.getId();
        this.lastName = JwtService.getLName();
        this.userName = JwtService.getUName();
        this.phoneNumber ='0' + JwtService.getPhoneNumber();
        this.fullName =  this.firstName + ' ' + this.lastName;
        this.intials = this.firstName.charAt(0) + this.lastName.charAt(0);
       
      }, 1000);
    },
  },
  computed: {
    picture() {
      return process.env.BASE_URL + "media/users/300_21.jpg";
    },
  },
  mounted() {
        // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
    // this.getAccount();
       // check if current user is authenticated
    if (JwtService.getToken() && JwtService.getId()) {
        this.getAccount();
    }
  },
};
</script>
