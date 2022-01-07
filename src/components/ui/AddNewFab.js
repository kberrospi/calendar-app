import React from 'react'
import { useDispatch } from 'react-redux'
import { eventSetActive } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

  const dispatch = useDispatch();

  const handleAddEvent = () => {
    dispatch( eventSetActive(null) )
    dispatch( uiOpenModal() )
  }

  return (
    <button
      className='btn btn-primary fab'
      onClick={ handleAddEvent }
    >
      <i className='fas fa-plus'> </i>
    </button>
  )
}
