import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import SignUp from '../pages/SignUp/SignUp'

export default function LingoRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
    )
}