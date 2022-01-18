describe('Pruebas en types', () => {
  
  test('Los types deben ser iguales ', () => {

    expect( types ).toEqual({
      uiOpenModal: '[ui] Open Modal',
      uiCloseModal: '[ui] Close Modal',

      eventstartAddNew: '[event] Start add New',
      eventAddNew: '[event] Add New',
      eventSetActive: '[event] Add setActive',
      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deleted',
      eventLoaded: '[event] Events Loaded',
      eventLogout: '[event] Event Logout',

      authCheckingFinish: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout'
    })
    
  })
  
})