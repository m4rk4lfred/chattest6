import '../../src/Css/Mainpage/Uploadsection/Filecontainer.css';

{/* Filecontainer Component*/}
function Filecontainer({ name, size, url }) {
  


  const formatSize = () => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };
     {/* Filecontainer component displays the file name and size */}
  return (
    
    <div className="filecontainer-content">
      <div className="filecontainer-name">
        <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
      </div>
      <div className="filecontainer-size">
        <p>{formatSize()}</p>
      </div>
    </div>
  );
}
export default Filecontainer;