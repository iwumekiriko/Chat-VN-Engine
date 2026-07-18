import { useState } from "react";
import { fileToBase64 } from "../utils/file";

type Props = {
  userName: string;
  userAvatar: string;
  setUserAvatar: (v: string) => void;
  setUserName: (v: string) => void;
};

export default function SettingsContent({
  userName,
  userAvatar,
  setUserAvatar,
  setUserName,
}: Props) {

  const [name, setName] = useState(userName);
  const [avatar, setAvatar] = useState(userAvatar); 

  return (
    <div>
      <div className="flex gap-6">

        <div className="flex-1 space-y-4">

          <label className="text-xs font-bold uppercase tracking-wide text-gray-200">
              Никнейм
          </label>

          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              className="
                  w-full
                  rounded-lg
                  bg-[#1e1f22]
                  border border-[#3f4147]
                  px-4
                  py-3
                  text-white
                  placeholder:text-gray-500
                  transition
                  duration-150
                  focus:border-gray-500
                  focus:ring-2
                  focus:ring-gray-500/30
                  focus:outline-none
              "
          />

          <label className="text-xs font-bold uppercase tracking-wide text-gray-200">
              Аватар
          </label>

          <input
              type="file"
              accept="image/*"
              className="
                  w-full
                  rounded-lg
                  border border-[#3f4147]
                  bg-[#1e1f22]
                  px-3
                  py-2
                  text-gray-300
                  file:mr-4
                  file:rounded-md
                  file:border-0
                  file:bg-gray-600
                  file:px-4
                  file:py-2
                  file:text-white
                  file:cursor-pointer
                  hover:file:bg-gray-700
              "
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  setAvatar(await fileToBase64(file)); 
                } catch (error) {
                  console.error(error); 
                } 
              }}
          />
         
        </div>

        <div className="w-40 flex flex-col items-center">

          <img
              src={avatar || userAvatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#4b5563]"
          />

          <p className="mt-4 text-lg font-semibold text-white text-center">
              {name || "Без имени"}
          </p>

        </div>

      </div>

      <button
        onClick = {() => { 
          setUserName(name); 
          if (avatar) { setUserAvatar(avatar) };
        }}
        className="mt-4 px-4 py-2 cursor-pointer rounded bg-gray-500 text-white active:scale-95 transition-transform"
      >
        Сохранить
      </button>

    </div>
      
  );
}