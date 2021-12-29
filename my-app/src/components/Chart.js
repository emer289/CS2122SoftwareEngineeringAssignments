import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class Chart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    componentDidMount() {
        const my_token = process.env.REACT_APP_RAPID_API_KEY

        axios.get('https://api.github.com/users/murphp15/repos', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        }).then((res) => {
            console.log(res.data)
        })

    }


    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Chart