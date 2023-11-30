<template>
  <div class="my-blog container">
    <Toast />
    <Dialog
      style="z-index: 1 !important; background-color: red"
      :draggable="false"
      header="Редактировать пост"
      v-model:visible="visibleModalEditPost"
    >
      <ModalsEditPost @closeModal="showToast($event), (visibleModalEditPost = false)" :post="selectedPost" />
    </Dialog>
    <Dialog :draggable="false" header="Создать пост" v-model:visible="visibleModalCreatePost">
      <ModalsAddPost @closeModal="showToast($event), (visibleModalCreatePost = false), send_socket($event)" />
    </Dialog>
    <div class="my-blog_container">
      <div class="my-blog_container_header">
        <h1 class="page-title">Мои посты</h1>
        <div class="my-blog_header">
          <Button class="addPost" @click="visibleModalCreatePost = true"
            ><span style="margin-right: 5px" class="pi pi-plus"></span>ДОБАВИТЬ</Button
          >
        </div>
      </div>
      <div ref="blogs_table" class="my-blog_container_table" style="padding-top: 32px">
        <DataTable :value="blogStore.blogs?.posts?.rows">
          <Column field="title" header="Картинка">
            <template #body="propsData">
              <NuxtLink :to="`/blogs/post/${propsData?.data?.id}`">
                <img
                  loading="lazy"
                  width="100"
                  height="100"
                  style="border-radius: 50%; object-fit: contain"
                  :src="`${url}/api/${propsData?.data?.preview}`"
                  alt=""
                />
              </NuxtLink>
            </template>
          </Column>
          <Column field="title" header="Заголовок"></Column>
          <Column field="text" header="Текст">
            <template #body="slotProps">
              <div class="my-blog_container_table_text" v-html="getDecode(slotProps?.data?.text)"></div>
            </template>
          </Column>
          <column header="Дата создания">
            <template #body="slotProps">
              {{
                new Date(slotProps?.data?.createdAt)?.toLocaleString('locale', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              }}
            </template>
          </column>
          <column header="Действия">
            <template #body="slotProps">
              <div class="category_content_btns">
                <Button @click="openModalEditPost(slotProps?.data)" class="red"></Button>
                <Button @click="deletePost(slotProps?.data?.id)" class="delete"></Button>
              </div>
            </template>
          </column>
        </DataTable>
      </div>
    </div>

    <div class="pagination_btns">
      <Paginator
        v-if="blogStore.blogs?.pages > 1"
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
        }"
        v-model:first="currentPage"
        :total-records="blogStore.blogs?.pages"
        :rows="1"
        currentPageReportTemplate="{last} из {totalRecords}"
      />
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from '@/store/post';
import { useUserStore } from '@/store/user';
import { useToast } from 'primevue/usetoast';
import url from '@/store/config';
import { useSocketStore } from '~/store/socket';

const toast = useToast();
const userStore = useUserStore();
const blogStore = useBlogStore();
const blogs_table = ref();

onMounted(() => {
  [...blogs_table.value.getElementsByClassName('my-blog_container_table_text')].map(table => getDescriptionForHtml(table));
});

let currentPage = ref(0);
let selectedPost = ref(null);
let visibleModalEditPost = ref(false);
let visibleModalCreatePost = ref(false);

const send_socket = async (e) => {
  console.log(e);
  const socket_store = useSocketStore();
  await socket_store.ws.send(JSON.stringify({ event: 'post', postId: e.data?.id }));
};

watch(currentPage, async () => {
  await blogStore.allBlogsByRubricId(currentPage.value + 1, { userId: userStore.user?.id });
});

async function deletePost(id) {
  const result = await userStore.deletePost(id);
  toast.add({
    severity: errorValidate(result?.status).toastType,
    summary: errorValidate(result?.status).summary,
    detail: errorValidate(result?.status).message,
    life: 3000,
  });
  const socket_store = useSocketStore();
  socket_store.ws.send(JSON.stringify({ event: 'post', postId: id }));
  await blogStore.allBlogsByRubricId(currentPage.value + 1, { userId: userStore.user?.id });
}

async function openModalEditPost(currentPost) {
  selectedPost.value = currentPost;
  visibleModalEditPost.value = true;
}

async function showToast(event) {
  await blogStore.allBlogsByRubricId(currentPage.value + 1, { userId: userStore.user?.id });
  toast.add({
    severity: event.toastType,
    summary: event.summary,
    detail: event.message,
    life: 3000,
  });
  [...blogs_table.value.getElementsByClassName('my-blog_container_table_text')].map(table => getDescriptionForHtml(table));
}

await blogStore.allBlogsByRubricId(1, { userId: userStore.user?.id });
</script>

<style lang="scss" scoped>
.addPost {
  background: linear-gradient(90.25deg, #01c314 9.03%, #7aea85 98.03%);
  border: none;
  border-radius: 23.5px;
  color: white;
  display: flex;
  justify-content: center;
  width: 191px;
  height: 44px;
}

.my-blog_container_table_text {
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  white-space: pre-wrap;
}
.my-blog_container_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: $x-small) {
    flex-direction: column;
  }
}
.addPost:hover {
  background: linear-gradient(90.25deg, #005f08 9.03%, #00c20d 98.03%) !important;
}
</style>
