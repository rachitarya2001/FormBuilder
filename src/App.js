import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormList from './component/FormList';
import CreateForm from './component/CreateForm';
import FormView from './component/FormView';

function App() {
  return (
    <Router>
   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <h1>Form Builder App</h1> */}
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/form/create" element={<CreateForm />} />
        <Route path="/form/:id" element={<FormView />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
