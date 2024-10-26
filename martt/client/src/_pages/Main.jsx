import { useEffect, useState } from "react";
import "../_styles/main.scss";
import { BiBookmark, BiCart } from "react-icons/bi";
import Latest from "../_components/Latest";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productApi } from "../_constants/api-urls";

const Main = () => {
  const [size, setSize] = useState();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedImage, selectImage] = useState();
  const [sizePop, setSizePop] = useState(false);
  const fetchResponse = async () => {
    try {
      const res = await axios.get(`${productApi}/${id}`);
      if (res?.data?.foundProduct) {
        setData(res.data.foundProduct);
        selectImage(res.data.foundProduct.image[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchResponse();
  }, [id]);

  return (
    <div className="main-container flex col">
      <div className="product-info flex">
        <div className="left flex col">
          {/* <div className="shop-info flex col">
            <span>{data?.shop?.name}</span>
            <p>{data?.shop?.description}</p>
            <p>{data?.shop?.location}</p>
            <p>{data?.shop?.contactNumber}</p>
            <p>{data?.shop?.email}</p>
          </div> */}
          <div className="cat-info flex col">
            <span>{data?.category}</span>
            <p>
              We work with monitoring programmes to ensure compliance with our
              social, environmental and health and safety standards for our
              products. To assess compliance, we have developed a programme of
              audits and continuous improvement plans.
            </p>
            <button className="btn-view flex">view more</button>
          </div>
        </div>
        <div className="left-images flex">
          <div className="main-image flex">
            <img
              src={selectedImage ? selectedImage : data?.image?.[0]}
              alt=""
            />
          </div>
          <div className="small-images flex col">
            {data?.image?.map((image) => {
              return (
                <div className="small-card flex" key={image}>
                  <img
                    className={image === selectedImage ? "active" : ""}
                    src={image}
                    alt=""
                    onClick={() => selectImage(image)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="information-main flex col">
          <div className="top-info flex col">
            <div className="icons flex">
              <div className="icon flex">
                <BiBookmark />
              </div>
              <div className="icon flex">
                <BiCart />
              </div>
            </div>
            <p style={{ marginTop: "20px", fontWeight: "600" }}>{data?.name}</p>
            <p>${data?.price}</p>
            <span>{data?.description}</span>
            <span style={{ marginTop: "20px", fontWeight: 600 }}>
              shipping & return.
            </span>
          </div>
          <div className="variants flex col">
            <span>{data?.color?.[0]}</span>
            <div className="sizes flex">
              {data?.sizes?.map((item) => {
                return (
                  <div
                    className="size flex"
                    key={item}
                    style={{
                      background: `${size === item ? "#333" : ""}`,
                      color: `${size === item ? "white" : ""}`,
                    }}
                    onClick={() => setSize(item)}
                  >
                    <span
                      style={{
                        fontWeight: `${size === item ? 600 : ""}`,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
            {data?.color?.length > 0 ? (
              <div className="colors flex">
                {data?.color?.map((color) => {
                  return (
                    <div
                      className="color flex"
                      key={color}
                      style={{ background: `${color}` }}
                    ></div>
                  );
                })}
              </div>
            ) : (
              this
            )}
            <button
              className="btn-buy flex"
              onClick={() => (size ? alert("working") : setSizePop(true))}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
      <Latest productLength={4} />
      {sizePop && (
        <div className="size-warning flex" onClick={() => setSizePop(false)}>
          <div className="card flex col" onClick={(e) => e.stopPropagation()}>
            <h2>warning</h2>
            <p>you must select a size & color color is black by default.</p>
            <button className="btn-close" onClick={() => setSizePop(false)}>
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
