'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Box, Button, Card, Typography } from '@mui/material'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/${id}`
        )
        setProduct(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <p>Loading...</p>

  if (!product) return <p>Product not found</p>

  return (
    <Box sx={{ p: 4 }}>
      <Button onClick={() => router.back()} variant="contained">
        Back
      </Button>

      <Card sx={{ mt: 3, p: 3 }}>
        <Typography variant="h4">{product.title}</Typography>
        <Typography sx={{ mt: 1 }}>{product.description}</Typography>
        <Typography sx={{ mt: 2 }}>
          Price: ${product.price}
        </Typography>
        <Typography>Category: {product.category}</Typography>
      </Card>
    </Box>
  )
}
