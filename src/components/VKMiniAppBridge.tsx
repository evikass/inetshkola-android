'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    vkBridge?: {
      send: (method: string, params?: Record<string, unknown>) => Promise<unknown>;
      subscribe: (listener: (event: { detail: { type: string; data: unknown } }) => void) => void;
      unsubscribe: (listener: (event: { detail: { type: string; data: unknown } }) => void) => void;
    };
  }
}

export default function VKMiniAppBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if running inside VK
    const isVK = window.location !== window.parent.location ||
                 new URLSearchParams(window.location.search).has('vk_platform') ||
                 window.location.hostname.includes('vk.com');

    if (!isVK) return;

    // Load VK Bridge
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js';
    script.async = true;
    script.onload = () => {
      initBridge();
    };
    document.head.appendChild(script);

    function initBridge() {
      const bridge = window.vkBridge;
      if (!bridge) return;

      // Initialize VK Mini App
      bridge.send('VKWebAppInit')
        .then(() => {
          console.log('VK Mini App initialized');

          // Set background color matching app theme
          bridge.send('VKWebAppSetViewSettings', {
            status_bar_style: 'light',
            action_bar_color: '#1e1b4b',
            navigation_bar_color: '#1e1b4b',
          }).catch(() => {});

          // Check if user is authorized
          bridge.send('VKWebAppGetUserInfo')
            .then((user: unknown) => {
              console.log('VK user:', user);
            })
            .catch(() => {});
        })
        .catch((error: unknown) => {
          console.error('VK Bridge init error:', error);
        });

      // Handle VK events
      bridge.subscribe((event) => {
        console.log('VK event:', event.detail.type, event.detail.data);
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}
