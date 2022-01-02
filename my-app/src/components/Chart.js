import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            data: []
        }

    }


    componentDidMount() {
        const my_token = process.env.REACT_APP_RAPID_API_KEY

        axios.get('https://api.github.com/users/' + this.state.user + '/repos', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        }).then((res) => {
            const data = res.data
            this.setState({data})

        })

    }

    transformData(data) {
        let plot_data = []
        let x = []
        let y = []

        data.map(each => {
            x.push(each.name)
            y.push(each.size)
        })

        plot_data['x'] = x
        plot_data['y'] = y
        console.log(plot_data['x'])


        return plot_data

    }


    render() {
        return (
            <div>
                <Plot
                    data={[
                        {
                            type: 'scatter',
                            mode: 'lines',
                            x: this.transformData(this.state.data)['x'],
                            y: this.transformData(this.state.data)['y'],
                            marker: {color: 'red'}
                        },
                    ]}
                    layout={{width: 1000, height: 500, title: 'Repository sizes'}}
                />

            </div>
        )
    }
}

export default Chart