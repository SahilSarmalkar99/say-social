const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const adminHeaders = () => ({
  'Content-Type': 'application/json',
  'x-admin-key': import.meta.env.VITE_ADMIN_API_KEY || 'change-me',
});

async function request(url, options = {}, admin = true) {
  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      ...(admin ? adminHeaders() : {}),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const getMainVideo = () => request('/videos/main', {}, false);
export const getCarousel = () => request('/admin/videos/carousel?admin=true');

export const saveMainVideo = (payload) => request('/admin/videos/main', {
  method: 'PUT',
  body: JSON.stringify(payload),
});

export const addCarousel = (payload) => request('/admin/videos/carousel', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const updateCarousel = (id, payload) => request(`/admin/videos/carousel/${id}`, {
  method: 'PUT',
  body: JSON.stringify(payload),
});

export const deleteCarousel = (id) => request(`/admin/videos/carousel/${id}`, {
  method: 'DELETE',
});

export const statusCarousel = (id, isActive) => request(`/admin/videos/carousel/${id}/status`, {
  method: 'PATCH',
  body: JSON.stringify({ isActive }),
});

export const reorderCarousel = (items) => request('/admin/videos/carousel/reorder', {
  method: 'PATCH',
  body: JSON.stringify({ items }),
});
