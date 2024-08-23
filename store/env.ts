import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => ({
    apidev: 'http://localhost:9200',
    apiprod: 'https://dummyjson.com',
  })
})