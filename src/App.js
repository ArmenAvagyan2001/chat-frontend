import './styles/app.scss'
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "./views/Login";
import Register from "./views/Registration";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import AuthLayout from "./components/authLayout";
import Rooms from "./views/Rooms";
import Search from "./views/Search";
import Room from "./views/Room";

function App() {

    const {isAuth} = useSelector(state => state.items)

    return (
            <Routes>
                {isAuth
                    ? <>
                        <Route path='*' element={<Navigate to='/'/>} />
                        <Route path='/' element={<AuthLayout />} >
                            <Route index element={<Rooms />}/>
                            <Route path='room/:id' element={<Room />} />
                        </Route>
                        <Route path='search' element={<Search />} />

                    </>
                    : <>
                        <Route path='*' element={<Navigate to='/login'/>} />
                        <Route path='login' element={<Login />}/>
                        <Route path='registration' element={<Register />}/>
                        <Route path='forgot-password' element={<ForgotPassword />}/>
                        <Route path='reset-password/:link' element={<ResetPassword />}/>
                    </>}

            </Routes>

    );
}

export default App;
