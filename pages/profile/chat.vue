<template>
  <div class="container">
    <div class="chat">
      <div
        ref="user_panel"
        class="chat_item chat_users-panel"
        :class="chat_store.selected_chat.id ? 'chat_users-panel_type--disabled' : 'chat_users-panel_type--active'"
      >
        <div class="chat_users-panel_item chat_users-panel_search">
          <InputText @input="search" placeholder="Поиск" />
        </div>
        <div class="chat_users-panel_item chat_users-panel_container">
          <template v-if="all_chats?.length">
            <CardsChat
              v-for="value in all_chats"
              :info="value"
              @click="select_chat(value)"
              :selected="chat_store.selected_chat.id == value?.id ? true : false"
            />
          </template>
          <template v-else-if="search_chat && all_chats?.length">
            <div class="chat_users-panel_container_warning">
              <p>Нет результатов</p>
            </div>
          </template>
          <template v-else>
            <div class="chat_users-panel_container_warning">
              <p>У вас нет чатов</p>
            </div>
          </template>
        </div>
      </div>
      <div
        class="chat_item chat_content"
        :class="chat_store.selected_chat.id ? 'chat_content--active' : 'chat_content--disabled'"
      >
        <template v-if="!chat_store.selected_chat.id">
          <div class="chat_content--disabled_info rounded">Выберите чат, чтобы начать общение</div>
        </template>
        <template v-else>
          <div class="chat_content_header">
            <Button
              class="chat_content_header_cancel"
              @click="delete_selected_chat"
              icon="pi pi-arrow-left"
              rounded
              outlined
            />
            <BlocksUserAvatar
              @click="navigateTo(`/profile/${chat_store.selected_chat.user_info?.userId}`)"
              size="min"
              :status="chat_store.selected_chat.user_info?.status"
              :img="chat_store.selected_chat.user_info?.avatar"
              :roleId="chat_store.selected_chat.user_info?.roleId"
            />
            <div class="chat_content_header_name">
              {{ chat_store.selected_chat.user_info?.name }}
            </div>
          </div>
          <div class="chat_content_body" ref="messages_panel" @load="set_scroll_default" @scroll="scroll_content_chat">
            <template v-if="messages?.length">
              <CardsMessage
                class="chat_content_body_message"
                v-for="value in messages"
                :info="value"
                :type="user_store.user?.id == value?.userId ? 'user' : 'other-user'"
              />
            </template>
          </div>
          <div class="chat_content_footer">
            <div class="chat_content_footer_container">
              <textarea
                class="chat_content_footer_text-field"
                name=""
                id=""
                cols="1"
                rows="1"
                v-model.trim="message_text"
                @input="autosize"
                @keypress.enter="send_message"
                @keyup.exact.ctrl.enter="message_text ? (message_text += '\n') : ''"
                placeholder="Напишите что-нибудь"
              />
              <ChatsEmojiPicker @chooseEmoji="message_text += $event" />
            </div>

            <Button class="chat_content_footer_button" @click="send_message" label="Отправить" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatsStore } from '~/store/chats';
import { useSocketStore } from '~/store/socket';
import { useNotificationStore } from '~/store/notifications';
import { useInfiniteScroll } from '@vueuse/core';
import { useUserStore } from '~/store/user';

const user_store = useUserStore();
const socket_store = useSocketStore();
const chat_store = useChatsStore();
const notification_store = useNotificationStore();
const user_panel = ref(null);
const messages_panel = ref(null);

await chat_store.requestChats();

let search_chat = ref();
let message_text = ref(new String());
let all_chats = ref(chat_store.getChats);
let messages = ref();
let page_chat = ref(1);
let page_messages = ref(1);

socket_store.$onAction(async (e) => {
  if (e.name == 'msg_on_chat') {
    e.after(async (chat_id) => {
      if (chat_store.selected_chat.id == chat_id) {
        await chat_store.requestMessage(chat_id, 1);
        messages.value = chat_store.getMessages;
        if (notification_store.chatsNotification?.chatsNotifications.find((item) => item.chatId == chat_id))
          await delete_chat_notification(chat_id);
      }
    });
    page_messages.value = 1;
    await update_chats();
  }
});

onMounted(() => {
  if (process.client) {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') delete_selected_chat();
    });
  }
});

useInfiniteScroll(
  user_panel,
  async () => {
    if (!search_chat.value?.length) await load_chat();
    else await load_user();
  },
  { distance: 200 }
);

const delete_selected_chat = () => {
  chat_store.selected_chat.id = null;
  chat_store.selected_chat.user_info = null;
  messages.value = [];
};

onUnmounted(() => {
  chat_store.selected_chat.id = null;
  chat_store.selected_chat.user_info = null;
  messages.value = [];
});

const autosize = (e) => {
  e.target.style.height = 'auto';
  e.target.style.height = e.target.scrollHeight - 20 + 'px';
}

const search = async (e) => {
  page_chat.value = 1;
  search_chat.value = e.target.value;
  if (e.target.value?.length > 2) {
    setTimeout(async () => {
      await chat_store.searchUsers(1, e.target.value);
      all_chats.value = chat_store.filterUser?.users?.rows;
    }, 1000);
  } else all_chats.value = chat_store.getChats;
};

const load_chat = async () => {
  if (page_chat.value + 1 <= chat_store.chats?.pages) {
    await chat_store.requestChats(++page_chat.value);
    all_chats.value.push(...chat_store.getChats);
  }
};

const load_user = async () => {
  if (page_chat.value + 1 <= chat_store.filterUser?.pages) {
    await chat_store.searchUsers(++page_chat.value, search_chat.value);
    all_chats.value.push(...chat_store.filterUser?.users?.rows);
  }
};

const update_chats = async () => {
  page_chat.value = 1;
  await chat_store.requestChats(1);
  all_chats.value = chat_store.getChats;
};

const select_chat = async (value) => {
  if (value?.users?.length) {
    if (notification_store.chatsNotification?.chatsNotifications.find((item) => item.chatId == value?.id))
      await delete_chat_notification(value?.id);

    chat_store.selected_chat.id = value?.id;
    chat_store.selected_chat.user_info = {
      avatar: value?.users[0]?.avatar,
      status: value?.users[0]?.status,
      roleId: value?.users[0]?.roleId,
      name: value?.users[0]?.name,
      userId: value?.users[0]?.id,
      is_new_chat: false,
    };

    await chat_store.requestMessage(chat_store.selected_chat.id, 1);
    set_scroll_default();
    messages.value = chat_store.getMessages;
  } else {
    if (value?.chatId) {
      chat_store.selected_chat.id = value?.chatId;
      chat_store.selected_chat.user_info = {
        avatar: value?.avatar,
        status: value?.status,
        roleId: value?.roleId,
        name: value?.name,
        userId: value?.id,
      };
      await chat_store.requestMessage(chat_store.selected_chat.id, 1);
      set_scroll_default();
      messages.value = chat_store.getMessages;
    } else {
      let data = new FormData();
      data.append('ids', value?.id);
      await chat_store.createChat(data);
      chat_store.selected_chat.id = await chat_store.getChatByProfile(value?.id)?.chatId;
      chat_store.selected_chat.user_info = {
        avatar: value?.avatar,
        status: value?.status,
        roleId: value?.roleId,
        name: value?.name,
        userId: value?.id,
      };
      await chat_store.requestMessage(chat_store.selected_chat.id, 1);
      set_scroll_default();
      messages.value = chat_store.getMessages;
    }
  }
  page_messages.value = 1;
};

const scroll_content_chat = async (e) => {
  if (messages_panel.value.scrollTop == 0) {
    if (page_messages.value + 1 <= chat_store.messages?.pages) {
      await chat_store.requestMessage(chat_store.selected_chat.id, ++page_messages.value);
      messages.value.unshift(...chat_store.getMessages.reverse());
      set_new_pos_scroll();
    }
  }
};

const set_new_pos_scroll = async () => {
  let start_scroll = messages_panel.value.scrollHeight;
  await nextTick(() => {
    return;
  });
  messages_panel.value.scrollTop = messages_panel.value.scrollHeight - start_scroll;
};

const  set_scroll_default = async () => {
  await nextTick(() => {
    return;
  });
  messages_panel.value.scrollTop = messages_panel.value.scrollHeight;
};

const send_message = async (e) => {
  if (message_text.value?.length) {
    let data = new FormData();
    data.append('chatId', chat_store.selected_chat.id);
    data.append('text', message_text.value);
    chat_store.createMessage(data, chat_store.selected_chat.id);
    message_text.value = new String();
    autosize(e);
  }
};

const delete_chat_notification = async (id) => {
  let data = new FormData();
  data.append('chatId', id);
  await notification_store.deleteChatsNotification(data);
};

if (chat_store.selected_chat.id) {
  await chat_store.requestMessage(chat_store.selected_chat.id, page_messages.value);
  messages.value = chat_store.getMessages;
  set_scroll_default();
}

</script>
