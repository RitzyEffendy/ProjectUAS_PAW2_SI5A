import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home"));
const ResepList = React.lazy(() => import("./components/Resep/List"));
const ResepCreate = React.lazy(() =>import("./components/Resep/Create"));
const ResepEdit = React.lazy(() =>import("./components/Resep/Edit"));
const KategoriList = React.lazy(() => import("./components/Kategori/List"));
const KategoriCreate = React.lazy(() => import("./components/Kategori/Create"));
const KategoriEdit = React.lazy(() => import("./components/Kategori/Edit"));

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/resep">
                  Resep
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/kategori">
                  Kategori
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resep" element={<ResepList />} />
          <Route path="/resep/create" element={<ResepCreate />} />
          <Route path="/resep/edit/:id" element={<ResepEdit />} />
          <Route path="/kategori" element={<KategoriList />} />
          <Route path="/kategori/create" element={<KategoriCreate />} />
          <Route path="/kategori/edit/:id" element={<KategoriEdit />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;