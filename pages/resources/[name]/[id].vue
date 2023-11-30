<template>
   
    <div class="container">
      <BlocksSearchResourse />
    <section class="resources">
      <div class="resource_form_item">
        <h2 style="margin-bottom: 0;">{{ resource?.subcategory?.label }}</h2>
        <div class="find-input_resource_filter">
          <InputText v-model.trim="txt" @input="searchResources" placeholder="Поиск" />
        </div>
      </div>
        
        <div class="franchisingLeaders-cards" v-if="resource?.resources?.rows?.length">
          <div
            class="franchisingLeaders-card_container"
            v-if="resource?.resources?.rows?.length > 0"
            v-for="(value, index) in getSortWhereLabel(resource?.resources?.rows)"
            :key="index"
          >
            <CardsResource :data="value" :showAllTxt="false" />
          </div>
        </div>
        <div class="warning" v-else>
           
            <h2> Ресурсов нет</h2>
        </div>
        <div class="pagination_btns">
            <Paginator
              v-if="resource?.pages > 1"
              :template="{
                '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                '1300px': ' PrevPageLink PageLinks NextPageLink ',
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
              }"
              v-model:first="page"
              :total-records="resource?.pages"
              :rows="1"
              currentPageReportTemplate="{last} из {totalRecords}"
            />
        </div>
    </section>
       
    </div>
</template>

<script setup>
    import {useCategoryStore} from "@/store/category"
    import { getSortWhereLabel } from '@/store/sort';
    const route = useRoute();
    const categoryStore = useCategoryStore();
    let page = ref(0);
    let txt = ref();
    const resource = ref(null)
    let inputText = ref('');

    async function searchResources(event) {
      inputText.value = event.target.value;
      resource.value = await categoryStore.requestResourcesBySubcategory(route.params.id, 1, event.target.value);
    }

    watch(page, async ()=>{
        resource.value = await categoryStore.requestResourcesBySubcategory(route.params.id, page.value + 1, inputText.value);
    })

    onMounted(async () => {
        resource.value = await categoryStore.requestResourcesBySubcategory(route.params.id, 1, inputText.value);
    });
</script>