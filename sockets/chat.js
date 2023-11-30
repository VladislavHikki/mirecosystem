import { useChatsStore } from "~/store/chats";


let userInfo = {
    id: null,
    name: null,
}




export async function setUserInfo(id, name, avatar) {
    if(id == 'delete') {
        userInfo.id = null;
        userInfo.name = null;
    }
    else {
        const chat_store = useChatsStore();
        userInfo.id = id; 
        userInfo.name = name;
        let chat = await chat_store.getChatByProfile(id);
        if(!chat?.chatId) {
            let data = new FormData();
            data.append("ids", id);
            await chat_store.createChat(data)
            chat = await chat_store.getChatByProfile(id);
        }
        else {
            chat = chat?.chatId;
        }
        console.log(chat);
        // navigateTo("/profile/chat");
    }
    
}

export  function getUserInfo() {
    return userInfo;
}