import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'
import Home from '../pages/Home/Home'
import Questions from '../pages/Questions/Questions'

export default function LingoRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/SignUp' element={<SignUp/>} />
                <Route path='/' element={<SignIn/>} />
                <Route path='/app' element={<Home/>}/>
                <Route path='app/Questions/level/:level/sequence/:sequence' element={<Questions/>} />
            </Routes>
        </BrowserRouter>
    )
}