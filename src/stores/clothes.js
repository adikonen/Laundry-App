import { computed, reactive, ref, watch } from "vue"
import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { useRouter } from "vue-router"

export const useClothes = defineStore('clothes', () => {
  const clothes_json = useStorage('clothes', [])
  
  const router = useRouter()
  const loading = ref(false)

  const form = reactive({
    name: '',
    cost: 1,
    forPerson: '',
    perPcs:1,
    type: 1,
    // cost_format: '',
    // description: '',
    // title: ''
  })

  async function storeClothes() {
    if (loading.value) {
      console.warn('Be patient....')
      return 
    }

    loading.value = true

    const json = JSON.stringify({
      name: form.name,
      cost: form.cost,
      image: form.image,
      perPcs: form.perPcs,
      forPerson: form.forPerson,
      cost_format: '',
      description: '',
      title: ''
    })

    clothes_json.value.push(json)
    loading.value = false

    // i dont know why it cannot redirect, help 
    router.push({name: 'clothes.index'})
  }

  function resetForm() {
    form.name = ''
    form.cost = 1
    form.forPerson = ''
    form.perPcs = 1
    form.type = 1
  }

  const clothes = computed(() => {
    return clothes_json.value.map((item) => {
      const data = JSON.parse(item)
      data.cost_format = `${data.cost} ribu`
      data.description = `${data.cost_format} / ${data.perPcs} pcs` 
      data.title = `${data.name} ${data.forPerson}`

      return data
    })
  })

  // watch(() => form.cost, (newv, oldv) => {
  //   form.cost_format = newv + ' ribu'
  //   form.description = `${form.cost_format} / ${form.perPcs} biji`
  // })

  return { form, clothes_json, clothes, storeClothes, resetForm }
})