import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class PieChart extends Component {

    state = {
        data:[]
    }

    componentDidMount () {
        const my_token = process.env.REACT_APP_RAPID_API_KEY

        axios.get('https://api.github.com/users/murphp15/repos', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        }).then((res) => {
            const data = res.data
            this.setState({data})
        })

    }

    transformData (data) {
        let plot_data = []
        let v = []
        let l = []

        data.map(each => {
            const my_token = process.env.REACT_APP_RAPID_API_KEY

            axios.get('https://api.github.com/repos/murphp15/' + each.name + '/languages', {
                'headers': {
                    'Authorization': `token ${my_token}`
                }
            }).then((res) => {
                const lang = res.data
                v.push(each.name)
                Object.keys(lang).map(a => {
                    l.push(a)
                    console.log(l)
                }
            )
            })
            

        })

        plot_data['v'] = v
        plot_data['l'] = l



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