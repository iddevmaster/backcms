import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    apidev: 'http://27.254.149.239:9200',
    apiprod: 'https://dummyjson.com',
  })
})