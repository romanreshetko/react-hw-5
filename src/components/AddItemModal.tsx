import { Box, Button, Modal, TextField } from "@mui/material"
import { useState } from "react";
import { itemInterface } from "./Item";

interface AddItemProp {
    onClose: () => void;
    isOpened: boolean;
}

export const AddItemModal: React.FC<AddItemProp> = ({onClose, isOpened}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [number, setNumber] = useState(0);
    const [measure, setMeasure] = useState('');

    const handleSubmit = async () => {
        if (name == '' || description == '' || category == '' || number < 0 || measure == '') {
            alert("Не все поля заполнены")
            return
        }
        const newItem: itemInterface = {name: name, description: description, category: category, number: number, measure: measure}
        await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          });
        onClose()
    }


    return (
        <Modal open={isOpened} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{position: 'relative', overflow: 'scroll', width: 'auto', maxWidth: '100%', backgroundColor: 'white', 
                    boxShadow: 24, padding: 4, overflowY: 'scroll'
            }}>
                <Button onClick={onClose} sx={{ float: "right" }}>Close</Button>
                <TextField label="Название" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
                <TextField label="Описание" variant="outlined" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
                <TextField label="Категория" variant="outlined" fullWidth value={category} onChange={(e) => setCategory(e.target.value)} />
                <TextField label="Количество" variant="outlined" fullWidth type="number" value={number} onChange={(e) => setNumber(+e.target.value)} />
                <TextField label="Мера" variant="outlined" fullWidth value={measure} onChange={(e) => setMeasure(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </Box>
        </Modal>
    )
}