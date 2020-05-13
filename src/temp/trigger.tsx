import React, {useState, useReducer} from 'react';
import useInterval from './useInterval'

export interface BarProps {
  percentWidth:number
}

const Bar:React.FC<BarProps> = ({percentWidth}) => {
  return (<div style={{width:'500px',backgroundColor:'#ccc'}}>
     <div style={{width:`${percentWidth}%`,backgroundColor:'red',height:'10px'}}></div>
  </div> )
}

const tickInterval = 16;

const getGrowthRate = (durationSeconds:any) => {
  const percentPerSecond = 100/durationSeconds;
  const percentPerMillisecond = percentPerSecond/1000;
  const percentPerTick = percentPerMillisecond*tickInterval;
  const rateOfGrowth = percentPerTick;
  return rateOfGrowth
}

const growthRateReducer = (growthRate:number,action:any) => {
  return growthRate; 
}
// const growthRateReducer = (growthRate:number,action:any) => {
//   if(action.type==='rate'){
//     return action.rate; 
//   }
//   if(action.type==='timestamp'){
//     console.log(action)
//   }
//   return action.rate; 
// }

const Trigger:React.FC = () => {
  const [playing,setPlaying] = useState(false)
  const [percentWidth,setWidth] = useState(0)
  // const initialRateState = {type:'rate',rate:getGrowthRate(60)}
  const initialRateState = getGrowthRate(60)
  const [rateOfGrowth,rateReducer] = useReducer(growthRateReducer,initialRateState)
  const [msPlayed,setMsPlayed] = useState(0)
  const updateWidth = () => {
    if(playing){
      const newWidth = percentWidth+ rateOfGrowth;
      console.log(newWidth,{rateOfGrowth})
      setWidth(newWidth)
      setMsPlayed( msPlayed + tickInterval)
    }
  }

  useInterval(updateWidth,tickInterval)

  // useInterval(()=>{
  //   if(playing){
  //     const random = Math.random()*tickInterval - tickInterval/2; 
  //     rateReducer({type:'timestamp',value:msPlayed+random,playedDuration:msPlayed})
  //   }
  // },1000)

  return (<div>
    <Bar percentWidth={percentWidth} />
    <div>Played: {msPlayed}ms</div>
    <button onClick={()=>setPlaying(!playing)}>Play/Pause</button>
    </div>

    )
}

export default Trigger;