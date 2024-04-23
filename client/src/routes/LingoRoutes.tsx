import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'

export default function LingoRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/SignUp' element={<SignUp/>} />
                <Route path='/SignIn' element={<SignIn/>} />
            </Routes>
        </BrowserRouter>
    )
}