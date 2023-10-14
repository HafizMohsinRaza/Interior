import React from 'react'
import Reviews from './Reviews';

function SwitchButtons({freelancer}) {

  return (
    <>
    <div>
        <Reviews freelancer={freelancer} />
    </div>
    </>
    
  )
}

export default SwitchButtons