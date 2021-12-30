
import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class ScatterChart extends Component {

    state = {
        following:[],
        followers:[],
        data:[]
    }

    componentDidMount () {
        const my_token = process.env.REACT_APP_RAPID_API_KEY
        const followers = []
        const following = []

        axios.get('https://api.github.com/users/pippy360/followers', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        }).then((res) => {
            const data = res.data
            this.setState({data})

            data.map(a => {

                axios.get('https://api.github.com/users/'+ a.login, {
                    'headers': {
                        'Authorization': `token ${my_token}`
                    }
                }).then((respon) => {
                    const fol = respon.data
                    followers.push(fol.followers)
                    following.push(fol.following)

                })

            })
            this.setState({following})
            this.setState({followers})
            console.log(this.state.following)
            console.log(this.state.followers)
        })

    }


    render() {
        return (
            <div>
                <Plot
                    data = {[
                        {type: 'scatter',
                            mode: 'lines',
                            x: this.state.following,
                            y: this.state.followers,
                            marker: {color: 'red'}
                        },
                    ]}
                    layout = {{width:1000, height: 500, title: 'Repository sizes'}}
                />

            </div>
        )
    }
}

export default ScatterChart