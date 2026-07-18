import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DialogueImage } from "../types/dialogue";

type Props = {

  avatar: string;

  name: string;

  text: string;

  image?: DialogueImage;

  openImage?(image: DialogueImage): void;

  action?: {

    text: string;

    onclick(): void;

  };

};

export default function Message({

  avatar,

  name,

  text,

  image,

  openImage,

  action,

}: Props) {

  return (

    <div className="flex gap-3 py-2">

      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover mt-1"
      />

      <div className="min-w-0 flex-1">

        <div className="font-semibold text-white">{name}</div>

        <div className="prose prose-invert max-w-none break-words">

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{

              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,

              em: ({ children }) => <em className="italic">{children}</em>,

              strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,

              a: ({ href, children }) => (

                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline"
                >

                  {children}

                </a>

              ),

              ul: ({ children }) => <ul className="list-disc pl-5 mb-2">{children}</ul>,

              ol: ({ children }) => <ol className="list-decimal pl-5 mb-2">{children}</ol>,

              li: ({ children }) => <li className="mb-1">{children}</li>,

              blockquote: ({ children }) => (

                <blockquote className="border-l-4 border-gray-500 pl-3 italic opacity-80 mb-2">

                  {children}

                </blockquote>

              ),

              code: ({ children }) => (

                <code className="bg-[#1e1f22] px-1 py-0.5 rounded text-pink-300">

                  {children}

                </code>

              ),

              h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,

              h2: ({ children }) => <h2 className="text-xl font-bold mb-2">{children}</h2>,

              h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,

            }}

          >

            {text}

          </ReactMarkdown>

          {image && openImage && (
            
            <img
              src={image.image}
              onClick={() => openImage(image)}
              className="cursor-pointer aspect-video max-w-100 object-cover mt-1 border-3 border-double"
            />)}

          {action && (

            <button
              onClick={action.onclick}
              className="mt-3 rounded cursor-pointer bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >

              {action.text}

            </button>

          )}

        </div>

      </div>

    </div>

  );

}