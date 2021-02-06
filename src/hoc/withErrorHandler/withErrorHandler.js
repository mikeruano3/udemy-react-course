import React from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux_/Aux_'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrapperComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios)

        return (
                <Aux>
                    <Modal 
                        show={error}
                        modalClosed={clearError}>
                        {error && error.message}
                    </Modal>
                    <WrapperComponent {...props} />
                </Aux>
        )
    }
}

export default withErrorHandler