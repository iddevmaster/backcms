import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    apidev: 'http://oasapi.iddriver.com',
    apiprod: 'https://dummyjson.com',
  })
})