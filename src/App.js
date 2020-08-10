import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CreateRoom from './routes/createRoom';
import Room from './routes/room';
const vidStyle = {
  height : 500,
  width :500,
  margin: 5,
  backgroundColor : 'black'
}

function App(){

  return (

    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={CreateRoom}/>
          <Route path="/room/:roomID" component={Room}/>
        </Switch>
      </BrowserRouter>
    </div>

  )

}

export default App;
