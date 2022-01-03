import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class PieChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:props.user,
            data: [],
            lang: []
        
        }
    }
    

    async componentDidMount() {
        const my_token = process.env.REACT_APP_RAPID_API_KEY
        const lang = []
        //getting the repos
        const res = await axios.get('https://api.github.com/users/'+this.state.user+'/repos', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        })
        const data = res.data
        this.setState({data})
        //for each repo getting the languages

        for (const a of data) {
            const resp = await axios.get('https://api.github.com/repos/'+this.state.user+'/' + a.name + '/languages', {
                'headers': {
                    'Authorization': `token ${my_token}`
                }
            })
            const l = resp.data
            Object.keys(l).map(a => {
                lang.push(a)
            })
        }
        this.setState({lang})


    }

    transformData(lang) {
        let plot_data = []
        let v = []
        let l = []

        const map = lang.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())


        plot_data['v'] = Array.from(map.values())
        plot_data['l'] = Array.from(map.keys())




        return plot_data

    }


    render() {

        if(this.state.lang.length < 5) return null

        return (
            <div>
                <Plot
                    data={[{
                        values: this.transformData(this.state.lang)['v'],
                        labels: this.transformData(this.state.lang)['l'],
                        type: 'pie'
                    }]}
                    layout = {{width:1000, height: 500, title: 'Languages Used in'+ this.state.user +'\'s Repositorys'}}
                />

            </div>
        )
    }
}

export default PieChart