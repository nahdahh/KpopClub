document.addEventListener("DOMContentLoaded", () => {
  // Authentication and Navigation Management
  function initializeAuth() {
    // Initialize default users if none exist
    initializeDefaultUsers()

    // Update navigation based on login status
    updateNavigation()

    // Handle login form if on login page
    if (document.getElementById("loginForm")) {
      handleLoginForm()
    }

    // Handle register form if on register page
    if (document.getElementById("registerForm")) {
      handleRegisterForm()
    }

    // Handle logout functionality
    handleLogout()
  }

  function initializeDefaultUsers() {
    const existingUsers = JSON.parse(localStorage.getItem("kpopUsers")) || []

    // If no users exist or admin doesn't exist, create default admin user
    const adminExists = existingUsers.find((user) => user.email === "admin@example.com")

    if (!adminExists) {
      const defaultAdmin = {
        id: "admin-001",
        firstName: "Admin",
        lastName: "User",
        name: "Admin User",
        email: "admin@example.com",
        password: "admin",
        role: "admin",
        status: "active",
        joinedDate: new Date().toLocaleDateString("id-ID"),
        orders: 0,
      }

      existingUsers.push(defaultAdmin)
      localStorage.setItem("kpopUsers", JSON.stringify(existingUsers))
      console.log("✅ Default admin user created!")
    }
  }

  function updateNavigation() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

    // Find login/profile elements in navigation
    const loginButton = document.getElementById("login-button")
    const profileDropdown = document.getElementById("profile-dropdown")
    const profileName = document.getElementById("profile-name")
    const adminPanelLink = document.getElementById("admin-panel-link")

    if (isLoggedIn && currentUser.name) {
      // User is logged in - show profile dropdown
      if (loginButton) loginButton.style.display = "none"
      if (profileDropdown) {
        profileDropdown.style.display = "block"
        if (profileName) {
          profileName.textContent = currentUser.name
        }
      }

      // Show admin panel link if user is admin
      if (adminPanelLink) {
        adminPanelLink.style.display = currentUser.role === "admin" ? "block" : "none"
      }
    } else {
      // User is not logged in - show login button
      if (loginButton) loginButton.style.display = "block"
      if (profileDropdown) profileDropdown.style.display = "none"
    }

    // Update cart UI based on login status
    updateCartUI()
  }

  function handleLoginForm() {
    const loginForm = document.getElementById("loginForm")
    const alertContainer = document.getElementById("alert-container")

    if (!loginForm) return

    // Check if already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
      window.location.href = "Landingpage.html"
      return
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("kpopUsers")) || []

      // Check if user exists and password matches
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // Login successful
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("currentUser", JSON.stringify(user))

        showAlert("Login successful! Welcome back, " + user.name + "! ✨", "success")

        setTimeout(() => {
          if (user.role === "admin") {
            window.location.href = "admin_dashboard.html"
          } else {
            window.location.href = "Landingpage.html"
          }
        }, 1500)
      } else {
        // Login failed
        showAlert("Invalid email or password. Please try again.", "error")
      }
    })

    function showAlert(message, type) {
      if (!alertContainer) return

      const alertClass = type === "success" ? "alert-success" : "alert-error"
      alertContainer.innerHTML = `
            <div class="alert-custom ${alertClass}">
                ${message}
            </div>
        `

      // Auto hide after 5 seconds
      setTimeout(() => {
        alertContainer.innerHTML = ""
      }, 5000)
    }
  }

  function handleRegisterForm() {
    const registerForm = document.getElementById("registerForm")
    const alertContainer = document.getElementById("alert-container")

    if (!registerForm) return

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const firstName = document.getElementById("firstName").value.trim()
      const lastName = document.getElementById("lastName").value.trim()
      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirmPassword").value

      // Validation
      if (password !== confirmPassword) {
        showAlert("Passwords do not match!", "error")
        return
      }

      if (password.length < 6) {
        showAlert("Password must be at least 6 characters long!", "error")
        return
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("kpopUsers")) || []
      const existingUser = users.find((u) => u.email === email)

      if (existingUser) {
        showAlert("Email already registered! Please use a different email.", "error")
        return
      }

      // Create new user
      const newUser = {
        id: "user-" + Date.now(),
        firstName: firstName,
        lastName: lastName,
        name: firstName + " " + lastName,
        email: email,
        password: password,
        role: "user",
        status: "active",
        joinedDate: new Date().toLocaleDateString("id-ID"),
        orders: 0,
      }

      users.push(newUser)
      localStorage.setItem("kpopUsers", JSON.stringify(users))

      showAlert("Registration successful! Please login with your credentials.", "success")

      setTimeout(() => {
        window.location.href = "login.html"
      }, 2000)
    })

    function showAlert(message, type) {
      if (!alertContainer) return

      const alertClass = type === "success" ? "alert-success" : "alert-error"
      alertContainer.innerHTML = `
            <div class="alert-custom ${alertClass}">
                ${message}
            </div>
        `

      // Auto hide after 5 seconds
      setTimeout(() => {
        alertContainer.innerHTML = ""
      }, 5000)
    }
  }

  function handleLogout() {
    const logoutButtons = document.querySelectorAll('[data-action="logout"]')

    logoutButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        // Clear login data
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("currentUser")

        // Clear user-specific cart data from UI
        clearUserDataOnLogout()

        // Redirect to landing page
        window.location.href = "Landingpage.html"
      })
    })
  }

  // Initialize authentication when DOM is loaded
  initializeAuth()

  // Initialize cart functionality
  initCart()

  // Check if we're on the shop page and initialize products
  const isShopPage = window.location.pathname.includes("shop.html")

  if (isShopPage && document.getElementById("products-container")) {
    // Load products using product manager
    const allProducts = window.productManager ? window.productManager.getAllProducts() : []
    loadProducts(allProducts)

    // Filter by artist buttons
    document.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        document.querySelectorAll(".filter-button").forEach((btn) => {
          btn.classList.remove("active")
        })

        // Add active class to clicked button
        button.classList.add("active")

        const artist = button.getAttribute("data-artist")
        let filteredProducts

        if (artist === "all") {
          filteredProducts = window.productManager.getAllProducts()
        } else {
          filteredProducts = window.productManager.filterProducts({ artist: artist })
        }

        loadProducts(filteredProducts)
      })
    })

    // Filter by category cards
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.addEventListener("click", () => {
        const category = card.getAttribute("data-category")
        const filteredProducts = window.productManager.filterProducts({ category: category })
        loadProducts(filteredProducts)

        // Scroll to products section
        document.querySelector("h2.y2k-title").scrollIntoView({ behavior: "smooth" })
      })
    })

    // Filter by dropdown selects
    document.getElementById("category-filter")?.addEventListener("change", filterProducts)
    document.getElementById("artist-filter")?.addEventListener("change", filterProducts)
    document.getElementById("price-filter")?.addEventListener("change", filterProducts)

    // Search functionality
    document.getElementById("search-button")?.addEventListener("click", () => {
      const searchTerm = document.getElementById("search-input").value.toLowerCase()
      if (searchTerm.trim() === "") {
        loadProducts(window.productManager.getAllProducts())
        return
      }

      const filteredProducts = window.productManager.filterProducts({ search: searchTerm })
      loadProducts(filteredProducts)
    })

    // Search on enter key
    document.getElementById("search-input")?.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        document.getElementById("search-button").click()
      }
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetSection = document.getElementById(targetId)
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })

  // Function to filter products based on dropdown selections
  function filterProducts() {
    const categoryFilter = document.getElementById("category-filter").value
    const artistFilter = document.getElementById("artist-filter").value
    const priceFilter = document.getElementById("price-filter").value

    const filters = {
      category: categoryFilter,
      artist: artistFilter,
      priceRange: priceFilter,
    }

    const filteredProducts = window.productManager.filterProducts(filters)
    loadProducts(filteredProducts)
  }

  // Function to load products into the container
  function loadProducts(productsToLoad) {
    const productsContainer = document.getElementById("products-container")
    if (!productsContainer) return

    if (productsToLoad.length === 0) {
      productsContainer.innerHTML = `
          <div class="col-12 text-center py-5">
            <p class="lead">No products found. Try a different filter or search term.</p>
          </div>
        `
      return
    }

    let productsHTML = ""

    productsToLoad.forEach((product) => {
      productsHTML += `
          <div class="col-md-6 col-lg-3 mb-4" data-artist="${product.artist}" data-category="${product.category}">
            <div class="y2k-card h-100">
              <div class="product-image">
                ${product.badge ? `<div class="y2k-badge">${product.badge}</div>` : ""}
                <img src="${product.image}" alt="${product.name}" class="img-fluid w-100" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
              </div>
              <div class="p-3">
                <h5 class="mb-2">${product.name}</h5>
                <div class="product-price mb-2">Rp ${formatPrice(product.price)}</div>
                <div class="product-rating mb-3">
                  ★★★★★
                </div>
               <div class="d-flex gap-2">
  <a href="detail_product.html?id=${product.id}" class="btn y2k-button flex-fill">
    See Detail
  </a>
  <button class="btn y2k-button flex-fill add-to-cart" 
          data-id="${product.id}" 
          data-name="${product.name}" 
          data-price="${product.price}" 
          data-image="${product.image}">
    🛒
  </button>
</div>

              </div>
            </div>
          </div>
        `
    })

    productsContainer.innerHTML = productsHTML

    // Add event listeners to new add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id")
        const name = button.getAttribute("data-name")
        const price = Number.parseInt(button.getAttribute("data-price"))
        const image = button.getAttribute("data-image")

        addToCart(id, name, price, image)
        showAddedToCartAnimation(button)
      })
    })
  }

  // Cart functionality
  function initCart() {
    const cartButton = document.getElementById("cart-button")
    const cartOverlay = document.getElementById("cart-overlay")
    const cartSidebar = document.getElementById("cart-sidebar")
    const closeCart = document.getElementById("close-cart")
    const cartItems = document.getElementById("cart-items")
    const cartTotal = document.getElementById("cart-total")
    const cartCount = document.getElementById("cart-count")

    // Load cart from localStorage
    updateCartUI()

    // Open cart
    cartButton?.addEventListener("click", (e) => {
      e.preventDefault()
      cartOverlay.style.display = "flex"
      setTimeout(() => {
        cartSidebar.style.transform = "translateX(0)"
      }, 10)
    })

    // Close cart
    closeCart?.addEventListener("click", () => {
      cartSidebar.style.transform = "translateX(100%)"
      setTimeout(() => {
        cartOverlay.style.display = "none"
      }, 300)
    })

    // Close cart when clicking outside
    cartOverlay?.addEventListener("click", (e) => {
      if (e.target === cartOverlay) {
        cartSidebar.style.transform = "translateX(100%)"
        setTimeout(() => {
          cartOverlay.style.display = "none"
        }, 300)
      }
    })
  }

  // Add to cart function - requires login
  function addToCart(id, name, price, image) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

    if (!isLoggedIn || !currentUser.id) {
      // Show login required alert
      showLoginRequiredAlert()
      return
    }

    // Get user-specific cart
    const userCartKey = `kpopCart_${currentUser.id}`
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || []

    // Check if item already in cart
    const existingItem = cart.find((item) => item.id === id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id,
        name,
        price,
        image,
        quantity: 1,
        addedDate: new Date().toISOString(),
      })
    }

    // Save to user-specific cart
    localStorage.setItem(userCartKey, JSON.stringify(cart))

    // Update UI
    updateCartUI()

    // Show success message
    showCartSuccessAlert(name)
  }

  // Update cart UI with user-specific data
  function updateCartUI() {
    const cartItems = document.getElementById("cart-items")
    const cartTotal = document.getElementById("cart-total")
    const cartCount = document.getElementById("cart-count")

    if (!cartItems || !cartTotal || !cartCount) return

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

    if (!isLoggedIn || !currentUser.id) {
      // Show empty cart for non-logged users
      cartCount.textContent = "0"
      if (cartItems) {
        cartItems.innerHTML = `
        <div class="text-center py-4">
          <div class="mb-3 fs-1">🔒</div>
          <p>Please login to view your cart</p>
          <a href="login.html" class="btn y2k-button">Login Now</a>
        </div>
      `
      }
      if (cartTotal) cartTotal.textContent = "Rp 0"
      return
    }

    // Get user-specific cart
    const userCartKey = `kpopCart_${currentUser.id}`
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || []

    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems

    // Update cart items
    if (cart.length === 0) {
      if (cartItems) {
        cartItems.innerHTML = `
        <div class="text-center py-4">
          <div class="mb-3 fs-1">🛒</div>
          <p>Your cart is empty</p>
        </div>
      `
      }
      if (cartTotal) cartTotal.textContent = "Rp 0"
    } else {
      let itemsHTML = ""
      let total = 0

      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity
        total += itemTotal

        if (cartItems) {
          itemsHTML += `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">Rp ${formatPrice(item.price)}</div>
              <div class="cart-item-quantity">
                <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
              </div>
              <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `
        }
      })

      if (cartItems) {
        cartItems.innerHTML = itemsHTML

        // Add event listeners for quantity buttons
        document.querySelectorAll(".increase-quantity").forEach((button) => {
          button.addEventListener("click", () => {
            const id = button.getAttribute("data-id")
            updateCartItemQuantity(id, 1)
          })
        })

        document.querySelectorAll(".decrease-quantity").forEach((button) => {
          button.addEventListener("click", () => {
            const id = button.getAttribute("data-id")
            updateCartItemQuantity(id, -1)
          })
        })

        // Add event listeners for remove buttons
        document.querySelectorAll(".remove-item").forEach((button) => {
          button.addEventListener("click", () => {
            const id = button.getAttribute("data-id")
            removeCartItem(id)
          })
        })
      }

      if (cartTotal) cartTotal.textContent = `Rp ${formatPrice(total)}`
    }
  }

  // Update cart item quantity
  function updateCartItemQuantity(id, change) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!currentUser.id) return

    const userCartKey = `kpopCart_${currentUser.id}`
    let cart = JSON.parse(localStorage.getItem(userCartKey)) || []

    const item = cart.find((item) => item.id === id)
    if (item) {
      item.quantity += change
      if (item.quantity <= 0) {
        cart = cart.filter((item) => item.id !== id)
      }
      localStorage.setItem(userCartKey, JSON.stringify(cart))
      updateCartUI()
    }
  }

  // Remove cart item
  function removeCartItem(id) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!currentUser.id) return

    const userCartKey = `kpopCart_${currentUser.id}`
    let cart = JSON.parse(localStorage.getItem(userCartKey)) || []

    cart = cart.filter((item) => item.id !== id)
    localStorage.setItem(userCartKey, JSON.stringify(cart))
    updateCartUI()
  }

  // Show login required alert
  function showLoginRequiredAlert() {
    const alertHTML = `
    <div class="alert alert-warning alert-dismissible fade show position-fixed" 
         style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;" role="alert">
      <i class="fas fa-lock me-2"></i>
      <strong>Login Required!</strong><br>
      Please login first to add items to cart.
      <div class="mt-2">
        <a href="login.html" class="btn btn-sm btn-primary me-2">Login Now</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </div>
  `

    // Remove existing alerts
    document.querySelectorAll(".alert").forEach((alert) => alert.remove())

    // Add new alert
    document.body.insertAdjacentHTML("beforeend", alertHTML)

    // Auto remove after 5 seconds
    setTimeout(() => {
      const alert = document.querySelector(".alert")
      if (alert) alert.remove()
    }, 5000)
  }

  // Show cart success alert
  function showCartSuccessAlert(itemName) {
    const alertHTML = `
    <div class="alert alert-success alert-dismissible fade show position-fixed" 
         style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;" role="alert">
      <i class="fas fa-check-circle me-2"></i>
      <strong>Added to Cart!</strong><br>
      ${itemName} has been added to your cart.
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `

    // Remove existing alerts
    document.querySelectorAll(".alert").forEach((alert) => alert.remove())

    // Add new alert
    document.body.insertAdjacentHTML("beforeend", alertHTML)

    // Auto remove after 3 seconds
    setTimeout(() => {
      const alert = document.querySelector(".alert")
      if (alert) alert.remove()
    }, 3000)
  }

  // Process checkout - create transaction
  function processCheckout(orderData) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!currentUser.id) {
      showLoginRequiredAlert()
      return false
    }

    // Get user cart
    const userCartKey = `kpopCart_${currentUser.id}`
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || []

    if (cart.length === 0) {
      alert("Your cart is empty!")
      return false
    }

    // Create transaction
    const transaction = {
      id: "KP" + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      date: new Date().toISOString(),
      status: "processing",
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      shipping: cart.reduce((total, item) => total + item.price * item.quantity, 0) > 500000 ? 0 : 30000,
      tax: cart.reduce((total, item) => total + item.price * item.quantity, 0) * 0.1,
      orderData: orderData || {},
    }

    // Calculate final total
    transaction.finalTotal = transaction.total + transaction.shipping + transaction.tax

    // Save transaction to user's history
    const userTransactionKey = `userTransactions_${currentUser.id}`
    const userTransactions = JSON.parse(localStorage.getItem(userTransactionKey)) || []
    userTransactions.unshift(transaction) // Add to beginning of array
    localStorage.setItem(userTransactionKey, JSON.stringify(userTransactions))

    // Also save to global transactions for admin
    const allTransactions = JSON.parse(localStorage.getItem("allTransactions")) || []
    allTransactions.unshift(transaction)
    localStorage.setItem("allTransactions", JSON.stringify(allTransactions))

    // Clear user cart
    localStorage.removeItem(userCartKey)

    // Update UI
    updateCartUI()

    return transaction
  }

  // Get user-specific transactions
  function getUserTransactions() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (!currentUser.id) return []

    const userTransactionKey = `userTransactions_${currentUser.id}`
    return JSON.parse(localStorage.getItem(userTransactionKey)) || []
  }

  // Clear user cart on logout
  function clearUserDataOnLogout() {
    // This function will be called when user logs out
    updateCartUI() // This will show login required message
  }

  // Format price with commas
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Show added to cart animation
  function showAddedToCartAnimation(button) {
    const originalText = button.textContent
    button.textContent = "Added! ✨"
    button.style.backgroundColor = "#ff66c4"
    button.disabled = true

    setTimeout(() => {
      button.textContent = originalText
      button.style.backgroundColor = ""
      button.disabled = false
    }, 1500)
  }
})

// Add glitter and sparkle effects
function addSparkleEffect() {
  const sparkle = document.createElement("div")
  sparkle.className = "sparkle"
  sparkle.style.left = Math.random() * 100 + "vw"
  sparkle.style.top = Math.random() * 100 + "vh"
  sparkle.style.animationDuration = Math.random() * 3 + 2 + "s"
  document.body.appendChild(sparkle)

  setTimeout(() => {
    sparkle.remove()
  }, 5000)
}

// Add random sparkles
setInterval(addSparkleEffect, 300)
