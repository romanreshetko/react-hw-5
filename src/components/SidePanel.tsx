import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import BackspaceIcon from '@mui/icons-material/Backspace';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { idCategoryInterface } from './Categories';
import { fetchWithAuth } from '../api';

interface SidePanelProps {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterState: React.Dispatch<React.SetStateAction<{
        name: string;
        available: boolean;
        categoryName: string;
    }>>
}

export const SidePanel: React.FC<SidePanelProps> = ({opened, setOpened, setFilterState}) => {

    const [text, setText] = useState('');
    const [checked, setChecked] = useState(false);
    const [category, setCategory] = useState("all");
    const [categories, setCategories] = useState<idCategoryInterface[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchProducts = async () => {
                const data = await fetchWithAuth("http://localhost:3000/api/categories");
    
                setCategories(data);
            };
    
            fetchProducts();
        }, []);

    const setFilters = () => {
        setFilterState({name: text, available: checked, categoryName: category});
    };
    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };
    const handleTextClear = () => {
        setText('');
    };
    const handleAllClear = () => {
        setText('');
        setCategory('all');
        setChecked(false);
    };
    const handleSetFilters = () => {
        setFilters();
        setOpened(false);
    }

    return <Drawer open={opened} sx={{width: '200px'}} anchor='left'>
            <Box sx={{marginTop: '50px', gap: 2, flexDirection: 'column', display: 'flex'}}>
                <TextField id="enter-text" label="Название" variant="outlined" 
                        value={text} onChange={handleTextChange} fullWidth
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <BackspaceIcon onClick={handleTextClear} />
                                    </InputAdornment>
                                )
                            }
                        }} />
                <br></br>
                <FormControlLabel label='Только в наличии' control={<Checkbox 
                    checked={checked}
                    onChange={handleCheckChange}
                />} />
                <br></br>
                <FormControl>
                <InputLabel id='category-label'>Категория</InputLabel>
                    <Select value={category} onChange={handleCategoryChange} labelId='category-label'>
                        <MenuItem value="all">Все</MenuItem>
                        {categories.map((value) => (
                            <MenuItem value={value.name}>{value.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br></br>
                <Button variant='outlined' onClick={handleAllClear}>Сбросить</Button>
                <Button variant='outlined' onClick={handleSetFilters}>Применить</Button>
                <br></br>
                <Button variant='outlined' onClick={() => navigate('/categories')}>Категории товаров</Button>
            </Box>
    </Drawer>
}