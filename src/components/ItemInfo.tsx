import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from "react-router";
import { Button } from "@mui/material";
import { itemIdInterface } from "./Item";
import { ItemEditModal } from "./ItenEditModal";

export const ItemInfo: React.FC = () => {

    const navigate = useNavigate();
    const {index} = useParams();
    const numberIndex = parseInt(index ?? '0', 10);
    const [item, setItem] = useState<itemIdInterface>({id: 0, name: "", description: "", category: "", number: 0, measure: ""});
    const [isOpenedModal, setIsOpenedModal] = useState(false);

    useEffect(() => {
            const fetchProduct = async () => {
                const res = await fetch(`http://localhost:3000/api/products/${index}`);
    
                const data = await res.json();
                setItem(data);
            };
    
            fetchProduct();
        }, []);

    const handleDelete = async () => {
        await fetch(`http://localhost:3000/api/products/${item.id}`, {
            method: "DELETE"
        })
        navigate("/")
    }

    const handleEdit = () => {
        setIsOpenedModal(true);
    }

    const handleCloseModal = () => {
        setIsOpenedModal(false);
    }

    return (
            <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: '100%', backgroundColor: 'white', alignContent: 'center',
                    boxShadow: 3, padding: 4, justifyContent: 'center', margin: 'auto'
            }}>
                <Button onClick={() => navigate("/")} sx={{ float: "left" }}>Back</Button>
                <Typography variant='h4' component='div'>{item.name}</Typography>
                <Typography variant='subtitle1' component='div'>Category: {item.category}</Typography>
                <Typography variant='body1' component='div'>{item.description}</Typography>
                <Typography>Number: {item.number} {item.measure}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center',
                        justifyContent: 'center', overflow: 'hidden', marginBottom: '8px',
                        borderRadius: '4px', backgroundColor: '#f0f0f0'
                    }}>
                {item.picture ? (
                    <img src={item.picture} alt={item.name} style={{ maxWidth: '100%', maxHeight: '300px'}} />
                ) : (
                    <p>No picture</p>
                )}
                </Box>
                {isOpenedModal && (
                            <ItemEditModal item={item} index={numberIndex} onClose={handleCloseModal}></ItemEditModal>
                        )}
                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleEdit}>
                        Редактировать
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Удалить
                    </Button>
                </Box>
            </Box>
    );
};
