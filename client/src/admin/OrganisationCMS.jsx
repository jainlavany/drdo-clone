import { useState, useEffect, useCallback } from 'react';
import { AboutDrdoApi, TechClusterApi, CorporateClusterApi, OnosSettingApi, uploadFile } from './api';

// ── Toast Helper inside local components ──────────────────────────────────────
function LocalToast({ msg, type, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 3000);
    return () => clearTimeout(t);
  }, [onHide]);
  return (
    <div className={`adm-toast ${type === 'ok' ? 'ok' : 'err'}`} style={{ zIndex: 10000 }}>
      {type === 'ok' ? '✓' : '✕'} {msg}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// ── About DRDO CMS ────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────────────────────
export function AboutDrdoCMS({ onToast }) {
  const [doc, setDoc] = useState(null);
  const [vision, setVision] = useState('');
  const [mission, setMission] = useState([]);
  const [aboutText, setAboutText] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    AboutDrdoApi.getAll()
      .then(res => {
        if (res && res.length > 0) {
          const d = res[0];
          setDoc(d);
          setVision(d.vision || '');
          setMission(d.mission || []);
          setAboutText(d.aboutText || []);
          setLastUpdated(d.lastUpdated || '');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAddMission = () => {
    setMission([...mission, '']);
  };

  const handleUpdateMission = (index, value) => {
    const next = [...mission];
    next[index] = value;
    setMission(next);
  };

  const handleRemoveMission = (index) => {
    setMission(mission.filter((_, i) => i !== index));
  };

  const handleAddAboutText = () => {
    setAboutText([...aboutText, '']);
  };

  const handleUpdateAboutText = (index, value) => {
    const next = [...aboutText];
    next[index] = value;
    setAboutText(next);
  };

  const handleRemoveAboutText = (index) => {
    setAboutText(aboutText.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    const body = {
      vision,
      mission: mission.filter(m => m.trim() !== ''),
      aboutText: aboutText.filter(a => a.trim() !== ''),
      lastUpdated
    };

    try {
      if (doc && doc._id) {
        await AboutDrdoApi.update(doc._id, body);
      } else {
        await AboutDrdoApi.create(body);
      }
      onToast('About DRDO content saved successfully', 'ok');
      load();
    } catch (err) {
      console.error(err);
      onToast('Failed to save content', 'err');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="adm-panel" style={{ padding: '2rem', textAlign: 'center' }}>Loading About DRDO CMS...</div>;
  }

  return (
    <div className="adm-panel">
      <div className="adm-panel-hd">
        <div className="adm-panel-title">📝 Edit About DRDO Content</div>
        <div className="adm-panel-actions">
          <button className="adm-btn-save" onClick={handleSave} disabled={saving} style={{ padding: '0.5rem 1.5rem' }}>
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Vision */}
        <div className="adm-fg">
          <label style={{ fontWeight: '600', fontSize: '0.95rem' }}>Vision</label>
          <textarea
            value={vision}
            onChange={e => setVision(e.target.value)}
            rows={2}
            placeholder="Vision statement..."
          />
        </div>

        {/* Mission */}
        <div>
          <label style={{ fontWeight: '600', fontSize: '0.95rem', display: 'block', marginBottom: '0.5rem' }}>Mission Statements</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {mission.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={item}
                  onChange={e => handleUpdateMission(idx, e.target.value)}
                  placeholder={`Mission Point ${idx + 1}`}
                  style={{ flex: 1 }}
                />
                <button
                  className="adm-btn-del"
                  onClick={() => handleRemoveMission(idx)}
                  style={{ height: '36px', padding: '0 10px', marginTop: 0 }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className="adm-btn-add"
              onClick={handleAddMission}
              style={{ alignSelf: 'flex-start', marginTop: '0.25rem', padding: '4px 12px', fontSize: '0.8rem' }}
            >
              + Add Mission Point
            </button>
          </div>
        </div>

        {/* About Paragraphs */}
        <div>
          <label style={{ fontWeight: '600', fontSize: '0.95rem', display: 'block', marginBottom: '0.5rem' }}>About DRDO Text Paragraphs</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {aboutText.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <textarea
                  value={item}
                  onChange={e => handleUpdateAboutText(idx, e.target.value)}
                  placeholder={`Paragraph ${idx + 1}`}
                  rows={4}
                  style={{ flex: 1, minHeight: '80px' }}
                />
                <button
                  className="adm-btn-del"
                  onClick={() => handleRemoveAboutText(idx)}
                  style={{ height: '36px', padding: '0 10px', marginTop: 0 }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className="adm-btn-add"
              onClick={handleAddAboutText}
              style={{ alignSelf: 'flex-start', marginTop: '0.25rem', padding: '4px 12px', fontSize: '0.8rem' }}
            >
              + Add Paragraph
            </button>
          </div>
        </div>

        {/* Last Updated */}
        <div className="adm-fg" style={{ maxWidth: '300px' }}>
          <label style={{ fontWeight: '600', fontSize: '0.95rem' }}>Last Updated Date</label>
          <input
            type="text"
            value={lastUpdated}
            onChange={e => setLastUpdated(e.target.value)}
            placeholder="e.g. 01 Jun 2026"
          />
        </div>

      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// ── Technology Clusters CMS ───────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────────────────────
export function TechClustersCMS({ onToast }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // 'add' | editItem | null

  // Form states
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('#003a70');
  const [description, setDescription] = useState('');
  const [href, setHref] = useState('');
  const [labsStr, setLabsStr] = useState('');
  const [focus, setFocus] = useState([]);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    TechClusterApi.getAll()
      .then(res => {
        setItems(res || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setId('');
    setName('');
    setShortName('');
    setIcon('');
    setColor('#003a70');
    setDescription('');
    setHref('');
    setLabsStr('');
    setFocus([]);
    setModal('add');
  };

  const openEdit = (item) => {
    setId(item.id || '');
    setName(item.name || '');
    setShortName(item.shortName || '');
    setIcon(item.icon || '');
    setColor(item.color || '#003a70');
    setDescription(item.description || '');
    setHref(item.href || '');
    setLabsStr((item.labs || []).join(', '));
    setFocus(item.focus || []);
    setModal(item);
  };

  const handleAddFocus = () => {
    setFocus([...focus, '']);
  };

  const handleUpdateFocus = (idx, val) => {
    const next = [...focus];
    next[idx] = val;
    setFocus(next);
  };

  const handleRemoveFocus = (idx) => {
    setFocus(focus.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!id || !name || !shortName) {
      alert('Slug ID, Name, and Short Name are required.');
      return;
    }

    setSaving(true);
    const body = {
      id: id.toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
      name,
      shortName,
      icon,
      color,
      description,
      href,
      labs: labsStr.split(',').map(s => s.trim()).filter(s => s !== ''),
      focus: focus.filter(f => f.trim() !== '')
    };

    try {
      if (modal === 'add') {
        await TechClusterApi.create(body);
        onToast('Cluster created successfully', 'ok');
      } else {
        await TechClusterApi.update(modal._id || modal.id, body);
        onToast('Cluster updated successfully', 'ok');
      }
      setModal(null);
      load();
    } catch (err) {
      console.error(err);
      onToast('Failed to save cluster', 'err');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete Technology Cluster "${item.shortName || item.name}"?`)) return;
    try {
      await TechClusterApi.remove(item._id || item.id);
      onToast('Cluster deleted', 'ok');
      load();
    } catch (err) {
      console.error(err);
      onToast('Failed to delete cluster', 'err');
    }
  };

  const filtered = items.filter(item =>
    !search ||
    (item.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.shortName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adm-panel">
      <div className="adm-panel-hd">
        <div className="adm-panel-title">✈️ Technology Clusters</div>
        <div className="adm-panel-actions">
          <input
            className="adm-search"
            placeholder="Search clusters..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="adm-btn-add" onClick={openAdd}>+ Add Cluster</button>
        </div>
      </div>

      <div className="adm-table-wrap">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Technology Clusters...</div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Short Name</th>
                <th>Full Name</th>
                <th>Icon</th>
                <th>Color</th>
                <th>Labs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="adm-no-rows">No records found.</td></tr>
              ) : (
                filtered.map(item => (
                  <tr key={item._id || item.id}>
                    <td><strong>{item.shortName}</strong></td>
                    <td>{item.name}</td>
                    <td style={{ fontSize: '1.2rem' }}>{item.icon}</td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        backgroundColor: item.color,
                        borderRadius: '4px',
                        verticalAlign: 'middle',
                        marginRight: '6px',
                        border: '1px solid #ddd'
                      }} />
                      {item.color}
                    </td>
                    <td>{item.labs ? item.labs.join(', ') : '—'}</td>
                    <td>
                      <div className="adm-acts">
                        <button className="adm-btn-edit" onClick={() => openEdit(item)}>Edit</button>
                        <button className="adm-btn-del" onClick={() => handleDelete(item)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {modal !== null && (
        <div className="adm-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="adm-modal" style={{ maxWidth: '650px' }}>
            <div className="adm-modal-hd">
              <span className="adm-modal-title">{modal === 'add' ? 'Add Technology Cluster' : 'Edit Cluster'}</span>
              <button className="adm-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-form">

                <div className="adm-form-row">
                  <div className="adm-fg">
                    <label>Slug ID (used in URL route)</label>
                    <input
                      type="text"
                      value={id}
                      onChange={e => setId(e.target.value)}
                      placeholder="e.g. aeronautical-systems"
                      disabled={modal !== 'add'}
                    />
                  </div>
                  <div className="adm-fg">
                    <label>Short Name (abbreviation)</label>
                    <input
                      type="text"
                      value={shortName}
                      onChange={e => setShortName(e.target.value)}
                      placeholder="e.g. Aero"
                    />
                  </div>
                </div>

                <div className="adm-fg">
                  <label>Full Cluster Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Aeronautical Systems (Aero)"
                  />
                </div>

                <div className="adm-form-row">
                  <div className="adm-fg">
                    <label>Icon Emoji</label>
                    <input
                      type="text"
                      value={icon}
                      onChange={e => setIcon(e.target.value)}
                      placeholder="e.g. ✈️"
                    />
                  </div>
                  <div className="adm-fg">
                    <label>Banner Theme Color</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="color"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        style={{ width: '45px', height: '36px', padding: '2px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        placeholder="#003a70"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="adm-fg">
                  <label>About Description</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Short description of this cluster..."
                    rows={3}
                  />
                </div>

                <div className="adm-fg">
                  <label>Arrow Link (overrides local detail page navigation if set to external URL)</label>
                  <input
                    type="text"
                    value={href}
                    onChange={e => setHref(e.target.value)}
                    placeholder="e.g. https://drdo.gov.in/..."
                  />
                </div>

                <div className="adm-fg">
                  <label>Constituent Labs (comma-separated abbreviations)</label>
                  <input
                    type="text"
                    value={labsStr}
                    onChange={e => setLabsStr(e.target.value)}
                    placeholder="ADE, CABS, CEMILAC, GTRE"
                  />
                </div>

                <div className="adm-fg">
                  <label style={{ display: 'block', marginBottom: '0.4rem' }}>Key Focus Areas</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {focus.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          value={item}
                          onChange={e => handleUpdateFocus(index, e.target.value)}
                          placeholder={`Focus Area ${index + 1}`}
                          style={{ flex: 1 }}
                        />
                        <button className="adm-btn-del" onClick={() => handleRemoveFocus(index)} style={{ marginTop: 0, height: '36px' }}>✕</button>
                      </div>
                    ))}
                    <button
                      className="adm-btn-add"
                      onClick={handleAddFocus}
                      style={{ alignSelf: 'flex-start', padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      + Add Focus Area
                    </button>
                  </div>
                </div>

                <div className="adm-form-actions">
                  <button className="adm-btn-cancel" onClick={() => setModal(null)}>Cancel</button>
                  <button className="adm-btn-save" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// ── Corporate Clusters CMS ────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────────────────────
export function CorporateClustersCMS({ onToast }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // 'add' | editItem | null

  // Form states
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('#003a70');
  const [description, setDescription] = useState('');
  const [href, setHref] = useState('');
  const [externalLink, setExternalLink] = useState('');

  // DG states
  const [dgTitle, setDgTitle] = useState('Director General');
  const [dgName, setDgName] = useState('');
  const [dgAddress, setDgAddress] = useState('');
  const [dgPhone, setDgPhone] = useState('');
  const [dgFax, setDgFax] = useState('');
  const [dgEmail, setDgEmail] = useState('');

  // Focus
  const [focus, setFocus] = useState([]);

  // Directorates
  const [directorates, setDirectorates] = useState([]);

  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    CorporateClusterApi.getAll()
      .then(res => {
        setItems(res || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setId('');
    setName('');
    setShortName('');
    setIcon('');
    setColor('#003a70');
    setDescription('');
    setHref('');
    setExternalLink('');
    setDgTitle('Director General');
    setDgName('');
    setDgAddress('');
    setDgPhone('');
    setDgFax('');
    setDgEmail('');
    setFocus([]);
    setDirectorates([]);
    setModal('add');
  };

  const openEdit = (item) => {
    setId(item.id || '');
    setName(item.name || '');
    setShortName(item.shortName || '');
    setIcon(item.icon || '');
    setColor(item.color || '#003a70');
    setDescription(item.description || '');
    setHref(item.href || '');
    setExternalLink(item.externalLink || '');

    const dg = item.directorGeneral || {};
    setDgTitle(dg.title || 'Director General');
    setDgName(dg.name || '');
    setDgAddress(dg.address || '');
    setDgPhone(dg.phone || '');
    setDgFax(dg.fax || '');
    setDgEmail(dg.email || '');

    setFocus(item.focus || []);
    setDirectorates(item.directorates || []);
    setModal(item);
  };

  const handleAddFocus = () => {
    setFocus([...focus, '']);
  };

  const handleUpdateFocus = (idx, val) => {
    const next = [...focus];
    next[idx] = val;
    setFocus(next);
  };

  const handleRemoveFocus = (idx) => {
    setFocus(focus.filter((_, i) => i !== idx));
  };

  const handleAddDirectorate = () => {
    setDirectorates([...directorates, { name: '', address: '', phone: '', fax: '', email: '' }]);
  };

  const handleUpdateDir = (idx, key, val) => {
    const next = [...directorates];
    next[idx] = { ...next[idx], [key]: val };
    setDirectorates(next);
  };

  const handleRemoveDir = (idx) => {
    setDirectorates(directorates.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!id || !name || !shortName) {
      alert('Slug ID, Name, and Short Name are required.');
      return;
    }

    setSaving(true);
    const body = {
      id: id.toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
      name,
      shortName,
      icon,
      color,
      description,
      href,
      externalLink,
      focus: focus.filter(f => f.trim() !== ''),
      directorGeneral: {
        title: dgTitle,
        name: dgName,
        address: dgAddress,
        phone: dgPhone,
        fax: dgFax,
        email: dgEmail
      },
      directorates: directorates.filter(d => d.name.trim() !== '')
    };

    try {
      if (modal === 'add') {
        await CorporateClusterApi.create(body);
        onToast('Corporate cluster created successfully', 'ok');
      } else {
        await CorporateClusterApi.update(modal._id || modal.id, body);
        onToast('Corporate cluster updated successfully', 'ok');
      }
      setModal(null);
      load();
    } catch (err) {
      console.error(err);
      onToast('Failed to save cluster', 'err');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete Corporate Cluster "${item.shortName || item.name}"?`)) return;
    try {
      await CorporateClusterApi.remove(item._id || item.id);
      onToast('Cluster deleted', 'ok');
      load();
    } catch (err) {
      console.error(err);
      onToast('Failed to delete cluster', 'err');
    }
  };

  const filtered = items.filter(item =>
    !search ||
    (item.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.shortName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adm-panel">
      <div className="adm-panel-hd">
        <div className="adm-panel-title">📊 Corporate Clusters</div>
        <div className="adm-panel-actions">
          <input
            className="adm-search"
            placeholder="Search corporate clusters..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="adm-btn-add" onClick={openAdd}>+ Add Cluster</button>
        </div>
      </div>

      <div className="adm-table-wrap">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Corporate Clusters...</div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Short Name</th>
                <th>Full Name</th>
                <th>Icon</th>
                <th>Color</th>
                <th>Director General</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="adm-no-rows">No records found.</td></tr>
              ) : (
                filtered.map(item => (
                  <tr key={item._id || item.id}>
                    <td><strong>{item.shortName}</strong></td>
                    <td>{item.name}</td>
                    <td style={{ fontSize: '1.2rem' }}>{item.icon}</td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        backgroundColor: item.color,
                        borderRadius: '4px',
                        verticalAlign: 'middle',
                        marginRight: '6px',
                        border: '1px solid #ddd'
                      }} />
                      {item.color}
                    </td>
                    <td>{item.directorGeneral ? item.directorGeneral.name : '—'}</td>
                    <td>
                      <div className="adm-acts">
                        <button className="adm-btn-edit" onClick={() => openEdit(item)}>Edit</button>
                        <button className="adm-btn-del" onClick={() => handleDelete(item)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {modal !== null && (
        <div className="adm-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="adm-modal" style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="adm-modal-hd">
              <span className="adm-modal-title">{modal === 'add' ? 'Add Corporate Cluster' : 'Edit Corporate Cluster'}</span>
              <button className="adm-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-form">

                <div className="adm-form-row">
                  <div className="adm-fg">
                    <label>Slug ID (used in URL route)</label>
                    <input
                      type="text"
                      value={id}
                      onChange={e => setId(e.target.value)}
                      placeholder="e.g. technology-management"
                      disabled={modal !== 'add'}
                    />
                  </div>
                  <div className="adm-fg">
                    <label>Short Name (abbreviation)</label>
                    <input
                      type="text"
                      value={shortName}
                      onChange={e => setShortName(e.target.value)}
                      placeholder="e.g. TM"
                    />
                  </div>
                </div>

                <div className="adm-fg">
                  <label>Full Cluster Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Technology Management (TM)"
                  />
                </div>

                <div className="adm-form-row">
                  <div className="adm-fg">
                    <label>Icon Emoji</label>
                    <input
                      type="text"
                      value={icon}
                      onChange={e => setIcon(e.target.value)}
                      placeholder="e.g. 🔬"
                    />
                  </div>
                  <div className="adm-fg">
                    <label>Banner Theme Color</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="color"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        style={{ width: '45px', height: '36px', padding: '2px', border: '1px solid #ccc' }}
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        placeholder="#003a70"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="adm-fg">
                  <label>About Description</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Short description of corporate cluster..."
                    rows={3}
                  />
                </div>

                <div className="adm-form-row">
                  <div className="adm-fg">
                    <label>Arrow Link (overrides local detail navigation if set to external URL)</label>
                    <input
                      type="text"
                      value={href}
                      onChange={e => setHref(e.target.value)}
                      placeholder="e.g. https://drdo.gov.in/..."
                    />
                  </div>
                  <div className="adm-fg">
                    <label>Official Web Link (direct website, e.g. BrahMos)</label>
                    <input
                      type="text"
                      value={externalLink}
                      onChange={e => setExternalLink(e.target.value)}
                      placeholder="e.g. https://www.brahmos.com/"
                    />
                  </div>
                </div>

                {/* Director General Sub-form */}
                <fieldset style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '1rem', marginBottom: '1rem' }}>
                  <legend style={{ fontWeight: '600', padding: '0 6px', color: '#1e4e8c' }}>Director General Details</legend>

                  <div className="adm-form-row">
                    <div className="adm-fg">
                      <label>Title</label>
                      <input
                        type="text"
                        value={dgTitle}
                        onChange={e => setDgTitle(e.target.value)}
                        placeholder="Director General"
                      />
                    </div>
                    <div className="adm-fg">
                      <label>Name</label>
                      <input
                        type="text"
                        value={dgName}
                        onChange={e => setDgName(e.target.value)}
                        placeholder="Dr. John Doe"
                      />
                    </div>
                  </div>

                  <div className="adm-fg">
                    <label>Office Address</label>
                    <textarea
                      value={dgAddress}
                      onChange={e => setDgAddress(e.target.value)}
                      placeholder="Office address..."
                      rows={2}
                    />
                  </div>

                  <div className="adm-form-row">
                    <div className="adm-fg">
                      <label>Phone</label>
                      <input
                        type="text"
                        value={dgPhone}
                        onChange={e => setDgPhone(e.target.value)}
                        placeholder="011 - 2301xxxx"
                      />
                    </div>
                    <div className="adm-fg">
                      <label>Fax</label>
                      <input
                        type="text"
                        value={dgFax}
                        onChange={e => setDgFax(e.target.value)}
                        placeholder="011 - 2301xxxx"
                      />
                    </div>
                    <div className="adm-fg">
                      <label>Email</label>
                      <input
                        type="text"
                        value={dgEmail}
                        onChange={e => setDgEmail(e.target.value)}
                        placeholder="dg.corp@gov.in"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Focus Areas */}
                <div className="adm-fg" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Key Focus Areas</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {focus.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          value={item}
                          onChange={e => handleUpdateFocus(index, e.target.value)}
                          placeholder={`Focus Area ${index + 1}`}
                          style={{ flex: 1 }}
                        />
                        <button className="adm-btn-del" onClick={() => handleRemoveFocus(index)} style={{ marginTop: 0, height: '36px' }}>✕</button>
                      </div>
                    ))}
                    <button
                      className="adm-btn-add"
                      onClick={handleAddFocus}
                      style={{ alignSelf: 'flex-start', padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      + Add Focus Area
                    </button>
                  </div>
                </div>

                {/* Directorates */}
                <div className="adm-fg" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>Directorates</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {directorates.map((item, index) => (
                      <div key={index} style={{ border: '1px dashed #ccc', borderRadius: '6px', padding: '0.8rem', position: 'relative' }}>
                        <button
                          className="adm-btn-del"
                          onClick={() => handleRemoveDir(index)}
                          style={{ position: 'absolute', top: '8px', right: '8px', padding: '2px 8px', fontSize: '0.75rem' }}
                        >
                          ✕ Delete Directorate
                        </button>

                        <div className="adm-fg" style={{ marginTop: '1rem' }}>
                          <label>Directorate Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={e => handleUpdateDir(index, 'name', e.target.value)}
                            placeholder="e.g. Directorate of extramural research..."
                          />
                        </div>

                        <div className="adm-fg">
                          <label>Address</label>
                          <textarea
                            value={item.address}
                            onChange={e => handleUpdateDir(index, 'address', e.target.value)}
                            placeholder="Address..."
                            rows={2}
                          />
                        </div>

                        <div className="adm-form-row">
                          <div className="adm-fg">
                            <label>Phone</label>
                            <input
                              type="text"
                              value={item.phone || ''}
                              onChange={e => handleUpdateDir(index, 'phone', e.target.value)}
                              placeholder="Phone"
                            />
                          </div>
                          <div className="adm-fg">
                            <label>Fax</label>
                            <input
                              type="text"
                              value={item.fax || ''}
                              onChange={e => handleUpdateDir(index, 'fax', e.target.value)}
                              placeholder="Fax"
                            />
                          </div>
                          <div className="adm-fg">
                            <label>Email</label>
                            <input
                              type="text"
                              value={item.email || ''}
                              onChange={e => handleUpdateDir(index, 'email', e.target.value)}
                              placeholder="Email"
                            />
                          </div>
                        </div>

                      </div>
                    ))}
                    <button
                      className="adm-btn-add"
                      onClick={handleAddDirectorate}
                      style={{ alignSelf: 'flex-start', padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      + Add Directorate
                    </button>
                  </div>
                </div>

                <div className="adm-form-actions">
                  <button className="adm-btn-cancel" onClick={() => setModal(null)}>Cancel</button>
                  <button className="adm-btn-save" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// ── ONOS Page & Tab Settings CMS ──────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────────────────────
export function OnosCMS({ onToast }) {
  const [doc, setDoc] = useState(null);
  const [homeDesc, setHomeDesc] = useState('');
  const [homeAccessHeader, setHomeAccessHeader] = useState('');
  const [homePhaseText, setHomePhaseText] = useState('');
  const [homeOnCampusLabel, setHomeOnCampusLabel] = useState('');
  const [homeOnCampusLink, setHomeOnCampusLink] = useState('');
  const [homeOffCampusLabel, setHomeOffCampusLabel] = useState('');
  const [homeOffCampusLink, setHomeOffCampusLink] = useState('');

  const [journalsDesc, setJournalsDesc] = useState('');
  const [journalsLink, setJournalsLink] = useState('');

  const [remoteDesc, setRemoteDesc] = useState('');
  const [remoteLink, setRemoteLink] = useState('');

  const [sopTitle, setSopTitle] = useState('');
  const [sopDesc, setSopDesc] = useState('');
  const [sopFileUrl, setSopFileUrl] = useState('');
  const [sopLink, setSopLink] = useState('');

  const [contactNote, setContactNote] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactEmailLabel, setContactEmailLabel] = useState('');

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    OnosSettingApi.getAll()
      .then(res => {
        if (res && res.length > 0) {
          const d = res[0];
          setDoc(d);
          setHomeDesc(d.homeDesc || '');
          setHomeAccessHeader(d.homeAccessHeader || '');
          setHomePhaseText(d.homePhaseText || '');
          setHomeOnCampusLabel(d.homeOnCampusLabel || '');
          setHomeOnCampusLink(d.homeOnCampusLink || '');
          setHomeOffCampusLabel(d.homeOffCampusLabel || '');
          setHomeOffCampusLink(d.homeOffCampusLink || '');

          setJournalsDesc(d.journalsDesc || '');
          setJournalsLink(d.journalsLink || '');

          setRemoteDesc(d.remoteDesc || '');
          setRemoteLink(d.remoteLink || '');

          setSopTitle(d.sopTitle || '');
          setSopDesc(d.sopDesc || '');
          setSopFileUrl(d.sopFileUrl || '');
          setSopLink(d.sopLink || '');

          setContactNote(d.contactNote || '');
          setContactEmail(d.contactEmail || '');
          setContactEmailLabel(d.contactEmailLabel || '');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const res = await uploadFile('pdf', file);
      setSopFileUrl(res.url);
      onToast('SOP PDF uploaded successfully', 'ok');
    } catch (err) {
      console.error(err);
      onToast('Failed to upload PDF', 'err');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const body = {
      homeDesc,
      homeAccessHeader,
      homePhaseText,
      homeOnCampusLabel,
      homeOnCampusLink,
      homeOffCampusLabel,
      homeOffCampusLink,
      journalsDesc,
      journalsLink,
      remoteDesc,
      remoteLink,
      sopTitle,
      sopDesc,
      sopFileUrl,
      sopLink,
      contactNote,
      contactEmail,
      contactEmailLabel,
    };

    try {
      if (doc && doc._id) {
        await OnosSettingApi.update(doc._id, body);
      } else {
        await OnosSettingApi.create(body);
      }
      onToast('ONOS content settings saved successfully', 'ok');
      load();
    } catch (err) {
      console.error(err);
      onToast('Failed to save settings', 'err');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="adm-panel" style={{ padding: '2rem', textAlign: 'center' }}>Loading ONOS Settings...</div>;
  }

  return (
    <div className="adm-panel">
      <div className="adm-panel-hd">
        <div className="adm-panel-title">🌐 Edit ONOS Settings & Pages</div>
        <div className="adm-panel-actions">
          <button className="adm-btn-save" onClick={handleSave} disabled={saving} style={{ padding: '0.5rem 1.5rem' }}>
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* HOME TAB SECTION */}
        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e4e8c', borderBottom: '2px solid #1e4e8c', display: 'inline-block', paddingBottom: '4px' }}>
            1. Home Tab Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="adm-fg">
              <label>Description Paragraph</label>
              <textarea rows={4} value={homeDesc} onChange={e => setHomeDesc(e.target.value)} />
            </div>
            <div className="adm-fg">
              <label>Access Header Text</label>
              <input type="text" value={homeAccessHeader} onChange={e => setHomeAccessHeader(e.target.value)} />
            </div>
            <div className="adm-fg">
              <label>Phase Access Information Text</label>
              <textarea rows={2} value={homePhaseText} onChange={e => setHomePhaseText(e.target.value)} />
            </div>
            <div className="adm-form-row">
              <div className="adm-fg">
                <label>On-Campus Access Description</label>
                <textarea rows={2} value={homeOnCampusLabel} onChange={e => setHomeOnCampusLabel(e.target.value)} />
              </div>
              <div className="adm-fg">
                <label>On-Campus Portal Link</label>
                <input type="text" value={homeOnCampusLink} onChange={e => setHomeOnCampusLink(e.target.value)} />
              </div>
            </div>
            <div className="adm-form-row">
              <div className="adm-fg">
                <label>Off-Campus Access Description</label>
                <textarea rows={2} value={homeOffCampusLabel} onChange={e => setHomeOffCampusLabel(e.target.value)} />
              </div>
              <div className="adm-fg">
                <label>Off-Campus Portal Link</label>
                <input type="text" value={homeOffCampusLink} onChange={e => setHomeOffCampusLink(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* ONOS JOURNALS TAB SECTION */}
        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e4e8c', borderBottom: '2px solid #1e4e8c', display: 'inline-block', paddingBottom: '4px' }}>
            2. ONOS Journals Tab Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="adm-fg">
              <label>Description Text</label>
              <textarea rows={3} value={journalsDesc} onChange={e => setJournalsDesc(e.target.value)} />
            </div>
            <div className="adm-fg">
              <label>ONOS Journals Portal Link</label>
              <input type="text" value={journalsLink} onChange={e => setJournalsLink(e.target.value)} />
            </div>
          </div>
        </div>

        {/* REMOTE ACCESS TAB SECTION */}
        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e4e8c', borderBottom: '2px solid #1e4e8c', display: 'inline-block', paddingBottom: '4px' }}>
            3. ONOS Remote Access Portal Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="adm-fg">
              <label>Description Text</label>
              <textarea rows={3} value={remoteDesc} onChange={e => setRemoteDesc(e.target.value)} />
            </div>
            <div className="adm-fg">
              <label>ONOS Remote Access Portal Link</label>
              <input type="text" value={remoteLink} onChange={e => setRemoteLink(e.target.value)} />
            </div>
          </div>
        </div>

        {/* SOP TAB SECTION */}
        <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e4e8c', borderBottom: '2px solid #1e4e8c', display: 'inline-block', paddingBottom: '4px' }}>
            4. SOP for Fair Use Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="adm-fg">
              <label>SOP Title</label>
              <input type="text" value={sopTitle} onChange={e => setSopTitle(e.target.value)} />
            </div>
            <div className="adm-fg">
              <label>SOP Description Text</label>
              <textarea rows={2} value={sopDesc} onChange={e => setSopDesc(e.target.value)} />
            </div>
            <div className="adm-form-row">
              <div className="adm-fg">
                <label>SOP Document URL Link</label>
                <input type="text" value={sopLink} onChange={e => setSopLink(e.target.value)} />
              </div>
              <div className="adm-fg">
                <label>Or Upload PDF File</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input type="file" accept=".pdf" onChange={handlePdfUpload} style={{ flex: 1 }} />
                  {sopFileUrl && <a href={sopFileUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#1e4e8c', fontWeight: 'bold' }}>View Uploaded</a>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT US TAB SECTION */}
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e4e8c', borderBottom: '2px solid #1e4e8c', display: 'inline-block', paddingBottom: '4px' }}>
            5. Contact Us Tab Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="adm-fg">
              <label>Contact Section Note/Intro</label>
              <textarea rows={2} value={contactNote} onChange={e => setContactNote(e.target.value)} />
            </div>
            <div className="adm-form-row">
              <div className="adm-fg">
                <label>Contact Email Address</label>
                <input type="text" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
              </div>
              <div className="adm-fg">
                <label>Contact Email Display Label</label>
                <input type="text" value={contactEmailLabel} onChange={e => setContactEmailLabel(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
