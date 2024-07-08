import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    apidev: 'https://dot-api.mpwt.link',
    apiprod: 'https://dummyjson.com',
  })
})