import { FC } from 'react';
import { removeDocument } from '../redux/documentsSlice';
import { RootState } from '../redux/store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const DocumentsTable: FC = () => {
  const dispatch = useAppDispatch();
  const documents = useAppSelector((state: RootState) => state.documents.documents);

  const handleDelete = (checksum: string) => {
    dispatch(removeDocument(checksum));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Checksum</TableCell>
            <TableCell align="right">Size (bytes)</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map(doc => (
            <TableRow key={doc.checksum}>
              <TableCell component="th" scope="row">
                {doc.name}
              </TableCell>
              <TableCell align="right">{doc.checksum}</TableCell>
              <TableCell align="right">{doc.size}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDelete(doc.checksum)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentsTable;
