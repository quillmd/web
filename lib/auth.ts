'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { API_URL } from './api-config'

interface AuthResponse {
  token?: string
  user_id?: string
  error?: string
}

interface QRAuthResponse {
  qrCodeUrl: string
  channel: string
  code: string
}

export async function refreshToken(): Promise<AuthResponse> {
  const authToken = cookies().get('accessToken')?.value
  if (!authToken) {
    throw 'Not Logged in'
  }
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  if (response.ok) {
    const data = await response.json()
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    cookies().set('accessToken', data.token, { expires: expires })
    cookies().set('userId', data.user_id, { expires: expires })
    return data
  } else {
    await logout()
  }
  return {}
}

export async function requestAuth(email: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  const data = await response.json()
  return data
}

export async function validateAuth(email: string, otp: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  })
  const data = await response.json()
  if (response.ok) {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    cookies().set('accessToken', data.token, { expires: expires })
    cookies().set('userId', data.user_id, { expires: expires })
  }
  return data
}

export async function requestQRAuth(channel_id: string, code: string): Promise<string> {
  const encodedChannel = encodeURIComponent(channel_id)
  const encodedCode = encodeURIComponent(code)
  const qrCodeUrl = `${API_URL}/auth/qr_channel?channel=${encodedChannel}&code=${encodedCode}`
  
  console.log(qrCodeUrl)
  const response = await fetch(qrCodeUrl, {
    method: 'GET',
  })
  const svgContent = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status}, ${response.statusText}`)
  }
  return svgContent
}

export async function validateQRAuth(channel: string, code: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/validate_qr`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ channel, code }),
  })
  const data = await response.json()
  if (response.ok) {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    cookies().set('accessToken', data.token, { expires: expires })
    cookies().set('userId', data.user_id, { expires: expires })
  }
  return data
}

export async function logout() {
  cookies().delete({
    name: 'accessToken',
  })
  cookies().delete({
    name: 'userId',
  })
  redirect(`/login`)
}