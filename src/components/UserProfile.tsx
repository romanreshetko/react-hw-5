import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchWithAuth } from "../api";

export type User = {
    name: string;
    email: string;
    group: string;
    avatar?: string;
}

export const UserProfile: React.FC = () => {

    const [user, setUser] = useState<User>({name: "", email: "", group: ""});
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            const data = await fetchWithAuth("http://localhost:3000/profile", {
                method: "GET",
                credentials: "include",
            });
            setUser(data);
        }

        getProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3000/logout", {
                method: "POST",
                credentials: "include",
            });
            navigate("/login");
        } catch(err) {
            console.error("Logout failed", err);
        }
    }

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
            <Typography variant="h4" fontWeight='bold'>Username: {user!.name}</Typography>
            <Typography variant="h6" color="textSecondary">
                Email: {user!.email}
            </Typography>
            <Typography variant="h6" color="primary">
                Group: {user!.group}
            </Typography>
            </Paper>
            <Button onClick={handleLogout} sx={{ float: "right" }}>Log out</Button>
        </Box>
    )
}