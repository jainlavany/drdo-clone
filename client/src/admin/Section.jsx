import { useState, useEffect, useCallback } from 'react';
import FileUpload from './FileUpload';

// ── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ msg, type, onHide }) {
  useEffect(() => { const t = setTimeout(onHide, 3000); return () => clearTimeout(t); }, [onHide]);
  return <div className={`adm-toast ${type === 'ok' ? 'ok' : 'err'}`}>{type === 'ok' ? '✓' : '✕'} {msg}</div>;
}

// ── Generic form field renderer ──────────────────────────────────────────────
export function FormField({ field, form, onChange }) {
  const val = form[field.key] ?? '';

  if (field.type === 'image')
    return <FileUpload type="image" value={val} label={field.label}
      onChange={(url) => onChange(field.key, url)} />;

  if (field.type === 'pdf')
    return <FileUpload type="pdf" value={val} label={field.label}
      onChange={(url, size) => { onChange(field.key, url); if (field.sizeKey && size) onChange(field.sizeKey, size); }} />;

  if (field.type === 'select')
    return (
      <div className="adm-fg">
        <label>{field.label}</label>
        <select value={val} onChange={e => onChange(field.key, e.target.value)}>
          {field.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );

  if (field.type === 'textarea')
    return (
      <div className="adm-fg">
        <label>{field.label}</label>
        <textarea value={val} onChange={e => onChange(field.key, e.target.value)} rows={3} />
      </div>
    );

  if (field.type === 'checkbox')
    return (
      <div className="adm-fg" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
        <input type="checkbox" id={`chk-${field.key}`} checked={!!val}
          onChange={e => onChange(field.key, e.target.checked)}
          style={{ width: 'auto' }} />
        <label htmlFor={`chk-${field.key}`} style={{ marginBottom: 0 }}>{field.label}</label>
      </div>
    );

  return (
    <div className="adm-fg">
      <label>{field.label}</label>
      <input type={field.type || 'text'} value={val} onChange={e => onChange(field.key, e.target.value)}
        placeholder={field.placeholder || ''} />
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="adm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal">
        <div className="adm-modal-hd">
          <span className="adm-modal-title">{title}</span>
          <button className="adm-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="adm-modal-body">{children}</div>
      </div>
    </div>
  );
}

// ── Generic CRUD Section ─────────────────────────────────────────────────────
export default function Section({
  title, icon, api, fields, emptyRow,
  renderRow, colHeaders,
  onToast,
}) {
  const [items, setItems]   = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal]   = useState(null); // null | 'add' | itemObject
  const [form, setForm]     = useState(emptyRow);
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState('');

  const load = useCallback(() => api.getAll().then(setItems).catch(console.error), [api]);
  useEffect(() => { load(); }, [load]);

  const searchKeys = fields.filter(f => f.searchable !== false && ['text','textarea','url'].includes(f.type || 'text'));

  const filtered = items.filter(item =>
    !search || searchKeys.some(f => String(item[f.key] || '').toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd  = () => { setForm({ ...emptyRow }); setErr(''); setModal('add'); };
  const openEdit = item  => { setForm({ ...item });  setErr(''); setModal(item); };
  const close    = () => setModal(null);

  const setField = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const save = async () => {
    setSaving(true); setErr('');
    try {
      if (modal === 'add') await api.create(form);
      else await api.update(modal._id || modal.id, form);
      await load(); close();
      onToast('Saved successfully', 'ok');
    } catch (e) { setErr(e.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${String(item.title || item.text || item.question || '').slice(0,60)}"?`)) return;
    try { await api.remove(item._id || item.id); await load(); onToast('Deleted', 'ok'); }
    catch (e) { onToast(e.message, 'err'); }
  };

  return (
    <>
      <div className="adm-panel">
        <div className="adm-panel-hd">
          <div className="adm-panel-title">{icon} {title}</div>
          <div className="adm-panel-actions">
            <input className="adm-search" placeholder="Search…" value={search}
              onChange={e => setSearch(e.target.value)} />
            <button className="adm-btn-add" onClick={openAdd}>+ Add New</button>
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr>
              <th>#</th>
              {colHeaders.map(h => <th key={h}>{h}</th>)}
              <th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={colHeaders.length + 2} className="adm-no-rows">No records found.</td></tr>
                : filtered.map((item, i) => (
                  <tr key={item._id || item.id}>
                    <td style={{ color: '#9ca3af', fontSize: '0.78rem' }}>{i + 1}</td>
                    {renderRow(item)}
                    <td>
                      <div className="adm-acts">
                        <button className="adm-btn-edit" onClick={() => openEdit(item)}>Edit</button>
                        <button className="adm-btn-del"  onClick={() => remove(item)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {modal !== null && (
        <Modal title={modal === 'add' ? `Add ${title}` : `Edit ${title}`} onClose={close}>
          <div className="adm-form">
            {err && <div className="adm-form-err">⚠ {err}</div>}
            {fields.map((f, fi) => {
              // group fields by 'row' property for 2-column layout
              if (f.rowStart) return (
                <div key={f.key} className="adm-form-row">
                  <FormField field={f} form={form} onChange={setField} />
                  {fields[fi + 1] && fields[fi + 1].rowEnd &&
                    <FormField key={fields[fi+1].key} field={fields[fi+1]} form={form} onChange={setField} />}
                </div>
              );
              if (f.rowEnd) return null; // already rendered above
              return <FormField key={f.key} field={f} form={form} onChange={setField} />;
            })}
            <div className="adm-form-actions">
              <button className="adm-btn-cancel" onClick={close}>Cancel</button>
              <button className="adm-btn-save" onClick={save} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
