import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './components/modal';
function App() {
  const [data,setData] = useState([]);
  const [page,setPage] = useState(1);
  const [state, setState] = useState(false);
  const [src,setSrc] = useState(null);
  const [trans,setTrans] = useState(null);
  function infiniteScroll(){
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight  
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
  
    if (scrollTop + clientHeight >= scrollHeight) {
      let url=`https://images-api.nasa.gov/search?q=earth&page=${page+1}`
      axios.get(url)
      .then((res)=>{
        setPage(page+1);
        setData([...data, ...res.data.collection.items]);
      })
    }
  }
  useEffect(async ()=>{
    let url=`https://images-api.nasa.gov/search?q=earth&page=${page}`
    let temp = (await axios.get(url)).data.collection.items;
    setData(temp);
  },[]);
  useEffect(()=>{
    window.onscroll=infiniteScroll;
  },[data])
  function openModal(e){
    setState(true);
    setSrc(e.target.src);
  }
  function trasnlate(e){
    let body= {
      title: e.target.parentNode.parentNode.childNodes[0].textContent,
      description: e.target.parentNode.parentNode.childNodes[3].textContent
    }
    let url=`http://180.228.167.34:8080/news`
    axios.post(url,body)
    .then((res)=>{
      setTrans(res.data);
      setSrc(e.target.parentNode.parentNode.parentNode.childNodes[0].src);
    })
  }
  return (
    <>
      <Modal state={state} setState={setState} src={src} trans={trans} setTrans={setTrans}></Modal>
      <div className="container">
        {
          data && data.map((i)=>(
            <div className="card">
              <img onClick={openModal} className="img" src={i.links[0].href}></img>
              <div className="text-wrapper">
                <div className="title">{i.data[0].title}</div>
                <div className="createdat">{i.data[0].date_created} <button onClick={trasnlate}>번역</button></div>
                <ul className="keywords">
                  {
                    i.data[0].keywords && i.data[0].keywords.map((j)=>(
                      <li>{j}</li>
                    ))
                  }
                </ul>
                <div className="desc">{i.data[0].description}</div>
              </div>
              
            </div>
          ))
        }
        
      </div>
    </>
  );
}

export default App;
