import { defineStore } from 'pinia';
import { useNotificationStore } from './notifications';
import { ws_url } from './config';
import { useUserStore } from './user';

export const useSocketStore = defineStore({
  id: 'socket-store',
  state: () => {
    return {
      ws: null,
    };
  },

  actions: {
    async connect(id) {
      this.ws = new WebSocket(`${ws_url}userId=${id}`);
      this.ws.onmessage = async (value) => {
        console.error(value.data);
        const notification_store = useNotificationStore();
        switch (true) {
          //Чат
          case value.data.includes('msg'):
            await this.msg_on_chat(notification_store, value.data);
            break;
          //Спонсорство
          case value.data.includes('sponsor'):
          case value.data.includes('student'):
            await this.sponsorship(notification_store);
            break;
          //Смена роли
          case value.data.includes('change role'):
            const user_store = useUserStore();
            await user_store.check(useCookie('l').value);
            await this.change_role(notification_store);
            break;
          //Финансы
          case value.data.includes('transaction'):
            console.log(value.data);
            await this.transaction(notification_store);
            break;
          case value.data.includes('post'):
            console.log('POST _ ' + value.data);
            await this.new_post(notification_store);
            break;
          default:
            break;
        }
      };

      this.ws.onclose = () => {
        this.ws = new WebSocket(`${ws_url}?userId=${id}`);
      };
    },

    play_chat_notification_sound() {
      const route = useRoute();
      if (route.path != '/profile/chat') {
        let sound = new Audio('/sounds/chat_notification.wav');
        sound.play();
      }
    },

    play_other_notification_sound() {
      let sound = new Audio('/sounds/other_notification.mp3');
      sound.play();
    },

    play_new_post_notification() {
      let sound = new Audio('/sounds/chat_notification.wav');
      sound.play('/sounds/post-notification.mp3');
    },

    play_post_notification_sound() {
      let sound = new Audio('/sounds/post_notification.mp3');
      sound.play();
    },

    async msg_on_chat(notification_store, request) {
      await notification_store.requestChatsNotifications();
      const number_regex = /[0-9]/gi;
      const chat_id = request.match(number_regex).join('');
      this.play_chat_notification_sound();
      return chat_id;
    },

    async transaction(notification_store) {
      await notification_store.requestTransNotification();
      this.play_other_notification_sound();
    },

    async new_post(notification_store) {
      await notification_store.requestPostsNotification();
      if (notification_store.getPostsNotification) this.play_new_post_notification();
    },

    async sponsorship(notification_store) {
      await notification_store.requestSponsorsNotification();
      this.play_other_notification_sound();
    },

    async change_role(notification_store) {
      await notification_store.requestRolesNotification();
      this.play_other_notification_sound();
    },
  },
  getters: {},
});
