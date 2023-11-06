import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    apidev: 'https://oasbe.sky.mpwt.link',
    apiprod: 'https://dummyjson.com',
  })
})