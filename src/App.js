import './App.css';
import {useRef,useState} from 'react'
import {GetResult} from './utils/worker-data'
import word_list from './word-list.json'

function App() {
  const [result,setResult] = useState([])
  const input = useRef()
  const search = async() =>{
    if(input.current.value==="")return;
    GetResult(input.current.value,word_list)
    .then(res=>{
      //not reseting
      setResult([])
      setResult(res)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{ overflowWrap:'word-break',margin:'1rem 0.5rem' }}>Simple Word List Search</h1>
      <input type="text" name="" id="" ref={input} onKeyPress={(e)=>e.key==="Enter" && search()}/>
      <div className="container" style={{ overflow:"auto", height:"300px", width:"80%",backgroundColor:"#FEFEFE",margin:"2rem auto" }}>
          {
          result.length?
          result.map((data,index)=>{
              return<details key={index} style={{ color:'black',textAlign:'left',margin:"0 20%" }}>
                      <summary key={index}><h2 style={{ display:'inline-block',marginBottom:'0' }}>{data}</h2></summary>
                      <p  style={{ margin:"0 1rem" }}>{word_list[data]}</p>
                      </details>
          })
          :
          <div className="container">
            <h2 style={{ color:'black',textAlign:'center',margin:"1rem auto" }}>No data found</h2>
            <p style={{ color:'black',textAlign:'center',margin:"0rem auto" }}>Find the meaning of words</p>
            <p style={{ color:'black',textAlign:'center',margin:"0rem auto" }}>(use '_' for characters that you want to match automatic)</p>
          </div>
        }
      </div>
      </header>
    </div>
  );
}

export default App;
