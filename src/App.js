import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import RegisterSuccess from './components/RegisterSuccess';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/Context/AuthProvider';
import AppProvider from './components/Context/AppProvider';
import AddRoomModal from './components/Modal/AddRoomModal';
import InviteMemberModal from './components/Modal/InviteMemberModal';
import RegisterModal from './components/Modal/RegisterModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path='/login' />
            <Route component={RegisterSuccess} path='/registerSuccess' />
            <Route component={ChatRoom} path='/' />
          </Switch>
          <AddRoomModal />
          <InviteMemberModal />
          <RegisterModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
