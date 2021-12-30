import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class ScatterChart extends Component {

    state = {
        following: [],
        followers: [],
        data: []
    }

    async componentDidMount() {
        const my_token = process.env.REACT_APP_RAPID_API_KEY
        const followers = []
        const following = []

        const res = await axios.get('https://api.github.com/users/pippy360/followers', {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        })
        const data = res.data
        this.setState({data})

        for (const a of data) {
            const resp = await axios.get('https://api.github.com/users/' + a.login, {
                'headers': {
                    'Authorization': `token ${my_token}`
                }
            })
            const fol = resp.data
            followers.push(fol.followers)
            following.push(fol.following)
        }

        this.setState({following, followers})

    }


    render() {
      
        if (this.state.followers.length == 0) return null

        return (
            <div>
                <Plot
                    data={[
                        {
                            type: 'scatter',
                            mode: 'markers',
                            x: this.state.following,
                            y: this.state.followers,
                            marker: {color: 'red'}
                        },
                    ]}
                    layout={{
                        width: 1000,
                        height: 500,
                        title: 'Followers vs Following' + this.state.followers.length
                    }}
                />

            </div>
        )
    }
}

export default ScatterChart