export const profileStorage = {

  getUserName() {

    return localStorage.getItem("userName") || "User";

  },

  setUserName(name: string) {

    localStorage.setItem("userName", name);

  },

  getUserAvatar() {

    return localStorage.getItem("userAvatar");

  },

  setUserAvatar(avatar: string) {

    localStorage.setItem("userAvatar", avatar);

  }

};

import type { DialogueSave } from "../types/dialogue"; 

const STORAGE_KEY = "dialogue-save";

export function loadDialogue(): DialogueSave | null {

  const json = localStorage.getItem(STORAGE_KEY);

  if (!json) return null;

  try {

    return JSON.parse(json)

  } catch {

    return null;

  }

}

export function saveDialogue(data: DialogueSave) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(data)

  );

}

export function clearDialogue() {

  localStorage.removeItem(STORAGE_KEY);

}