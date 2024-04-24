import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, SignupPage } from "../pages";
import { AuthLayout, MainLayout } from "../layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Esta ruta debe estar protegida o sea si se busca esta direccion no se debe acceder a menos que si se haya hecho el respecivo login */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        {/* Para verificar si el usuario existe o no */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
