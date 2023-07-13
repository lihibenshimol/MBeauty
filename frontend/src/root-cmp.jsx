import './assets/style/main.scss';

import { Provider } from 'react-redux';

import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cpms/app-header.jsx'
import { AboutUs } from './views/about-us.jsx'
import { HomePage } from './views/home.jsx'
import { Login } from './cpms/login-signup.jsx'
import { ProductIndex } from './views/product-index.jsx'
import { store } from './store/store.js';
import { ProductDetails } from './views/product-details';
import { AppFooter } from './cpms/app-footer.jsx';
import { ProductEdit } from './views/product-edit.jsx';
import { Contact } from './views/contact';

export function App() {


  return (
    <Provider store={store}>
      <Router>
        <section className="app full ">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<Login />} path="/admin-only" />
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<Contact />} path="/contact" />
              <Route element={<ProductIndex />} path="/store" />
              <Route element={<ProductDetails />} path="/product/:productId" />
              <Route element={<ProductEdit />} path="/product/edit" />
              <Route element={<ProductEdit />} path="/product/edit/:productId" />
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}


