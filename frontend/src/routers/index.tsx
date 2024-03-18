import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../views/layouts";
import { Home } from "../views/pages/Home";
import { Patient } from "../views/pages/Patient";
import { NewPatient } from "../views/pages/Patient/NewPatient/NewPatient";

export function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Home />}/>
      <Route path="/pacientes" element={<Patient />}/>
      <Route path="/pacientes/novo" element={<NewPatient />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

