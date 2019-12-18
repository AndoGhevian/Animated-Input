import React, { Component } from 'react';

let timeout = null;

const resizable = (MyComponent) => {
    return class extends Component {
        state = {
            resizing: false,
        }

        onStartResize = () => {
            this.setState({ resizing: true });
        }

        onEndResize = () => {
            this.setState({ resizing: false })
        }

        shouldComponentUpdate(nextProps, state) {
            if (state.resizing) {
                return false;
            }
            return true;
        }

        componentDidMount() {
            window.addEventListener('resize', () => {
                console.log('resizing')
                if (!this.state.resizing) {
                    this.onStartResize()
                }
                clearTimeout(timeout);
                timeout = setTimeout(() => this.onEndResize(), 250);
            });
        }

        componentWillUnmount() {
            this.removeEventListener('resize', this.onResize);
        }

        componentDidUpdate() {
            console.log('Component Updated!');
        }

        render() {
            return <MyComponent {...this.props} />
        }
    }
}

export default resizable;