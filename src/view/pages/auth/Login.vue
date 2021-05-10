
<template>
  <div class="login-form">
    <!--begin::Content header-->
    <!-- <div
      class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"
    >
      <span class="font-weight-bold font-size-3 text-dark-60">
       آیا حساب کاربری دارید ؟
      </span>
      <router-link
        class="font-weight-bold font-size-3 ml-2"
        :to="{ name: 'register' }"
      >
        ثبت نام
      </router-link>
    </div> -->
    <!--end::Content header-->

    <!--begin::Signin-->
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">ورود</h3>
        <p class="text-muted font-weight-semi-bold">
          نام کاربری و رمز عبور خود را وارد کنید
        </p>
      </div>

      <b-form  class="form" @submit="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="نام کاربری:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.userName"
            type="text"
            required
            placeholder="نام کاربری خود را وارد کنید"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="کلمه عبور:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="کلمه عبور خود را وارد کنید"
          ></b-form-input>
        </b-form-group>

        <b-button class="m-2 float-left" type="submit" variant="success" ref="kt_login_signin_submit"
          >ورود</b-button
        >
      </b-form>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
  </div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
.login-form{
  width: 280px;
}
</style>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { mapState } from "vuex";
import { LOGIN } from "@/core/services/store/auth.module";


export default {
  name: "login",
  data() {
    return {
        baseUrlApi: "https://service.abakary.ir/api",
      // Remove this dummy login info
      form: {
        userName: "",
        password: "",
      },
      show: true,
    }
  },
  
  methods: {
    onSubmit(evt) {
      const userName = this.form.userName;
      const password = this.form.password;
      const submitButton = this.$refs["kt_login_signin_submit"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");
           // dummy delay
      setTimeout(() => {
        // send login request
        this.$store
          .dispatch(LOGIN, {
            userName: userName,
            password: password,
          }).then(() => {
             submitButton.classList.remove(
          "spinner",
          "spinner-light",
          "spinner-right"
        );
            this.$router.push({ name: "dashboard" })
          });

       
      }, 2000);
    },
  },
  computed: {
  }
};
</script>
