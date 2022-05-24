import classes from './Login.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux-store/redux-store';
import { InitialValuesType } from './Login';

type LoginFormType = {   
   initialValues: InitialValuesType
   onSubmit: any
   validationSchema: any
}

export const LoginForm: React.FC<LoginFormType> = (props) => {

   const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
   const loginError = useSelector((state: AppStateType) => state.auth.loginError)

   return (
       <Formik initialValues={props.initialValues}
           validationSchema={props.validationSchema}
           onSubmit={props.onSubmit}
       >
           <Form>
               <div className={classes.formControl}>
                   <Field placeholder="Email"
                       name="email"
                       type="text"
                   />
                   <ErrorMessage name='email' component="span" className={classes.errors} />
               </div>
               <div className={classes.formControl}>
                   <Field
                       placeholder="Password"
                       name="password"
                       type="text"
                   />
                   <ErrorMessage name='password' component="span" className={classes.errors} />
               </div>
               <div className={classes.formControl}>
                   <Field type="checkbox"
                       name="rememberMe"
                   />remember me
               </div>
               <div>
                   {captchaUrl ?
                       <>
                           <img src={captchaUrl} alt={"captcha"} />
                           <div className={classes.formControl}>
                               <Field
                                   placeholder="Enter values from picture"
                                   name="capcha"
                                   type="text"
                               />
                               <ErrorMessage name='capcha' component="span" className={classes.errors} />
                           </div>
                       </> : null}
               </div>
               <div>
                   {loginError ?
                       <div>

                           {loginError}
                       </div> : null}
               </div>
               <div>
                   <button type="submit" >Login</button>

               </div>
           </Form>
       </Formik>
   )
}