import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.resInstance = axios.interceptors.response.use(
                response => response,
                error => {
                    this.setState({ error: error });
                    return Promise.reject(error);
                }
            );

            this.reqInstance = axios.interceptors.request.use(
                req => {
                    this.setState({ error: null });
                    return req;
                }
            );
        }
        state = {
            error: null
        };

        componentDidMount() {
            // console.log("[componentDidUpdate] here");
        }

        errorComfirmedHandler = () => {
            this.setState({ error: null });
        }

        componentWillUnmount() {
            // console.log("Will unmount ", this.reqInstance, this.resInstance);
            axios.interceptors.request.eject(this.reqInstance);
            axios.interceptors.response.eject(this.resInstance);
        }

        render() {

            // console.log("What's wrong here ?? " + this.state.error);
            return (
                <Aux>
                    <Modal orderModal={this.state.error}
                        clicked={this.errorComfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;