import React, { useState } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Bell,
  Settings,
  Home,
  CreditCard,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  Truck,
  Menu,
  X,
  Star,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react";

/* =========================
   Tipos de datos
   ========================= */
type Plan = "FREE" | "PRO";
type OrderStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED";
type PaymentMethod = "YAPE" | "CASH" | "CARD" | "TRANSFER";
type Role = "OWNER" | "ADMIN" | "STAFF" | "OBSERVER";
type Shift = "MORNING" | "AFTERNOON" | "NIGHT" | "FULL_TIME";
type CurrentView =
  | "dashboard"
  | "sales"
  | "inventory"
  | "stores"
  | "employees"
  | "customers"
  | "suppliers"
  | "reports";

interface Tenant {
  id: string;
  name: string;
  plan: Plan;
}

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  sku: string;
}

interface Order {
  id: string;
  referenceCode: string;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  customerName?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  storeId: string;
  storeName: string;
  role: Role;
  shift: Shift;
  salary: number;
  hireDate: string;
  isActive: boolean;
}

interface StoreInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  description: string;
  openingHours: string;
  maxEmployees: number;
  currentEmployees: number;
  isActive: boolean;
  createdAt: string;
}

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  totalPurchases: number;
  isActive: boolean;
}

/* =========================
   Componente principal
   ========================= */
const PymeYapeProCRM: React.FC = () => {
  const [currentView, setCurrentView] = useState<CurrentView>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ------- Datos mock -------
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Laptop HP Pavilion",
      category: "Electrónicos",
      price: 2500.0,
      stock: 5,
      minStock: 2,
      sku: "HP-PAV-001",
    },
    {
      id: "2",
      name: "Mouse Inalámbrico",
      category: "Accesorios",
      price: 45.0,
      stock: 15,
      minStock: 10,
      sku: "MS-WRL-002",
    },
    {
      id: "3",
      name: "Teclado Mecánico",
      category: "Accesorios",
      price: 180.0,
      stock: 1,
      minStock: 5,
      sku: "KB-MEC-003",
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      referenceCode: "ORD-20250830-001",
      total: 2500.0,
      status: "PAID",
      paymentMethod: "YAPE",
      createdAt: "2025-08-30T10:30:00",
      customerName: "Ana García",
    },
    {
      id: "2",
      referenceCode: "ORD-20250830-002",
      total: 225.0,
      status: "PENDING",
      paymentMethod: "YAPE",
      createdAt: "2025-08-30T11:15:00",
      customerName: "Carlos Mendoza",
    },
  ]);

  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "Ana García",
      email: "ana.garcia@email.com",
      phone: "+51 987 654 321",
      totalOrders: 3,
      totalSpent: 4200.0,
    },
    {
      id: "2",
      name: "Carlos Mendoza",
      email: "carlos.mendoza@email.com",
      phone: "+51 912 345 678",
      totalOrders: 1,
      totalSpent: 225.0,
    },
  ]);

  const [stores] = useState<StoreInfo[]>([
    {
      id: "1",
      name: "TechStore Lima Centro",
      address: "Av. Javier Prado 1234, San Isidro",
      phone: "+51 01 234 5678",
      email: "limacentro@techstore.pe",
      manager: "María González",
      description: "Tienda principal especializada en tecnología y electrónicos",
      openingHours: "9:00 AM - 8:00 PM",
      maxEmployees: 10,
      currentEmployees: 6,
      isActive: true,
      createdAt: "2025-01-15T09:00:00",
    },
    {
      id: "2",
      name: "TechStore Miraflores",
      address: "Av. Larco 567, Miraflores",
      phone: "+51 01 345 6789",
      email: "miraflores@techstore.pe",
      manager: "Carlos Ruiz",
      description: "Sucursal enfocada en accesorios y dispositivos móviles",
      openingHours: "10:00 AM - 9:00 PM",
      maxEmployees: 8,
      currentEmployees: 4,
      isActive: true,
      createdAt: "2025-02-20T10:00:00",
    },
  ]);

  const [employees] = useState<Employee[]>([
    {
      id: "1",
      name: "María González",
      email: "maria.gonzalez@techstore.pe",
      phone: "+51 987 123 456",
      position: "Gerente de Tienda",
      storeId: "1",
      storeName: "TechStore Lima Centro",
      role: "ADMIN",
      shift: "FULL_TIME",
      salary: 3500.0,
      hireDate: "2025-01-15",
      isActive: true,
    },
    {
      id: "2",
      name: "Carlos Ruiz",
      email: "carlos.ruiz@techstore.pe",
      phone: "+51 987 234 567",
      position: "Gerente de Tienda",
      storeId: "2",
      storeName: "TechStore Miraflores",
      role: "ADMIN",
      shift: "FULL_TIME",
      salary: 3200.0,
      hireDate: "2025-02-20",
      isActive: true,
    },
    {
      id: "3",
      name: "Ana López",
      email: "ana.lopez@techstore.pe",
      phone: "+51 987 345 678",
      position: "Cajera",
      storeId: "1",
      storeName: "TechStore Lima Centro",
      role: "STAFF",
      shift: "MORNING",
      salary: 1800.0,
      hireDate: "2025-03-01",
      isActive: true,
    },
    {
      id: "4",
      name: "Pedro Morales",
      email: "pedro.morales@techstore.pe",
      phone: "+51 987 456 789",
      position: "Vendedor",
      storeId: "1",
      storeName: "TechStore Lima Centro",
      role: "STAFF",
      shift: "AFTERNOON",
      salary: 1600.0,
      hireDate: "2025-03-10",
      isActive: true,
    },
    {
      id: "5",
      name: "Lucía Fernández",
      email: "lucia.fernandez@techstore.pe",
      phone: "+51 987 567 890",
      position: "Supervisora",
      storeId: "2",
      storeName: "TechStore Miraflores",
      role: "STAFF",
      shift: "FULL_TIME",
      salary: 2200.0,
      hireDate: "2025-03-15",
      isActive: true,
    },
  ]);

  const [suppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "TechWorld Distribuidores",
      email: "ventas@techworld.pe",
      phone: "+51 01 555 0123",
      address: "Av. Industrial 456, Callao",
      category: "Electrónicos",
      totalPurchases: 125000.0,
      isActive: true,
    },
    {
      id: "2",
      name: "Accesorios Plus SAC",
      email: "contacto@accesoriosplus.pe",
      phone: "+51 01 555 0456",
      address: "Jr. Comercio 789, Lima",
      category: "Accesorios",
      totalPurchases: 45000.0,
      isActive: true,
    },
  ]);

  // ------- KPIs para dashboard -------
  const totalRevenue = orders
    .filter((o) => o.status === "PAID")
    .reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const lowStockProducts = products.filter((p) => p.stock <= p.minStock);
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  /* =========================
     Componentes internos
     ========================= */

  const Sidebar: React.FC = () => (
    <>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 z-50 h-screen w-64 transform bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                PymeYapePro
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {[
              { id: "dashboard", label: "Dashboard", icon: Home, color: "text-blue-400" },
              { id: "sales", label: "Ventas (POS)", icon: ShoppingCart, color: "text-green-400" },
              { id: "inventory", label: "Inventario", icon: Package, color: "text-purple-400" },
              { id: "stores", label: "Tiendas", icon: Settings, color: "text-orange-400" },
              { id: "employees", label: "Empleados", icon: Users, color: "text-pink-400" },
              { id: "customers", label: "Clientes", icon: Users, color: "text-indigo-400" },
              { id: "suppliers", label: "Proveedores", icon: Truck, color: "text-cyan-400" },
              { id: "reports", label: "Reportes", icon: BarChart3, color: "text-yellow-400" },
            ].map((item) => {
              const Icon = item.icon;
              const id = item.id as CurrentView;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setCurrentView(id);
                    setSidebarOpen(false);
                  }}
                  className={`group flex w-full items-center rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                    currentView === id
                      ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-white shadow-lg transform scale-105"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-105"
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${currentView === id ? 'text-white' : item.color} group-hover:scale-110 transition-transform`} />
                  <span className="font-medium">{item.label}</span>
                  {currentView === id && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-700 p-4">
            <div className="flex items-center space-x-3 rounded-lg bg-slate-800/50 p-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-400">Plan PRO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const TopBar: React.FC = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentView === "dashboard" && "Dashboard"}
              {currentView === "sales" && "Punto de Venta"}
              {currentView === "inventory" && "Inventario"}
              {currentView === "stores" && "Tiendas"}
              {currentView === "employees" && "Empleados"}
              {currentView === "customers" && "Clientes"}
              {currentView === "suppliers" && "Proveedores"}
              {currentView === "reports" && "Reportes"}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
            {pendingOrders > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center animate-pulse">
                {pendingOrders}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 hidden sm:block">
            {new Date().toLocaleDateString("es-PE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard: React.FC = () => (
    <div className="space-y-8">
      {/* Métricas principales con gradientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Ingresos Totales</p>
              <p className="text-3xl font-bold mt-1">S/ {totalRevenue.toFixed(2)}</p>
              <p className="text-green-100 text-xs mt-2">↗ +12% vs mes anterior</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3">
              <DollarSign className="h-8 w-8" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Órdenes Totales</p>
              <p className="text-3xl font-bold mt-1">{totalOrders}</p>
              <p className="text-blue-100 text-xs mt-2">↗ +8% vs mes anterior</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3">
              <ShoppingCart className="h-8 w-8" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Órdenes Pendientes</p>
              <p className="text-3xl font-bold mt-1">{pendingOrders}</p>
              <p className="text-yellow-100 text-xs mt-2">Requieren atención</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3">
              <Activity className="h-8 w-8" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Stock Bajo</p>
              <p className="text-3xl font-bold mt-1">{lowStockProducts.length}</p>
              <p className="text-red-100 text-xs mt-2">Productos críticos</p>
            </div>
            <div className="rounded-xl bg-white/20 p-3">
              <AlertTriangle className="h-8 w-8" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
        </div>
      </div>

      {/* Alertas de stock bajo mejoradas */}
      {lowStockProducts.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="rounded-xl bg-red-100 p-2 mr-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-red-900">
              ⚠️ Alertas de Stock Crítico
            </h3>
          </div>
          <div className="grid gap-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-bold">{product.stock} unidades</p>
                  <p className="text-sm text-gray-500">Mínimo: {product.minStock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Órdenes recientes mejoradas */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">📋 Órdenes Recientes</h3>
          <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
            Ver todas →
          </button>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Código</th>
                <th className="text-left p-4 font-semibold text-gray-700">Cliente</th>
                <th className="text-left p-4 font-semibold text-gray-700">Total</th>
                <th className="text-left p-4 font-semibold text-gray-700">Estado</th>
                <th className="text-left p-4 font-semibold text-gray-700">Método</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order, index) => (
                <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
                  <td className="p-4 font-medium text-gray-900">{order.referenceCode}</td>
                  <td className="p-4 text-gray-700">
                    {order.customerName || "Cliente general"}
                  </td>
                  <td className="p-4 font-bold text-green-600">S/ {order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">
                      {order.paymentMethod}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SalesView: React.FC = () => {
    const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
    const [customer, setCustomer] = useState("");

    const addToCart = (product: Product) => {
      const existing = cart.find((item) => item.product.id === product.id);
      if (existing) {
        setCart(
          cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { product, quantity: 1 }]);
      }
    };

    const removeFromCart = (productId: string) => {
      setCart(cart.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart(
        cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    };

    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const handleCheckout = () => {
      const newOrder: Order = {
        id: (orders.length + 1).toString(),
        referenceCode: `ORD-${new Date()
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "")}-${String(orders.length + 1).padStart(3, "0")}`,
        total,
        status: "PENDING",
        paymentMethod: "YAPE",
        createdAt: new Date().toISOString(),
        customerName: customer || undefined,
      };
      setOrders([newOrder, ...orders]);
      setCart([]);
      setCustomer("");
      alert(
        `✅ Orden creada: ${newOrder.referenceCode} por S/ ${total.toFixed(2)}`
      );
    };

    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Productos disponibles */}
        <div className="xl:col-span-2 space-y-6">
          {/* Barra de búsqueda mejorada */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos por nombre o SKU..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                Buscar
              </button>
            </div>
          </div>

          {/* Grid de productos mejorado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products
              .filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.sku.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-yellow-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                        {product.sku}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        S/ {product.price.toFixed(2)}
                      </span>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock <= product.minStock
                          ? "bg-red-100 text-red-800"
                          : product.stock < 10
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        Stock: {product.stock}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                        product.stock === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                      }`}
                    >
                      {product.stock === 0 ? "🚫 Sin Stock" : "🛒 Agregar al Carrito"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Carrito mejorado */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 h-fit border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">🛒 Carrito de Compras</h3>
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
              {cart.length} items
            </span>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="👤 Nombre del cliente (opcional)"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>

          <div className="space-y-3 mb-6 max-h-80 overflow-y-auto custom-scrollbar">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    S/ {item.product.price.toFixed(2)} c/u
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 font-bold transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-sm font-bold w-8 text-center bg-white px-2 py-1 rounded-md">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 font-bold transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">Carrito vacío</p>
              <p className="text-gray-400 text-sm">Agrega productos para comenzar</p>
            </div>
          ) : (
            <>
              <div className="border-t-2 border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-700">Total:</span>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    S/ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  💳 Procesar con Yape
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  💵 Efectivo/Tarjeta
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const InventoryView: React.FC = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📦 Gestión de Inventario</h2>
          <p className="text-gray-600 mt-1">Controla y administra todos tus productos</p>
        </div>
        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-xl flex items-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <Plus className="w-5 h-5 mr-2" />
          Agregar Producto
        </button>
      </div>

      {/* Filtros y búsqueda mejorados */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos por nombre, SKU o categoría..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
            />
          </div>
          <button className="flex items-center px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-yellow-300 hover:bg-yellow-50 transition-colors font-medium">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            Filtros
          </button>
          <select className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors">
            <option>Todas las categorías</option>
            <option>Electrónicos</option>
            <option>Accesorios</option>
          </select>
        </div>
      </div>

      {/* Tabla mejorada */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="text-left p-6 font-bold text-gray-700">Producto</th>
                <th className="text-left p-6 font-bold text-gray-700">SKU</th>
                <th className="text-left p-6 font-bold text-gray-700">Categoría</th>
                <th className="text-left p-6 font-bold text-gray-700">Precio</th>
                <th className="text-left p-6 font-bold text-gray-700">Stock</th>
                <th className="text-left p-6 font-bold text-gray-700">Estado</th>
                <th className="text-left p-6 font-bold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${index !== products.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <td className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mr-4">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-mono text-sm">
                      {product.sku}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-lg font-bold text-green-600">
                      S/ {product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-lg font-bold text-gray-900">
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        product.stock <= product.minStock
                          ? "bg-red-100 text-red-800"
                          : product.stock < 10
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.stock <= product.minStock
                        ? "⚠️ Stock Crítico"
                        : product.stock < 10
                        ? "⚡ Stock Bajo"
                        : "✅ Disponible"}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // -------- Vistas mejoradas --------
  const Placeholder: React.FC<{ icon: React.ElementType; title: string; subtitle?: string; description?: string; stats?: Array<{label: string, value: string}> }> = ({
    icon: Icon,
    title,
    subtitle,
    description,
    stats
  }) => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-12 border border-gray-200 text-center">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-6 shadow-lg">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{title}</h3>
        {subtitle && <p className="text-gray-600 text-lg mb-4">{subtitle}</p>}
        {description && <p className="text-gray-500 max-w-md mx-auto">{description}</p>}
        
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-2xl font-bold text-yellow-600">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        
        <button className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          Próximamente
        </button>
      </div>
    </div>
  );

  const StoresView = () => (
    <Placeholder
      icon={Settings}
      title="🏪 Gestión de Tiendas"
      subtitle="Administra todas tus sucursales desde un solo lugar"
      description="Controla información, horarios, empleados y rendimiento de cada tienda"
      stats={[
        {label: "Tiendas Activas", value: stores.filter(s => s.isActive).length.toString()},
        {label: "Empleados Total", value: stores.reduce((sum, s) => sum + s.currentEmployees, 0).toString()},
        {label: "Capacidad Promedio", value: `${Math.round(stores.reduce((sum, s) => sum + (s.currentEmployees/s.maxEmployees*100), 0)/stores.length)}%`},
        {label: "Ubicaciones", value: "2 Distritos"}
      ]}
    />
  );

  const EmployeesView = () => (
    <Placeholder
      icon={Users}
      title="👥 Gestión de Empleados"
      subtitle="Administra tu equipo de trabajo"
      description="Control de roles, horarios, salarios y rendimiento del personal"
      stats={[
        {label: "Empleados Activos", value: employees.filter(e => e.isActive).length.toString()},
        {label: "Administradores", value: employees.filter(e => e.role === "ADMIN").length.toString()},
        {label: "Personal de Tienda", value: employees.filter(e => e.role === "STAFF").length.toString()},
        {label: "Salario Promedio", value: `S/ ${Math.round(employees.reduce((sum, e) => sum + e.salary, 0)/employees.length)}`}
      ]}
    />
  );

  const CustomersView = () => (
    <Placeholder
      icon={Users}
      title="👤 Gestión de Clientes"
      subtitle="Construye relaciones duraderas con tus clientes"
      description="Historial de compras, preferencias y programas de fidelización"
      stats={[
        {label: "Clientes Registrados", value: customers.length.toString()},
        {label: "Compra Promedio", value: `S/ ${Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0)/customers.length)}`},
        {label: "Órdenes Totales", value: customers.reduce((sum, c) => sum + c.totalOrders, 0).toString()},
        {label: "Cliente VIP", value: "Ana García"}
      ]}
    />
  );

  const SuppliersView = () => (
    <Placeholder
      icon={Truck}
      title="🚛 Gestión de Proveedores"
      subtitle="Optimiza tu cadena de suministro"
      description="Controla proveedores, órdenes de compra y gestión de inventario"
      stats={[
        {label: "Proveedores Activos", value: suppliers.filter(s => s.isActive).length.toString()},
        {label: "Compras Totales", value: `S/ ${suppliers.reduce((sum, s) => sum + s.totalPurchases, 0).toLocaleString()}`},
        {label: "Categorías", value: new Set(suppliers.map(s => s.category)).size.toString()},
        {label: "Proveedor Principal", value: "TechWorld"}
      ]}
    />
  );

  const ReportsView = () => (
    <Placeholder
      icon={BarChart3}
      title="📊 Reportes y Analytics"
      subtitle="Toma decisiones basadas en datos"
      description="Análisis de ventas, inventario, clientes y rendimiento del negocio"
      stats={[
        {label: "Ingresos del Mes", value: `S/ ${totalRevenue.toFixed(0)}`},
        {label: "Producto Top", value: "Laptop HP"},
        {label: "Crecimiento", value: "+12%"},
        {label: "Margen Promedio", value: "35%"}
      ]}
    />
  );

  // -------- Render principal --------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      
      {/* Contenido principal */}
      <div className="lg:ml-64">
        <TopBar />
        <main className="p-4 lg:p-8">
          {currentView === "dashboard" && <Dashboard />}
          {currentView === "sales" && <SalesView />}
          {currentView === "inventory" && <InventoryView />}
          {currentView === "stores" && <StoresView />}
          {currentView === "employees" && <EmployeesView />}
          {currentView === "customers" && <CustomersView />}
          {currentView === "suppliers" && <SuppliersView />}
          {currentView === "reports" && <ReportsView />}
        </main>
      </div>

      {/* Estilos personalizados */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default PymeYapeProCRM;