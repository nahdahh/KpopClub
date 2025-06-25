// Product Management System
class ProductManager {
  constructor() {
    this.hardcodedProducts = [
      {
        id: "1",
        name: "BTS Lightstick Ver. 4",
        price: 799000,
        image: "https://i.pinimg.com/736x/82/48/7b/82487b796956e9d1a382f7a1525a474b.jpg",
        category: "lightsticks",
        artist: "bts",
        badge: "New",
        sku: "BTS-LS-001",
        stock: 45,
        status: "in-stock",
        description:
          "The BTS Army Bomb Ver. 4 is the official lightstick for BTS fans. This latest version features enhanced Bluetooth connectivity that allows you to sync with the Weverse app during concerts and online events.",
        features:
          "Bluetooth connectivity\nMulti-color LED lights\nOfficial HYBE product\nIncludes batteries\n1-year warranty",
      },
      {
        id: "2",
        name: "Blackpink Logo Hoodie",
        price: 599000,
        image: "https://i.pinimg.com/736x/7b/85/6e/7b856e62b79afc89319566bfbb74d2ee.jpg",
        category: "apparel",
        artist: "blackpink",
        sku: "BP-AP-002",
        stock: 32,
        status: "in-stock",
        description:
          "Official BLACKPINK logo hoodie made from premium cotton blend. Perfect for showing your support for the group.",
        features: "Premium cotton blend\nOfficial merchandise\nComfortable fit\nMachine washable",
      },
      {
        id: "3",
        name: "Stray Kids - ATE Album",
        price: 349000,
        image: "https://i.pinimg.com/736x/dc/b2/0d/dcb20dcbf7c7064d95d66e46cb4fbe75.jpg",
        category: "albums",
        artist: "stray-kids",
        badge: "Hot",
        sku: "SKZ-AL-003",
        stock: 67,
        status: "in-stock",
        description:
          "Stray Kids' latest album 'ATE' featuring all their hit tracks. Includes photobook and exclusive photocards.",
        features: "CD album\nPhotobook included\nExclusive photocards\nOfficial merchandise",
      },
      {
        id: "4",
        name: "TXT Photocard Set",
        price: 199000,
        image: "https://i.pinimg.com/736x/ab/6a/0f/ab6a0fe95f93fa898ae51da9e6e9cdd9.jpg",
        category: "photocards",
        artist: "txt",
        sku: "TXT-PC-004",
        stock: 89,
        status: "in-stock",
        description:
          "Complete set of TXT member photocards from their latest era. High-quality printing on premium cardstock.",
        features: "Complete member set\nHigh-quality printing\nPremium cardstock\nCollector's item",
      },
      {
        id: "5",
        name: "TWICE Fancy Lightstick",
        price: 699000,
        image: "https://i.pinimg.com/736x/bb/b2/56/bbb256bbaaab4d58aea0dccf282b7b9f.jpg",
        category: "lightsticks",
        artist: "twice",
        sku: "TW-LS-005",
        stock: 23,
        status: "in-stock",
        description:
          "Official TWICE lightstick with beautiful design and multiple lighting modes. Perfect for concerts and fan events.",
        features: "Multiple lighting modes\nOfficial design\nLong battery life\nConcert ready",
      },
      {
        id: "6",
        name: "ENHYPEN T-Shirt",
        price: 399000,
        image: "https://i.pinimg.com/736x/c3/d0/3e/c3d03e78633922bb59ee017c3e905fed.jpg",
        category: "apparel",
        artist: "enhypen",
        sku: "ENH-AP-006",
        stock: 54,
        status: "in-stock",
        description: "Comfortable ENHYPEN t-shirt with official group logo. Made from soft cotton material.",
        features: "Soft cotton material\nOfficial logo design\nComfortable fit\nMultiple sizes available",
      },
      {
        id: "7",
        name: "aespa Next Level Album",
        price: 329000,
        image: "https://i.pinimg.com/736x/ae/0d/91/ae0d91544333994850186c2b2f50675e.jpg",
        category: "albums",
        artist: "aespa",
        sku: "AES-AL-007",
        stock: 41,
        status: "in-stock",
        description:
          "aespa's 'Next Level' album featuring their breakthrough hit. Includes exclusive content and photocards.",
        features: "Hit album\nExclusive content\nPhotocards included\nOfficial release",
      },
      {
        id: "8",
        name: "BTS Jungkook Photocard Set",
        price: 249000,
        image: "https://i.pinimg.com/736x/76/ff/98/76ff98744be4647361e6ab64361c39ed.jpg",
        category: "photocards",
        artist: "bts",
        sku: "BTS-PC-008",
        stock: 76,
        status: "in-stock",
        description: "Exclusive Jungkook photocard collection featuring rare and limited edition cards.",
        features: "Rare collection\nLimited edition\nHigh-quality cards\nCollector's favorite",
      },
      {
        id: "9",
        name: "NewJeans Get Up Album",
        price: 379000,
        image: "https://i.pinimg.com/736x/51/d3/d5/51d3d5e3d70339f054ecba39151bab81.jpg",
        category: "albums",
        artist: "newjeans",
        badge: "Hot",
        sku: "NJ-AL-009",
        stock: 58,
        status: "in-stock",
        description:
          "NewJeans' latest album 'Get Up' with triple title tracks. Includes special packaging and photocards.",
        features: "Triple title tracks\nSpecial packaging\nExclusive photocards\nLimited edition",
      },
      {
        id: "10",
        name: "ITZY Checkmate Hoodie",
        price: 649000,
        image: "https://i.pinimg.com/736x/2f/60/d0/2f60d02392316939e106baa468c3d09b.jpg",
        category: "apparel",
        artist: "itzy",
        sku: "ITZ-AP-010",
        stock: 37,
        status: "in-stock",
        description: "ITZY Checkmate era official hoodie with unique design and premium quality material.",
        features: "Premium quality\nUnique design\nOfficial merchandise\nComfortable fit",
      },
      {
        id: "11",
        name: "IVE Love Dive Lightstick",
        price: 729000,
        image: "https://i.pinimg.com/736x/56/49/eb/5649ebfeb63dfa5ddc2c5c60f37cda39.jpg",
        category: "lightsticks",
        artist: "ive",
        badge: "New",
        sku: "IVE-LS-011",
        stock: 29,
        status: "in-stock",
        description: "IVE official lightstick with elegant design and advanced LED technology for concerts.",
        features: "Advanced LED technology\nElegant design\nBluetooth connectivity\nOfficial product",
      },
      {
        id: "12",
        name: "LE SSERAFIM Photocard Bundle",
        price: 229000,
        image: "https://i.pinimg.com/736x/31/36/6f/31366ff8dd77136a6a147b75104ed174.jpg",
        category: "photocards",
        artist: "lesserafim",
        sku: "LSF-PC-012",
        stock: 94,
        status: "in-stock",
        description: "Complete LE SSERAFIM photocard bundle featuring all members from various eras.",
        features: "All members included\nVarious eras\nHigh-quality printing\nCollector's edition",
      },
      {
        id: "13",
        name: "SEVENTEEN God of Music Album",
        price: 359000,
        image: "https://i.pinimg.com/736x/1e/7f/16/1e7f16000d1668e178a17a6970e93e88.jpg",
        category: "albums",
        artist: "seventeen",
        sku: "SVT-AL-013",
        stock: 72,
        status: "in-stock",
        description: "SEVENTEEN's 'God of Music' album with special edition packaging and exclusive content.",
        features: "Special edition\nExclusive content\nPhotobook included\nOfficial release",
      },
      {
        id: "14",
        name: "Red Velvet Chill Kill T-Shirt",
        price: 429000,
        image: "https://i.pinimg.com/736x/e2/f0/f0/e2f0f04c4ec7304d79c8788e0b99c60e.jpg",
        category: "apparel",
        artist: "redvelvet",
        sku: "RV-AP-014",
        stock: 46,
        status: "in-stock",
        description: "Red Velvet Chill Kill era official t-shirt with artistic design and comfortable fabric.",
        features: "Artistic design\nComfortable fabric\nOfficial merchandise\nLimited edition",
      },
      {
        id: "15",
        name: "NMIXX Lightstick",
        price: 679000,
        image: "https://i.pinimg.com/736x/25/a3/7c/25a37cdb2ef3cee00920d3a6e91fefc8.jpg",
        category: "lightsticks",
        artist: "nmixx",
        sku: "NMX-LS-015",
        stock: 31,
        status: "in-stock",
        description: "NMIXX official lightstick with innovative design and multi-color LED system.",
        features: "Innovative design\nMulti-color LED\nOfficial product\nConcert ready",
      },
      {
        id: "16",
        name: "GIDLE Photocard Collection",
        price: 189000,
        image: "https://i.pinimg.com/736x/21/b5/d9/21b5d9f0c47a35a592d9132ab88e4112.jpg",
        category: "photocards",
        artist: "gidle",
        sku: "GDL-PC-016",
        stock: 83,
        status: "in-stock",
        description:
          "(G)I-DLE complete photocard collection from their latest comeback with special holographic cards.",
        features: "Complete collection\nHolographic cards\nSpecial edition\nCollector's item",
      },
    ]

    this.init()
  }

  init() {
    // Initialize products in localStorage if not exists
    if (!localStorage.getItem("allProducts")) {
      localStorage.setItem("allProducts", JSON.stringify([]))
    }
  }

  // Get all products (hardcoded + admin created)
  getAllProducts() {
    const adminProducts = JSON.parse(localStorage.getItem("allProducts")) || []
    return [...this.hardcodedProducts, ...adminProducts]
  }

  // Get product by ID
  getProductById(id) {
    const allProducts = this.getAllProducts()
    return allProducts.find((product) => product.id === id)
  }

  // Add new product (admin only)
  addProduct(productData) {
    const adminProducts = JSON.parse(localStorage.getItem("allProducts")) || []

    // Generate unique ID
    productData.id = "admin-" + Date.now()
    productData.createdAt = new Date().toISOString()

    // Add default image if none provided
    if (!productData.image) {
      productData.image = "https://via.placeholder.com/300x200?text=" + encodeURIComponent(productData.name)
    }

    adminProducts.push(productData)
    localStorage.setItem("allProducts", JSON.stringify(adminProducts))

    return productData
  }

  // Update product (admin only)
  updateProduct(productData) {
    const adminProducts = JSON.parse(localStorage.getItem("allProducts")) || []
    const index = adminProducts.findIndex((p) => p.id === productData.id)

    if (index !== -1) {
      productData.updatedAt = new Date().toISOString()
      adminProducts[index] = { ...adminProducts[index], ...productData }
      localStorage.setItem("allProducts", JSON.stringify(adminProducts))
      return true
    }
    return false
  }

  // Delete product (admin only)
  deleteProduct(productId) {
    let adminProducts = JSON.parse(localStorage.getItem("allProducts")) || []
    const initialLength = adminProducts.length
    adminProducts = adminProducts.filter((p) => p.id !== productId)

    if (adminProducts.length < initialLength) {
      localStorage.setItem("allProducts", JSON.stringify(adminProducts))
      return true
    }
    return false
  }

  // Get admin created products only
  getAdminProducts() {
    return JSON.parse(localStorage.getItem("allProducts")) || []
  }

  // Filter products
  filterProducts(filters) {
    let products = this.getAllProducts()

    if (filters.category && filters.category !== "all") {
      products = products.filter((p) => p.category === filters.category)
    }

    if (filters.artist && filters.artist !== "all") {
      products = products.filter((p) => p.artist === filters.artist)
    }

    if (filters.priceRange) {
      switch (filters.priceRange) {
        case "0-200000":
          products = products.filter((p) => p.price <= 200000)
          break
        case "200001-500000":
          products = products.filter((p) => p.price > 200000 && p.price <= 500000)
          break
        case "500001+":
          products = products.filter((p) => p.price > 500000)
          break
      }
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.artist.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm),
      )
    }

    return products
  }

  // Format price
  formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Get status badge HTML
  getStatusBadge(status) {
    const badges = {
      "in-stock": '<span class="badge bg-success">In Stock</span>',
      "low-stock": '<span class="badge bg-warning text-dark">Low Stock</span>',
      "out-of-stock": '<span class="badge bg-danger">Out of Stock</span>',
      "pre-order": '<span class="badge bg-info">Pre-Order</span>',
    }
    return badges[status] || '<span class="badge bg-secondary">Unknown</span>'
  }

  // Validate product data
  validateProduct(productData) {
    const errors = []

    if (!productData.name || productData.name.trim() === "") {
      errors.push("Product name is required")
    }

    if (!productData.sku || productData.sku.trim() === "") {
      errors.push("SKU is required")
    }

    if (!productData.price || productData.price <= 0) {
      errors.push("Valid price is required")
    }

    if (!productData.category) {
      errors.push("Category is required")
    }

    if (!productData.artist) {
      errors.push("Artist is required")
    }

    if (productData.stock < 0) {
      errors.push("Stock cannot be negative")
    }

    return errors
  }

  // Handle image upload (convert to base64 or use placeholder)
  handleImageUpload(file) {
    return new Promise((resolve) => {
      if (!file) {
        resolve("https://via.placeholder.com/300x200?text=No+Image")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.onerror = () => {
        resolve("https://via.placeholder.com/300x200?text=Upload+Error")
      }
      reader.readAsDataURL(file)
    })
  }
}

// Initialize global product manager
window.productManager = new ProductManager()

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProductManager
}
