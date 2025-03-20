"use client";

import { Avatar, Typography, Container, TextField, Button, Box } from "@mui/material";
import BottomNav from "../bottomNav"
import { useEffect, useState } from "react"
import axios from "axios"

interface User {
  name: string
  cpf: string
  email: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users")
        if (response.data.length > 0) {
          setUser(response.data[0]) //pega o primeiro usuário
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
      }
    }

    fetchUser()
  }, [])

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100vh", justifyContent: "center" }}>
      <Typography variant="h5">Perfil</Typography>
      <Avatar src="/user.png" sx={{ width: 100, height: 100 }} />
      <Typography variant="h6">Olá, <strong>{user ? user.name : "Carregando..."}</strong>!</Typography>
      <Button variant="text" sx={{ textTransform: "none" }}>✏️ Editar perfil</Button>
      <Box sx={{ width: "100%" }}>
        <TextField label="Email" value={user ? user.email : ""} fullWidth disabled margin="normal" />
        <TextField label="CPF" value={user ? user.cpf : ""} fullWidth disabled margin="normal" />
      </Box>
      <Button variant="contained" sx={{ backgroundColor: "#768C64" }} fullWidth>Sair</Button>
      <BottomNav /> 
    </Container>
  )
}
