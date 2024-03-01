import { FC } from 'react';
import FileDropzone from './components/FileDropzone';
import DocumentsTable from './components/DocumentsTable';

const App: FC = () => {
  return (
    <div>
      <FileDropzone />
      <DocumentsTable />
    </div>
  );
};

export default App;
