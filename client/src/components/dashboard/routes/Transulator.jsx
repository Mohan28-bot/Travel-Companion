import React, { useState } from "react";
import axios from "axios";
import { FaVolumeUp } from "react-icons/fa";

function Transulator() {
  const [showSpeakNow, setShowSpeakNow] = useState(false);
  const [Text, setText] = useState("");
  const [TextLanguage, setTextLanguage] = useState("te");
  const [speechLanguage, setSpeechLanguage] = useState("te");
  const [TranslatedText, setTranslatText] = useState("");

  const [listening, setListening] = useState(false);
  const [recording, setRecording] = useState(false);

  // Manual Translate
  const handleTranslate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/translate",
        {
          user_text: Text,
          text_language: TextLanguage,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setTranslatText(response.data.traslated_text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Play Translated Text
  const output_voice = () => {
    if (TranslatedText) {
      let utterance = new SpeechSynthesisUtterance(TranslatedText);
      utterance.lang = TextLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  // Speech-to-Text -> Translate
  const startListening = () => {
    setShowSpeakNow(true);
    setTimeout(() => setShowSpeakNow(false), 5000);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en"; // input voice language

        recognition.onstart = () => setListening(true);

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          setRecording(true);
          translate(transcript);
        };

        recognition.onend = () => setListening(false);
        recognition.start();
      })
      .catch((error) => console.error("Error:", error));
  };

  // Call Backend for Speech Translation
  const translate = (text) => {
    axios
      .post("http://localhost:5000/speechtranslate", {
        text: text,
        target_lang: speechLanguage,
      })
      .then((response) => {
        setTranslatText(response.data.translated_text);
        const audio = new Audio("http://localhost:5000" + response.data.audio_file);
        audio.play();
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setRecording(false));
  };

  return (
    <div className="lang_container">
      <h1>Language Translator</h1>

      {/* Manual Translate */}
      <div className="input_box">
        <form onSubmit={handleTranslate}>
          <textarea
            rows="8"
            cols="50"
            placeholder="Enter Text"
            value={Text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>

          <div className="lang_in">
            <p>Translate to</p>
            <select
              value={TextLanguage}
              onChange={(e) => setTextLanguage(e.target.value)}
            >
              <option value="te">Telugu</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
              {/* add more if needed */}
            </select>
            <button type="submit">Translate</button>
          </div>
        </form>

        <div className="output_textarea">
          <textarea
            rows="8"
            cols="50"
            placeholder="Translation"
            value={TranslatedText}
            disabled
          ></textarea>
          <div>
            <FaVolumeUp id="voice_icon" onClick={output_voice} />
          </div>
        </div>
      </div>

      {/* Speech Translate */}
      <div className="input_box2">
        <h2>Speech Translate</h2>
        <div className="lang_in">
          <p>Translate to</p>
          <select
            value={speechLanguage}
            onChange={(e) => setSpeechLanguage(e.target.value)}
          >
            <option value="te">Telugu</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="es">Spanish</option>
          </select>
          <button onClick={startListening} disabled={listening}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/14026/14026816.png"
              alt="Mic"
            />
          </button>
          {showSpeakNow && <span>🎤 Speak Now...</span>}
          {recording && <p>Recording...</p>}
        </div>
      </div>
    </div>
  );
}

export default Transulator;
