import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/User/Login'
import Register from './pages/User/Register'
import Home from './pages/Home'
import ContactList from './pages/Contacts/Contact-list'
import ContactListCreate from './pages/Contacts/Create-contact'
import Weather from './pages/Weather/Weather'
import Chat from './pages/Chat/chat.js'
import editProfile from './pages/User/editProfile'
import adminPanel from './pages/User/adminPanel'

const App = () => {
    return <div>
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/home' exact component={Home} />
            <Route path='/contact-list' exact component={ContactList} />
            <Route path='/contact-list/create' exact component={ContactListCreate} />
            <Route path='/weather' exact component={Weather} />
            <Route path='/chat' exact component={Chat} />
            <Route path='/edit-profile' exact component={editProfile} />
            <Route path='/masterAdmin' exact component={adminPanel} />
        </BrowserRouter>
    </div>
}

export default App