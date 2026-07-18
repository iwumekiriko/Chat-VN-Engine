import { Status, type Character } from "../types/character";
import type { Emotion } from "../types/dialogue";

type Props = {
  character: Character;
  emotion: Emotion;
  onOpenSettings: () => void;
};

export default function Profile({
  character,
  emotion,
  onOpenSettings,
}: Props) {

  const statusColors = {
    [Status.Online]: "text-green-500",
    [Status.Idle]: "text-orange-500",
    [Status.Away]: "text-red-500"
  };

  const avatar = character.portraits[emotion] ?? character.avatar;

  return (
    <div className="w-[22rem] shrink-0 bg-[#1e1f22] text-white h-full p-4 flex flex-col items-center gap-4 border-r border-[#2b2d31]">
      <img
        src={avatar}
        alt={character.name}
        className="w-80 h-80 object-cover cursor-pointer"
      />

      <div className="text-xl font-bold">{character.name}</div>
      <div className={`text-sm ${statusColors[character.status]}`}>{character.status}</div>
      <div className="text-sm text-gray-300 text-center">{character.description}</div>

      <button
        onClick={onOpenSettings}
        className="mt-auto text-white hover:text-gray-300 cursor-pointer p-5 border-t border-[#2b2d31]"
      >
        Изменить свой профиль
      </button>
    </div>
  );
}