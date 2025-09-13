"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  Scan,
  Users,
  Wallet,
  BarChart3,
  Plus,
  Search,
  Bell,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Settings,
  MapPin,
  Phone,
  Mail,
  Camera,
  Download,
  FileText,
  MessageSquare,
  Shield,
  Clock,
  Target,
  Award,
  Droplets,
  Bug,
  Sprout,
  Calculator,
  QrCode,
  Printer,
  Filter,
  Edit,
  ChevronRight,
  Home,
  Building,
  UserPlus,
  PieChart,
  Zap,
  CloudRain,
  Sun,
  Thermometer,
  Wind,
  ArrowUp,
  ArrowDown,
  WifiOff,
  Star,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react"

export default function TeaFarmApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentScreen, setCurrentScreen] = useState("main")
  const [isOffline, setIsOffline] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [selectedReceipt, setSelectedReceipt] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)

  // Mock data
  const farmData = {
    cashOnHand: 45200,
    committedPayouts: 12800,
    todayKilos: 1247,
    totalWorkers: 24,
    activeReceipts: 8,
    monthlyTarget: 25000,
    currentMonthKilos: 18450,
  }

  const workers = [
    {
      id: "W001",
      name: "John Mwangi",
      phone: "+254 712 345 678",
      email: "john.mwangi@email.com",
      totalKilos: 1247,
      earnings: 24940,
      performance: 92,
      wageRate: 20,
      joinDate: "2023-01-15",
      block: "Block A",
      status: "active",
      avatar: "/kenyan-farmer.jpg",
    },
    {
      id: "W002",
      name: "Mary Wanjiku",
      phone: "+254 723 456 789",
      email: "mary.wanjiku@email.com",
      totalKilos: 1156,
      earnings: 23120,
      performance: 88,
      wageRate: 20,
      joinDate: "2023-02-20",
      block: "Block B",
      status: "active",
      avatar: "/abstract-geometric-shapes.png",
    },
    {
      id: "W003",
      name: "Peter Kamau",
      phone: "+254 734 567 890",
      email: "peter.kamau@email.com",
      totalKilos: 1389,
      earnings: 27780,
      performance: 95,
      wageRate: 20,
      joinDate: "2022-11-10",
      block: "Block A",
      status: "active",
      avatar: "/abstract-geometric-shapes.png",
    },
    {
      id: "W004",
      name: "Grace Njeri",
      phone: "+254 745 678 901",
      email: "grace.njeri@email.com",
      totalKilos: 1098,
      earnings: 21960,
      performance: 85,
      wageRate: 20,
      joinDate: "2023-03-05",
      block: "Block C",
      status: "active",
      avatar: "/abstract-geometric-shapes.png",
    },
  ]

  const receipts = [
    {
      id: "KT001234",
      workerId: "W001",
      worker: "John Mwangi",
      kilos: 42.5,
      amount: 850,
      status: "paid",
      timestamp: "2024-01-15T14:30:00",
      qrCode: "KT001234QR",
      block: "Block A",
      grade: "PEKOE",
    },
    {
      id: "KT001235",
      workerId: "W002",
      worker: "Mary Wanjiku",
      kilos: 36,
      amount: 720,
      status: "paid",
      timestamp: "2024-01-15T13:15:00",
      qrCode: "KT001235QR",
      block: "Block B",
      grade: "PEKOE",
    },
    {
      id: "KT001236",
      workerId: "W003",
      worker: "Peter Kamau",
      kilos: 48,
      amount: 960,
      status: "pending",
      timestamp: "2024-01-15T12:45:00",
      qrCode: "KT001236QR",
      block: "Block A",
      grade: "PEKOE",
    },
    {
      id: "KT001237",
      workerId: "W004",
      worker: "Grace Njeri",
      kilos: 39,
      amount: 780,
      status: "flagged",
      timestamp: "2024-01-15T11:20:00",
      qrCode: "KT001237QR",
      block: "Block C",
      grade: "PEKOE",
    },
  ]

  const floatTransactions = [
    {
      id: "FT001",
      type: "inflow",
      amount: 50000,
      source: "Owner Deposit - James Kiprotich",
      timestamp: "2024-01-15T09:00:00",
      balance: 95200,
      reference: "DEP001",
    },
    {
      id: "FT002",
      type: "outflow",
      amount: 850,
      source: "Payment to John Mwangi",
      timestamp: "2024-01-15T14:30:00",
      balance: 44350,
      reference: "PAY001",
    },
    {
      id: "FT003",
      type: "outflow",
      amount: 720,
      source: "Payment to Mary Wanjiku",
      timestamp: "2024-01-15T13:15:00",
      balance: 45070,
      reference: "PAY002",
    },
  ]

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen />
      case "login":
        return <LoginScreen />
      case "setup":
        return <SetupScreen />
      case "worker-profile":
        return <WorkerProfileScreen worker={selectedWorker} />
      case "receipt-scan":
        return <ReceiptScanScreen />
      case "receipt-detail":
        return <ReceiptDetailScreen receipt={selectedReceipt} />
      case "payment-confirmation":
        return <PaymentConfirmationScreen />
      case "float-add":
        return <AddFloatScreen />
      case "performance-tracking":
        return <PerformanceTrackingScreen />
      case "production-stats":
        return <ProductionStatsScreen />
      case "farm-health":
        return <FarmHealthScreen />
      case "dispute-tracker":
        return <DisputeTrackerScreen />
      case "budget-planner":
        return <BudgetPlannerScreen />
      case "loyalty-system":
        return <LoyaltySystemScreen />
      case "ocr-scanner":
        return <OCRScannerScreen />
      case "sms-access":
        return <SMSAccessScreen />
      case "multi-owner":
        return <MultiOwnerScreen />
      case "audit-mode":
        return <AuditModeScreen />
      case "whatsapp-integration":
        return <WhatsAppIntegrationScreen />
      case "denomination-planner":
        return <DenominationPlannerScreen />
      case "id-card-generator":
        return <IDCardGeneratorScreen />
      case "settings":
        return <SettingsScreen />
      default:
        return <MainAppScreen />
    }
  }

  const SplashScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
      <div className="text-center text-primary-foreground">
        <div className="w-24 h-24 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2">TeaFarm Pro</h1>
        <p className="text-lg opacity-90 mb-8">Empowering Kenyan Tea Farmers</p>
        <div className="w-16 h-1 bg-primary-foreground/50 rounded mx-auto animate-pulse"></div>
      </div>
    </div>
  )

  const LoginScreen = () => (
    <div className="min-h-screen bg-background p-4 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your tea farm account</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Farm Owner</SelectItem>
                  <SelectItem value="officer">Field Officer</SelectItem>
                  <SelectItem value="manager">Farm Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="+254 7XX XXX XXX" />
            </div>

            <div className="space-y-2">
              <Label>Verification Code</Label>
              <Input placeholder="Enter SMS code" />
            </div>

            <Button className="w-full" onClick={() => setCurrentScreen("main")}>
              Sign In
            </Button>

            <div className="flex items-center gap-2">
              <Switch id="offline-mode" />
              <Label htmlFor="offline-mode" className="text-sm">
                Work offline
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const MainAppScreen = () => (
    <div className="min-h-screen bg-background">
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-destructive text-destructive-foreground p-2 text-center text-sm">
          <WifiOff className="w-4 h-4 inline mr-2" />
          Working offline - Data will sync when connected
        </div>
      )}

      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowSidebar(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">TeaFarm Pro</h1>
            <p className="text-sm text-muted-foreground">Kiambu Tea Estate</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/kenyan-farmer.jpg" />
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowSidebar(false)}>
          <div className="w-80 h-full bg-card border-r border-border p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-2">
              {[
                { icon: Home, label: "Dashboard", screen: "main" },
                { icon: Building, label: "Farm Setup", screen: "setup" },
                { icon: Users, label: "Worker Management", screen: "main" },
                { icon: Scan, label: "Receipt Scanner", screen: "receipt-scan" },
                { icon: Wallet, label: "Float Management", screen: "main" },
                { icon: BarChart3, label: "Performance Tracking", screen: "performance-tracking" },
                { icon: PieChart, label: "Production Statistics", screen: "production-stats" },
                { icon: Droplets, label: "Farm Health Journal", screen: "farm-health" },
                { icon: Shield, label: "Dispute Tracker", screen: "dispute-tracker" },
                { icon: Calculator, label: "Budget Planner", screen: "budget-planner" },
                { icon: Award, label: "Loyalty System", screen: "loyalty-system" },
                { icon: Camera, label: "OCR Scanner", screen: "ocr-scanner" },
                { icon: MessageSquare, label: "SMS Access", screen: "sms-access" },
                { icon: Users, label: "Multi-Owner Mode", screen: "multi-owner" },
                { icon: FileText, label: "Audit Mode", screen: "audit-mode" },
                { icon: MessageSquare, label: "WhatsApp Integration", screen: "whatsapp-integration" },
                { icon: Calculator, label: "Denomination Planner", screen: "denomination-planner" },
                { icon: QrCode, label: "ID Card Generator", screen: "id-card-generator" },
                { icon: Settings, label: "Settings", screen: "settings" },
              ].map((item) => (
                <Button
                  key={item.screen}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentScreen(item.screen)
                    setShowSidebar(false)
                  }}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard" className="p-4 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Cash on Hand</p>
                      <p className="text-2xl font-bold">KSh {farmData.cashOnHand.toLocaleString()}</p>
                    </div>
                    <Wallet className="w-8 h-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Today's Kilos</p>
                      <p className="text-2xl font-bold text-foreground">{farmData.todayKilos.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Monthly Target Progress</span>
                  <Badge variant="secondary">
                    {Math.round((farmData.currentMonthKilos / farmData.monthlyTarget) * 100)}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={(farmData.currentMonthKilos / farmData.monthlyTarget) * 100} className="mb-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{farmData.currentMonthKilos.toLocaleString()} kg</span>
                  <span>{farmData.monthlyTarget.toLocaleString()} kg target</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button className="h-16 flex-col gap-2" onClick={() => setCurrentScreen("receipt-scan")}>
                  <Scan className="w-6 h-6" />
                  Scan Receipt
                </Button>
                <Button
                  variant="secondary"
                  className="h-16 flex-col gap-2"
                  onClick={() => setCurrentScreen("float-add")}
                >
                  <Plus className="w-6 h-6" />
                  Add Float
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex-col gap-2 bg-transparent"
                  onClick={() => setCurrentScreen("worker-profile")}
                >
                  <UserPlus className="w-6 h-6" />
                  Add Worker
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex-col gap-2 bg-transparent"
                  onClick={() => setCurrentScreen("audit-mode")}
                >
                  <FileText className="w-6 h-6" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Weather & Farm Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudRain className="w-5 h-5" />
                  Today's Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <Thermometer className="w-6 h-6 mx-auto mb-1 text-accent" />
                    <p className="text-sm text-muted-foreground">Temp</p>
                    <p className="font-semibold">22°C</p>
                  </div>
                  <div>
                    <CloudRain className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <p className="text-sm text-muted-foreground">Rain</p>
                    <p className="font-semibold">15mm</p>
                  </div>
                  <div>
                    <Wind className="w-6 h-6 mx-auto mb-1 text-secondary" />
                    <p className="text-sm text-muted-foreground">Wind</p>
                    <p className="font-semibold">12 km/h</p>
                  </div>
                  <div>
                    <Sun className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                    <p className="text-sm text-muted-foreground">UV</p>
                    <p className="font-semibold">Moderate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {receipts.slice(0, 3).map((receipt) => (
                  <div key={receipt.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {receipt.worker
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{receipt.worker}</p>
                        <p className="text-sm text-muted-foreground">
                          {receipt.kilos}kg • {new Date(receipt.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">KSh {receipt.amount}</p>
                      <Badge
                        variant={
                          receipt.status === "paid"
                            ? "default"
                            : receipt.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {receipt.status === "paid" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : receipt.status === "pending" ? (
                          <Clock className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {receipt.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const values = [85, 92, 78, 95, 88, 76, 82]
                    return (
                      <div key={day} className="flex items-center gap-4">
                        <span className="w-8 text-sm text-muted-foreground">{day}</span>
                        <Progress value={values[i]} className="flex-1" />
                        <span className="w-12 text-sm font-medium text-foreground">{values[i]}%</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Receipts Tab */}
          <TabsContent value="receipts" className="p-4 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search receipts..." className="pl-10" />
            </div>

            <Button className="w-full h-16 text-lg" onClick={() => setCurrentScreen("receipt-scan")}>
              <Scan className="w-6 h-6 mr-2" />
              Scan KTDA Receipt
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>

            <div className="space-y-3">
              {receipts.map((receipt) => (
                <Card
                  key={receipt.id}
                  className="p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => {
                    setSelectedReceipt(receipt)
                    setCurrentScreen("receipt-detail")
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{receipt.worker}</p>
                        <p className="text-sm text-muted-foreground">
                          {receipt.id} • {receipt.kilos}kg • {receipt.grade}
                        </p>
                        <p className="text-xs text-muted-foreground">{new Date(receipt.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">KSh {receipt.amount}</p>
                      <Badge
                        variant={
                          receipt.status === "paid"
                            ? "default"
                            : receipt.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {receipt.status}
                      </Badge>
                      <ChevronRight className="w-4 h-4 mt-1 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workers Tab */}
          <TabsContent value="workers" className="p-4 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search workers..." className="pl-10" />
            </div>

            <Button className="w-full" onClick={() => setCurrentScreen("worker-profile")}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Worker
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Block
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Performance
              </Button>
            </div>

            <div className="space-y-3">
              {workers.map((worker) => (
                <Card
                  key={worker.id}
                  className="p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => {
                    setSelectedWorker(worker)
                    setCurrentScreen("worker-profile")
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {worker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground">{worker.name}</h3>
                        <Badge variant="outline">{worker.id}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{worker.phone}</p>
                      <p className="text-sm text-muted-foreground">{worker.block}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-foreground">{worker.totalKilos}kg</span>
                        <span className="text-sm font-medium text-primary">KSh {worker.earnings.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={worker.performance} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground">{worker.performance}%</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Float Tab */}
          <TabsContent value="float" className="p-4 space-y-6">
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm opacity-90">Available Float</p>
                  <p className="text-4xl font-bold">KSh {farmData.cashOnHand.toLocaleString()}</p>
                  <p className="text-sm opacity-90 mt-2">Committed: KSh {farmData.committedPayouts.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button className="h-16 flex-col gap-2" onClick={() => setCurrentScreen("float-add")}>
                <Plus className="w-6 h-6" />
                Add Float
              </Button>
              <Button
                variant="secondary"
                className="h-16 flex-col gap-2"
                onClick={() => setCurrentScreen("denomination-planner")}
              >
                <Calculator className="w-6 h-6" />
                Plan Denominations
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Float History
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {floatTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === "inflow" ? "bg-accent/20" : "bg-destructive/20"
                        }`}
                      >
                        {transaction.type === "inflow" ? (
                          <ArrowUp className="w-5 h-5 text-accent" />
                        ) : (
                          <ArrowDown className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{transaction.source}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.timestamp).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Ref: {transaction.reference}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === "inflow" ? "text-accent" : "text-destructive"
                        }`}
                      >
                        {transaction.type === "inflow" ? "+" : "-"}
                        KSh {transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Bal: KSh {transaction.balance.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="p-4 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <Filter className="w-4 h-4 mr-2" />
                    Change Period
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{farmData.currentMonthKilos.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Kilos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    KSh {(farmData.currentMonthKilos * 20).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Payments</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Monthly Summary (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Worker Performance (CSV)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Wallet className="w-4 h-4 mr-2" />
                  Float Transactions (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Audit Report (PDF)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {workers
                  .sort((a, b) => b.totalKilos - a.totalKilos)
                  .slice(0, 3)
                  .map((performer, index) => (
                    <div key={performer.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={performer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {performer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{performer.name}</p>
                        <p className="text-sm text-muted-foreground">{performer.totalKilos}kg</p>
                      </div>
                      <Badge variant="secondary">{performer.performance}%</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {[
            { id: "dashboard", icon: BarChart3, label: "Dashboard" },
            { id: "receipts", icon: Scan, label: "Receipts" },
            { id: "workers", icon: Users, label: "Workers" },
            { id: "float", icon: Wallet, label: "Float" },
            { id: "reports", icon: FileText, label: "Reports" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === tab.id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg"
        onClick={() => setCurrentScreen("receipt-scan")}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )

  const SetupScreen = () => (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("main")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Farm & User Setup</h1>
      </header>

      <div className="p-4 space-y-6">
        <Tabs defaultValue="farms" className="w-full">
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <Button variant="outline" size="sm">
              Farms
            </Button>
            <Button variant="outline" size="sm">
              Owners
            </Button>
            <Button variant="outline" size="sm">
              Workers
            </Button>
            <Button variant="outline" size="sm">
              Officers
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Add New Farm
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Farm Name</Label>
                <Input placeholder="e.g., Kiambu Tea Estate" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="County, Sub-county" />
              </div>
              <div className="space-y-2">
                <Label>Total Area (Hectares)</Label>
                <Input type="number" placeholder="50" />
              </div>
              <div className="space-y-2">
                <Label>Number of Blocks</Label>
                <Input type="number" placeholder="5" />
              </div>
              <Button className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                Set GPS Coordinates
              </Button>
              <Button className="w-full">Add Farm</Button>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )

  const WorkerProfileScreen = () => (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("main")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{selectedWorker ? selectedWorker.name : "Add Worker"}</h1>
        {selectedWorker && (
          <Button variant="ghost" size="icon" className="ml-auto">
            <Edit className="w-5 h-5" />
          </Button>
        )}
      </header>

      <div className="p-4 space-y-6">
        {selectedWorker ? (
          <>
            {/* Worker Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={selectedWorker.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {selectedWorker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground">{selectedWorker.name}</h2>
                    <p className="text-muted-foreground">{selectedWorker.id}</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedWorker.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="icon">
                    <QrCode className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{selectedWorker.totalKilos}</p>
                    <p className="text-sm text-muted-foreground">Total Kilos</p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <p className="text-2xl font-bold text-accent">KSh {selectedWorker.earnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedWorker.phone}</span>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedWorker.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedWorker.block}</span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Overall Performance</span>
                    <span className="text-sm font-medium">{selectedWorker.performance}%</span>
                  </div>
                  <Progress value={selectedWorker.performance} />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">95%</p>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-accent">18.5</p>
                    <p className="text-xs text-muted-foreground">Avg kg/day</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">A</p>
                    <p className="text-xs text-muted-foreground">Quality Grade</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {receipts
                  .filter((r) => r.workerId === selectedWorker.id)
                  .map((receipt) => (
                    <div key={receipt.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <p className="font-medium">{receipt.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {receipt.kilos}kg • {new Date(receipt.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">KSh {receipt.amount}</p>
                        <Badge variant={receipt.status === "paid" ? "default" : "secondary"} className="text-xs">
                          {receipt.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </>
        ) : (
          /* Add New Worker Form */
          <Card>
            <CardHeader>
              <CardTitle>Add New Worker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Mwangi" />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input placeholder="+254 7XX XXX XXX" />
              </div>

              <div className="space-y-2">
                <Label>Email (Optional)</Label>
                <Input placeholder="john@email.com" />
              </div>

              <div className="space-y-2">
                <Label>Assigned Block</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block-a">Block A</SelectItem>
                    <SelectItem value="block-b">Block B</SelectItem>
                    <SelectItem value="block-c">Block C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Wage Rate (KSh per kg)</Label>
                <Input type="number" placeholder="20" />
              </div>

              <Button className="w-full">Add Worker</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  const ReceiptScanScreen = () => (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("main")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Scan Receipt</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Camera View Placeholder */}
        <Card className="aspect-square bg-muted/20 flex items-center justify-center">
          <div className="text-center">
            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Position QR code in the frame</p>
            <div className="w-48 h-48 border-2 border-primary border-dashed rounded-lg mx-auto mt-4 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-primary" />
            </div>
          </div>
        </Card>

        {/* Manual Entry Option */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Receipt Number</Label>
              <Input placeholder="KT001234" />
            </div>
            <div className="space-y-2">
              <Label>Worker</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select worker" />
                </SelectTrigger>
                <SelectContent>
                  {workers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.id}>
                      {worker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Kilos</Label>
              <Input type="number" placeholder="42.5" />
            </div>
            <Button className="w-full" onClick={() => setCurrentScreen("payment-confirmation")}>
              Validate & Process Payment
            </Button>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {receipts.slice(0, 3).map((receipt) => (
              <div key={receipt.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <p className="font-medium">{receipt.id}</p>
                  <p className="text-sm text-muted-foreground">{receipt.worker}</p>
                </div>
                <Badge variant={receipt.status === "paid" ? "default" : "secondary"}>{receipt.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const PaymentConfirmationScreen = () => (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("receipt-scan")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Payment Confirmation</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Receipt Details */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              Receipt Validated
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Receipt ID</p>
                <p className="font-semibold">KT001234</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Worker</p>
                <p className="font-semibold">John Mwangi</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kilos</p>
                <p className="font-semibold">42.5 kg</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rate</p>
                <p className="font-semibold">KSh 20/kg</p>
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Payment</p>
              <p className="text-3xl font-bold text-primary">KSh 850</p>
            </div>
          </CardContent>
        </Card>

        {/* Denomination Planner */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Denominations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { denom: 500, count: 1, total: 500 },
              { denom: 200, count: 1, total: 200 },
              { denom: 100, count: 1, total: 100 },
              { denom: 50, count: 1, total: 50 },
            ].map((item) => (
              <div key={item.denom} className="flex items-center justify-between">
                <span>KSh {item.denom}</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    -
                  </Button>
                  <span className="w-8 text-center">{item.count}</span>
                  <Button variant="outline" size="sm">
                    +
                  </Button>
                  <span className="w-16 text-right">KSh {item.total}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Confirm Payment */}
        <div className="space-y-3">
          <Button className="w-full h-12 text-lg" onClick={() => setCurrentScreen("main")}>
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Payment
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Printer className="w-4 h-4 mr-2" />
            Print Receipt
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send SMS Confirmation
          </Button>
        </div>
      </div>
    </div>
  )

  // Additional screens would continue here with similar comprehensive implementations...
  // For brevity, I'll add a few more key screens

  const PerformanceTrackingScreen = () => (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("main")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Performance Tracking</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Performance Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold">89%</p>
              <p className="text-sm text-muted-foreground">Avg Performance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Top Performers</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top Performers This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {workers
              .sort((a, b) => b.performance - a.performance)
              .map((worker, index) => (
                <div key={worker.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                          ? "bg-gray-400"
                          : index === 2
                            ? "bg-amber-600"
                            : "bg-primary"
                    }`}
                  >
                    <span className="text-sm font-bold text-white">{index + 1}</span>
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {worker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{worker.name}</p>
                    <p className="text-sm text-muted-foreground">{worker.totalKilos}kg this month</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{worker.performance}%</Badge>
                    {index < 3 && <Star className="w-4 h-4 text-yellow-500 mt-1" />}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => {
                const values = [85, 92, 78, 95]
                return (
                  <div key={week} className="flex items-center gap-4">
                    <span className="w-16 text-sm text-muted-foreground">{week}</span>
                    <Progress value={values[i]} className="flex-1" />
                    <span className="w-12 text-sm font-medium">{values[i]}%</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const FarmHealthScreen = () => (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrentScreen("main")}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">Farm Health Journal</h1>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Plus className="w-5 h-5" />
        </Button>
      </header>

      <div className="p-4 space-y-6">
        {/* Today's Conditions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="w-5 h-5" />
              Today's Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <Droplets className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold">Rainfall</p>
                  <p className="text-sm text-muted-foreground">15mm today</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <Thermometer className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-semibold">Temperature</p>
                  <p className="text-sm text-muted-foreground">18-24°C</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                date: "Today",
                type: "fertilizer",
                icon: Sprout,
                title: "Fertilizer Application",
                description: "NPK 25:5:5 applied to Block A",
                status: "completed",
              },
              {
                date: "Yesterday",
                type: "pest",
                icon: Bug,
                title: "Pest Sighting",
                description: "Tea mosquito bug spotted in Block C",
                status: "monitoring",
              },
              {
                date: "2 days ago",
                type: "weather",
                icon: CloudRain,
                title: "Heavy Rainfall",
                description: "45mm recorded, good for tea growth",
                status: "positive",
              },
            ].map((entry, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    entry.type === "fertilizer" ? "bg-green-100" : entry.type === "pest" ? "bg-red-100" : "bg-blue-100"
                  }`}
                >
                  <entry.icon
                    className={`w-5 h-5 ${
                      entry.type === "fertilizer"
                        ? "text-green-600"
                        : entry.type === "pest"
                          ? "text-red-600"
                          : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{entry.title}</p>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                </div>
                <Badge
                  variant={
                    entry.status === "completed" ? "default" : entry.status === "monitoring" ? "secondary" : "outline"
                  }
                >
                  {entry.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
            <Droplets className="w-6 h-6" />
            Log Rainfall
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
            <Sprout className="w-6 h-6" />
            Record Fertilizer
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
            <Bug className="w-6 h-6" />
            Report Pest
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent">
            <Camera className="w-6 h-6" />
            Take Photo
          </Button>
        </div>
      </div>
    </div>
  )

  // Placeholder screens for remaining functionality
  const ReceiptDetailScreen = () => <div className="p-4">Receipt Detail Screen</div>
  const AddFloatScreen = () => <div className="p-4">Add Float Screen</div>
  const ProductionStatsScreen = () => <div className="p-4">Production Stats Screen</div>
  const DisputeTrackerScreen = () => <div className="p-4">Dispute Tracker Screen</div>
  const BudgetPlannerScreen = () => <div className="p-4">Budget Planner Screen</div>
  const LoyaltySystemScreen = () => <div className="p-4">Loyalty System Screen</div>
  const OCRScannerScreen = () => <div className="p-4">OCR Scanner Screen</div>
  const SMSAccessScreen = () => <div className="p-4">SMS Access Screen</div>
  const MultiOwnerScreen = () => <div className="p-4">Multi-Owner Screen</div>
  const AuditModeScreen = () => <div className="p-4">Audit Mode Screen</div>
  const WhatsAppIntegrationScreen = () => <div className="p-4">WhatsApp Integration Screen</div>
  const DenominationPlannerScreen = () => <div className="p-4">Denomination Planner Screen</div>
  const IDCardGeneratorScreen = () => <div className="p-4">ID Card Generator Screen</div>
  const SettingsScreen = () => <div className="p-4">Settings Screen</div>

  return renderScreen()
}
