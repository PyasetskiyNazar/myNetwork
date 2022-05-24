import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux-store/redux-store';

const mapStateToProps = (state: AppStateType) => ({           
        isAuth: state.auth.isAuth    
} as MapStatePropsType)

type MapStatePropsType = {
    isAuth: boolean
}
type DispatchStatePropsType = {    
}

function withAuthNavigate<WCP> (WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!props.isAuth) return <Navigate to='/login' />
        return (
            <WrappedComponent {...restProps as WCP} />
        )
    }
    let connectRedirectComponent = connect<MapStatePropsType, DispatchStatePropsType, WCP, AppStateType>(mapStateToProps,{})(RedirectComponent);
    return connectRedirectComponent;
}

export default withAuthNavigate;