// src/composables/useStorage.ts
import type { Ref } from 'vue';
import { ref } from 'vue';

interface UseStorageReturn {
    useIndexedDB: <T>(key: string, initialValue?: T) => Promise<Ref<T | null>>;
}

export function useStorage(): UseStorageReturn {

    // State management for IndexedDB
    const useIndexedDB = async <T>(key: string, initialValue?: T): Promise<Ref<T | null>> => {
        const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open('my-database', 1);
            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore('keyval');
            };
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });

        const getItem = async (key: string): Promise<T | null> => {
            const db = await dbPromise;
            return new Promise<T | null>((resolve, reject) => {
                const transaction = db.transaction('keyval', 'readonly');
                const store = transaction.objectStore('keyval');
                const request = store.get(key);
                request.onsuccess = () => {
                    resolve(request.result ?? initialValue ?? null);
                };
                request.onerror = () => {
                    reject(request.error);
                };
            });
        };

        const setItem = async (key: string, value: T): Promise<void> => {
            const db = await dbPromise;
            return new Promise<void>((resolve, reject) => {
                const transaction = db.transaction('keyval', 'readwrite');
                const store = transaction.objectStore('keyval');
                const request = store.put(value, key);
                request.onsuccess = () => {
                    resolve();
                };
                request.onerror = () => {
                    reject(request.error);
                };
            });
        };

        const indexedDBItem = ref();

        indexedDBItem.value = initialValue ?? await getItem(key);

        setItem(key, indexedDBItem.value);

        watch(indexedDBItem, (newValue) => {
            if (newValue !== null) {
                setItem(key, newValue);
            }
        }, { deep: true });

        return indexedDBItem;
    };

    return {
        useIndexedDB,
    };
}