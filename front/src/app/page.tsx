"use client"
import { useState } from "react";
import { TextField, Button, CircularProgress, Container, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function BarcodePage() {
  const [barcode, setBarcode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (!barcode) return;
    setLoading(true);
    setSubmitted(true)
    try {
      const response = await axios.post("/api/barcode", { barcode }); 
      // TO-DO: Adicionar funcinalidade de processar resposta
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao enviar código de barras:", error);
    } finally {
      setTimeout(() => setLoading(false), 3000)
    }
  };

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove qualquer caractere que não seja número
    const numericValue = value.replace(/\D/g, '');
    setBarcode(numericValue);
  };

  //RESPONSÁVEL PELA LEITURA DO CODIGO DE BARRAS COM A CAMERA
  const handleScanBarcode = () => {
    //TODO: se seguir com isso implementar leitura com a camera
    alert("Função de leitura de código de barras com a camêra ainda não implementada!");
  }

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100vh", justifyContent: "center" }}>
      {submitted && loading ? (
        <Paper elevation={0} sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Carregando um futuro mais verde... 🌱
          </Typography>
          <CircularProgress color="success" size={70} />
        </Paper>
      ) : (
        <>
          <img src="/assets/logo.jpeg" alt="Logo Reciclagem Elza" style={{ width: 150, marginBottom: 16 }} />
          {/* TODO: remover essa tag Typography quando a imagem passar a ser inserida  */}
          <Typography variant="h5" gutterBottom>
            Reciclagem Elza
          </Typography>
          <TextField
            label="Insira o código de barras"
            variant="outlined"
            value={barcode}
            onChange={handleBarcodeChange}
            inputMode="numeric"
            fullWidth
          />
          {/* Adicionar botão para acionar o leitor de codigo de barras */}
          <Button variant="contained" sx={{ backgroundColor: "#E7FAE2", color: "black" }} onClick={handleScanBarcode} fullWidth>
            Leitor de Código de Barras
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#E7FAE2", color: "black" }} onClick={handleSubmit} disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} /> : "Enviar"}
          </Button>
        </>
      )}
    </Container>
  );
}