import React from 'react'
import TabNavigation from '../../../../components/TabNavigation/TabNavigation'
import Future from './Future'
import CatererList from './CatererList'
import CatererCharts from './CatererCharts'

const index = props => {
    return (
        <div>
            <TabNavigation
            title="Caterer Dashboard"
            name1="Caterer List"
            component1={<CatererList />}
            name2="Charts"
            component2={<CatererCharts />}
            name3="Future"
            component3={<Future />}
            />
        </div>
    )
}

export default index
