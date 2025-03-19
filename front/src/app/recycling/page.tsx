"use client";

import { Typography, Container, Box, TableContainer, Table, TableHead, TableCell, TableRow, Paper, TableBody } from "@mui/material";
import BottomNav from "../bottomNav"

const recycledProducts = [
    { id: 1, brand: "Coca-Cola", material: "Metal" },
    { id: 2, brand: "Johnson&Johnson", material: "Plástico" },
    { id: 3, brand: "Heineken", material: "Vidro" },
    { id: 4, brand: "Del Valle", material: "Metal" },
    { id: 5, brand: "Del Valle", material: "Papel" },
    { id: 6, brand: "Coca-Cola", material: "Plástico" },
  ]

export default function Recycling() {
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100vh", justifyContent: "center" }}>
      <Typography variant="h5">Meus Produtos Reciclados</Typography>
          <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor: "#F0F4EF", textAlign: "center" }}>
            <Typography>
              Nesta seção você encontra todos os produtos já reciclados utilizando a <strong>E.L.Z.A</strong> ♻️
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: "auto" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#A3C9A8" }}>
                  <TableCell><strong>Qtd</strong></TableCell>
                  <TableCell><strong>Marca</strong></TableCell>
                  <TableCell><strong>Material</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recycledProducts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.material}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              <BottomNav /> 
        
    </Container>
  )
}
