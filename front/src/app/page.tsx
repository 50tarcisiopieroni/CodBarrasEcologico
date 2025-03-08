"use client"
import { TextField, Button, CircularProgress, Container } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function BarcodePage() {
  const [barcode, setBarcode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!barcode) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/barcode", { barcode }); 
      // TO-DO: Adicionar funcinalidade de processar resposta
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao enviar código de barras:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove qualquer caractere que não seja número
    const numericValue = value.replace(/\D/g, '');
    setBarcode(numericValue);
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100vh", justifyContent: "center" }}>
      <TextField
        label="Código de Barras"
        variant="outlined"
        value={barcode}
        onChange={handleBarcodeChange}
        inputMode="numeric"
        fullWidth
      />
      {/* Adicionar botão para acionar o leitor de codigo de barras */}
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : "Enviar"}
      </Button>
    </Container>
  );
}