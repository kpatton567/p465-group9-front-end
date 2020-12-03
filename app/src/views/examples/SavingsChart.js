import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from "axios";
import { apiVariables, ACCESS_TOKEN_NAME } from '../../APIConstants';

// Generate Sales Data
function pairData(month, amount) {
    return { month, amount };
}

const data = [];

export default function SavingsChart() {
    const theme = useTheme();

    const fetchData = React.useCallback(() => 
    {
        var token = localStorage.getItem(ACCESS_TOKEN_NAME)
      
        axios.get(apiVariables.apiUrl + '/api/manage/coupon_savings', 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((response) => {
                var keys = Object.keys(response.data);

                for(var i = 0; i < response.data.length; i++)
                {
                    data[i] = pairData(keys[i], response.data[i]);
                }

            })
                .catch((error) => {
                    console.log(error)
                })
    }, [])

    React.useEffect(() => 
    {
        fetchData()
    }, [fetchData])

    return (
        <React.Fragment>
            <Title>Amount Saved Via Coupons</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Amount Saved ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}