/// <reference types="vite/client" />

interface Window {
  invokeNative: (eventName: string, data?: any) => void;
} 