import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { UserDataType } from '../../models/userData';


import Register from '../Register/Register';
import Main from '../Main/Main';
import Login from '../Login/Login';
import { api } from '../../utills/api';
import LoginFormValues from '../../models/LoginFormValues';
import {
  DENIED_ERROR_MESSAGE,
  errorMessages
} from '../../utills/constants';
import RegisterFormValues from '../../models/RegisterFormValues';
import { UsersContext } from '../../context/usersContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import UnprotectedRouteElement from '../UnprotectedRoute/UnprotectedRoute';
import Snackbars from '../Snackbars/Snackbars';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserDataType>({
    email: '',
    isBlocked: false,
    lastLogin: '',
    name: '',
    regDate: '',
    _id: '',
  });
  const [users, setUsers] = useState<UserDataType[]>([]);

  const [registerErr, setRegisterErr] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const [snackBlockOpened, setSnackBlockOpened] = useState(false);
  const [snackUnblockOpened, setSnackUnblockOpened] = useState(false);
  const [snackDeleteOpened, setSnackDeleteOpened] = useState(false);
  const [snackErrorOpened, setSnackErrorOpened] = useState(false);
  const [snackSelfErrorOpened, setSnackSelfErrorOpened] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .getCurrentUserInfo()
        .then(() => {
          setIsLoggedIn(true);
          navigate(location.pathname, { replace: true });
        })
        .catch(() => handleLogOut());
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api.getCurrentUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.error(err));
      api.getUsersInfo()
        .then((data) => {
          setUsers(data)
        })
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn])

  const handleLogin = ({ email, password }: LoginFormValues) => {
    setIsLoading(true);
    api.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setLoginErr(errorMessages[err] || DENIED_ERROR_MESSAGE);
      })
      .finally(() => setIsLoading(false));
  }

  const handleRegister = ({ name, email, password }: RegisterFormValues) => {
    setIsLoading(true);
    api
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setRegisterErr('');
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        setRegisterErr(errorMessages[err] || DENIED_ERROR_MESSAGE);
      })
      .finally(() => setIsLoading(false));

  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    setLoginErr('');
    setRegisterErr('');
    navigate('/signin', { replace: true })
  }

  const handleBlockUsers = (usersIds: string[]) => {
    setIsLoading(true)
    api.blockUsers(usersIds)
      .then(() => {
        usersIds.includes(currentUser._id) && handleLogOut()
        api.getUsersInfo()
          .then((data) => {
            setUsers(data)
            setSnackBlockOpened(true)
          })
          .catch(() => {
            setSnackSelfErrorOpened(true)
            setTimeout(() => setSnackSelfErrorOpened(false), 2000)
          });
      })
      .catch(() => {
        setSnackErrorOpened(true)
      })
      .finally(() => setIsLoading(false))
  }

  const handleUnblockUsers = (usersIds: string[]) => {
    setIsLoading(true)
    api.unblockUsers(usersIds)
      .then(() => {
        api.getUsersInfo()
          .then((data) => {
            setUsers(data)
            setSnackUnblockOpened(true);
          })
          .catch(() => {
            setSnackErrorOpened(true)
          });
      })
      .catch(() => {
        setSnackErrorOpened(true)
      })
      .finally(() => setIsLoading(false))
  }

  const handleDeleteUsers = (usersIds: string[]) => {
    setIsLoading(true)
    api.deleteUsers(usersIds)
      .then(() => {
        usersIds.includes(currentUser._id) && handleLogOut()
        api.getUsersInfo()
          .then((data) => {
            setUsers(data)
            setSnackDeleteOpened(true);
          })
          .catch(() => {
            setSnackSelfErrorOpened(true)
            setTimeout(() => setSnackSelfErrorOpened(false), 3000)
          });
      })
      .catch(() => {
        setSnackErrorOpened(true)
      })
      .finally(() => setIsLoading(false))
  }

  const handleSnackClose = () => {
    setSnackBlockOpened(false);
    setSnackUnblockOpened(false);
    setSnackDeleteOpened(false);
    setSnackErrorOpened(false);
    setSnackSelfErrorOpened(false);
  }

  return (
    <div className="App">
      <UsersContext.Provider value={{ currentUser, users }}>
        <Routes>
          <Route
            path='/signin'
            element={
              <UnprotectedRouteElement
                isLoggedIn={isLoggedIn}
                element={<Login onLogin={handleLogin} loginErr={loginErr} isLoading={isLoading}
                />}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <UnprotectedRouteElement
                isLoggedIn={isLoggedIn}
                element={<Register onRegister={handleRegister} isLoading={isLoading} registerErr={registerErr} />}
              />
            }
          />
          <Route
            path='/'
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                element={
                  <Main
                    handleDeleteUsers={handleDeleteUsers}
                    handleBlockUsers={handleBlockUsers}
                    handleUnblockUsers={handleUnblockUsers}
                    isLoading={isLoading}
                    handleLogOut={handleLogOut} />}
              />
            }
          />
        </Routes>
      </UsersContext.Provider>
      <Snackbars
        isDeleted={snackDeleteOpened}
        isBlocked={snackBlockOpened}
        isUnblocked={snackUnblockOpened}
        isError={snackErrorOpened}
        isSelfError={snackSelfErrorOpened}
        handleSnackClose={handleSnackClose} />
    </div>
  );
}

export default App;
