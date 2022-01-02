import React, {Component} from "react";
import Plot from 'react-plotly.js'
import axios from "axios";

class ScatterChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:props.user,
            following: [],
            followers: [],
            data: []
        }

    }

    async componentDidMount() {
        const my_token = process.env.REACT_APP_RAPID_API_KEY
        const followers = []
        const following = []

        const res = await axios.get('https://api.github.com/users/' + this.state.user + '/followers', {
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
                        title: 'Followers vs Following for '+ this.state.user + '\'s Followers'
                    }}
                />

            </div>
        )
    }
}

export default ScatterChart