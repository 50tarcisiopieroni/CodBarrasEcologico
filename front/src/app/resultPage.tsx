"use client";
import { useState } from "react";
import { Container, Typography, Box, TextField } from "@mui/material";
import Image from "next/image";

interface ProductInfo {
  barcode: string;
  productName: string;
  description: string;
  disposalInfo: string;
  productImage: string;
}

export default function BarcodeResult({ product }: { product: ProductInfo }) {
  const [loading, setLoading] = useState<boolean>(true);
  
  setTimeout(() => setLoading(false), 3000);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <TextField variant="outlined" label="7897195931775" inputMode="numeric"
            fullWidth sx={{ backgroundColor: "#E7FAE2", color: "black"}}/>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Image src="./assets/lixeiraVermelha.jpeg" alt="Lixeira" width={50} height={50} />
            <Typography variant="body1">
              <strong>Descarte:</strong> Descarte a garrafa na lixeira vermelha, destinada a resíduos plásticos, para garantir a reciclagem correta.
            </Typography>
          </Box>

          <Box sx={{ textAlign: "left", mt: 2, width: "100%" }}>
            <Typography variant="body1">
              <strong>Produto:</strong> Refrigetante Cola Pepsi Garrafa 200ML
            </Typography>
          </Box>

          <Image src="./assets/refrigerantePepsi.png" alt="Refrigerante Cola Pepsi Garrafa 200ML" width={100} height={100} style={{ marginTop: 8 }} />

          <Box sx={{ textAlign: "left", mt: 2, width: "100%" }}>
            <Typography variant="body2">
              <strong>Descrição:</strong> O produto Refrigetante Cola Pepsi Garrafa 200ML é comercializado em uma garrafa de plástico (PET).
            </Typography>
          </Box>
    </Container>
  )
}
