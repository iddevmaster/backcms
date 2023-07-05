import ApiServiceAll from "./api.service";

export const MenuService = {

   async getpost() {

        const x = await fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json()) 
      return x;
    },
    cookie() {
      return ApiServiceAll.post("consent");
    },

};
