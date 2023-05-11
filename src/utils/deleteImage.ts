import { getStorage, ref, getMetadata, deleteObject } from 'firebase/storage';

const storage = getStorage();

const deleteImage = async (filePath: string): Promise<void> => {
  const fileRef = ref(storage, filePath);

  try {
    await getMetadata(fileRef);
    await deleteObject(fileRef);
    console.log(`File ${filePath} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
};

export default deleteImage;
