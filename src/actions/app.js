import {
    TOGGLE_NAVBAR,

} from './types'

export const toggleNavbar = () =>dispatch=>{
    return dispatch({
        type:TOGGLE_NAVBAR
    })
    
}
