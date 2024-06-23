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
  return new Promise((res, rej) => {
    const script = document.createElement('script');

    script.async = true;
    script.defer = true;

    script.src = scriptLink

    script.onload = () => {
      res(callback())
    }

    script.onerror = () => {
      rej('error loading script')
    }

    document.body.appendChild(script)
  })
}