'use client'

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography
} from '@mui/material'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    const skip = (page - 1) * 10

    let url = `https://dummyjson.com/products?limit=10&skip=${skip}`

    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`
    }

    if (category) {
      url = `https://dummyjson.com/products/category/${category}`
    }

    const res = await axios.get(url)

    setProducts(res.data.products)
  }

  useEffect(() => {
    fetchProducts()
  }, [search, category, page])

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Products
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>

            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="beauty">Beauty</MenuItem>
              <MenuItem value="fragrances">Fragrances</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="groceries">Groceries</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Link href={`/dashboard/products/${product.id}`}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.thumbnail}
                />

                <CardContent>
                  <Typography variant="h6">
                    {product.title}
                  </Typography>

                  <Typography>
                    ${product.price}
                  </Typography>

                  <Typography>
                    {product.category}
                  </Typography>

                  <Typography>
                    ⭐ {product.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={10}
        page={page}
        onChange={(_, val) => setPage(val)}
        sx={{ mt: 3 }}
      />
    </Box>
  )
}