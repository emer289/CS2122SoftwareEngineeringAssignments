import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class PieChart extends Component {

    state = {
        lang: []
    }

    componentDidMount() {
        const my_token = process.env.REACT_APP_RAPID_API_KEY
        //getting the repos
        axios.get('https://api.github.com/users/murphp15/repos', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        }).then((res) => {
            const data = res.data
            //for each repo getting the languages
            const lang = []
            data.map(each => {
                axios.get('https://api.github.com/repos/murphp15/' + each.name + '/languages', {
                    'headers': {
                        'Authorization': `token ${my_token}`
                    }
                }).then((response) => {

                    const l = response.data
                    Object.keys(l).map(a => {
                            lang.push(a)
                            this.setState({lang})
                        }
                    )
                })
            })

        })

    }

    transformData(lang) {
        let plot_data = []
        let v = []
        let l = []

        const map = lang.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())


        plot_data['v'] = map.values()
        plot_data['l'] = map.keys()

        console.log(plot_data['v'])
        console.log(plot_data['l'])

        return plot_data

    }


    render() {
        return (
            <div>
                <Plot
                    data = {[{
                        values: this.transformData(this.state.data)['v'],
                        labels: this.transformData(this.state.data)['l'],
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