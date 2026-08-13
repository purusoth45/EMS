import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from './Component/HeaderComponent.jsx'
import FooterComponent from './Component/FooterComponent.jsx'
import ListEmployeeComponent from './Component/ListEmployeeComponent.jsx'
import './App.css'
import EmployeeComponent from './Component/EmployeeComponent.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />

        <Routes>
          
          <Route path="/" element={<ListEmployeeComponent />} />
          <Route path="/employees" element={<ListEmployeeComponent />} />
           <Route path="/add-employee" element={< EmployeeComponent />} />
           <Route path="/update-employee/:id" element={<EmployeeComponent/>}/>

        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
