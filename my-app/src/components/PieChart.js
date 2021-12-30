import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class PieChart extends Component {

    state = {
        data:[]
    }

    componentDidMount () {
        const my_token = process.env.REACT_APP_RAPID_API_KEY

        axios.get('https://api.github.com/users/pippy360/repos', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        }).then((res) => {
            const data = res.data
            this.setState({data})
            console.log(data)
        })

    }

    transformData (data) {
        let plot_data = []
        let x = []
        let y = []

        data.map(each => {
            const my_token = process.env.REACT_APP_RAPID_API_KEY

            axios.get('https://api.github.com/repos/pippy360/' + each.name + '/languages', {
                'headers': {
                    'Authorization': `token ${my_token}`
                }
            }).then((res) => {
                const lang = res.data
                console.log(data)
            })
            
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
                <Plot
                    data = {[{
                    values: this.transformData(this.state.data)['x'],
                    labels: ['Residential', 'Non-Residential', 'Utility'],
                    type: 'pie'
                }]}
                    layout = {{
                        height: 400,
                        width: 500
                    }}
                />

            </div>
        )
    }
}

export default PieChart