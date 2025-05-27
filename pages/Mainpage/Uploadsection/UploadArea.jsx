import { useState, useRef, useEffect } from 'react';
import '../../../src/Css/Mainpage/Uploadsection/Uploadarea.css'
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Filecontainer from '../../Component/Filecontainer'
import { CiSearch } from "react-icons/ci";


/**
 * UploadArea Component
 * 
 * This component provides a user interface for uploading documents. It includes a modal for adding documents,
 * a drag-and-drop area for file uploads, and a search bar for filtering modules.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered UploadArea component.
 * 
 * @example
 * <UploadArea />
 * 
 * @state {boolean} uploadModal - Controls the visibility of the upload modal.
 * @state {boolean} dragState - Indicates whether a file is being dragged over the drop area.
 * 
 * @ref {React.RefObject} fileInputRef - A reference to the hidden file input element.
 * 
 * @function handleUploadClick - Triggers the file input click event to open the file picker.
 * @param {React.MouseEvent} e - The click event.
 * 
 * @function onFileDrop - Handles the file drop event and processes the dropped files.
 * @param {React.DragEvent} e - The drag event.
 * 
 * @function handleDrag - Handles the drag event to update the drag state.
 * @param {React.DragEvent} e - The drag event.
 */

function UploadArea({ username, userId }) {
  const [uploadModal , setUploadModal] = useState(false);
  const fileInputRef = useRef(null);
  const [dragState , setDrag] = useState(false);
  const [files , setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch uploaded files from server
  const fetchUploadedFiles = async () => {
    try {
      const res = await fetch('http://localhost:3090/list-uploads');
      const data = await res.json();
      setUploadedFiles(data);
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
     if(e.target.files && e.target.files.length > 0){
       setFiles(Array.from(e.target.files));
     }
  };

  // Open file picker
  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  }

  // Upload files to server
const handleUpload = async (e) => {
  e.preventDefault();
  setUploading(true);
  setUploadError('');
  setUploadSuccess('');
  if (files.length === 0) {
    setUploadError('No files selected.');
    setUploading(false);
    return;
  }
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));
  formData.append('title', title);
  formData.append('user_id', userId);

  try {
    const res = await fetch('http://localhost:3090/uploads', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      setUploadSuccess('Upload successful!');
      setFiles([]);
      fetchUploadedFiles();
    } else {
      setUploadError(data.error || 'Upload failed.');
    }
  } catch (err) {
    setUploadError('Upload failed: ' + err.message);
  }
  setUploading(false);
};

  return(
    <>
       <div className="Uploadarea-content">
          <div className="Uploadarea-body">
            <div className="Uploadarea-body-header">
                <h1>Modules</h1>
                <br />
                <hr />
                <div className="Uploadarea-search">
                  <div className="search-content">
                    <input type="text" placeholder='Search' name="Upload-search-box" id="Upload-search-box" />
                    <CiSearch size={'3%'}/>
                  </div>
                  <IoIosAdd className='add-button' onClick={() => setUploadModal(true)} />
                </div>
                <div className="Uploadarea-data-area" style={{
  maxHeight: '300px',
  overflowY: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  padding: '10px'
}}>
  {uploadedFiles.map(file => (
  <div key={file.id} style={{
    width: '120px',
    minHeight: '60px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '8px',
    background: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.95em',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
  }}>
    <div title={file.title} style={{ fontWeight: 'bold', marginBottom: '4px' }}>
      {file.title}
    </div>
    <div style={{ fontSize: '0.9em', color: '#555', marginBottom: '4px' }}>
      Uploaded by: <b>{file.username}</b>
    </div>
    <a
      href={`http://localhost:3090/uploads/${encodeURIComponent(file.filename)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: '0.85em',
        color: '#1976d2',
        textDecoration: 'underline'
      }}
    >
      Download
    </a>
  </div>
))}
</div>
            </div>
          </div>
       </div>
       {uploadModal && 
         <dialog className='uploadModal' open>
           <div className="uploadModal-box">
           <div className="uploadModal-box-header">
             <p>Add Documents</p>
             <IoMdClose onClick={() => setUploadModal(false)} className='upload-exit-button'/>
           </div>
           <hr />
           <form className="uploadModal-box-body" onSubmit={handleUpload}>
             <label htmlFor="Module-name">Title</label>
             <br />
             <input
                type="text"
                name='Module-name'
                className='Document-title-input'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              /> 
             <div className="Document-upload-box" onClick={openFilePicker} onDragOver={(e) => e.preventDefault()}>
               <p>Drop your files here or choose your file</p>
             </div>
             <div className="Files">
                 {files.map(file => <Filecontainer key={file.name + file.size} name={file.name} size={file.size} url={URL.createObjectURL(file)}/>)}
             </div>
             {uploadError && <div style={{color: 'red'}}>{uploadError}</div>}
             {uploadSuccess && <div style={{color: 'green'}}>{uploadSuccess}</div>}
             <button className="upload-button" type="submit" disabled={uploading}>
                   {uploading ? 'Uploading...' : 'Upload'}
             </button>
             <input type="file" hidden ref={fileInputRef} multiple onChange={handleFileChange} />
           </form>
           </div>
         </dialog>
       }
    </>
  );
}
export default UploadArea;