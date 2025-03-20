import { NextResponse } from "next/server"
import admin from "firebase-admin"
import axios from "axios"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECTID,
      clientEmail: process.env.CLIENTEMAIL,
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCxGFXseHXlc0qu\nlpBbruiw/+Mu0r1W8ahouIIYH46H720vSmx9VB3FkwJT186tZpI2GqHfQOJJOnmg\nIBMTfO/90gE9wqXN4kR5Zh8bpZbRsLHc9g3QOP24KcFt4s1ZG4J9EjwCyhOdskKf\nUnu7uaXPkueCeXJ2n01t/cxr2rM+Y4FeNudYuMeohpsL2zpDJn5+7pdMP02ooLwL\nQ6SUQQQOz96NwNMyJwINzBNK8Ipv5rq6BlUughqhdXCujUQYEleMW/ho5bOXwOOp\n8RXmUKld6A60iO429Zl2FSPjYD+nXxwVXVYwUy+HTQPobOqjV47etjBN70F0+teY\nSus0O86tAgMBAAECggEAA3alzmdF2UinYB0FJJgsQ7MPvKj6cvzaWS1imWLACbdn\n4GRSgtodJl95FeT6BBRvLVDZKr0qr8df2Gy14IMfTCgTRiOn1ML3hQFuSSy0c4se\nQayZq/zV6778Kyu2ErCh5mYCCeB/ktsbWnN3qSummMypkCaKLx1vm1+odhpjuCwJ\nnFNuwXBjk5bxIz0tNuzJnHf+ohH9RdIuwQZqg2CnGnN//mOBoPxYatRldpepPCJm\nDVTA9I/t8rZwNbA455EH5wGVNy2hAhJBi58KLulFffeoDAZb2pSWjc87hcyDMuoK\nLZIQeF/DHERzcABxVue3fydJFQv0ZC/XJXHEWs31MQKBgQD09L4FJ1NFZwe9iQcQ\nfHzPqUhSqBU/IdPwe54955h3qB6fW2Y2k6QWNRIDK0/bnPNs5n4oyWiAJf/ZTRfr\n/Y/yv9ddge0hG38oZuXoe9eLuM3MbWq0T/3WRIELrTQ3gk13NzftxbQ1OqEE0N7m\n74yDdPHeOrSkUriIiqzZu5TFUwKBgQC5FFlWjGrIy1JShKYw8jQ/TdpgwxWHqM5k\nbdt6Z1FtFFbSZKwZYdrdoXApF6ReoSXFQ2RzH2qXyTiEaMptCDQ0Zi/ClSPnzXAl\nX3XCbRfLR2X7sXdGJ7T/F1BDCKA/f+ZInLMYfjSYQOPAkihIT/G2Ya2s28gUX9gv\nLoiYJeab/wKBgQDSQWT9TXT3ZGlLcdvDdec34+j1MdsS1nlxuNnp7ul7A65NQImq\nnO3CNglg+QNR0RVMy0dMwRxWqsdCAR9ga8PsLGiylXwx58Usq6358JriDl1vdBeb\n7/FEwoY1vJTOdKUDiD0UdZep/MoLNTGu7b0hdPbKtn8pcOt+H/If7hfTiwKBgQCI\n0zRguZpQK5AGlS5PzR83FZU2J8MI8ZDzyguR6EPYQksVa3uXoDIv2yOSHXpUwwmr\nVfEy8qzY3de8e8P66y+89TalwaAzxDr+Rh5GyGPo0jXg5wfog35Zf6DEjeH6T9Gt\nKLt2hgbX8FDvkp3ZJ9DoJjpBKpI2Dc1CxEITSSG9fQKBgQCRgfHvOWO5UCQMp/Xq\n2a12Zqk3zrCsdMRlCmmLgdwKVvHeRKzrbn4dy8jw8UzqgywZMVRN94r0U42XknCV\n5oigKEjIAPNxZQWzxkHyPhoiI5hvG2VHzWwmTIiS89WXcVzMbXelH+R9ViipkbLv\nFkCmPyR2QVyROkBtsW9OTrgZFw==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n"),
    }),
  })
}

const db = admin.firestore()

export async function POST(req: Request) {
  try {
    const { barcode } = await req.json()

    if (!barcode) {
      return NextResponse.json(
        { error: "Código de barras não informado." },
        { status: 400 }
      )
    }

    const response = await axios.get(
      `https://api.cosmos.bluesoft.com.br/gtins/${barcode}`,
      {
        headers: { "X-Cosmos-Token": process.env.COSMOS_API_TOKEN },
      }
    )

    const data = response.data;

    const productData = {
      idItem: data.gtin || null, 
      barcode: data.gtin,
      productName: data.description,
      description: data.ncm?.full_description || data.description || "Descrição não disponível",
      disposalInfo: "Informações sobre descarte não disponíveis",
      productImage: data.thumbnail || data.barcode_image || "",
      brand: data.brand?.name || "Marca desconhecida",
    };

    if (!productData.idItem) {
      throw new Error("Erro: idItem inválido, produto não pode ser salvo.");
    }

    const productRef = db.collection("products").doc(String(productData.idItem));
    const doc = await productRef.get();

    if (doc.exists) {
      //incrementa a qtd se o produto já existir
      const existingData = doc.data()
      const newQuantity = (existingData?.qtd || 0) + 1

      await productRef.update({
        qtd: newQuantity,
      })
    } else {
      //define qtd como 1 se o produto for novo
      await productRef.set({
        ...productData,
        qtd: 1,
      })
    }

    return NextResponse.json({ success: true, product: productData })
  } catch (error: any) {
    console.error("Erro na requisição:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}