import React, { useState } from "react";
import { storage } from "../firebase";
import './CD.css';

export default function ReactFirebaseFileUpload(props) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);


  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image !== null) {
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
              props.setMyImageUrl(url);
            });
        }
      );
    }
  };

  console.log("image: ", image);

  return (

    <div>

      <table className="posicion">
        <tr>
          <td className="centro" >

            <img className="foto" alt="firebase" src={url || "https://upload.wikimedia.org/wikipedia/commons/4/42/Photo-camera-in-circular-outlined-interface-button.svg"} />

          </td>
          <td className="tamano">

            <progress value={progress} max="100" />
            <br />
            <br />
            <input type="file" id="selectedFile"  onChange={handleChange} />
            <br />
            <br />
            <button className="btn" onClick={handleUpload}>Upload</button>

          </td>
        </tr>

        {/* {url} */}

      </table>
    </div>
  );
};

//render(<ReactFirebaseFileUpload />, document.querySelector("#root"));

