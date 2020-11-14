import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "../firebase";

import cam from '../../assets/camara.png'; // gives image path
import './CD.css';

export default function ReactFirebaseFileUpload  ()  {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);


  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if(image!==null){
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
    }
  };

  console.log("image: ", image);

  return (
    
     
     <table>
       <tr>
      <img className="foto" src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
</tr>
<tr>
      <progress value={progress} max="100" />
      </tr>
      <tr>
      <input type="file" onChange={handleChange} />
      </tr>
      <tr>
      <button className="btn" onClick={handleUpload}>Upload</button>
      </tr>
   
      {url}

      </table>
      
     
      

  );
};

//render(<ReactFirebaseFileUpload />, document.querySelector("#root"));

