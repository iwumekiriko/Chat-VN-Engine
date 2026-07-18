import { useState } from "react";
import { profileStorage } from "../utils/storage";
import { type Character } from "../types/character";
import { createUserCharacter } from "./createUser";

import defaultAvatar from "../assets/default-avatar.jpg";

export function useProfile() {

  const [user, setUser] = useState<Character>(() => 

    createUserCharacter(

      profileStorage.getUserName() || "Кто я..?",

      profileStorage.getUserAvatar() || defaultAvatar

    )

  );

  function setUserName(name: string) {

    if (!name)
      name = "Кто я..?"

    setUser(prev => ({
      ...prev,
      name
    }));
  
    profileStorage.setUserName(name);

  }

  function setUserAvatar(avatar: string) {

    if (!avatar)
      avatar = defaultAvatar

    setUser(prev => ({

      ...prev,

      avatar
      
    }));

    profileStorage.setUserAvatar(avatar);

  }

  return {

    user,

    setUserName,

    setUserAvatar

  };

}