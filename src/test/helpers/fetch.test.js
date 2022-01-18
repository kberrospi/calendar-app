import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe('Pruebas en el helper fetch', () => {

  let token = '';
  
  test('Fetch sin token', async() => {

    const resp = await fetchSinToken('auth', { email: 'andres@gmail.com', password:'123456' }, 'POST');
    expect( resp instanceof Response ).toBe( true )

    const body = await resp.json();
    expect( body.ok ).toBe( true );

    token = body.token

  });

  test('Fetch con token', async() => {

    localStorage.setItem('token', token)

    const resp = await fetchConToken('events/61e6d6ffa171fd1bac912d5a', { }, 'DELETE');
    const body = await resp.json();

    expect( body.msg ).toBe( 'Evento no existe con ese id' );

  })
  
})
