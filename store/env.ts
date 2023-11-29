import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    apidev: 'https://dot-api.mpwt.gov.la',
    apiprod: 'https://dummyjson.com',
  })
})