export const actions = {
   setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
       ({ type: 'authReducer/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),
   setCaptchaUrl: (captchaUrl: string) => ({ type: 'authReducer/GET_CAPTCHA_URL', payload: { captchaUrl } } as const),
   setLoginError: (error: string) => ({ type: 'authReducer/SET_LOGIN_ERROR', error } as const)
}