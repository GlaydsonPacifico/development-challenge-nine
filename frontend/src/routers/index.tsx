import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../views/layouts";
import { Home } from "../views/pages/Home";
import { Patient } from "../views/pages/Patient";
import { EditPatient } from "../views/pages/Patient/EditPatient/EditPatient";
import { ListPatient } from "../views/pages/Patient/ListPatient/ListPatient";
import { NewPatient } from "../views/pages/Patient/NewPatient/NewPatient";

export function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Home />}/>
      <Route path="/pacientes" element={<ListPatient />}/>
      <Route path="/pacientes/novo" element={<NewPatient />}/>
      <Route path="/pacientes/:id" element={<Patient />}/>
      <Route path="/pacientes/:id/editar" element={<EditPatient />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

