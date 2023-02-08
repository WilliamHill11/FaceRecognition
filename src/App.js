import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'ce4498a5c23b44889a977c42c9fd13a5',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    app.models
      .predict(
        {
          id: 'a403429f2ddf4b49b307e318f00e528b',
          version: '34ce21a40cc24b6b96ffee54aabff139',
        },
        this.state.input
      )
      .then((response) =>
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        )
      )
      .catch((err) => {
        console.log('Clarifai Error:', err);
      });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
