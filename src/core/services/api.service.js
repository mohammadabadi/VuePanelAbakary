import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/jwt.service";
import VueRouter from "vue-router";

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = "http://localhost:8085/api/";
    },

    /**
     * Set the default HTTP request headers
     */
    setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer  ${JwtService.getToken()}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    },
    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            // console.log(error);
            throw new Error(`[KT] ApiService ${error}`);
        });
    },

    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            // console.log(error);
            throw new Error(`[KT] ApiService ${error}`);
        });
    },
    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
    getList(resource, params) {
        return Vue.axios.get(`${resource}`, params).catch(error => {
            // console.log(error);
            throw new Error(`[KT] ApiService ${error}`);
        });
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */
    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },

    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */
    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            // console.log(error);
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },
    /**
     * Redirect To Login Page
     * @param evt
     * @returns {*}
     */
    redirectToLogin(evt) {
        evt.$router.push({ name: 'login' })
    },
    /**
     * if Error No Equal 401 Redirect To Login
     * @param {*} errorNo 
     */
    unauthorizedUser(errorNo, evt) {
        if (errorNo == 401) {
            this.redirectToLogin(evt);
        }
    }
};

export default ApiService;