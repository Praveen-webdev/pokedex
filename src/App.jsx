import React from 'react'
import {useState} from "react";
import axios from "axios";
function App() {
const [input,setInput]=useState("")
const[pokename,setPokename]=useState("");
const[detail,setDetail]=useState({
  imgurl:"",
  species:"",
  type:"",
  abilities:"",
  moves:""
})
const [click,setClick]=useState(false);
const[isLoading,setLoading]=useState(false);
const [error,setError]=useState(null)

React.useEffect(() => {
  let cancel;
  if(!pokename){
  return setClick(false)
}
  setClick(true);
  setLoading(true)
  const url=`https://pokeapi.co/api/v2/pokemon/${pokename}`.toLowerCase()
      axios.get(url,{
        cancelToken:new axios.CancelToken(c=>cancel=c)
      }).then((res)=>{
        setLoading(false);
        setDetail({
        imgurl:res.data.sprites.back_default,
        species:res.data.species.name,
        type:res.data.types[0].type.name,
        abilities:[res.data.abilities[0].ability.name,res.data.abilities[1].ability.name],
        moves:res.data.moves[0].move.name
        })
      }).catch(err=>setError(err))
  setError(null);
  return () => {
    cancel();
  };
}, [pokename])
  return (
    <div className="app">
      <nav id="navbar">
        <img src="https://fontmeme.com/permalink/210709/dfedef5feb40a02ad37fdc8703f7d163.png" alt="logo-img"/>
        <div className="search-combine">
        <input onChange={(e)=>setInput(e.target.value)}
         value={input}
         type="text" className="form-control " placeholder="Search Pokemon" aria-label="search-pokemon"/>
        <button
        onClick={(e)=>{e.preventDefault();setPokename(input);}}
        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>
        </div>
      </nav>
      {click?!isLoading?<div className="container">
      <div className="card" style={{width: "18rem"}}>
      <img className="card-img-top" src={detail.imgurl} alt="Card cap"/>
      <div className="card-body">
      <h5 className="card-title">{detail.species}</h5>
      <p className="card-text">Type : {detail.type}</p>
      <p className="card-text">Abilities : {detail.abilities[0]},{detail.abilities[1]}</p>
      <p className="card-text">Move :{detail.moves}</p>

  </div>
</div>
</div>:!error?<div className="container">
      <div className="card" style={{width: "18rem"}}>
      <img className="card-img-top" src="https://i.gifer.com/YjKA.gif" alt="Card cap"/>
      <div className="card-body">
      <h5 className="card-title">Loading...</h5>
      <p className="card-text">Type :Loading...</p>
      <p className="card-text">Abilities : Loading...</p>
      <p className="card-text">Move : Loading...</p>
  </div>
</div>
</div>:<div className="container">
      <div className="card" style={{width: "18rem"}}>
      <img className="card-img-top" src="https://media.tenor.co/images/60480beaace5b157e498a69027a0d0d7/raw" alt="Card cap"/>
      <h1 className="wrong-pokemon">No pokemon with this name</h1>
  </div>
</div>

:<div className="container"><h1>Submit a pokemon</h1></div>}
</div>
  )
}

export default App