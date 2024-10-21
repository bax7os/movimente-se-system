import { useEffect, useState } from 'react'


import './App.css'


function App() {
 
  useEffect(() => {
   
    const unsub = window.electron.subscribeStatistics((stats) => console.log(stats));
    return unsub;
  }, [])
  
  return (
    <div className="App">
     
    </div>
  );
}


export default App;
