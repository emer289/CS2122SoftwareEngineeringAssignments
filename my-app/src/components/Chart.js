import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class Chart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    componentDidMount () {
        const my_token = process.env.REACT_APP_RAPID_API_KEY

        axios.get('https://api.github.com/users/pippy360/repos', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        }).then((res) => {
            const data = res.data
            this.setState(data)
            console.log(res.data)
        })

    }

    transformData (data) {
        let plot_data = []
        let x = []
        let y = []

        data.map(each => {
            x.push(each.name)
            y.push(each.size)
        })

        plot_data['x'] = x
        plot_data['y'] = y

        console.log(plot_data)

        return plot_data

    }
    

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Chart