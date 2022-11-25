import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DeleteUser from './pages/Delete-user'
import ChangePassword from './pages/Change-password'
import Home from './pages/Home'
import ContactList from './pages/Contact-list'
import ContactListCreate from './pages/Create-contact'
import EditContact from './pages/Edit-contact.js'
import Weather from './pages/Weather'
import Chat from './pages/Chat/chat.js'

const App = () => {
    return <div>
        <BrowserRouter>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/delete-user' exact component={DeleteUser} />
            <Route path='/change-password' exact component={ChangePassword} />
            <Route path='/home' exact component={Home} />
            <Route path='/contact-list' exact component={ContactList} />
            <Route path='/contact-list/create' exact component={ContactListCreate} />
            <Route path='/contact-list/update' component={EditContact} />
            <Route path='/weather' exact component={Weather} />
            <Route path='/chat' exact component={Chat} />
        </BrowserRouter>
    </div>
}

export default App