import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

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
        const downloadURL = await getDownloadURL(storageRef);
        resolve(downloadURL);
      }
    );
  });
};

export default storeImage;
