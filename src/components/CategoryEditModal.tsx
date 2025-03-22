import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { fetchWithAuth } from "../api";

interface categoryEditProps {
    category: string;
    index: number;
    onClose: () => void;
    isOpened: boolean;
}

export const CategoryEditModal: React.FC<categoryEditProps> = ({category, index, onClose, isOpened}) => {

    const [categoryValue, setCategoryValue] = useState(category);

    const handleSubmit = async () => {
        if (categoryValue == '') {
            alert("Не все поля заполнены")
            return
        }
        const cat = {name: categoryValue}
        await fetchWithAuth(`http://localhost:3000/api/categories/${index}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cat),
        })
        onClose()
    }

    return (
        <Modal open={isOpened} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{position: 'relative', overflow: 'scroll', width: 'auto', maxWidth: '100%', backgroundColor: 'white', 
                    boxShadow: 24, padding: 4, overflowY: 'scroll'
            }}>
                <Button onClick={onClose} sx={{ float: "right" }}>Close</Button>
                <TextField label="Категория" variant="outlined" fullWidth value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </Box>
        </Modal>
    )

}