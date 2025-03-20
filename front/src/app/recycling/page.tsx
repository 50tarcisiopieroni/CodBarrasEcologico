"use client";

import { useEffect, useState } from "react"
import { Typography, Container, Box, TableContainer, Table, TableHead, TableCell, TableRow, Paper, TableBody } from "@mui/material";
import axios from "axios"
import BottomNav from "../bottomNav"

interface Product {
  idItem: string
  productName: string
  disposalInfo: string
  brand: string
  qtd: number
  material: string
}

export default function Recycling() {
  const [recycledProducts, setRecycledProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products")
        setRecycledProducts(response.data)
      } catch (error) {
        console.error("Erro ao buscar produtos reciclados:", error)
      }
    }

    fetchProducts()
  }, [])

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
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell><strong>Material</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recycledProducts.map((item) => (
              <TableRow key={item.idItem}>
                <TableCell>{item.qtd}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.productName}</TableCell>
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
