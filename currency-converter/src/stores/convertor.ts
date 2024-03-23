import { defineStore } from 'pinia'
import axios from 'axios'

interface DATA {
  AUD: number
  BGN: number
  BRL: number
  CAD: number
  CHF: number
  CNY: number
  CZK: number
  DKK: number
  EUR: number
  GBP: number
  HKD: number
  HRK: number
  HUF: number
  ILS: number
  INR: number
  ISK: number
  JPY: number
  KRW: number
  MXN: number
  MYR: number
  NOK: number
  NZD: number
  PHP: number
  PLN: number
  RON: number
  RUB: number
  SEK: number
  SGD: number
  THB: number
  TRY: number
  USD: number
  ZAR: number
}

const useCurrencyStore = defineStore('currency', {
  state: () => ({
    apikey:
      'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ZSHw7tPmPjo37IvuBucMdTz1PRaUtpdaNeXM1D5R&currencies=AUD%2CBGN%2CBRL%2CCAD%2CCHF%2CCNY%2CCZK%2CDKK%2CEUR%2CGBP%2CHKD%2CHRK%2CHUF%2CILS%2CINR%2CISK%2CJPY%2CKRW%2CMXN%2CMYR%2CNOK%2CNZD%2CPHP%2CPLN%2CRON%2CRUB%2CSEK%2CSGD%2CTHB%2CTRY%2CUSD%2CZAR&base_currency=',
    date: '',
    base_currency: '',
    data: {} as DATA
  }),
  actions: {
    onchange(currency: any) {
      this.base_currency = currency
    },

    async fetchChange() {
      const response = await axios.get(`${this.apikey}` + `${this.base_currency}`)
      this.data = response.data
    }
  },

  getters: {
    getData: (state) => state.data
  }
})

export default useCurrencyStore