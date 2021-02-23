import React, { createContext,  useState } from "react";
import './app.css';
import axios from "axios";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [data, setData] = useState();
  const [text, setText] = useState('');
  const apiKey = "b268d327bdaa49599ad0bc5bdb29e91e";


 const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      alert('Invalid Search')
    } else {
    axios
      .get(
        `http://newsapi.org/v2/everything?q=${text}&from=2021-01-23&sortBy=publishedAt&apiKey=${apiKey}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
     
      setText('');
    }
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
      <div>
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input
                type='text'
                name='text'
                placeholder='Search Users...'
                value={text}
                onChange={onChange}
                />
                <input
                type='submit'
                value='Search'
                className='btn btn-dark btn-block'
                />
            </form>
        </div>
    <NewsContext.Provider value={{ data }}>
      {props.children}
    </NewsContext.Provider>
    </div>
  );
};
