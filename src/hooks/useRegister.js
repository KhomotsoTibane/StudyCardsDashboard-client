import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {useNavigate} from "react-router-dom"

export const useRegister = () => {
  let navigate = useNavigate();
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const registerUser = async (username, password, email) => {
  
    setIsLoading(true)
    setError(null)
    
    const response = await fetch('https://studycardsserver.herokuapp.com/api/user/register', {
    // const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'},
        body: JSON.stringify({ username, password, email })
      })
    const json = await response.json()
  
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
      navigate("/home")
    }
  }

  return { registerUser, isLoading, error }
}