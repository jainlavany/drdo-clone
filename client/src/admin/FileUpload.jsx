import { useState } from 'react';
import { uploadFile } from './api';

const SERVER = 'http://localhost:4000';

// Shows a preview of the current value (URL or uploaded path)
function Preview({ type, url }) {
  if (!url) return null;
  const full = url.startsWith('http') ? url : `${SERVER}${url}`;
  if (type === 'image') return (
    <div className="adm-upload-preview">
      <img src={full} alt="preview" onError={e => e.target.style.display='none'} />
      <span>Image uploaded ✓</span>
    </div>
  );
  return (
    <div className="adm-upload-preview">
      📄 <a href={full} target="_blank" rel="noreferrer" style={{color:'inherit'}}>PDF uploaded ✓</a>
    </div>
  );
}

export default function FileUpload({ type, value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState('');

  const accept = type === 'image' ? 'image/*' : 'application/pdf';

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setError('');
    try {
      const res = await uploadFile(type, file);
      onChange(res.url, res.size || '');
    } catch(err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="adm-fg">
      <label>{label || (type === 'image' ? 'Image' : 'PDF File')}</label>

      {/* URL input */}
      <input
        type="url"
        placeholder={type === 'image' ? 'https://… or upload below' : 'https://… or upload below'}
        value={value || ''}
        onChange={e => onChange(e.target.value, '')}
      />

      {/* Upload button */}
      <label className="adm-upload-btn">
        {uploading ? <span className="adm-upload-progress">⏳ Uploading…</span>
          : <><span>📁</span> {type === 'image' ? 'Upload Image' : 'Upload PDF'}</>}
        <input type="file" accept={accept} onChange={handleFile} disabled={uploading} />
      </label>

      {error && <span style={{fontSize:'0.75rem',color:'#b91c1c'}}>⚠ {error}</span>}
      <Preview type={type} url={value} />
    </div>
  );
}
