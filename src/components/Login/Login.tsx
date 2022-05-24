import classes from './Login.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux';
import { login } from './../../reducers/authReducer';
import { Navigate } from 'react-router';
import { AppStateType } from '../../redux-store/redux-store';
import { LoginForm } from './LoginForm';


export type InitialValuesType = {
    email: string
    password: string
    rememberMe: boolean
    isSubmiting: boolean
    capcha: string | null
}

type OptionalObjectSchema = {
    email: string
    password: string
}
const Login: React.FC<{}> = (props) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
        isSubmiting: false,
        capcha: ''
    }

    const onSubmit = (values: InitialValuesType, { resetForm }: any) => {

        dispatch(login(values.email, values.password, values.rememberMe, values.capcha))
        if (!values.rememberMe) {
            resetForm({ values: '' })
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('login is your email').required('Required'),
        password: Yup.string().required('Required')
    })
    if (isAuth) {
        return <Navigate to='/profile' />
    }

    return (
        <>
            <div className={classes.body}>
                <h1>Login</h1>
            </div>
            <div className={classes.body}>
                <LoginForm
                    {...props}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                />
            </div>
        </>
    )
}

export default Login