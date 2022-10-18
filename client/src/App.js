import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Creation from "./components/Creation/Creation"
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
import Detail from "./components/Detail/Detail"

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path= "/creation" element={<Creation/>}/>
      <Route path= "/" element={<LandingPage/>}/>
      <Route path= "/home" element={<Home/>} />
      <Route path= "/pokemons/:id" element={<Detail/>}/>
    </Routes>
    </BrowserRouter>
  );
}
