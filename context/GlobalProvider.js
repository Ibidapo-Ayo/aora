import {useContext, createContext, useState, useEffect} from "react"
import { getCurrentUser } from "../lib/api"

const GlobalContext = createContext()

export const useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [openActions, setOpenActions] = useState(false)
    const [savedPosts, setSavedPosts] = useState([])
    const [postId, setPostId] = useState("")
    const [updated, setUpdated] = useState(0)
    const [creator, setCreator] = useState("")

    useEffect(()=> {
        getCurrentUser().then((res)=>{
            if(res){
                setIsLoggedIn(true)
                setUser(res)
                console.log(res.likedPosts)
                setSavedPosts(res.likedPosts)
            }else{
                setIsLoggedIn(false)
                setUser(null)
            }
        }).catch((err)=>{
          console.log(err)  
        }).finally(()=>{
            setIsLoading(false)
        })
    }, [])
    return(
        <GlobalContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
            setUser,
            openActions,
            setSavedPosts,
            setOpenActions,
            savedPosts,
            updated,
            setUpdated,
            postId,
            setPostId,
            creator, 
            setCreator
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider