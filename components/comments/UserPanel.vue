<template>
  <div class="comments_user-panel">
    <div class="avatar_container comments_user-panel_avatar" v-if="showAvatar">
      <BlocksUserAvatar
        size="medium"
        :status="userStore?.user?.status"
        :img="userStore?.user?.avatar"
        :roleId="checkRoles(userStore?.user?.roles, 2)"
      />
    </div>
    <div class="comments_user-panel_comment">
      <Textarea
        style="width: 100%"
        v-model.trim="userComment"
        placeholder="Введите комментарий"
        autoResize
        rows="2"
        @focus="focus = true"
        class="comments_user-panel_comment_text"
      />
      <div v-if="focus" class="comments_user-panel_comment_btns">
        <div class="comments_user-panel_comment_btns_item">
          <Button @click="(focus = false), $emit('update:focus', focus)" label="Отмена"></Button>
          <Button @click="sendComment('post')" label="Отправить"></Button>
        </div>
        <div class="comments_user-panel_comment_btns_item">
          <ChatsEmojiPicker @chooseEmoji="userComment += $event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import url from '@/store/config';
import { useBlogStore } from '@/store/post';
import { useUserStore } from '@/store/user';

const blogStore = useBlogStore();
const userStore = useUserStore();
const emit = defineEmits(['send', 'closeFocus', 'update:focus']);
const props = defineProps({
  id: Number,
  type: String,
  showAvatar: {
    default: true,
    type: Boolean,
  },
  focus: {
    type: Boolean,
    default: false,
  },
});

let userComment = ref(new String());

async function sendComment(type) {
  let form = new FormData();
  form.append('text', userComment.value);
  const result = await blogStore.addComment(props?.type, props?.id, form);
  userComment.value = '';
  emit('send', errorValidate(result?.status));
}
</script>
