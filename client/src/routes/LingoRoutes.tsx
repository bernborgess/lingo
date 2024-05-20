import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'
import WriteThis from '../pages/Questions/WriteThis/WriteThis'
import Home from '../pages/Home/Home'
import MultipleChoice from '../pages/Questions/MultipleChoice/MultipleChoice'

export default function LingoRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn/>} />
                <Route path='/app' element={<Home/>}/>
                <Route path='/SignUp' element={<SignUp/>} />
                <Route path='/SignIn' element={<SignIn/>} />
                <Route path='/WriteThis' element={<WriteThis/>} />
                <Route path='/MultipleChoice' element={<MultipleChoice/>} />
            </Routes>

        </BrowserRouter>
    )
}