<template>
  <div class="p-2">
    <div class="relative Flex justify-center bg-[#F0F5FF] h-[200px]">
      <div class="flex flex-col mb-16">
        <span class="font-bold text-[20px] text-center">Currency Converter</span>
        <span class="text-center text-[16px] mt-4"
          >Need to make an international business payment? Take a look at our live foreign exchange
          rates.</span
        >
      </div>
      <div class="flex justify-center">
        <div class="absolute border flex justify-center bg-white lg:w-1/2 p-3">
          <div class="flex flex-col items-center">
            <span class="w-[322px] text-center font-bold text-[16px]">
              Make fast and affordable international business payments
            </span>
            <span class="font-medium text-[12px] text-center">
              Send secure international business payments in XX currencies, all at competitive rates
              with no hidden fees.
            </span>
            <form @submit.prevent="onSubmit" id="myform">
              <div class="flex">
                <div class="lg:flex items-center gap-6">
                  <div class="flex items-center mt-4">
                    <span class="mt-2">
                      <VInput class="w-[160px]" type="number" v-model="form1.amount" />
                    </span>
                    <span>
                      <VSelect :items="currencyList" class="w-[100px]" v-model="form1.currency" />
                    </span>
                  </div>
                  <VIcon name="UnoIcon" class="mt-4 flex justify-center" @click="onToggle" />
                  <div class="flex items-center mt-4">
                    <span class="mt-2">
                      <VInput class="w-[160px]" type="number" v-model="form2.amount" />
                    </span>
                    <span>
                      <VSelect :items="currencyList" class="w-[100px]" v-model="form2.currency" />
                    </span>
                  </div>
                </div>
              </div>
              <div class="lg:flex justify-between items-center mt-4">
                <span class="font-bold text-[16px]"
                  >1.00 {{ form1.currency }} = {{ unity }} {{ form2.currency }}</span
                >
                <VButton label="Get started" class="w-[150px]" @click="onSubmit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useCurrencyStore from '@/stores/convertor'

const currencyStore = useCurrencyStore()

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
const form1 = ref({
  amount:  0,
  currency: 'AUD'
})
const form2 = ref({
  amount:  0,
  currency: 'BGN'
})
const toggle = ref(false)
const onToggle = () => {
  if (toggle.value === true) {
    toggle.value = false
  } else {
    const a = ref(form1.value.amount)
    const b = ref(form1.value.currency)
    const c = ref(form2.value.amount)
    const d = ref(form2.value.currency)
    form1.value.amount = c.value
    form1.value.currency = d.value
    form2.value.amount = a.value
    form2.value.currency = b.value
    toggle.value = true
  }
}

const currencyList = [
  // {
  //   name: 'EUR',
  //   value: 'EUR'
  // },
  // {
  //   name: 'USD',
  //   value: 'USD'
  // },
  // {
  //   name: 'JPY',
  //   value: 'JPY'
  // },
  // {
  //   name: 'BGN',
  //   value: 'BGN'
  // },
  // {
  //   name: 'CZK',
  //   value: 'CZK'
  // },
  // {
  //   name: 'CZK',
  //   value: 'CZK'
  // },
  {
    name: 'AUD',
    value: 'AUD'
  },
  {
    name: 'BGN',
    value: 'BGN'
  },
  {
    name: 'BRL',
    value: 'BRL'
  },
  {
    name: 'CAD',
    value: 'CAD'
  },
  {
    name: 'CHF',
    value: 'CHF'
  },
  {
    name: 'CNY',
    value: 'CNY'
  },
  {
    name: 'CZK',
    value: 'CZK'
  },
  {
    name: 'DKK',
    value: 'DKK'
  },
  {
    name: 'EUR',
    value: 'EUR'
  },
  {
    name: 'GBP',
    value: 'GBP'
  },
  {
    name: 'HKD',
    value: 'HKD'
  },
  {
    name: 'HRK',
    value: 'HRK'
  },
  {
    name: 'HUF',
    value: 'HUF'
  },
  {
    name: 'ILS',
    value: 'ILS'
  },
  {
    name: 'INR',
    value: 'INR'
  },
  {
    name: 'ISK',
    value: 'ISK'
  },
  {
    name: 'JPY',
    value: 'JPY'
  },
  {
    name: 'KRW',
    value: 'KRW'
  },
  {
    name: 'MXN',
    value: 'MXN'
  },
  {
    name: 'MYR',
    value: 'MYR'
  },
  {
    name: 'NOK',
    value: 'NOK'
  },
  {
    name: 'NZD',
    value: 'NZD'
  },
  {
    name: 'PLN',
    value: 'PLN'
  },
  {
    name: 'RON',
    value: 'RON'
  },
  {
    name: 'RUB',
    value: 'RUB'
  },
  {
    name: 'SEK',
    value: 'SEK'
  },
  {
    name: 'SGD',
    value: 'SGD'
  },
  {
    name: 'THB',
    value: 'THB'
  },
  {
    name: 'TRY',
    value: 'TRY'
  },
  {
    name: 'THB',
    value: 'THB'
  },
  {
    name: 'USD',
    value: 'USD'
  },
  {
    name: 'ZAR',
    value: 'ZAR'
  }
]

const unity = ref(0)
const onSubmit = async () => {
  await currencyStore.fetchChange()
  const currency1 = form1.value.currency
  const currency2 = form2.value.currency
  console.log('currency1', currency1)
  console.log('currency2', currency2)
  const rate1 = currencyStore.data[currency1 as keyof DATA]
  const rate2 = currencyStore.data[currency2 as keyof DATA]
  console.log('rate1', rate1)
  console.log('rate2', rate2)
  unity.value = rate2 ?? 0
  form2.value.amount =  form1.value.amount * 4
  if (rate1 && rate2) {
    const result = rate1 * rate2
    form2.value.amount  = Number(result.toFixed(2))
  } else {
    console.error('Les taux de change pour les devises sélectionnées sont introuvables.')
  }
}
</script>
