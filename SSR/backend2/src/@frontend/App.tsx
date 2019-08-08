import * as React from "react";
import Header from './isolated/header';

class FrontEndApp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <button
                    onClick={()=>{
                        alert(1);
                    }}
                >
                Press me dear Visitor!
                </button>
            </React.Fragment>
        );
    }
}

export default FrontEndApp;
