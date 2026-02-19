import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/home";
import AllProducts from "./components/AllProducts";


function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/api/signup" element={<Signup />} />
        <Route path="/api/signin" element={<Signin />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/api/allproducts" element={<AllProducts/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
