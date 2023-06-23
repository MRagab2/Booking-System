import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Admin, Book, ConfirmBook, EditProfile, Home, Profile, SignInUp } from './Pages';
import { Container } from './Components';
import PrivateRoutes from './utlis/PrivateRoutes';
import PrivateRoutesAdmin from './utlis/PrivateRoutesAdmin';

function App() {
  return (
    <div className="App">
      <Router basename="/e-learning">
        {/* <Header /> */}
        <Container >
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/Profile' element={<Profile />} />
              <Route path='/EditProfile' element={<EditProfile />} />
              <Route path='/Book' element={<Book />} />
              <Route path='/Confirm' element={<ConfirmBook />} />
            </Route>
            <Route element={<PrivateRoutesAdmin />}>
              <Route path='/Admin//*' element={<Admin />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/SignInUp' element={<SignInUp />} />
          </Routes>
        </Container>

      </Router>
    </div>
  );
}

export default App;
