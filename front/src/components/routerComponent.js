import { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import { UserContext } from './auth/userContext'
import LoginComponent from './auth/logIn'
import HomeComponent from './home'


export const SidteRouter = () => {
    const [user, Setuser] = useState({
        logged: false,
    })

    return (
        <Router>
            <UserContext.Provider value={{ user, Setuser }} >
                <Route path='/' exact >
                    {user.logged ? (< HomeComponent />) : (<LoginComponent />)}
                </Route>
            </UserContext.Provider>
        </Router>
    )
}
export default SidteRouter