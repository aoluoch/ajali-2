import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()
const AppContextProvider = (props) => {
    const [userData, setUserData] = useState()

    const user_id = localStorage.getItem('user_id')
    useEffect(()=> {
        fetch (`http://127.0.0.1:5000/user/${user_id}`)
        .then((resp) => resp.json())
        .then((data) => setUserData(data))
    }, [user_id])

    const value = {
        userData, setUserData
    }



    return (
        <AppContext.Provider value={{value}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;