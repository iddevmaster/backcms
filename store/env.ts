import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    apidev: 'https://oasapi.iddriver.com',
    apiprod: 'https://dummyjson.com',
  })
})