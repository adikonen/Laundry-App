import { ref, reactive, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'
import { useRouter } from 'vue-router'
import moment, { now } from 'moment/moment'

export const useBill = defineStore('bill', () => {
  const bills_json = useStorage('bills', [])

  const search = ref('')
  const loading = ref(false)
  const router = useRouter()
  
  const form = reactive({
    forPerson: '',
    clothes: []
  })

  function appendClothes(clothes) {
    const index = form.clothes.findIndex((item) => item.clothes_id === clothes.clothes_id)

    // on not found
    if (index == -1) {
      form.clothes.push(clothes)
    } else {
      // update
      form.clothes[index] = clothes
    }

  }

  function handleFirstStep() {
    localStorage.setItem('bill.forPerson',form.forPerson);
  }

  function storeBill() {
    if (loading.value) {
      console.warn('Be patient....')
      return
    }

    loading.value = true
    const [bill_id, json] = _makeJson()

    loading.value = false

    bills_json.value.push(json)

    localStorage.removeItem('bill.forPerson')
    router.push({ to: 'bill.show', params: { bill_id } })
  }

  function _makeJson() {
    const bill_id = nanoid(16)
    const createdAt = moment().format('L')
    const unixCreatedAt = now()
    const json = JSON.stringify({
      bill_id,
      createdAt,
      unixCreatedAt,
      forPerson: localStorage.getItem('bill.forPerson'),
      clothes: form.clothes
    })

    return [bill_id, json]
  }

  const bills = computed(() => bills_json.value.map((item) => JSON.parse(item)))

  return {
    form,
    bills,
    search,
    appendClothes,
    storeBill,
    handleFirstStep,
  }

})
