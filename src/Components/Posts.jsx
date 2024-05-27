import React, { useContext, useEffect, useState } from "react";
import Heart from "../assets/Heart";
import "../../public/Post.css";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import FirebaseContext from "../storage/firebaseContext";
import {useNavigate} from "react-router-dom";
import { ViewContext } from "../storage/viewContext";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const {setViewProduct} = useContext(ViewContext);
  const [products, setProducts] = useState([]);
  const fireDB = getFirestore(firebase);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(fireDB, "products");
      const snapShot = await getDocs(productsCollection);
      const allProducts = snapShot.docs.map((elems) => {
        return { ...elems.data(), id: elems.id };
      });
      setProducts(allProducts);
    };
    fetchProducts();
  },[]);

  const goToViews = (product)=> {
    setViewProduct(product);
    navigate("/view-post");
  }

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>All products</span>
        </div>
        <div className="cards">
        {products.map((elems) => {
            return (<div key={elems.id} className="card" onClick={()=>goToViews(elems)}>
              <div className="favorite"><Heart/></div>
              <div className="image">
                <img src={elems.imageURL} alt="bike" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9;{elems.price}.00</p>
                <span className="kilometer">{elems.category}</span>
                <p className="name">{elems.name}</p>
              </div>
              <div className="date">
                <span>{elems.createAt}</span>
              </div>
            </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
