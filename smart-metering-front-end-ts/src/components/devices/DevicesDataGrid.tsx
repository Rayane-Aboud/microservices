import * as React from 'react';
import {Box} from '@mui/material';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';

import {
  randomId,
  
} from '@mui/x-data-grid-generator';
import { CreateDeviceDto, createOrUpdateDevice, deleteDevice, fetchAllDevices, } from '../../api/devicesApi';



const initialRows: GridRowsProp = [];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        serialNumber: '', // Ensure default values for each field
        locationX: '',
        locationY: '',
        dateType: '',
        dataType: '',
        dataUnit: '', // If this field is needed, initialize it here
        isNew: true,
      },
    ]);
  
  

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'serialNumber' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}


export default function DevicesDataGrid() {
  
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [lastChangedId, setLastChangedId] = React.useState<GridRowId | undefined>();



  //load all devices from the backend:
  React.useEffect(() => {
    const loadDevices = async () => {
      try {
        const devices = await fetchAllDevices(); // Fetch all devices from the backend
        const mappedDevices = devices.map((device:CreateDeviceDto) => ({
          ...device,
          id: device.serialNumber, // Assign serialNumber as id
        }));
        setRows(mappedDevices); // Set the fetched data to the state
      } catch (error) {
        console.error('Error loading devices:', error);
      }
    };

    loadDevices(); // Call the function to fetch devices when the component mounts
  }, []);
  
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true; // This prevents premature edit stop
    }
  };
  

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel((rowModesModel)=>({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } }));
  };
 

  const handleSaveClick = (id: GridRowId) => async () => {
    setLastChangedId(id);
    setRowModesModel((prev) => ({ 
        ...prev, 
        [id]: { mode: GridRowModes.View },
      }
    )
  );
    
    
  };
  
  React.useEffect(() => {
    const updateDevice = async () => {

      if (!lastChangedId) {
        // If there's no ID to process, exit early.
        return;
      }
  
      const updatedRow = rows.find((row) => row.id === lastChangedId);
      if (!updatedRow) {
        console.error("Row not found:", lastChangedId);
        return;
      }
  
      const updatedData = {
        id:updatedRow.serialNumber,
        serialNumber: updatedRow.serialNumber,
        locationX: updatedRow.locationX,
        locationY: updatedRow.locationY,
        dateType: updatedRow.dateType,
        dataType: updatedRow.dataType,
        dataUnit: updatedRow.dataUnit,
      };
  
      try {
        if (updatedData.id !=="")
          console.log("Updated data:", updatedData);
        
          await createOrUpdateDevice(updatedData);
      } catch (error) {
        console.error("Error updating device:", error);
      }
    };
  
    updateDevice(); // Call the async function
  }, [lastChangedId, rows]);
  

  


  const handleDeleteClick = (id: GridRowId) => async () => {
    setRows(rows.filter((row) => row.id !== id));
    //send to the backend the modifications
    const rowToDelete = rows.find((row) => row.id === id);

    if (rowToDelete) {
      try {
        // Send delete request to backend
        await deleteDevice(rowToDelete.serialNumber);

        // Update the front-end state
        setRows(rows.filter((row) => row.id !== id));
      } catch (error) {
        console.error("Error deleting device:", error);
      }
    }
  };


  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel((rowModesModel)=>({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
    //send to the backend
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(()=>newRowModesModel);
  };


  const columns: GridColDef[] = [
    { 
      field: 'serialNumber',
      headerName: 'Serial Number', 
      width: 180, 
      editable: true 
    },
    {
      field: 'locationX',
      headerName: 'location X',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'locationY',
      headerName: 'location Y',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
   
    {
      field: 'dateType',
      headerName: 'Date Type',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },

    {
      field: 'dataType',
      headerName: 'Data Type',
      width: 220,
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },

    {
      field: 'dataUnit',
      headerName: 'Data Type',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'value',
      headerName: 'value',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
  
}