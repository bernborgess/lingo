import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'
import Home from '../pages/Home/Home'

export default function LingoRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn/>} />
                <Route path='/SignUp' element={<SignUp/>} />

                <Route path='/app' element={<Home/>}/>
            </Routes>

        </BrowserRouter>
    )
}