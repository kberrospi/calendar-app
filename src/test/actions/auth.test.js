import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );
const initialState = {}
let store = mockStore( initialState );

Storage.prototype.setItem = jest.fn()

describe('Pruebas en las acciones del Auth', () => {
  
  beforeEach(()=>{
    store = mockStore( initialState );
    jest.clearAllMocks();
  });

  test('startLogin correcto ', async() => {
    
    await store.dispatch( startLogin('andres@gmail.com', '123456') );

    const action = store.getActions();
    
    expect( action[0] ).toEqual({
      type: types.authLogin,
      payload:{
        uid: expect.any(String ),
        name: expect.any( String )
      } 
    });

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String))
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))

  })
  

})
