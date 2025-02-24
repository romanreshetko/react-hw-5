import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

export const TopNav = ({onTogglePanel} : {onTogglePanel: () => void}) => {

    const navigate = useNavigate();

    const handleClickProfile = (label: string) => {
        if (label === 'Личная страница пользователя') {
            navigate('/profile');
        }
    }

    return <AppBar position='fixed' sx={{top: 0, zIndex: 1201,
        left: '250px', right: '250px', width: 'calc(100% - 500px)', backgroundColor: 'black'
}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={onTogglePanel} sx={{color: '#f2f2f2', textTransform: 'none', 
                    fontSize: '16px', '&:hover': {backgroundColor: '#ddd', color: 'black'}
                }}>Боковое окно</Button>
                {['Товары', 'Склады', 'О системе', 'Личная страница пользователя'].map((label) => (
                        <Button
                            key={label}
                            sx={{
                                color: '#f2f2f2',
                                textTransform: 'none',
                                fontSize: '16px',
                                '&:hover': { backgroundColor: '#ddd', color: 'black' },
                            }}
                            onClick={() => handleClickProfile(label)}
                        >
                            {label}
                        </Button>
                    ))}
                </Toolbar>
            </AppBar>
}