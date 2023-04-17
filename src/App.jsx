import {useState,useEffect} from 'react';

const App = () => {
    const[fact,setFact] = useState({facto:"",length:0});
    const[cat,setCat] = useState({url:""});
    const fetchFact = async()=>{
      //TryCatch para manejo de errores
      const factofetch = await fetch("https://catfact.ninja/fact").then((res) =>
        res.json()
      );
      setFact({ facto: factofetch.fact, length: factofetch.length });
      console.log(fact);
    }

    const fetchCat = async()=>{
      //TryCatch para manejo de errores
      const { facto } = fact;
      const firstWord = facto.split(" ")[0];
      const gato = await fetch(
        `https://cataas.com/cat/says/:${firstWord}?size=:20&color=:color&json=true`
      ).then((res) => res.json());
      setCat({ url: gato.url });
    }

    useEffect(()=>{
        fetchFact();
        fetchCat();
    },[])

  return (
    <main>
      <h1>App de gatos</h1>
      {fact.facto && <p>{fact.facto}</p>}
      {cat.url && (
        <img
          src={`https://cataas.com/${cat.url}`}
          alt={`Imagen recuperada usando la primera palabra del hecho ${
            fact.facto.split(" ")[0]
          }`}
        />
      )}
    </main>
  );
}
export default App;