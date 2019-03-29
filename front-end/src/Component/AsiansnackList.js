import React from "react";
import axios from "axios";
import AsiansnackItem from "./AsiansnackItem";
import Modal from "react-responsive-modal";
import {Link} from"react-router-dom";


export default class AsiansnackList extends React.Component {
  constructor() {
    super();
  
    this.uploadForm = React.createRef();

    this.state = {
      snack: [],
      open: false
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/asia").then(res => {
      this.setState({
        snack: res.data
      });
    });
  }

  onOpenModal = () => {
    this.setState({ open: !this.state.open });
  };

  onCloseModal = () => {
    this.setState({ open: !this.state.open });
  };

  onChangeHandler = e => {
    console.log(e.target.files[0]);
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  uploadSnack = e => {
    e.preventDefault();
    let upload = this.uploadForm.current;
    const data = new FormData();
    data.append("file", upload.file.files[0]);
    data.append("name",upload.snackName.value);
    data.append("country",upload.snackCountry.value);
    data.append("description",upload.snackDescription.value);
    data.append("price",upload.snackPrice.value);
    data.append("flavour",upload.snackFlavour.value);

    console.log(upload.file);
    const config = {
        headers:{
            'Content-Type': "multipart/form-data"
        }
    }
    axios.post(`http://localhost:8080/asia`, data,config)
    .then(res => {
        this.setState({
          snack:res.data
        })
    }).catch(console.error)

  };

  render() {
    const { open } = this.state;
    return (
      <div className="asiansnack--container">
        <Link to="/">
            <h1>Asian Snacks</h1>
        </Link>
        <div className="imageList--container">
          {this.state.snack.map(item => (
            <AsiansnackItem
              name={item.name}
              description={item.description}
              image={item.image}
              id={item.id}
              country={item.country}
              price={item.price}
              key={item.id}
            />
          ))}
          <button className="upload__button" onClick={this.onOpenModal}>
            <img src="Assets/SVG/Icon-add.svg" alt="" />
          </button>
        </div>
        <div>
          <Modal  open={open} onClose={this.onCloseModal} center>
            <h2>Add New Snack</h2>
            <form className="upload__form" ref={this.uploadForm} onSubmit={this.uploadSnack}>
                <div>
                    <label>Snack Name:</label>
                    <input className="snackname" type="text" name="snackName" />
                </div>
                <div>
                    <label>Country of Origin:</label>
                    <input className="snackcountry" type="text" name="snackCountry" />
                </div>
                <div className='upload__description'>
                    <label>Description:</label>
                    <textarea type="text" name="snackDescription" />
                </div>
                <div>
                    <label>Flavour:</label>
                    <input className="snackflavour" type="text" name="snackFlavour" />
                </div>
                <div>
                    <label>Price:</label>
                    <input className="snackprice" type="text" name="snackPrice" />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="file" />
                </div>
                <div className="button--container">
                    <button type="submit" onClick={this.onCloseModal}>Upload</button>
                </div>
            </form>
          </Modal>
        </div>
              <div className='stage'>
                   <div className="desk"></div>
                   <div className="desk-shadow"></div>
               </div>
               <div className='stage-2'>
                   <div className="desk"></div>
                   <div className="desk-shadow"></div>
               </div>
               <div className='stage-3'>
                   <div className="desk"></div>
                   <div className="desk-shadow"></div>
               </div>
               <div className='stage-4'>
                   <div className="desk"></div>
                   <div className="desk-shadow"></div>
               </div>
      </div>
    );
  }
}
