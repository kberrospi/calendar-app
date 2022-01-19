import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';


jest.mock( 'sweetalert2', () => ({ fire: jest.fn()}) );

jest.mock('../../../actions/auth', () => ({
  
  startLogin: jest.fn(),
  startRegister: jest.fn()

}))

/* jest.mock('../../../actions/auth', () => ({
  
  

})) */


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={ store }>
      <LoginScreen />
  </Provider>
)

describe('Pruebas en <loginScreen />', () => {

  beforeEach(() =>{
    jest.clearAllMocks();
  })
  
  test('Debe mostrarse correctamente', () => {
    
    expect( wrapper ).toMatchSnapshot();

  });

  test('Debe llamar el dispatch del login', () => {
    
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target:{
        name: 'lEmail',
        value: 'keivin@gmail.com'
      }
    });

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target:{
        name: 'lPassword',
        value: '123456'
      }
    });

    wrapper.find( 'form' ).at(0).prop('onSubmit')({
      preventDefault(){}
    });

    expect( startLogin ).toHaveBeenCalledWith('keivin@gmail.com','123456');

  });

  test('No hay registro si las contraseña son diferentes', () => {

    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target:{
        name: 'rPassword1',
        value: '1234567'
      }
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target:{
        name: 'rPassword2',
        value: '123456'
      }
    });

     wrapper.find( 'form' ).at(1).prop('onSubmit')({
      preventDefault(){}
    });

    expect( startRegister ).toHaveBeenCalledTimes(0);
    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Las contraseñas deben ser iguales', 'error')

  });

  test('Registro si las contraseña son iguales', () => {


    wrapper.find('input[name="rName"]').simulate('change', {
      target:{
        name: 'rName',
        value: 'Keivin'
      }
    });

    wrapper.find('input[name="rEmail"]').simulate('change', {
      target:{
        name: 'rEmail',
        value: 'keivin@gmail.com'
      }
    });

    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target:{
        name: 'rPassword1',
        value: '123456'
      }
    });

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target:{
        name: 'rPassword2',
        value: '123456'
      }
    });

     wrapper.find( 'form' ).at(1).prop('onSubmit')({
      preventDefault(){}
    });

    expect( Swal.fire ).not.toHaveBeenCalled();
    expect( startRegister ).toHaveBeenCalledWith("Keivin", "keivin@gmail.com", "123456");
    

  });
  

});
