"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { TextField, Button, CircularProgress, Container } from "@mui/material";
import axios from "axios";
import BottomNav from "./bottomNav"

export default function BarcodePage() {
  const [barcode, setBarcode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false)
  const router = useRouter() 

  const handleSubmit = async () => {
    if (!barcode) return
    setLoading(true)
    try {
      const response = await axios.post("/api/barcode", { barcode })
      console.log("Produto adicionado:", response.data)
      setRedirect(true) 
    } catch (error) {
      console.error("Erro ao enviar código de barras:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (redirect) {
      router.push("/recycling")
    }
  }, [redirect, router])

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100vh", justifyContent: "center" }}>
      <img src="/logo.png" alt="Reciclagem Elza" style={{ width: 150, marginBottom: 20 }} />
      <TextField
        label="Insira o Código de Barras"
        variant="outlined"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        inputMode="numeric"
        fullWidth
      />
      <Button variant="contained" sx={{ backgroundColor: "#768C64" }} onClick={handleSubmit} disabled={loading} fullWidth>
        {loading ? <CircularProgress size={24} /> : "Enviar"}
      </Button>
      <BottomNav />
    </Container>
  )
}