import React from 'react';
const vidStyle = {
  height : 500,
  width :500,
  margin: 5,
  backgroundColor : 'black'
}
class App extends React.Component {

  constructor(props){
    super(props);
    this.localVideoRef = React.createRef();
    this.remoteVideoRef = React.createRef();
    this.textref = React.createRef();
  }

  componentDidMount(){
    this.pc = new RTCPeerConnection(null);
    this.pc.onicecandidate = (e)=>{
      if(e.candidate){
        console.log(JSON.stringify(e.candidate));
      }
    }
    this.pc.oniceconnectionstatechange = (e)=>{
      console.log(e);
    }
    this.pc.ontrack = (e)=>{
      this.remoteVideoRef.current.srcObject = e.streams[0];
    }
    const constraints = {audio: false,video: true};
    let success = (stream)=>{
      this.localVideoRef.current.srcObject = stream;
      this.pc.addTrack = stream;
    }
    let failure = (error)=>{
      console.log("getUserMedia error:",error);
    }
    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(failure);
  }

  createOffer = ()=>{
    this.pc.createOffer({offerToReceiveVideo: 1})
      .then(sdp =>{
        console.log(JSON.stringify(sdp));
        this.pc.setLocalDescription(sdp);
      },e=>{})
  }

  setRemoteDescription = ()=>{
    const desc = JSON.parse(this.textref.value);
    this.pc.setRemoteDescription(new RTCSessionDescription(desc));
  }

  createAnswer = ()=>{
    console.log('answer');
    this.pc.createAnswer({offerToReceiveVideo: 1})
      .then(sdp => {
        console.log(JSON.stringify(sdp));
        this.pc.setLocalDescription(sdp);
      },e=>{})
  }

  addCandidate = ()=>{
    const candidate = JSON.parse(this.textref.value);
    console.log("adding candidate",candidate);
    this.pc.addIceCandidate(new RTCIceCandidate(candidate));
  }

  render(){
    
    return (
      <div>
        <video style={vidStyle} ref={this.localVideoRef} autoPlay></video>
        <video style={vidStyle} ref={this.remoteVideoRef} autoPlay></video>

        <br/>
        <button onClick={this.createOffer}>Offer</button>
        <button onClick={this.createAnswer}>Answer</button>
        <br/>
        <textarea ref={ref=>{this.textref = ref}}/>
        <br/>
        <button onClick={this.setRemoteDescription}>Set Remote desc</button>
        <button onClick={this.addCandidate}>Add candidate</button>
      </div>


    );
  }
  
}

export default App;
