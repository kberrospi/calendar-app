import { autReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en el authReducer', () => {

  const initState = {
    checking: true
  }

  test('Debe retornar el estado inicial', () => {
    
    const state = autReducer( initState, {} );
    expect( state ).toEqual( initState )

  });

  test('Debe autenticar el usuario', () => {

    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Keivin'
      }
    }
    
    const state = autReducer( initState, action );
    expect( state ).toEqual( { checking: false, uid: '123', name: 'Keivin' } )

  });

  test('Debe cerrar la sesion', () => {

    const action = { type: types.authLogout }
    
    const state = autReducer( initState, action );
    expect( state ).toEqual( { checking: false } ) 

  });

    
});
