import React, {useState} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {storage} from '../firebase'
import { updateProfile } from "firebase/auth";


 const UploadFiles = () => {

  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [currentUser] = useAuthState(auth)


  const handleUpload = (e) => {
    e.preventDefault();
    if(!file) {
      alert("Please chose a file first!")
    }
    const storageRef = ref(storage, `/files/${file.name}`)
     const uploadTask = uploadBytesResumable(storageRef, file);
     uploadTask.on(
       "state_changed",
       (snapshot) => {
         const percent = Math.round(
           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         );

         // update progress
         setPercent(percent);
       },
       (err) => console.log(err),
       () => {
         // download url
         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              if(url) {
updateProfile(currentUser, {
  photoURL: url,
}).then(() => {
  console.log("profile updated");
  document.getElementById("uploadFile").value = "";
});
              }

         });
       }
     );
    
  }
  return (
    
      <div className="mb-10 ">
        <input
          className="ml-[20%] mb-2"
          type="file"
          accept="/image/*"
          onChange={(e) => setFile(e.target.files[0])}
          id='uploadFile'
          
        />
        <button
          onClick={handleUpload}
          className="text-lg text-green-200 cursor-pointers ml-[20%]"
        >
          Change Profile Photo
        </button>
      </div>
    
  );
}

export default UploadFiles
