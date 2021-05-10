import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import Swal from "sweetalert2";
import axios from "axios";
import Router from "vue-router";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";
export const SET_VERIFY = "setVerify";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
        // isAuthenticated: true,
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise(resolve => {
            ApiService.post("Accounts/SignIn", credentials)
                .then(({ data }) => {
                    var account = data;
                    if (account.value.signIn.succeeded == true) {
                        Swal.fire({
                            title: "",
                            text: "به داشبورد مدیریتی آباکاری خوش آمدید",
                            icon: "success",
                        });
                        context.commit(SET_AUTH, account);
                        resolve(account);
                    }
                    resolve(data);
                })
                .catch(({ response }) => {
                    Swal.fire({
                        title: "",
                        text: "نام کاربری یا رمز عبور اشتباه است.",
                        icon: "error",
                    });

                });
        });
    },
    [LOGOUT](context) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader();
            ApiService.post("Accounts/SignOut")
                .then(({ data }) => {
                    context.commit(PURGE_AUTH);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                    reject(response);
                });
        });
        context.commit(PURGE_AUTH);
    },
    [REGISTER](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("users", { user: credentials })
                .then(({ data }) => {
                    context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                    reject(response);
                });
        });
    },
    [VERIFY_AUTH](context) {
        if (JwtService.getToken() && JwtService.getId()) {
            ApiService.setHeader();
            ApiService.get("Accounts", JwtService.getId())
                .then(({ data }) => {
                    context.commit(SET_VERIFY, data);
                })
                .catch(({ response }) => {
                    Swal.fire({
                        title: "",
                        text: response.data.Message,
                        icon: "error",
                    });
                    // context.commit(SET_ERROR, response);
                    context.commit(PURGE_AUTH);
                });
        } else {
            context.commit(PURGE_AUTH);
        }
        // if (JwtService.getToken()) {
        //     const data = {
        //         token: JwtService.getToken(),
        //         userId: JwtService.getId()
        //     }
        //     context.commit(SET_VERIFY, data);
        // } else {
        //     context.commit(PURGE_AUTH);
        // }
    },
    [UPDATE_USER](context, payload) {
        const { email, username, password, image, bio } = payload;
        const user = { email, username, bio, image };
        if (password) {
            user.password = password;
        }

        return ApiService.put("user", user).then(({ data }) => {
            context.commit(SET_AUTH, data);
            return data;
        });
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        JwtService.saveId(state.user.value.userId);
        JwtService.saveToken(state.user.value.token);

    },
    [SET_VERIFY](state, user) {
        state.isAuthenticated = true;
        state.user = user;
        JwtService.saveName(state.user.value.name);
        JwtService.saveLName(state.user.value.family);
        JwtService.saveUName(state.user.value.userName);
        JwtService.savePhoneNumber(state.user.value.phoneNumber);
        // state.errors = {};
        // JwtService.saveId(state.user.userId);
        // JwtService.saveToken(state.user.token);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        JwtService.destroyId();
        JwtService.destroyToken();
        JwtService.destroyName();
        JwtService.destroyLName();
        JwtService.destroyUName();
        JwtService.destroyPhoneNumber();

    }
};

export default {
    state,
    actions,
    mutations,
    getters
};