/**
 * Returns user authentification state
 *
 * @param {Object} state Redux store
 *
 * @returns {Object.<
 *  loading: boolean,
 *  userToken: string | '',
 *  error: string | '',
 *  success: boolean,
 * >} Returns user authentification state
 */
export const getAuthState = (state) => state.auth

/**
 * Returns user infos state
 *
 * @param {Object} state Redux store
 *
 * @returns {Object.<
 *  email: string | '',
 *  firstName: string | '',
 *  lastName: string | '',
 *  id: string | '',
 *  loading: boolean,
 *  error: boolean,
 *  update: Object.<
 *    loading: boolean,
 *    success: boolean,
 *    error: boolean,
 *  >
 * >} Returns user infos state
 */
export const getUserState = (state) => state.user

/**
 * Returns user credential state
 *
 * @param {Object} state Redux store
 *
 * @returns {Object.<
 *  userName: string | '',
 * >} Returns user credential state
 */
export const getCredentialState = (state) => state.credential
