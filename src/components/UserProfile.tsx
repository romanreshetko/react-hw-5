import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router";

export type User = {
    name: string;
    email: string;
    group: string;
    avatar?: string;
}

export const UserProfile: React.FC = () => {

    const defaultUser: User = {name: 'User1', email: 'email@gmail.com', group: 'Student'};
    const navigate = useNavigate();

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, minHeight: '80vh'}}>
            <Button onClick={() => navigate("/")} sx={{ float: "right" }}>Close</Button>
            <Paper elevation={8} sx={{
                display: "flex", flexDirection: "column", alignItems: "center", padding: { xs: 4, md: 6 }, backgroundColor: "white",
                borderRadius: 3, width: { xs: "90%", sm: "60%", md: "40%" }, textAlign: "center", boxShadow: 3,
            }}>
            <Avatar sx={{width: 130, height: 130, mb: 3, boxShadow: 2}}>
                <AccountCircle sx={{fontSize: 130}}></AccountCircle>
            </Avatar>
            <Typography variant="h4" fontWeight='bold'>Username: {defaultUser.name}</Typography>
            <Typography variant="h6" color="textSecondary">
                Email: {defaultUser.email}
            </Typography>
            <Typography variant="h6" color="primary">
                Group: {defaultUser.group}
            </Typography>
            </Paper>
        </Box>
    )
}