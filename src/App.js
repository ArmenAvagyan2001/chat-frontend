import './styles/app.scss'
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "./views/Login";
import Register from "./views/Registration";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import './firebase'
import Layout from "./components/layout";
import Home from "./views/Home";
import HomeContent from "./views/Home/HomeContent";
import Room from "./views/Room";
function App() {

    const {isAuth} = useSelector(state => state.items)
    const SCREEN_WIDTH = window.innerWidth

    console.log(SCREEN_WIDTH)

    return (
            <Routes>
                {isAuth
                    ? <>
                        <Route path='/' element={<Layout />}>
                            <Route path='' element={<Home />}>
                                <Route index  element={<HomeContent />} />
                                {SCREEN_WIDTH > 1600 && <Route path='rooms/:id' element={<Room />} />}
                            </Route>
                            {SCREEN_WIDTH < 1600 && <Route path='rooms/:id' element={<Room />} />}
                            <Route path='*' element={<Navigate to='/' />} />
                        </Route>
                    </>
                    : <>
                        <Route path='*' element={<Navigate to='/login'/>} />
                        <Route path='login' element={<Login />}/>
                        <Route path='registration' element={<Register />}/>
                        <Route path='forgot-password' element={<ForgotPassword />}/>
                        <Route path='reset-password/:link' element={<ResetPassword />}/>
                    </>
                }
            </Routes>

    );
}

export default App;
