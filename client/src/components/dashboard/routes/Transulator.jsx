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

  const select_tag = document.getElementById("ot_text");
  const handleTranslate = async (e) => {
    e.preventDefault();
    try {
      select_tag.setAttribute("placeholder", "Translating....");
      const response = await axios.post(
        "http://localhost:5000/translate",
        {
          user_text: Text,
          text_language: TextLanguage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTranslatText(response.data.traslated_text);
      // console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const output_voice = () => {
    let utterance;
    if (TranslatedText) {
      utterance = new SpeechSynthesisUtterance(TranslatedText);
      utterance.lang = TextLanguage;
    }
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    setShowSpeakNow(true);
    setTimeout(() => {
      setShowSpeakNow(false);
    }, 5000);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en";
        recognition.onstart = () => {
          setListening(true);
        };
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          setRecording(true);
          translate(transcript);
        };
        recognition.onend = () => {
          setListening(false);
        };
        recognition.start();
      })
      .catch((error) => console.error("Error:", error));
  };

  const translate = (text) => {
    console.log(text);
    axios
      .post("http://localhost:5000/speechtranslate", { text: text })
      .then((response) => {
        setTranslatText(response.data.translated_text);
        const audio = new Audio("translated_output.mp3");
        audio.play();
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setRecording(false);
      });
  };
  return (
    <div className="lang_container">
      <h1>Language Translator</h1>
      <div className="input_box">
        <form onSubmit={handleTranslate}>
          <div>
            <textarea
              rows="8"
              cols="50"
              placeholder="Enter Text"
              value={Text}
              onChange={(e) => setText(e.target.value)}
              id="input_textarea"
              required
            ></textarea>
          </div>
          <div className="lang_in">
            <p>Translat to</p>
            <select
              value={TextLanguage}
              onChange={(e) => setTextLanguage(e.target.value)}
            >
              <option value="te">Telugu</option>
              <option value="af">Afrikaans</option>
              <option value="sq">Albanian</option>
              <option value="am">Amharic</option>
              <option value="ar">Arabic</option>
              <option value="hy">Armenian</option>
              <option value="az">Azerbaijani</option>
              <option value="eu">Basque</option>
              <option value="be">Belarusian</option>
              <option value="bn">Bengali</option>
              <option value="bs">Bosnian</option>
              <option value="bg">Bulgarian</option>
              <option value="ca">Catalan</option>
              <option value="ceb">Cebuano</option>
              <option value="ny">Chichewa</option>
              <option value="zh-cn">Chinese (Simplified)</option>
              <option value="zh-tw">Chinese (Traditional)</option>
              <option value="co">Corsican</option>
              <option value="hr">Croatian</option>
              <option value="cs">Czech</option>
              <option value="da">Danish</option>
              <option value="nl">Dutch</option>
              <option value="en">English</option>
              <option value="eo">Esperanto</option>
              <option value="et">Estonian</option>
              <option value="tl">Filipino</option>
              <option value="fi">Finnish</option>
              <option value="fr">French</option>
              <option value="fy">Frisian</option>
              <option value="gl">Galician</option>
              <option value="ka">Georgian</option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="gu">Gujarati</option>
              <option value="ht">Haitian Creole</option>
              <option value="ha">Hausa</option>
              <option value="haw">Hawaiian</option>
              <option value="iw">Hebrew</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="hmn">Hmong</option>
              <option value="hu">Hungarian</option>
              <option value="is">Icelandic</option>
              <option value="ig">Igbo</option>
              <option value="id">Indonesian</option>
              <option value="ga">Irish</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="jw">Javanese</option>
              <option value="kn">Kannada</option>
              <option value="kk">Kazakh</option>
              <option value="km">Khmer</option>
              <option value="ko">Korean</option>
              <option value="ku">Kurdish (Kurmanji)</option>
              <option value="ky">Kyrgyz</option>
              <option value="lo">Lao</option>
              <option value="la">Latin</option>
              <option value="lv">Latvian</option>
              <option value="lt">Lithuanian</option>
              <option value="lb">Luxembourgish</option>
              <option value="mk">Macedonian</option>
              <option value="mg">Malagasy</option>
              <option value="ms">Malay</option>
              <option value="ml">Malayalam</option>
              <option value="mt">Maltese</option>
              <option value="mi">Maori</option>
              <option value="mr">Marathi</option>
              <option value="mn">Mongolian</option>
              <option value="my">Myanmar (Burmese)</option>
              <option value="ne">Nepali</option>
              <option value="no">Norwegian</option>
              <option value="or">Odia</option>
              <option value="ps">Pashto</option>
              <option value="fa">Persian</option>
              <option value="pl">Polish</option>
              <option value="pt">Portuguese</option>
              <option value="pa">Punjabi</option>
              <option value="ro">Romanian</option>
              <option value="ru">Russian</option>
              <option value="sm">Samoan</option>
              <option value="gd">Scots Gaelic</option>
              <option value="sr">Serbian</option>
              <option value="st">Sesotho</option>
              <option value="sn">Shona</option>
              <option value="sd">Sindhi</option>
              <option value="si">Sinhala</option>
              <option value="sk">Slovak</option>
              <option value="sl">Slovenian</option>
              <option value="so">Somali</option>
              <option value="es">Spanish</option>
              <option value="su">Sundanese</option>
              <option value="sw">Swahili</option>
              <option value="sv">Swedish</option>
              <option value="tg">Tajik</option>
              <option value="ta">Tamil</option>
              <option value="th">Thai</option>
              <option value="tr">Turkish</option>
              <option value="uk">Ukrainian</option>
              <option value="ur">Urdu</option>
              <option value="ug">Uyghur</option>
              <option value="uz">Uzbek</option>
              <option value="vi">Vietnamese</option>
              <option value="cy">Welsh</option>
              <option value="xh">Xhosa</option>
              <option value="yi">Yiddish</option>
              <option value="yo">Yoruba</option>
              <option value="zu">Zulu</option>
            </select>
            <button type="submit">Translat</button>
          </div>
        </form>
        <div className="output_textarea">
          <textarea
            id="ot_text"
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
      <div className="input_box2">
        <div>
          <textarea
            rows="8"
            cols="50"
            placeholder="Your Text"
            disabled
          ></textarea>
        </div>
        <div className="lang_in">
          <p>Translat to</p>
          <select
            value={speechLanguage}
            onChange={(e) => setSpeechLanguage(e.target.value)}
          >
            <option value="te">Telugu</option>
            <option value="af">Afrikaans</option>
            <option value="sq">Albanian</option>
            <option value="am">Amharic</option>
            <option value="ar">Arabic</option>
            <option value="hy">Armenian</option>
            <option value="az">Azerbaijani</option>
            <option value="eu">Basque</option>
            <option value="be">Belarusian</option>
            <option value="bn">Bengali</option>
            <option value="bs">Bosnian</option>
            <option value="bg">Bulgarian</option>
            <option value="ca">Catalan</option>
            <option value="ceb">Cebuano</option>
            <option value="ny">Chichewa</option>
            <option value="zh-cn">Chinese (Simplified)</option>
            <option value="zh-tw">Chinese (Traditional)</option>
            <option value="co">Corsican</option>
            <option value="hr">Croatian</option>
            <option value="cs">Czech</option>
            <option value="da">Danish</option>
            <option value="nl">Dutch</option>
            <option value="en">English</option>
            <option value="eo">Esperanto</option>
            <option value="et">Estonian</option>
            <option value="tl">Filipino</option>
            <option value="fi">Finnish</option>
            <option value="fr">French</option>
            <option value="fy">Frisian</option>
            <option value="gl">Galician</option>
            <option value="ka">Georgian</option>
            <option value="de">German</option>
            <option value="el">Greek</option>
            <option value="gu">Gujarati</option>
            <option value="ht">Haitian Creole</option>
            <option value="ha">Hausa</option>
            <option value="haw">Hawaiian</option>
            <option value="iw">Hebrew</option>
            <option value="he">Hebrew</option>
            <option value="hi">Hindi</option>
            <option value="hmn">Hmong</option>
            <option value="hu">Hungarian</option>
            <option value="is">Icelandic</option>
            <option value="ig">Igbo</option>
            <option value="id">Indonesian</option>
            <option value="ga">Irish</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="jw">Javanese</option>
            <option value="kn">Kannada</option>
            <option value="kk">Kazakh</option>
            <option value="km">Khmer</option>
            <option value="ko">Korean</option>
            <option value="ku">Kurdish (Kurmanji)</option>
            <option value="ky">Kyrgyz</option>
            <option value="lo">Lao</option>
            <option value="la">Latin</option>
            <option value="lv">Latvian</option>
            <option value="lt">Lithuanian</option>
            <option value="lb">Luxembourgish</option>
            <option value="mk">Macedonian</option>
            <option value="mg">Malagasy</option>
            <option value="ms">Malay</option>
            <option value="ml">Malayalam</option>
            <option value="mt">Maltese</option>
            <option value="mi">Maori</option>
            <option value="mr">Marathi</option>
            <option value="mn">Mongolian</option>
            <option value="my">Myanmar (Burmese)</option>
            <option value="ne">Nepali</option>
            <option value="no">Norwegian</option>
            <option value="or">Odia</option>
            <option value="ps">Pashto</option>
            <option value="fa">Persian</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="pa">Punjabi</option>
            <option value="ro">Romanian</option>
            <option value="ru">Russian</option>
            <option value="sm">Samoan</option>
            <option value="gd">Scots Gaelic</option>
            <option value="sr">Serbian</option>
            <option value="st">Sesotho</option>
            <option value="sn">Shona</option>
            <option value="sd">Sindhi</option>
            <option value="si">Sinhala</option>
            <option value="sk">Slovak</option>
            <option value="sl">Slovenian</option>
            <option value="so">Somali</option>
            <option value="es">Spanish</option>
            <option value="su">Sundanese</option>
            <option value="sw">Swahili</option>
            <option value="sv">Swedish</option>
            <option value="tg">Tajik</option>
            <option value="ta">Tamil</option>
            <option value="th">Thai</option>
            <option value="tr">Turkish</option>
            <option value="uk">Ukrainian</option>
            <option value="ur">Urdu</option>
            <option value="ug">Uyghur</option>
            <option value="uz">Uzbek</option>
            <option value="vi">Vietnamese</option>
            <option value="cy">Welsh</option>
            <option value="xh">Xhosa</option>
            <option value="yi">Yiddish</option>
            <option value="yo">Yoruba</option>
            <option value="zu">Zulu</option>
          </select>
          <button onClick={startListening} disabled={listening}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/14026/14026816.png"
              alt="Mic"
            />
          </button>
          {showSpeakNow && (
            <span>
              <span></span>Speak Now
            </span>
          )}
          {recording && <p>Recording...</p>}
        </div>
        <div>
          <textarea
            rows="8"
            cols="50"
            placeholder="Translation"
            disabled
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Transulator;
