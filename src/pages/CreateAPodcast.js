import React from 'react';
import CreatePodcastForm from '../components/StartAPodcast/CreatePodcastForm';
import Header from '../components/common/Header';

const CreateAPodcast = () => {
  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
            <h1>Create A Podcast</h1>
            <CreatePodcastForm/>
        </div>
    </div>
  )
}

export default CreateAPodcast;
