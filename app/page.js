'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography, Stack, Modal, TextField, Button, Card, CardContent, CardActions } from "@mui/material";
import { collection, getDocs, query, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore"; // Import missing functions

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [showNoItemsFound, setShowNoItemsFound] = useState(false);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList); // Initialize filteredInventory
  };

  const addItem = async (item) => {
    const trimmedItem = item.trim().toLowerCase(); // Ensure consistency in item names
    if (trimmedItem === '') return; // Avoid adding empty items
    const docRef = doc(firestore, 'inventory', trimmedItem);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const trimmedItem = item.trim().toLowerCase(); // Ensure consistency in item names
    const docRef = doc(firestore, 'inventory', trimmedItem);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity > 1) {
        await setDoc(docRef, { quantity: quantity - 1 });
      } else {
        await deleteDoc(docRef);
      }
    }
    await updateInventory();
  };

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = inventory.filter(item => 
      item.name.toLowerCase().includes(query)
    );
    setFilteredInventory(filtered);

    if (filtered.length === 0) {
      setShowNoItemsFound(true);
      setTimeout(() => {
        setShowNoItemsFound(false);
        window.location.reload();
      }, 5000);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" p={4}>
      <Typography variant="h2" gutterBottom>Inventory Management</Typography>
      <Box display="flex" gap={2} mb={4} width="100%" maxWidth="600px">
        <TextField 
          variant="outlined" 
          placeholder="Search items..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Item
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: "translate(-50%, -50%)" }}
          width={400}
          bgcolor="white"
          borderRadius={1}
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              variant="outlined" 
              fullWidth 
              value={itemName} 
              onChange={(e) => setItemName(e.target.value)} 
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => { addItem(itemName); setItemName(''); handleClose(); }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box width="100%" maxWidth="800px" mt={4}>
        <Box width="100%" bgcolor="#ADD8E6" p={2} mb={2} borderRadius={1}>
          <Typography variant="h5" color="#333" textAlign="center">Inventory Items</Typography>
        </Box>
        <Stack width="100%" spacing={2} overflow="auto">
          {filteredInventory.length > 0 ? (
            filteredInventory.map(({ name, quantity }) => (
              <Card key={name} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography color="textSecondary">
                    Quantity: {quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="secondary" onClick={() => removeItem(name)}>
                    Remove
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            showNoItemsFound && (
              <Typography variant="h6" color="textSecondary" textAlign="center" width="100%">
                No items found
              </Typography>
            )
          )}
        </Stack>
      </Box>
    </Box>
  );
}

