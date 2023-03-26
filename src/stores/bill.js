import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'
import { useRouter } from 'vue-router'

export const useBill = defineStore('bill', () => {
  const bills_json = useStorage('bills', [])
  
  const selected_clothes = {
    clothes_id : null,
    name: null, 
    cost: null, 
    image: null, 
    perPcs: null, 
    forPerson: null, 
    cost: null,
    description: null, 
    title: null,

    // additional 
    count: ref(0),
  }
  
  const search = ref('')
  const loading = ref(false)
  const router = useRouter()
  const form = reactive({
    forPerson: '',
    clothes: []
  })

  function resetSelectedClothes() {
    for (let item in selected_clothes) {
      if (item != 'count') {
        selected_clothes[item] = null
      } else {
        selected_clothes.count.value = 0
      }
    }  
  }

  function appendClothes() {
    console.log(selected_clothes)
    const index = form.clothes.findIndex((item) => item.clothes_id === selected_clothes.clothes_id)

      form.clothes.push(selected_clothes)

    console.table(form.clothes)
  }

  function prepareClothes(clothes) {
    for (let item in clothes) {
      if (item in selected_clothes) {
        selected_clothes[item] = clothes[item]
      }
    }
  }
  // function prepareClothes(clothes) {
  //     selected_clothes.clothes_id  = clothes.clothes_id
  //     selected_clothes.name =  clothes.name
  //     selected_clothes.cost =  clothes.cost
  //     selected_clothes.image =  clothes.image
  //     selected_clothes.perPcs =  clothes.perPcs
  //     selected_clothes.forPerson =  clothes.forPerson
  //     selected_clothes.cost = clothes.cost
  //     selected_clothes.description =  clothes.description
  //     selected_clothes.title = clothes.title

  //     // additional 
  //     selected_clothes.count = 0
  // }

  function storeBill() {
    if (loading.value) {
      console.warn('Be patient....')
      return
    }

    loading.value = true
    const [bill_id, json] = _makeJson()
    bills_json.value.push(json)
    loading.value = false
    router.push({ to: 'bill.show', params: { bill_id } })
  }

  function _makeJson() {
    const bill_id = nanoid(16)

    const json = JSON.stringify({
      bill_id,
      forPerson: form.forPerson,
      clothes: form.clothes
    })

    return [bill_id, json]
  }

  // watch(() => selected_clothes.count, (newv) => {
  //   if (newv > 0) {
  //     appendClothes()
  //   } else {

  //   }
  // })

  return {
    selected_clothes, 
    prepareClothes,
    appendClothes,
    resetSelectedClothes,
  }

})
