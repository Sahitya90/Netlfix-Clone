import {React, useEffect} from 'react'

/* here we mount the home file in the app file */
import Home from './pages/Home/Home'
import {Routes, Route, useNavigate} from 'react-router-dom' 
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'

import { onAuthStateChanged} from 'firebase/auth'
import { auth} from './firebase'

const App = () => {

  const Navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("logged in");
        if(window.location.pathname == '/login'){
                  Navigate('/');
        }
      }else{
        console.log("not logged in");
        Navigate('/login');
      }
    });
    
    return() => unsubscribe();
  }, [Navigate]

  );
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>

        
      </Routes>
     
    </div>
  )
}

export default App
