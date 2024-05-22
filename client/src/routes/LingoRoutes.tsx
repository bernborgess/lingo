import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'
import WriteThis from '../pages/Questions/WriteThis/WriteThis'
import Home from '../pages/Home/Home'
import MultipleChoice from '../pages/Questions/MultipleChoice/MultipleChoice'
import Questions from '../pages/Questions/Questions'

export default function LingoRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/SignUp' element={<SignUp/>} />
                <Route path='/' element={<SignIn/>} />
                <Route path='/app' element={<Home/>}/>
                <Route path='app/Questions' element={<Questions/>} />
                <Route path='app/Questions/WriteThis' element={<WriteThis/>} />
                <Route path='app/Questions/MultipleChoice' element={<MultipleChoice/>} />
            </Routes>

        </BrowserRouter>
    )
}