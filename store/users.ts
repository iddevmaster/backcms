import { defineStore } from 'pinia';
import apiClient from '~/services/api.service';
import ApiService from '../services/api.service';




export const usersStore = defineStore('users', {
  state: () => ({
    locale: true,
    load: true,
    isOpen: false,
    AlertText: null,
    posts: {},
    pending: false,
    pending_form: false,
    sortedbyASC: true,
    selected: [],
    checkboxes: [], // Array to store checkbox values
    isAllSelected: false,
    count: 0,
    page: 1,
    per_page: 10,
    searchDa: '',
    total_page: null,
    limit_page: null,
    current_page: null,
    total_filter: null,
    total: null,
    itemsPerPage: 3,
    user_id_del: null,
    formsearch: {
      page: 1,
      per_page: 20,
      searchDa: '',
    },
    formDataregister: {
      user_name: null,
      user_password: null,
      user_firstname: null,
      user_lastname: null,
      user_email: null,
      user_phone: null,
      user_type: null,
    },
    formDataEdit: {
      user_name: null,
      user_password: null,
      user_firstname: null,
      user_lastname: null,
      user_email: null,
      user_phone: null,
      user_type: null,
    }
  }

  ),


  getters: {
    data(state) {

    },


    FormEdit(state) {
      return state.formDataEdit;
    },
    GetopenModal(state) {
      return state.isOpen;
    },
    GetopenModal_ID(state) {
      return state.user_id_del;
    },
    getForm(state) {
      return state.formDataregister;
    },
    Pending(state) {
      return state.pending;
    },
    PendingForm(state) {
      return state.pending_form;
    },
    AlertTextForm(state) {
      return state.AlertText;
    },
    doubleCount(state) {
      return state.count * 2
    },
    getSelect(state) {
      return state.selected;
    },
    getSelectALL(state) {
      return state.isAllSelected;
    },


  },

  actions: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },



    async fetchUsers() {
      this.selected = [];
      this.isAllSelected = false;

      this.formsearch.page = this.page;
      this.formsearch.per_page = this.per_page;
      this.formsearch.search = this.searchDa;
      try {
        this.pending = true
        const data = await ApiService.post('/user/list?', this.formsearch).then(response => {
          this.posts = response.data
          this.total_page = response.data.total_page
          this.limit_page = response.data.limit_page
          this.current_page = response.data.current_page
          this.total_filter = response.data.total_filter
          this.total = response.data.total
        });

      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }
    },

    async fetchUsersId(user_id) {
      try {
        const data = await ApiService.get('/user/get/' + user_id).then(response => {
          this.formDataEdit = response.data;
        });
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.pending = false
      }

    },

    async deleteItem_id(user_id) {
      const index = this.posts.data.findIndex(item => item.user_id === user_id)
      if (index !== -1) {
        this.posts.data.splice(index, 1)
      }
      try {
        const del = await ApiService.delete('/user/delete/' + user_id);
        this.isOpen = false;
        return 200;
      } catch (error) {
        return error;
      }
    },

    async Update(user_id) {
      try {
        console.log(this.formDataEdit);
        console.log(user_id);
        const response = await ApiService.put('/user/update/' + user_id, this.formDataEdit);
        return response.data
      } catch (error) {
       return false;
      }
    },

    async deleteItem(user_id) {
      this.isOpen = true;
      this.user_id_del = user_id;
    },
    async selectall() {
      this.selected = [];
      if (!this.isAllSelected) {
        this.posts.data.forEach((value, index) => {
          this.selected.push(value);
        });
      }
      this.isAllSelected = !this.isAllSelected;
    },

    async selectone(x) {
      const index = this.selected.indexOf(x);
      if (index !== -1) {
        this.selected.splice(index, 1); // Remove value if already present
      } else {
        this.selected.push(x); // Add value if not present
      }
    },

    cance() {
      this.isAllSelected = false;
    },
    async SaveForm() {
      this.pending = true;
   
      try {
        const { pending, error, data } = await ApiService.post('/user/create', this.formDataregister).then(response => {
          if (response.value) {
            return response.value;
          }
          if (response.value == '') {
            return response.value;
          }
          return true;
          //  this.pending_form = true;
        });
      } catch (error) {
        return false;
      } finally {
        this.pending = false;
      }

    },

    setCurrentPage(page) {
      this.page = page
      this.selected = [];
      this.isAllSelected = false
    },

    sortLists(sortBy) {
      if (this.sortedbyASC) {
        this.posts.data.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        this.sortedbyASC = false;
      } else {
        this.posts.data.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        this.sortedbyASC = true;
      }
    },

    selectentires(data_entires) {
      this.per_page = data_entires;
      this.page = 1;
    },

    async search() {
      this.fetchUsers();
    },

    async ResetForm() {   ////reset Form
      this.formDataregister = {
        user_name: '',
        user_password: '',
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_phone: '',
        user_type: 3,
      };
    },




  },
});
