import { Box, Button, Modal, TextField } from "@mui/material";
import { itemInterface } from "./Item"
import { useState } from "react";
import { fetchWithAuth } from "../api";

interface itemEditProps {
    item: itemInterface;
    index: number;
    onClose: () => void;
}

export const ItemEditModal: React.FC<itemEditProps> = ({item, index, onClose}) => {

    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [category, setCategory] = useState(item.category);
    const [number, setNumber] = useState(item.number);
    const [measure, setMeasure] = useState(item.measure);

    const handleSubmit = async () => {
        if (name == '' || description == '' || category == '' || number < 0 || measure == '') {
            alert("Не все поля заполнены")
            return
        }
        const newItem: itemInterface = {name: name, description: description, category: category, number: number, measure: measure}
        await fetchWithAuth(`http://localhost:3000/api/products/${index}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        })
        onClose()
    }

    return (
        <Modal open={item != null} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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