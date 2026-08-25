/** Client helpers for Worker API */

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: (data as any)?.error || `Request failed (${res.status})` };
    }
    return { ok: true, data: data as T };
  } catch {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}

export function postContact(body: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  vehicle?: string;
  message: string;
}) {
  return request<{ success: boolean; message: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function postNewsletter(body: { email: string; name?: string; prefs?: string[] }) {
  return request<{ success: boolean; message: string }>('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function getNewsletterStats() {
  return request<{ count: number }>('/api/newsletter/stats');
}

export function postOrderInquiry(body: {
  name: string;
  email: string;
  phone?: string;
  vehicle: string;
  trim?: string;
  color?: string;
  wheels?: string;
  interior?: string;
  autopilot?: string;
  estimatedPrice?: string;
  message?: string;
}) {
  const message = [
    'Configurator order inquiry',
    `Vehicle: ${body.vehicle}`,
    body.trim && `Trim: ${body.trim}`,
    body.color && `Color: ${body.color}`,
    body.wheels && `Wheels: ${body.wheels}`,
    body.interior && `Interior: ${body.interior}`,
    body.autopilot && `Autopilot: ${body.autopilot}`,
    body.estimatedPrice && `Est. price: ${body.estimatedPrice}`,
    body.message,
  ]
    .filter(Boolean)
    .join('\n');

  return postContact({
    name: body.name,
    email: body.email,
    phone: body.phone,
    subject: 'order',
    vehicle: body.vehicle,
    message,
  });
}
