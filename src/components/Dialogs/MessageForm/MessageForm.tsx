
//import { useFormik, Formik } from 'formik';
type PropsType = {
    formik: any
}

const MessageForm: React.FC<PropsType> = (props) => {
    const formik = props.formik
    return (

        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                    id="messageBody"
                    type="text"   
                    placeholder="Enter your message"
                    value={formik.messageBody} 
                    onChange={formik.handleChange}                
                    {...formik.getFieldProps('messageBody')}
                />
                {formik.touched.messageBody && formik.errors.messageBody ? (
                    <div>{formik.errors.messageBody}</div>
                ) : null}
            </div>
            <div>               
                <button type="submit">Send Message</button>  
            </div>
        </form>
    );
}

export default MessageForm;