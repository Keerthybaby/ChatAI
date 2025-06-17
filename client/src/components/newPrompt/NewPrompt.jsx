import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import ai from "../../lib/gemini";
import Markdown from "react-markdown";
// import { GenerateContentResponse } from "@google/genai";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);

  const add = async (text) => {
    setQuestion(text);

    let message;

    if (Object.keys(img.aiData).length > 0) {
      message = {
        role: "user",
        parts: [
          { text },
          img.aiData, // { inlineData: ... }
        ],
      };
    } else {
      message = {
        role: "user",
        parts: [{ text }],
      };
    }

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.0-flash-exp",
    //   contents: result,
    //   config: {
    //     safetySettings: [
    //       {
    //         category: "HARM_CATEGORY_HARASSMENT",
    //         threshold: "BLOCK_ONLY_HIGH",
    //       },
    //     ],
    //   },
    // });

    const response = await chat.sendMessageStream({ message });

    let accumulatedText="";

    for await (const chunk of response) {
      const chunkText = (chunk.text);
      console.log("_".repeat(80));
      console.log(chunkText);
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }

   
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;
    add(text);
  };
  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message ">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>

      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
