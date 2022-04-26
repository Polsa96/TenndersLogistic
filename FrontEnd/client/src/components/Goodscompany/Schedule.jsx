import React from 'react'
import './Schedule.scss'

const Schedule = ({trucks}) => {
    console.log(trucks)
    console.log(trucks[0].truckplate)
  return (
    
    <div className="schedule-wrapper">
        <div className="schedule-wrapper--date one"></div>
        <div className="schedule-wrapper--date two">23-04-2022</div>
        <div className="schedule-wrapper--date three">24-04-2022</div>
        <div className="schedule-wrapper--date four">25-04-2022</div>
        {trucks.map((truck, index)=>(
            <>
                <div className="schedule-wrapper--work">{truck.truckplate}</div>
                <div className="schedule-wrapper--work">Hello</div>
                <div className="schedule-wrapper--work">Hello</div>
                <div className="schedule-wrapper--work">Hello</div>
            </>
        ))}
    </div>
  )
}

export default Schedule