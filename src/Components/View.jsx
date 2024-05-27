import React, {useContext, useEffect, useState} from 'react';
import '../../public/View.css';
import {ViewContext} from "../storage/viewContext"
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import FirebaseContext from '../storage/firebaseContext';

function View() {
  const [userData, setUserData] = useState("");
  const {viewProduct} = useContext(ViewContext);
  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const { userID } = viewProduct;
      const database = getFirestore(firebase);
      const usersCollection = collection(database, "users");
      const userQuery = query(usersCollection, where("uid", "==", userID));

      try {
        const snapShot = await getDocs(userQuery);
        snapShot.forEach((doc) => {
          setUserData(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={viewProduct ? `${viewProduct.imageURL}` : ""} alt="image"/>
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{viewProduct.price}.00</p>
          <span>{viewProduct.name}</span>
          <p>{viewProduct.category}</p>
          <span>{viewProduct.createAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>Name : {userData ? userData.name : ""}</p>
          <p>Contact : {userData ? userData.phone : ""}</p>
          <p>Email : {userData ? userData.email : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default View;