import React from 'react'
 
import TabNavigation from '../../../components/TabNavigation/TabNavigation'
import UserList from './UserList'
import BlockedUserList from './BlockedUserList'

const index = props => {
    return (
        <div>
            <TabNavigation
            title="User Dashboard"
            component1={<UserList/>}
            name1="User List"
            component2={<BlockedUserList/>}
            name2="Blocked User List"
            />
        </div>
    )
}


export default index
