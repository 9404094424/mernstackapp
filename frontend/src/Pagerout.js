import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './components/App';
import Contactadd from './components/Contactadd';
import Showcontactbook from './components/Showcontactbook';
import Updatecontact from './components/Updatecontact';
import Searchcontact from './components/Searchcontact';
import Pagination from './components/Pagination';
import Home from './components/Home';

const Pagerout = (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} >
                <Route path='' element={<Home />} >
                </Route>
                <Route path='/contactpage' element={<Contactadd />} >
                </Route>
                <Route path='/showcontact' element={<Showcontactbook />} >
                </Route>
                <Route path='/search' element={<Searchcontact />} >
                </Route>
                <Route path='/updatecontact/:contact_id' element={<Updatecontact />} >
                </Route>
                <Route path='/pagination' element={<Pagination />} >
                </Route>


            </Route>

        </Routes>
    </BrowserRouter>
)

export default Pagerout;
