import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Stores an image file in Firebase storage and returns the download URL.
 * @param image - The image file to store.
 * @returns A promise that resolves with the download URL of the stored image.
 */
const storeImage = (image: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      null,
      error => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(storageRef);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default storeImage;
