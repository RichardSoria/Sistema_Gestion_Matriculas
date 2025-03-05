import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './pages/Login'
import { NotFound } from './pages/NotFound'
import { NotFoundAuth } from './pages/NotFoundAuth'
import Dashboard from './layout/Dashboard'

import VisualizarEstudiante from './pages/VisualizarEstudiante'
import VisualizarMateria from './pages/VisualizarMateria'
import VisualizarMatricula from './pages/VisualizarMatricula'
import GestionarMateria from './pages/GestionarMateria'
import GestionarEstudiante from './pages/GestionarEstudiante'
import GestionarMatricula from './pages/GestionarMatricula'
import { EstudianteProvider } from './context/EstudianteProvider'
import { MateriaProvider } from './context/MateriaProvider'
import { MatriculaProvider } from './context/MatriculaProvider'
import { PrivateRoute } from './routes/PrivateRoute'



function App() {
  return (
    <>
      <BrowserRouter>
        <EstudianteProvider>
          <MateriaProvider>
            <MatriculaProvider>
                <Routes>
                  <Route index element={<Login />} />
                  <Route path='/' element={<Auth />}>
                    <Route path='*' element={<NotFound />} />
                  </Route>
                  <Route path='dashboard/*' element={
                    <PrivateRoute>
                      <Routes>
                        <Route element={<Dashboard />}>
                          <Route index element={<GestionarEstudiante />} />
                          <Route path='visualizar/estudiante/:id' element={<VisualizarEstudiante />} />
                          <Route path='gestionar-materia' element={<GestionarMateria />} />
                          <Route path='visualizar/materia/:id' element={<VisualizarMateria />} />
                          <Route path='gestionar-matricula' element={<GestionarMatricula />} />
                          <Route path='visualizar/matricula/:id' element={<VisualizarMatricula />} />
                          <Route path='*' element={<NotFoundAuth />} />
                        </Route>
                      </Routes>
                    </PrivateRoute>
                  } />
                </Routes>
            </MatriculaProvider>
          </MateriaProvider>
        </EstudianteProvider>
      </BrowserRouter>
    </>
  )
}

export default App
