'use client';

import { useEffect } from 'react';

export default function VKBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if running inside VK
    const isVK = window.location !== window.parent.location ||
                 window.location.href.includes('vk.com') ||
                 navigator.userAgent.includes('VKApp');

    if (!isVK) return;

    // Load VK Bridge SDK
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js';
    script.async = true;
    script.onload = () => {
      initBridge();
    };
    document.head.appendChild(script);

    async function initBridge() {
      // @ts-expect-error VK Bridge global
      const vkBridge = window.vkBridge;
      if (!vkBridge) return;

      try {
        // Initialize VK Mini App
        await vkBridge.send('VKWebAppInit');

        // Set appearance
        await vkBridge.send('VKWebAppSetViewSettings', {
          status_bar_style: 'light',
          action_bar_color: '#1e1b4b',
          navigation_bar_color: '#1e1b4b',
        });

        console.log('VK Bridge initialized');
      } catch (error) {
        console.error('VK Bridge error:', error);
      }
    }

    return () => {
      // Cleanup
    };
  }, []);

  return null;
}
