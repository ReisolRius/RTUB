import React, { useEffect } from 'react'
import './preloader.css'
import {PreLoaderAnim} from '../animations'


export const Preloader = () => {
    useEffect(()=> {
        PreLoaderAnim()
    },[]);

  return (
    <div className='preloader'>
        <div className='texts-container'>
            <span>Rius</span>
            <span>Lego</span>
            <span>Go</span>
        </div>
    </div>
  )
}

export default Preloader
