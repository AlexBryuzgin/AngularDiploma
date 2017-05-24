import React, { Component } from 'react';
import Dropzone from 'dropzone';
// import Dropzone from 'react-dropzone';
import { Link } from 'react-router';
import './adminPage.css';
import '../../../../../node_modules/dropzone/src/dropzone.scss';

Dropzone.options.myDropzone = {
  acceptedFiles: 'image/*',
  maxFilesize: 2048,
  clickable: true,
  addRemoveLinks: true,
  dictCancelUploadConfirmation: 'Are you sure?',
  maxFiles: 4,
  init() {
    this.on("addedfile", function(file){console.log('added', file)});
    this.on("removedfile", function(file){console.log('removed', file)});
    this.on("thumbnail", function(file, uri){console.log('thumbnail', { file, uri })})
  }
};

export default function AdminPage(){
  return (
    <div className='admin-page'>
      <form
        action="http://localhost:8080/images"
        method="post"
        encType="multipart/form-data"
        className="dropzone"
        id="my-dropzone"
      >
        <div className="fallback">
          <input type="file" name="file" multiple />
        </div>
      </form>
      <Link to='/admin/all-users'>Просмотреть пользователей</Link>
    </div>
  );
}

// export default class AdminPage extends Component {
//   constructor() {
//     super()
//     this.state = { files: [] }
//   }

//   onDrop(files) {
//     this.setState({
//       files
//     }, () => console.log(this.state));
//   }

//   render() {
//     return (
//       <section>
//         <div className="dropzone">
//           <Dropzone onDrop={this.onDrop.bind(this)} accept="image/*">
//             <p>Try dropping some files here, or click to select files to upload.</p>
//           </Dropzone>
//         </div>
//         <aside>
//           <h2>Dropped files</h2>
//           <ul>
//             {
//               this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
//             }
//           </ul>
//         </aside>
//       </section>
//     );
//   }
// }