import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { addDocument } from '../redux/documentsSlice';
import { getChecksum } from '../utils/checksum';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import styles from './FileDropzone.module.css';

const FileDropzone: FC = () => {
  const dispatch = useAppDispatch();
  const documents = useAppSelector((state: RootState) => state.documents.documents);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(file => {
        getChecksum(file)
          .then((checksum: string) => {
            const isUnique = !documents.find(doc => doc.checksum === checksum);
            if (isUnique) {
              const document = {
                name: file.name,
                checksum: checksum,
                size: file.size,
              };
              dispatch(addDocument(document));
            } else {
              alert('A document with the same checksum already exists.');
            }
          })
          .catch((error: Error) => {
            console.error('Error calculating checksum:', error);
          });
      });
    },
    [dispatch, documents]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileDropzone;
