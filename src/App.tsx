import React, { useEffect, useState } from 'react';
import './App.css';

const printDate = (now = new Date()) => {
  // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour:  'numeric',
    minute: 'numeric',
  };
  return now.toLocaleDateString("en-US", options);
}

function msToTime(duration: number) {
  let seconds: any = Math.floor((duration / 1000) % 60);
  let minutes: any = Math.floor((duration / (1000 * 60)) % 60);
  let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  if (hours === '00' && minutes === '00') {
    return seconds + ' seconds';
  } else if (hours === '00') {
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  } else {
    return hours + ":" + minutes + ":" + seconds;
  }
}

const App = () => {
  const [time, setTime] = useState<any>(new Date())
  const [isActive, setIsActive] = useState<boolean>(true)
  const [pauses, setPauses] = useState<any[]>([])

  useEffect(() => {
    // return () => clearInterval(interval);
    let mainTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(mainTimer);
  });

  useEffect(() => {
    if (isActive) {
      console.log('hi: ', );
      setPauses([
        {
          wasPaused: false,
          time: new Date(),
          id: Math.random()
        },
        ...pauses,
      ])
    } else {
      console.log('off: ', );
      setPauses([
        {
          wasPaused: true,
          time,
          id: Math.random()
        },
        ...pauses,
      ])
    }
  }, [isActive]);

  useEffect(() => {
    console.log('pauses', pauses);
  }, [pauses])

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const getTimeSince = () => {
    return msToTime(time - pauses[0].time)
  }

  return (
    <div className="App">
        <h1>Hello</h1>
        <h2 style={{ color: isActive ? 'white' : 'red'}}>{printDate(time)}</h2>
        <button onClick={handleClick}>{isActive ? 'Pause' : 'Resume'}</button>
        {
          !isActive && pauses.length
            ? <>
                <h2>Paused since: {printDate(pauses[0].time)}</h2>
                <h2>For {getTimeSince()}</h2>
              </>
            : null
        }
        {
          pauses.slice(isActive ? 0 : 1).map(({id, wasPaused, time}) => <p key={id}>{wasPaused ? 'Stopped' : 'Started'} at {printDate(time)}</p>)
        }
    </div>
  );
}

export default App;
