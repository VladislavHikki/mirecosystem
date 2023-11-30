<template>
  <!-- @mouseover="hoverComment = true" @mouseout="hoverComment = null" -->
  <div class="comment" lang="ru">
    <div class="comment_content">
      <NuxtLink :to="`/profile/${info?.user?.id}`">
        <div class="comment_content_user_avatar avatar_container">
          <BlocksUserAvatar
            size="medium"
            :status="info?.user?.status"
            :img="info?.user?.avatar"
            :roleId="checkRoles(info?.user?.roles, 2)"
          />
        </div>
      </NuxtLink>
      <div class="comment_content_user_info">
        <div class="comment_content_user_info_name">
          <p class="comment_content_user_info_name_user">
            {{ info?.user?.name }}
          </p>
          <p class="comment_content_user_info_name_date">
            {{
              new Date(info?.createdAt).toLocaleString('locale', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })
            }}
          </p>
        </div>
        <div class="comment_content_user_info_text">
          <p v-if="!isEdit" v-html="checkRoles(info?.user?.roles, 1) ? getDescription(info?.text) : info?.text"></p>
          <div class="comment_content_user_info_text-editor" v-if="isEdit">
            <Textarea style="width: 100%" autoResize rows="2" v-model="editText" />
            <div class="comment_content_user_info_text-editor_btns">
              <div class="comment_content_user_info_text-editor_btns_item">
                <Button @click="editComment">Изменить</Button>
                <Button @click="isEdit = false">Отмена</Button>
              </div>
              <div class="comment_content_user_info_text-editor_btns_emoji">
                <ChatsEmojiPicker @chooseEmoji="editText += $event" />
              </div>
            </div>
          </div>
        </div>
        <div class="comment_content_user_info_details">
          <div class="comment_content_info_likes-count">
            <span
              style="cursor: pointer; user-select: none"
              @click="liked('comment', info?.id)"
              :class="info?.liked ? 'pi pi-heart-fill' : 'pi pi-heart'"
            >
            </span>
            {{ info?.likesCount }}
          </div>
          <div
            @click="answerVisible = !answerVisible"
            class="comment_info_answer"
            style="color: rgb(44, 150, 234); cursor: pointer"
          >
            <span
              :class="answerVisible && answersUsers?.comments?.rows?.length ? 'pi pi-angle-up' : 'pi pi-angle-down'"
            ></span>
            {{ info?.answersCount }} {{ declOfNum(info?.answersCount, ['Ответ', 'Ответа', 'Ответов']) }}
          </div>
          <div v-if="userStore?.authorized" class="comment_info_answer" @click="openAnswer" style="cursor: pointer">
            Ответить
          </div>
        </div>
        <div class="comment_info_answer_detail" v-if="answerText">
          <CommentsUserPanel
            @send="update($event)"
            v-model:focus="answerText"
            :id="info?.id"
            :type="'comment'"
            :showAvatar="false"
          />
        </div>
      </div>
      <!-- v-show="hoverComment && userId == info?.user?.id" -->
      <div v-if="userId == info?.user?.id" class="comment_content_user_operations">
        <Button @click="toggle($event)" outlined rounded icon="pi pi-ellipsis-v" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>

    <div
      class="comment_info_answer_users"
      :class="{ 'comment_info_answer-main': mainAnswer }"
      v-if="answerVisible && answersUsers?.comments?.rows?.length"
    >
      <CardsComment
        v-for="comment in answersUsers?.comments?.rows"
        :info="comment"
        :userId="userStore?.user?.id"
        @operation="update($event)"
      />
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';
import { useBlogStore } from '@/store/post';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const blogStore = useBlogStore();
const props = defineProps(['info', 'userId', 'mainAnswer']);
const emit = defineEmits(['liked', 'operation']);
const menu = ref();

let editText = ref(null);
let answerText = ref(false);
let isEdit = ref(false);
let answerVisible = ref(false);
let answersUsers = ref(await blogStore.getComment('comment', props?.info?.id, 1));

const toggle = (event) => {
  menu.value.toggle(event);
};

const openAnswer = async () => {
  answerText.value = !answerText.value;
  answersUsers.value = await blogStore.getComment('comment', props?.info?.id, 1);
};

const update = async (event) => {
  answersUsers.value = await blogStore.getComment('comment', props?.info?.id, 1);
  emit('operation', event);
};

const liked = async (type, id) => {
  const result = await blogStore.like(type, id);
  emit('operation', errorValidate(result?.status));
};

const deleteComment = async () => {
  const result = await blogStore.deleteComment(props?.info?.id);
  emit('operation', errorValidate(result?.status));
};

const editComment = async () => {
  let form = new FormData();
  form.append('text', editText.value);
  isEdit.value = false;
  const result = await blogStore.editComment(props?.info?.id, form);
  answersUsers.value = await blogStore.getComment('comment', props?.info?.id, 1);
  emit('operation', errorValidate(result?.status));
};

const edit = () => {
  isEdit.value = true;
  editText.value = props?.info?.text;
};

const items = ref([
  {
    label: 'Редактировать',
    icon: 'pi pi-pen',
    command: edit,
  },
  {
    label: 'Удалить',
    icon: 'pi pi-tresh',
    command: deleteComment,
  },
]);
</script>

<style lang="scss">
.comment {
  &_info {
    hyphens: auto;
    &_answer {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    &_answer_users {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 24px;
    }
    &_answer-main {
      padding-left: 32px;
    }
  }
  &_content {
    display: flex;
    gap: 16px;
    &_user_avatar > img {
      object-fit: cover;
    }
    &_user_info {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      gap: 8px;
      &_name {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        &_user {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 1;
        }
        &_date {
          color: var(--date-text);
        }
      }
      &_details {
        display: flex;
        gap: 8px;
      }
      &_text {
        & > p {
          white-space: pre-wrap;
          // word-break: break-all;
        }
        &-editor_btns {
          padding-top: 8px;
          display: flex;
          justify-content: space-between;
          &_item {
            display: flex;
            gap: 8px;
          }
        }
      }
    }
  }
}
</style>
