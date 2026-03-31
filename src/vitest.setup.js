import '@testing-library/jest-dom';
import { vi } from 'vitest';

// هذا السطر يضمن وجود localStorage حتى قبل تحميل الـ Store
if (typeof window !== 'undefined' && !window.localStorage) {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        },
        writable: true
    });
}