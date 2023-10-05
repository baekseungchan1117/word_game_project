import React, {useState, useEffect} from 'react'

const Keyword = () => {
    const keywords = ["한글", "글자", "무지개"];
    const [keyword, setKeyword] = useState(keywords[0]);

    useEffect(()=>{
        const randomKeyword = Math.floor(Math.random() * keywords.length);
        setKeyword(keywords[randomKeyword])
    },[])
  return (
    <div className="keyWord">{keyword}</div>
  )
}

export default Keyword