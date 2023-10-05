import React, { useState, useEffect } from "react";

const TextBox = ({ incrementScore, resetTimer }) => {
  const [text, setText] = useState("");

  const keywords =  ["세종대왕", "한글", "한글날", "10월9일"];
  const [keyword, setKeyword] = useState(keywords[0]);

  useEffect(() => {
    const randomKeyword = Math.floor(Math.random() * keywords.length);
    setKeyword(keywords[randomKeyword]);
  }, []);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && text.length >= 2) {
      const lastChar = keyword[keyword.length - 1];
      const firstChar = text[0];

      if (lastChar !== firstChar) {
        alert('다시 확인해주세요.');
        return;
      }

      fetch(`http://localhost:8000/search?q=${encodeURIComponent(text)}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);  // 이 로그를 추가하여 전체 데이터 구조를 확인
        
          if(data.userWordData && data.userWordData.item) {
              let wordItem = data.userWordData.item;
        
              // 배열인 경우 첫 번째 요소를 선택
              if(Array.isArray(wordItem)) {
                  wordItem = wordItem[0];
              }
        
              if(wordItem && wordItem.word) {
                  let word = wordItem.word;
                  word = word.replace(/[^a-zA-Z0-9가-힣]/g, '');  // 이 부분에서 공백도 제거
                  const total = parseInt(data.userWordData.total, 10);
                  const userInput = text.replace(/[^a-zA-Z0-9가-힣]/g, '').trim();  // 사용자 입력에서도 공백을 제거
              
              
                  // console.log(total);
                  // console.log(word);
                  // console.log(userInput);
              
                  if (total > 0 && userInput === word) {  
                      incrementScore();
                      resetTimer();
              
                      let computerWordItem = data.computerWordData ? data.computerWordData.item : null;
        
                      if (computerWordItem) {
                          if(Array.isArray(computerWordItem)) {
                              computerWordItem = computerWordItem[0];
                          }
        
                          setKeyword(computerWordItem.word);
                      } else {
                          setKeyword(text);
                      }
        
                      setText('');
                  } else {
                      console.log("Invalid word");
                  }
              } else {
                  console.error("The word is undefined");
              }
          } else {
              console.error("userWordData or userWordData.item is undefined");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderKeyword = () => {
    const lastChar = keyword[keyword.length - 1];
    const initialChars = keyword.slice(0, keyword.length - 1);
    return (
      <span>
        {initialChars}
        <span style={{ color: "red" }}>{lastChar}</span>
      </span>
    );
  };

  return (
    <>
      <div className="keyWord">{renderKeyword()}</div>
      <input
        type="text"
        autoComplete="off"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        value={text}
      />
    </>
  );
};

export default TextBox;