import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID() {
  return v4()
}


export const scriptLoader = (scriptLink: string, callback: () => void) => {
  const script = document.createElement('script');

  script.async = true;
  script.defer = true;

  script.src = scriptLink

  script.onload = () => {
    callback()
  }

  script.onerror = () => {
    console.error('error loading script')
  }

  document.body.appendChild(script)
}