<template>
  <div class="comments">
    <Toast />
    <CommentsUserPanel v-if="userStore?.authorized" :id="objectId" :type="'post'" @send="showToast($event)" />
    <div class="comments_other-users">
      <div class="comments_other-users_content">
        <CardsComment
          v-for="comment in postComments?.comments?.rows"
          :info="comment"
          :userId="userStore?.user?.id"
          @operation="showToast($event)"
          :mainAnswer="true"
        />
      </div>
      <div class="pagination_btns">
        <Paginator
          v-if="postComments?.pages > 1"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': ' PrevPageLink PageLinks NextPageLink ',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
          }"
          v-model:first="page"
          :total-records="postComments?.pages"
          :rows="1"
          currentPageReportTemplate="{last} из {totalRecords}"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useBlogStore } from '@/store/post';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const blogStore = useBlogStore();
const userStore = useUserStore();
const props = defineProps({
  objectId: Number,
});

let postComments = ref(await blogStore.getComment('post', props?.objectId, 1));
let page = ref(0);

watch(page, async () => {
  postComments.value = await blogStore.getComment('post', props?.objectId, page.value + 1);
});

async function showToast(event) {
  // toast.add({
  //   severity: event.toastType,
  //   summary: event.summary,
  //   detail: event.message,
  //   life: 3000,
  // });
  postComments.value = await blogStore.getComment('post', props?.objectId, page.value + 1);
}
</script>

<style lang="scss">
.comments {
  &_user-panel {
    display: flex;
    gap: 12px;
    &_comment {
      flex: 1 1 auto;

      display: flex;
      flex-direction: column;
      gap: 8px;
      align-self: flex-start;
      &_btns {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        &_item {
          display: flex;
          gap: 8px;
        }
      }
      &_text {
        width: 100%;
      }
    }
  }
  &_other-users {
    padding-top: 32px;
    &_content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }
}
</style>
