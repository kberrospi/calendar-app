import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';


jest.mock( 'sweetalert2', () => ({ fire: jest.fn()}) );

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

    //token = localStorage.setItem.mock.calls[0][1]

  });

  test('startLogin incorrecto ', async() => {
    
    await store.dispatch( startLogin('andres@gmail.com', '123456789') );
    let action = store.getActions();
    
    expect(action).toEqual([]);
    expect( Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error'); 

    await store.dispatch( startLogin('andres@gmail2.com', '123456') );
    action = store.getActions();

    expect( Swal.fire).toHaveBeenCalledWith('Error', 'Usuario y/o contraseña incorrectos', 'error'); 

  });

  test('startRegister correcto ', async() => {

    fetchModule.fetchSinToken = jest.fn(() => ({
      json(){
        return {
          ok: true,
          uid: '1234',
          name: 'Cortana',
          token: 'ABC123'
        }
      }
    }));

    
    await store.dispatch( startRegister('test@test.com', '123456') );
    let actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload:{
        uid: '1234',
        name: 'Cortana'
      } 
    });

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123');
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

  });
  

  test('startChecking correcto ', async() => {
    
    fetchModule.fetchConToken = jest.fn(() => ({
      json(){
        return {
          ok: true,
          uid: '1234',
          name: 'Cortana',
          token: 'ABC123'
        }
      }
    }));

    await store.dispatch( startChecking() );
    let actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload:{
        uid: '1234',
        name: 'Cortana'
      } 
    });

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123');

  });


})
