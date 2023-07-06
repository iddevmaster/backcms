import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    apidev: 'https://dummyjson.com',
    apiprod: 'https://dummyjson.com',
  })
})