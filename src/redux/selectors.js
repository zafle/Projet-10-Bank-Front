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
 *  remember: string | '',
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
