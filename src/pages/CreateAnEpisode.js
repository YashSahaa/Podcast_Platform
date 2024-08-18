import React, { useState } from 'react';
import Header from '../components/common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../components/common/Input';
import FileInput from '../components/common/Input/FileInput';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const CreateAnEpisode = () => {
  const {id} = useParams();
  const [title,setTitle] = useState("") ;
  const [desc,setDesc] = useState("") ;
  const [audioFile,setAudioFile] = useState();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const audioFileHandle = (file) =>{
      setAudioFile(file);
  }

  const handleSubmit = async () =>{
      setLoading(true);
      if(title, desc, audioFile, id){
          try {
            const audioRef = ref(storage,`podcasts-episodes/${auth.currentUser.uid}/${Date.now()}`);
            await uploadBytes(audioRef,audioFile);

            const audioUrl = await getDownloadURL(audioRef);
            const episodeData = {
              title: title,
              description: desc,
              audioFile: audioUrl,
            }

            await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
            setTitle("");
            setDesc("");
            setAudioFile(null);

            setLoading(false);
            toast.success("Episode Created Successfully!");
            navigate(`/podcast/${id}`)
          } catch (error) {
            setLoading(false);
            toast.error(error.message);
          }
      }else{
          toast.error("Please provide all details");
          setLoading(false);
      }
  }

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        <h1>Create An Episode</h1>
        <InputComponent type="text" state={title} setState={setTitle} placeholder="Title" required={true}/>
        <InputComponent type="text" state={desc} setState={setDesc} placeholder="Description" required={true}/>
        <FileInput accept={"audio/*"} id={"audio-file-input"} fileHandleFunc={audioFileHandle} text={"Upload Audio File"}/>
        <Button text={loading?"Loading...":"Create Episode"} disabled={loading} onClick={handleSubmit}/>
      </div>
    </div>
  )
}

export default CreateAnEpisode;
