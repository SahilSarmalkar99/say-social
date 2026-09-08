import React, { useEffect, useState } from 'react';
import {
  addCarousel,
  deleteCarousel,
  getCarousel,
  getMainVideo,
  reorderCarousel,
  saveMainVideo,
  statusCarousel,
  updateCarousel,
} from '../api/videoApi';
import '../styles.css';

function VideoPreview({ src, poster }) {
  return src ? (
    <video className="preview" src={src} poster={poster || undefined} controls muted playsInline />
  ) : (
    <div className="empty-preview">No video configured</div>
  );
}

const emptyForm = { title: '', description: '', videoUrl: '', thumbnailUrl: '', isActive: true };

export default function AdminVideos() {
  const [main, setMain] = useState(null);
  const [mainForm, setMainForm] = useState({ videoUrl: '', thumbnailUrl: '' });
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setError('');
      const [m, c] = await Promise.all([getMainVideo(), getCarousel()]);
      setMain(m.video);
      setMainForm({ videoUrl: m.video?.videoUrl || '', thumbnailUrl: m.video?.thumbnailUrl || '' });
      setItems(c.videos);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { load(); }, []);

  const submitMain = async (e) => {
    e.preventDefault();
    setBusy(true); setMessage(''); setError('');
    try {
      const result = await saveMainVideo(mainForm);
      setMain(result.video);
      setMessage('Main video updated successfully.');
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setMessage(''); setError('');
    try {
      if (editing) {
        await updateCarousel(editing._id, form);
        setMessage('Carousel video updated successfully.');
      } else {
        await addCarousel(form);
        setMessage('Carousel video added successfully.');
      }
      setForm(emptyForm);
      setEditing(null);
      await load();
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  const edit = (v) => {
    setEditing(v);
    setForm({
      title: v.title || '',
      description: v.description || '',
      videoUrl: v.videoUrl || '',
      thumbnailUrl: v.thumbnailUrl || '',
      isActive: Boolean(v.isActive),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearForm = () => { setEditing(null); setForm(emptyForm); };

  const remove = async (id) => {
    if (!window.confirm('Delete this carousel video?')) return;
    try { await deleteCarousel(id); setMessage('Video deleted.'); await load(); }
    catch (e) { setError(e.message); }
  };

  const toggle = async (v) => {
    try { await statusCarousel(v._id, !v.isActive); await load(); }
    catch (e) { setError(e.message); }
  };

  const move = async (index, dir) => {
    const next = [...items];
    const to = index + dir;
    if (to < 0 || to >= next.length) return;
    [next[index], next[to]] = [next[to], next[index]];
    setItems(next);
    try { await reorderCarousel(next.map((x) => ({ id: x._id }))); }
    catch (e) { setError(e.message); await load(); }
  };

  return (
    <div className="app">
      <header>
        <div>
          <p className="eyebrow">ADMIN CONSOLE</p>
          <h1>Video Management</h1>
          <p className="sub">Manage the landing page hero and featured video carousel using video URLs.</p>
        </div>
      </header>

      <main>
        {(message || error) && (
          <div className={error ? 'notice error' : 'notice'}>
            <span>{error || message}</span>
            <button onClick={() => { setMessage(''); setError(''); }}>×</button>
          </div>
        )}

        <section className="panel">
          <div className="section-head">
            <div>
              <h2>Main landing video</h2>
              <p>Enter the URL of the video that should play on the main landing screen.</p>
            </div>
          </div>

          <div className="main-grid">
            <VideoPreview src={main?.videoUrl} poster={main?.thumbnailUrl} />
            <form className="upload-box" onSubmit={submitMain}>
              <label>Video URL
                <input
                  required
                  type="url"
                  placeholder="https://example.com/main-video.mp4"
                  value={mainForm.videoUrl}
                  onChange={(e) => setMainForm({ ...mainForm, videoUrl: e.target.value })}
                />
              </label>
              <label>Thumbnail URL <span>(optional)</span>
                <input
                  type="url"
                  placeholder="https://example.com/main-thumb.jpg"
                  value={mainForm.thumbnailUrl}
                  onChange={(e) => setMainForm({ ...mainForm, thumbnailUrl: e.target.value })}
                />
              </label>
              <button className="primary" disabled={busy}>{busy ? 'Saving…' : 'Save Main Video'}</button>
            </form>
          </div>
        </section>

        <section className="panel">
          <div className="section-head">
            <div>
              <h2>Landing page carousel</h2>
              <p>Add multiple videos using URLs, then activate, edit, delete and reorder them.</p>
            </div>
          </div>

          <form className="form" onSubmit={submit}>
            <div className="form-title">{editing ? 'Edit carousel video' : 'Add carousel video'}</div>
            <div className="form-grid">
              <label>Title
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </label>
              <label>Video URL
                <input required type="url" placeholder="https://example.com/video.mp4" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
              </label>
              <label className="wide">Description
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </label>
              <label className="wide">Thumbnail URL <span>(optional)</span>
                <input type="url" placeholder="https://example.com/thumb.jpg" value={form.thumbnailUrl} onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })} />
              </label>
            </div>
            <div className="form-actions">
              <label className="check"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Show on landing page</label>
              <div>
                {editing && <button type="button" className="secondary" onClick={clearForm}>Cancel Edit</button>}
                <button className="primary" disabled={busy}>{busy ? 'Saving…' : editing ? 'Save Changes' : 'Add Video'}</button>
              </div>
            </div>
          </form>

          <div className="cards">
            {items.map((v, i) => (
              <article className="card" key={v._id}>
                <VideoPreview src={v.videoUrl} poster={v.thumbnailUrl} />
                <div className="card-body">
                  <div className="row"><h3>{v.title}</h3><span className={v.isActive ? 'pill active' : 'pill'}>{v.isActive ? 'Active' : 'Hidden'}</span></div>
                  <p>{v.description || 'No description'}</p>
                  <div className="url-preview" title={v.videoUrl}>{v.videoUrl}</div>
                  <div className="controls">
                    <button onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                    <button onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</button>
                    <button onClick={() => toggle(v)}>{v.isActive ? 'Hide' : 'Show'}</button>
                    <button onClick={() => edit(v)}>Edit</button>
                    <button className="danger" onClick={() => remove(v._id)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}
            {!items.length && <div className="empty">No carousel videos yet.</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
