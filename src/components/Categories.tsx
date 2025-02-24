import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { CategoryEditModal } from "./CategoryEditModal";
import { AddCategoryModal } from "./AddCategoryModal";
import { itemIdInterface } from "./Item";

export interface idCategoryInterface {
    id: number;
    name: string;
}

export const Categories: React.FC = () => {

    const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
    const [isOpenedAddModal, setIsOpenedAddModal] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [categories, setCategories] = useState<idCategoryInterface[]>([]);
    const navigate = useNavigate();
    const [items, setItems] = useState<itemIdInterface[]>([]);

    useEffect(() => {
            const fetchProducts = async () => {
                const res = await fetch("http://localhost:3000/api/products");
    
                const data = await res.json();
                setItems(data);
            };
    
            fetchProducts();
        }, []);
    
        useEffect(() => {
            const fetchCategories = async () => {
                const res = await fetch("http://localhost:3000/api/categories");
    
                const data = await res.json();
                setCategories(data);
            };
    
            fetchCategories();
        }, []);

    const handleDelete = async (index: number) => {
        const isCategoryUsed = items.some(item => item.category === categories[index].name);
        if (isCategoryUsed) {
            alert(`Cannot delete category "${categories[index]}" because it is in use.`);
            return;
        }

        await fetch(`http://localhost:3000/api/category/${index}`, {
            method: "DELETE"
        })
    }
    const handleEdit = (index: number) => {
        setEditIndex(index);
        setIsOpenedEditModal(true);
    }
    const handleAdd = () => {
        setIsOpenedAddModal(true);
    }
    const handleCloseEditModal = () => {
        setIsOpenedEditModal(false);
    }
    const handleCloseAddModal = () => {
        setIsOpenedAddModal(false);
    }


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: '100%', backgroundColor: 'white', alignContent: 'center',
            boxShadow: 3, padding: 4, justifyContent: 'center', margin: 'auto'
    }}>
        <Button onClick={() => navigate("/")} sx={{ float: "left" }}>Back</Button>
        <Stack spacing={2}>
            {categories.map((item) => (
                <Stack direction='row' spacing={3}>
                    <Typography variant='body1'>{item.name}</Typography>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(item.id)}>
                        Редактировать
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>
                        Удалить
                    </Button>
                </Stack>
            ))}
        </Stack>
        <Button variant='contained' sx={{backgroundColor: 'green', color: 'white', borderRadius: '20px'}}
                onClick={handleAdd}>
                    Добавить категорию
                </Button>
        
        {isOpenedEditModal && (
                    <CategoryEditModal category={categories[editIndex].name} index={editIndex} onClose={handleCloseEditModal} isOpened={isOpenedEditModal}></CategoryEditModal>
                )}

        {isOpenedAddModal && (
                    <AddCategoryModal onClose={handleCloseAddModal} isOpened={isOpenedAddModal}></AddCategoryModal>
                )}
    </Box>
    )
}