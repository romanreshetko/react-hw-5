import React, { useEffect, useState } from "react"
import { Item, itemIdInterface } from "./Item"
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { FilterState } from "../App";
import { Button } from "@mui/material";
import { AddItemModal } from "./AddItemModal";
import { useNavigate } from "react-router";
import { fetchWithAuth } from "../api";

export const ItemGrid: React.FC<FilterState> = ({name, available, categoryName}) => {
    
    const [items, setItems] = useState<itemIdInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpenedModal, setIsOpenedModal] = useState(false);
    const itemsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await fetchWithAuth("http://localhost:3000/api/products");

            setItems(data);
        };

        fetchProducts();
    }, []);

    const handleItemClick = (index: number) => {
        navigate(`/products/${items[index].id}`)
    };

    const handleAddItemClick = () => {
        setIsOpenedModal(true);
    }

    const handleCloseModal = () => {
        setIsOpenedModal(false);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const filteredItems = items.filter((item) => {
        const matchesName = name === '' || new RegExp(name, "i").test(item.name);
        const matchesAvailable = !available || item.number > 0;
        const matchesCategory = categoryName === "all" || item.category === categoryName;

        return matchesName && matchesAvailable && matchesCategory;
    });
    const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    return <Box sx={{marginLeft: '200px', marginRight: '200px', marginTop: '25px', height: "100vh"}}>
        <Box sx={{width: '100%', overflowY: 'scroll', flex: 1, paddingBottom: '70px'}}>
        <Grid container spacing={2} sx={{justifyContent: 'flex-start'}}>
                {displayedItems.map((item, index) => (
                    <Grid size={4} key={index} sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}} onClick={() => handleItemClick(index)}>
                        <Item id={item.id} name={item.name} description={item.description} 
                        category={item.category} number={item.number}
                        measure={item.measure} picture={item.picture}></Item>
                    </Grid>
            ))}
        </Grid>
        {isOpenedModal && (
            <AddItemModal isOpened={isOpenedModal} onClose={handleCloseModal}></AddItemModal>
        )}
        </Box>
        <Button variant='contained' sx={{backgroundColor: 'green', color: 'white', borderRadius: '20px'}}
        onClick={handleAddItemClick}>
            Добавить товар
        </Button>
        <Box sx={{position: 'fixed', bottom: 0,
                padding: '10px', backgroundColor: 'white', justifyContent: 'center', display: 'flex'}}>
            <Pagination count={Math.ceil(filteredItems.length / itemsPerPage)} page={currentPage} variant='outlined' onChange={handlePageChange} />
        </Box>
    </Box>
}