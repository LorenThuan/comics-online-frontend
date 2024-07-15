import React from 'react'
import AdvancedSearchContainer from './AdvancedSearchContainer'
import Common from '../../common/Common'

const AdvancedSearchManager = () => {
  return (
    <Common className="grid grid-cols-1 w-full mt-16" components={<AdvancedSearchContainer/>}/>
  )
}

export default AdvancedSearchManager