import React, { Component } from 'react'
import { Transition } from 'react-spring/renderprops'
import classes from './MySpring.module.css'

class MySpring extends Component {
    state = {
        road: null
    }

    constructor(props) {
        super(props);

        let road = [...Array(10)].map(_ => null);
        road[0] = 'Andy';
        this.state.road = road;
    }

    render() {
        return (
            <div className={classes.Road}>
                {this.state.road.map((segment, index) => (
                    <div key={index} style={{ width: `calc(100% / ${this.state.road.length})` }} className={classes.SegmentWrapper}>
                        <div className={classes.Segment}>
                            <div>{segment ? segment : null}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default MySpring;