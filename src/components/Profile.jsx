import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("user is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("user logged out succesfully");
    } catch (error) {
      console.error("error while loggingout", error.message);
    }
  }

  return (
    <div className="profile">
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.firstName} 👋👋 </h3>
          <div>
            <p>Email : {userDetails.email} </p>
            <p>firstName: {userDetails.firstName} </p>
            <p>lastName : {userDetails.lastName} </p>
          </div>
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
