import React, { useState, useRef } from 'react';
import './style.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { create } from 'ipfs-http-client';
import ImageUploader from 'react-images-upload';
import Modal from '@material-ui/core/Modal';
import 'dotenv'
import { useStore } from '../../../context/GlobalState';
// import WalletsModal from '../../../modals/walletsModal/index'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import 'dotenv'
// import Buffer from 'buffer';
import Loader from "react-loader-spinner";


const validationSchema = yup.object({

});
const client = create('https://ipfs.infura.io:5001/api/v0')


const PublishNftForm = () => {
  const toast = useRef(null);
  const [{ web3, accounts, apiUrl }, dispatch] = useStore();
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleOpenWalletModal = () => {
    setOpenWalletModal(true);
  };

  const handleCloseWalletModal = () => {
    setOpenWalletModal(false);
  };

  const [image_uri, updateFileUrl] = useState(``);
  async function onChange(e) {
    const file = e

    console.log("eee", e)
    try {
      setLoading(false);
      const added = await client.add(file)
      console.log("added", added, image_uri)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url);
      setLoading(true);

      // return file;
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  console.log("apiUrl", apiUrl)

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      // supply: '',
      category: "",
      external_link: "",
      price: "",
      creator_name: "",
      user_email: ""

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // values.imgUri = fileUrl
      console.log("values", values)
      handlePublishNft(values.name, values.description, "1",
        values.price * 10 ** 18, values.external_link, accounts[0], values.creator_name, values.user_email,
        values.category
      )
    },
  });
  const handlePublishNft = async (name, description, network,
    price, external_link, owner_address, creator_name, user_email, category) => {
    try {
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${process.env.REACT_APP_SIGN}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,

        body: JSON.stringify({
          name, description, network,
          price, image_uri, external_link, owner_address,
          creator_name, user_email, category
        })
      };
      let submitForm = await fetch(`${apiUrl}save_nft`, requestOptions)
      submitForm = await submitForm.json();
      if (submitForm && submitForm.status == false) throw submitForm.error;

      console.log("submitForkm", submitForm)
      toast.current.show({ severity: 'success', summary: 'Success!', detail: 'Nft Request Submitted!' });


   
    }
    catch (error) {
      toast.current.show({ severity: 'error', summary: 'Failed!', detail: error });
      console.log("submitForm", error)
    }
  }

  return (
    <>
      <div className="p-form-cont">
        <div className="p-form-inner-cont">
          <div className="p-form-heading-cont">
            <h3>Publish Your NFT!</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>

            <p>
              <b>*Name: </b>
              Your NFT name will show as a title
                </p>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="*Name"
              variant="filled"
              color="secondary"
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={`${formik.values.name.length}/${50}`}

              className="p-form-input"

            />
            <p>
              <b>*Email: </b>
              Your Email
                </p>
            <TextField
              fullWidth
              id="user_email"
              name="user_email"
              label="*Email"
              variant="filled"
              color="secondary"
              type="email"
              value={formik.values.user_email}
              helperText={`${formik.values.user_email.length}/${50}`}
              onChange={formik.handleChange}
              className="p-form-input"

            />
            <p>
              <b>*Description: </b>
              The description will be included on the item's detail page underneath its image.
              </p>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="*Description"
              helperText={`${formik.values.description.length}/${500}`}
              variant="filled"
              color="secondary"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="p-form-input"
            />
            <p>
              <b>External Link: </b>
              Cake Coin will include a link to this URL on this item's detail page, so that
               users can click to learn more about it. You are welcome to link to your own webpage with
               more details.
              </p>
            <TextField
              fullWidth
              id="external_link"
              name="external_link"
              label="External link"
              variant="filled"
              color="secondary"
              helperText={`${formik.values.external_link.length}/${110}`}
              value={formik.values.external_link}
              onChange={formik.handleChange}
              className="p-form-input"
            />

           
            {
              Math.sign(formik.values.price) != "-1" ?
                "" : <span style={{ color: "red" }}>Value Should be positive</span>
            }
            <p>
              <b>*Price: </b>
              Price of your NFT.
              </p>
            <TextField
              fullWidth
              id="filled-secondary"
              name="price"
              label="*Price"
              variant="filled"
              color="secondary"
              value={formik.values.price}
              helperText={`${formik.values.price.length}/${10}`}
              onChange={formik.handleChange}
              className="p-form-input"


            />

            <p>
              <b>*Creator Name: </b>
              Creator name of this NFT.
              </p>
            <TextField
              fullWidth
              variant="filled"
              color="secondary"
              id="creator_name"
              name="creator_name"
              label="*Creator name"
              helperText={`${formik.values.creator_name.length}/${50}`}
              value={formik.values.creator_name}
              onChange={formik.handleChange}
              className="p-form-input"
            />
       
            <div className="p-form-image-cont">
              <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText='Choose images'
                onChange={onChange}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
                singleImage={true}
                label="JPG PNG GIF JPEG, MAX SIZE 5MB"
                fileSizeError="file too big, max 5mb allowed"
              />
              <span>Max Size 5mb</span>

            </div>
            <br />
            {
              web3 ?
                <>
                  {
                    Math.sign(formik.values.price) != "-1" ?
                      <button className="p-form-btn" variant="contained" fullWidth type="submit">
                        {
                          loading ?
                            "Submit" :
                            <Loader
                              type="ThreeDots"
                              color="#78a94e"
                              height={20}
                              width={100}
                              timeout={10000}
                            //3 secs
                            />
                        }
                      </button>
                      :
                      " "

                  }
                </>

                :
                ""
            }

          </form>
          {
            web3 ?
              ""
              :
              <button className="p-form-btn" variant="contained" fullWidth onClick={handleOpenWalletModal}>
                Connect Wallet
      </button>
          }
        </div>
      </div>
      <Toast ref={toast} />

    </>
  )
}

export default PublishNftForm
