"use client";

import { Avatar, Typography, Container, TextField, Button, Box } from "@mui/material";
import BottomNav from "../bottomNav"

export default function Profile() {
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100vh", justifyContent: "center" }}>
        <Typography variant="h5">Perfil</Typography>
        <Avatar src="/user.png" sx={{ width: 100, height: 100 }} />
        <Typography variant="h6">Olá, <strong>Alice!</strong></Typography>
        <Button variant="text" sx={{ textTransform: "none" }}>✏️ Editar perfil</Button>
        <Box sx={{ width: "100%" }}>
            <TextField label="Email" value="alice@gmail.com" fullWidth disabled margin="normal" />
            <TextField label="CPF" value="123.456.789-00" fullWidth disabled margin="normal" />
        </Box>
        <Button variant="contained" sx={{backgroundColor: "#768C64"}} fullWidth>Sair</Button>
        <BottomNav /> 
    </Container>
  )
}
