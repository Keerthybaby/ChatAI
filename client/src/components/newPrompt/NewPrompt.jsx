import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import ai from "../../lib/gemini";
// import { GenerateContentResponse } from "@google/genai";

const NewPrompt = () => {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  // const add = async () => {
  //   const prompt ="write a story about an AI and magic"
  //   const response = await model.generateContent(prompt);
  //   const text = response.text();
  //   console.log(text);
  // };
  const add = async () => {
    const unsafePrompt =
      "I support Martians Soccer Club and I think " +
      "Jupiterians Football Club sucks! Write an ironic phrase telling " +
      "them how I feel about them.";
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: unsafePrompt,
      config: {
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH",
          },
        ],
      },
    });

    console.log(response.text);
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
      <div className="endChat" ref={endRef}></div>
      <button onClick={add}>TEST AI</button>
      <form className="newForm">
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Ask anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
