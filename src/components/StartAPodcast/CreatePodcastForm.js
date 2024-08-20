import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import InputComponent from '../common/Input';
import FileInput from '../common/Input/FileInput';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection} from 'firebase/firestore';

const CreatePodcastForm = () => {
  const [title,setTitle] = useState("") ;
  const [desc,setDesc] = useState("") ;
  const [displayImage,setDisplayImage] = useState() ;
  const [bannerImage,setBannerImage] = useState() ;
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async() =>{
      setLoading(true);
      if(title && desc && displayImage && bannerImage){
        try {
          const bannerImageRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
          await uploadBytes(bannerImageRef,bannerImage);
          const bannerImageUrl = await getDownloadURL(bannerImageRef);

          const displayImageRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
          await uploadBytes(displayImageRef,displayImage);
          const displayImageUrl = await getDownloadURL(displayImageRef);

          const podcastData = {
            title: title,
            description: desc,
            bannerImage: bannerImageUrl,
            displayImage: displayImageUrl,
            createdBy: auth.currentUser.uid,
          }

          const docRef = await addDoc(collection(db,"podcasts"),podcastData);
          setTitle("");
          setDesc("");
          setBannerImage(null);
          setDisplayImage(null);

          setLoading(false);
          toast.success("Podcast Created !");
          navigate("/profile");
        } catch (error) {
          setLoading(false);
          toast.error(error.message);
        }
      }else{
        toast.error("Please provide all details");
        setLoading(false);
      }
  }

  const bannerImageFileHandle = (file) =>{
      setBannerImage(file);
  }

  const displayImageFileHandle = (file) =>{
      setDisplayImage(file);
  }

  return (
    <>
      <InputComponent type="text" state={title} setState={setTitle} placeholder="Title" required={true}/>
      <InputComponent type="text" state={desc} setState={setDesc} placeholder="Description" required={true}/>
      <FileInput accept={"image/*"} id={"display-image-input"} fileHandleFunc={displayImageFileHandle} text={"Upload Display Image"}/>
      <FileInput accept={"image/*"} id={"banner-image-input"} fileHandleFunc={bannerImageFileHandle} text={"Upload Banner Image"}/>
      <Button text={loading?"Loading...":"Create Podcast"} disabled={loading} onClick={handleSubmit}/>
    </>
  )
}

export default CreatePodcastForm;
