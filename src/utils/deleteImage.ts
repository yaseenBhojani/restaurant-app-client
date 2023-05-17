import { getStorage, ref, getMetadata, deleteObject } from 'firebase/storage';

// Initialize Firebase storage
const storage = getStorage();

/**
 * Deletes an image file from Firebase storage.
 * @param filePath - The path of the file to delete.
 * @returns A promise that resolves when the file is deleted successfully.
 */
const deleteImage = async (filePath: string): Promise<void> => {
  const fileRef = ref(storage, filePath);

  try {
    // Get the metadata of the file
    await getMetadata(fileRef);

    // Delete the file
    await deleteObject(fileRef);

    console.log(`File ${filePath} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
};

export default deleteImage;
