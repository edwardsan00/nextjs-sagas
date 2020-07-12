
declare module 'redux-wait-for-action' {
  declare namespace createReduxWaitForMiddleware {
    const WAIT_FOR_ACTION = Symbol('WAIT_FOR_ACTION');
    const ERROR_ACTION = Symbol('ERROR_ACTION');
    const CALLBACK_ARGUMENT = Symbol('CALLBACK_ARGUMENT');
    const CALLBACK_ERROR_ARGUMENT = Symbol('ERROR_CALLBACK_ARGUMENT');
  }

  declare function createReduxWaitForMiddleware(): any

  export = createReduxWaitForMiddleware
}