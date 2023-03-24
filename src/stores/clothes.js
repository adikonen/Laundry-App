import { computed, reactive, ref, watch } from "vue"
import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { useRouter } from "vue-router"
import { nanoid } from 'nanoid'
import { useRoute } from 'vue-router'
export const useClothes = defineStore('clothes', () => {
  const clothes_json = useStorage('clothes', [])
  const router = useRouter()
  const loading = ref(false)
  const route = useRoute()
  const search = ref('')
  const temp_json = clothes_json.value

  const form = reactive({
    name: '',
    cost: 1,
    forPerson: '',
    perPcs:1,
    type: 1,
  })

  async function storeClothes() {
    if (loading.value) {
      console.warn('Be patient....')
      return 
    }

    loading.value = true

    if(_validate()) {
      return
    }

    const json = _makeJson()

    clothes_json.value.push(json)
    loading.value = false

    router.push({name: 'clothes.index'})
  }

  function resetForm() {
    form.name = ''
    form.cost = 1
    form.forPerson = ''
    form.perPcs = 1
    form.type = 1
    search.value = ''
    
    clothes_json.value = temp_json
  }

  function findClothes(clothes_id) {
    const data = clothes.value.find((item) => item.clothes_id == clothes_id)
    for (let item in data) {
      form[item] = data[item]
    }
    return data
  }

  function updateClothes(clothes_id) {
    if (loading.value) {
      console.warn('Be patient....')
      return 
    }

    loading.value = true

    if (_validate()) {
      return 
    }

    const json = _makeJson(true)
    const index = clothes.value.findIndex((item) => item.clothes_id === clothes_id)

    if (index != -1) {
      clothes_json.value[index] = json
    }
    
    loading.value = false

    router.push({name: 'clothes.index'})
  }

  function deleteClothes(clothes_id) {
    const isYes = confirm('Apakah ingin menghapus pakaian ini?')

    if (isYes) {
      const index = clothes.value.findIndex((item) => item.clothes_id === clothes_id)
      if (index!=-1) {
        clothes_json.value.splice(index,1)
      }
    }

  }

  function _getTypeName(type_num) {
    if (type_num == 1) {
      return 'Laundry'
    }

    return 'Setrikaan'
  }

  function _validate() {
    if (form.name == '') {
      alert('Kolom nama pakaian diperlukan')
      return true
    }

    return false
  }

  function _makeJson(isEdit = false) {
    const data = {
      name: form.name,
      cost: form.cost,
      image: form.image,
      perPcs: form.perPcs,
      forPerson: form.forPerson,
      cost_format: `${form.cost} ribu`, 
      description: `${form.cost} ribu / ${form.perPcs} pcs`,
      title: `${form.name} (${_getTypeName(form.type)}) ${form.forPerson}`
    }

    data.clothes_id = isEdit ? route.params.clothes_id : nanoid(16); 
    return JSON.stringify(data);
  }

  const clothes = computed(() => clothes_json.value.map((item) => JSON.parse(item)))

  watch(search, (newv, oldv) => {
    if (newv.length > 0) {
      clothes_json.value = clothes.value.filter((item) => item.title.indexOf(newv) != -1).map((item) => JSON.stringify(item))
    } else {
      clothes_json.value = temp_json
    }
  })

  return {
    form,
    clothes_json,
    clothes,
    search, 
    findClothes, 
    storeClothes, 
    resetForm, 
    updateClothes, 
    deleteClothes 
  }
})
