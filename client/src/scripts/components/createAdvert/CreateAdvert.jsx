import React from 'react';
import Dropzone from 'react-dropzone';
import ImageInfo from './ImageInfo';
import Button from './../../ui/Button';

import './createAdvert.scss';

export default class CreateAdvert extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [], data: {} };
    this.onDrop = this.onDrop.bind(this);
    this.onFieldChangeHandler = this.onFieldChangeHandler.bind(this);
    this.sendFiles = this.sendFiles.bind(this);
  }

  onDrop(files) {
    this.setState({
      files
    }, () => console.log(this.state.files));
  }

  onFieldChangeHandler(e) {
    const { value, name } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      }
    }, () => console.log(this.state))
  }

  sendFiles() {
    this.props.postAdvert(this.state.files);
  }
  render() {
    return (
      <form className="create-advert">
        <div className="image-zone">
          <Dropzone onDrop={this.onDrop} accept="image/*" className="image-dropzone">
            <p>Выберите изображения</p>
            <div className="images">
              {
                this.state.files.map(f => <ImageInfo
                  src={f.preview}
                  alt={f.name}
                  photoName={f.name}
                  size={f.size}
                  key={f.lastModified}
                />)
              }
            </div>
          </Dropzone>
        </div>
        <div className="fields">
          <input type="text" name="title" placeholder="Введите название" onChange={this.onFieldChangeHandler} />
          <input type="text" name="country" placeholder="Введите страну" onChange={this.onFieldChangeHandler} />
          <input type="text" name="city" placeholder="Введите город" onChange={this.onFieldChangeHandler} />
          <input type="text" name="address" placeholder="Введите адрес" onChange={this.onFieldChangeHandler} />
          <textarea name="" id="" placeholder="Здесь будет описание" onChange={this.onFieldChangeHandler} />
          <input type="number" min={0} name="price" placeholder="Введите цену" onChange={this.onFieldChangeHandler} />
          <label htmlFor="auction">Аукцион</label>
          <input type="checkbox" id='auction'/>
        </div>
        <Button onClick={this.sendFiles} type="button" primary>Создать объявление</Button>
      </form>
    );
  }
}