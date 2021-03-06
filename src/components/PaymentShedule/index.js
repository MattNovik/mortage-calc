import React, { useEffect, useState } from 'react';
import './index.scss';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PaymentShedule = (data) => {
  const [sheduleData, setSheduleData] = useState({});

  useEffect(() => {
    setSheduleData(data);
  })

  const longestLabelLength = (data.data.map(c => c.rub.toLocaleString()).reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0)) + 2;

  return (
    <div className='payment-shedule' id='payment-shedule'>
      <h2>График платежей по ипотеке</h2>
      <div className='payment-shedule__wrapper'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
              width={500}
              height={400}
              data={sheduleData.data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis width={window.screen.width >= 1400 ? longestLabelLength*10/1400*window.screen.width : longestLabelLength*10} tickFormatter={tick => {return tick.toLocaleString()}} />
              <Legend iconType='circle' width='100%'/>
              <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)}/>
              <Area type='monotone' name='Погашение долга' dataKey='rub' stackId='1' stroke='#8884d8' fill='#8884d8' unit=' руб.'/>
              <Area type='monotone' name='Погашение процентов' dataKey='rubDop' stackId='1' stroke='#82ca9d' fill='#82ca9d' unit=' руб.'/>
            </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PaymentShedule;