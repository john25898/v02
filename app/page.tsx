'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { 
  Plus, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Leaf,
  Tractor,
  User,
  Building2,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react'

// Types
interface Farm {
  id: string
  name: string
  location: string
  size: number
  cropType: string
  established: string
  status: 'active' | 'inactive'
  ownerId: string
}

interface Owner {
  id: string
  name: string
  email: string
  phone: string
  role: 'owner' | 'manager' | 'supervisor'
  avatar?: string
  joinedDate: string
}

interface Worker {
  id: string
  name: string
  email: string
  phone: string
  role: string
  farmId: string
  salary: number
  startDate: string
  status: 'active' | 'inactive'
}

export default function FarmUserSetup() {
  // State management
  const [farms, setFarms] = useState<Farm[]>([])
  const [owners, setOwners] = useState<Owner[]>([])
  const [workers, setWorkers] = useState<Worker[]>([])
  const [selectedFarm, setSelectedFarm] = useState<string>('')
  const [editingFarm, setEditingFarm] = useState<string | null>(null)
  const [editingOwner, setEditingOwner] = useState<string | null>(null)
  const [editingWorker, setEditingWorker] = useState<string | null>(null)

  // Form states
  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    size: '',
    cropType: '',
    ownerId: ''
  })

  const [newOwner, setNewOwner] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'owner' as const
  })

  const [newWorker, setNewWorker] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    salary: '',
    farmId: ''
  })

  // Initialize with sample data
  useEffect(() => {
    const sampleOwners: Owner[] = [
      {
        id: '1',
        name: 'John Kamau',
        email: 'john.kamau@email.com',
        phone: '+254 712 345 678',
        role: 'owner',
        joinedDate: '2023-01-15'
      },
      {
        id: '2',
        name: 'Mary Wanjiku',
        email: 'mary.wanjiku@email.com',
        phone: '+254 723 456 789',
        role: 'manager',
        joinedDate: '2023-03-20'
      }
    ]

    const sampleFarms: Farm[] = [
      {
        id: '1',
        name: 'Green Valley Farm',
        location: 'Kiambu County',
        size: 50,
        cropType: 'Tea',
        established: '2020-05-10',
        status: 'active',
        ownerId: '1'
      },
      {
        id: '2',
        name: 'Highland Tea Estate',
        location: 'Nyeri County',
        size: 120,
        cropType: 'Tea',
        established: '2018-08-15',
        status: 'active',
        ownerId: '2'
      }
    ]

    const sampleWorkers: Worker[] = [
      {
        id: '1',
        name: 'Peter Mwangi',
        email: 'peter.mwangi@email.com',
        phone: '+254 734 567 890',
        role: 'Field Supervisor',
        farmId: '1',
        salary: 35000,
        startDate: '2023-02-01',
        status: 'active'
      },
      {
        id: '2',
        name: 'Grace Njeri',
        email: 'grace.njeri@email.com',
        phone: '+254 745 678 901',
        role: 'Tea Picker',
        farmId: '1',
        salary: 25000,
        startDate: '2023-04-15',
        status: 'active'
      },
      {
        id: '3',
        name: 'Samuel Kiprotich',
        email: 'samuel.kiprotich@email.com',
        phone: '+254 756 789 012',
        role: 'Machine Operator',
        farmId: '2',
        salary: 40000,
        startDate: '2023-01-10',
        status: 'active'
      }
    ]

    setOwners(sampleOwners)
    setFarms(sampleFarms)
    setWorkers(sampleWorkers)
    setSelectedFarm('1')
  }, [])

  // Farm functions
  const addFarm = () => {
    if (!newFarm.name || !newFarm.location || !newFarm.size || !newFarm.cropType || !newFarm.ownerId) {
      alert('Please fill in all farm details')
      return
    }

    const farm: Farm = {
      id: Date.now().toString(),
      name: newFarm.name,
      location: newFarm.location,
      size: parseInt(newFarm.size),
      cropType: newFarm.cropType,
      established: new Date().toISOString().split('T')[0],
      status: 'active',
      ownerId: newFarm.ownerId
    }

    setFarms([...farms, farm])
    setNewFarm({ name: '', location: '', size: '', cropType: '', ownerId: '' })
  }

  const updateFarm = (id: string, updatedFarm: Partial<Farm>) => {
    setFarms(farms.map(farm => 
      farm.id === id ? { ...farm, ...updatedFarm } : farm
    ))
    setEditingFarm(null)
  }

  const deleteFarm = (id: string) => {
    if (confirm('Are you sure you want to delete this farm? This will also remove all associated workers.')) {
      setFarms(farms.filter(farm => farm.id !== id))
      setWorkers(workers.filter(worker => worker.farmId !== id))
      if (selectedFarm === id) {
        setSelectedFarm(farms.find(f => f.id !== id)?.id || '')
      }
    }
  }

  // Owner functions
  const addOwner = () => {
    if (!newOwner.name || !newOwner.email || !newOwner.phone) {
      alert('Please fill in all owner details')
      return
    }

    const owner: Owner = {
      id: Date.now().toString(),
      name: newOwner.name,
      email: newOwner.email,
      phone: newOwner.phone,
      role: newOwner.role,
      joinedDate: new Date().toISOString().split('T')[0]
    }

    setOwners([...owners, owner])
    setNewOwner({ name: '', email: '', phone: '', role: 'owner' })
  }

  const updateOwner = (id: string, updatedOwner: Partial<Owner>) => {
    setOwners(owners.map(owner => 
      owner.id === id ? { ...owner, ...updatedOwner } : owner
    ))
    setEditingOwner(null)
  }

  const deleteOwner = (id: string) => {
    const ownerFarms = farms.filter(farm => farm.ownerId === id)
    if (ownerFarms.length > 0) {
      alert('Cannot delete owner who has farms. Please reassign or delete farms first.')
      return
    }
    
    if (confirm('Are you sure you want to delete this owner?')) {
      setOwners(owners.filter(owner => owner.id !== id))
    }
  }

  // Worker functions
  const addWorker = () => {
    if (!newWorker.name || !newWorker.email || !newWorker.phone || !newWorker.role || !newWorker.salary || !newWorker.farmId) {
      alert('Please fill in all worker details')
      return
    }

    const worker: Worker = {
      id: Date.now().toString(),
      name: newWorker.name,
      email: newWorker.email,
      phone: newWorker.phone,
      role: newWorker.role,
      farmId: newWorker.farmId,
      salary: parseInt(newWorker.salary),
      startDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }

    setWorkers([...workers, worker])
    setNewWorker({ name: '', email: '', phone: '', role: '', salary: '', farmId: '' })
  }

  const updateWorker = (id: string, updatedWorker: Partial<Worker>) => {
    setWorkers(workers.map(worker => 
      worker.id === id ? { ...worker, ...updatedWorker } : worker
    ))
    setEditingWorker(null)
  }

  const deleteWorker = (id: string) => {
    if (confirm('Are you sure you want to delete this worker?')) {
      setWorkers(workers.filter(worker => worker.id !== id))
    }
  }

  // Helper functions
  const getOwnerById = (id: string) => owners.find(owner => owner.id === id)
  const getFarmsByOwner = (ownerId: string) => farms.filter(farm => farm.ownerId === ownerId)
  const getWorkersByFarm = (farmId: string) => workers.filter(worker => worker.farmId === farmId)
  const getSelectedFarmData = () => farms.find(farm => farm.id === selectedFarm)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-green-600 rounded-full">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Farm Management System</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your tea farms, owners, and workers efficiently with our comprehensive system
          </p>
        </div>

        {/* Farm Selection */}
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-green-600" />
              Select Active Farm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedFarm} onValueChange={setSelectedFarm}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a farm to manage" />
              </SelectTrigger>
              <SelectContent>
                {farms.map(farm => (
                  <SelectItem key={farm.id} value={farm.id}>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      {farm.name} - {farm.location}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedFarm && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getSelectedFarmData()?.size} acres</div>
                    <div className="text-sm text-gray-600">Farm Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getWorkersByFarm(selectedFarm).length}</div>
                    <div className="text-sm text-gray-600">Workers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{getSelectedFarmData()?.cropType}</div>
                    <div className="text-sm text-gray-600">Crop Type</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="farms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="farms" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Farms
            </TabsTrigger>
            <TabsTrigger value="owners" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Owners
            </TabsTrigger>
            <TabsTrigger value="workers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Workers
            </TabsTrigger>
          </TabsList>

          {/* Farms Tab */}
          <TabsContent value="farms" className="space-y-6">
            {/* Add New Farm */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-600" />
                  Add New Farm
                </CardTitle>
                <CardDescription>Create a new farm and assign it to an owner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farm-name">Farm Name</Label>
                    <Input
                      id="farm-name"
                      placeholder="Enter farm name"
                      value={newFarm.name}
                      onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farm-location">Location</Label>
                    <Input
                      id="farm-location"
                      placeholder="Enter location"
                      value={newFarm.location}
                      onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farm-size">Size (acres)</Label>
                    <Input
                      id="farm-size"
                      type="number"
                      placeholder="Enter size in acres"
                      value={newFarm.size}
                      onChange={(e) => setNewFarm({ ...newFarm, size: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farm-crop">Crop Type</Label>
                    <Select value={newFarm.cropType} onValueChange={(value) => setNewFarm({ ...newFarm, cropType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tea">Tea</SelectItem>
                        <SelectItem value="Coffee">Coffee</SelectItem>
                        <SelectItem value="Maize">Maize</SelectItem>
                        <SelectItem value="Beans">Beans</SelectItem>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="farm-owner">Farm Owner</Label>
                    <Select value={newFarm.ownerId} onValueChange={(value) => setNewFarm({ ...newFarm, ownerId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select farm owner" />
                      </SelectTrigger>
                      <SelectContent>
                        {owners.map(owner => (
                          <SelectItem key={owner.id} value={owner.id}>
                            {owner.name} - {owner.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addFarm} className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Farm
                </Button>
              </CardContent>
            </Card>

            {/* Existing Farms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms.map(farm => {
                const owner = getOwnerById(farm.ownerId)
                const farmWorkers = getWorkersByFarm(farm.id)
                
                return (
                  <Card key={farm.id} className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-green-600" />
                            {farm.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="w-4 h-4" />
                            {farm.location}
                          </CardDescription>
                        </div>
                        <Badge variant={farm.status === 'active' ? 'default' : 'secondary'}>
                          {farm.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-600">Size</div>
                          <div className="text-lg font-semibold">{farm.size} acres</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-600">Crop</div>
                          <div className="text-lg font-semibold">{farm.cropType}</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="font-medium text-gray-600">Owner</div>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-green-100 text-green-600">
                              {owner?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{owner?.name}</div>
                            <div className="text-sm text-gray-500">{owner?.role}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="font-medium text-gray-600">Workers</div>
                        <div className="text-2xl font-bold text-green-600">{farmWorkers.length}</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingFarm(farm.id)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteFarm(farm.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Owners Tab */}
          <TabsContent value="owners" className="space-y-6">
            {/* Add New Owner */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-600" />
                  Add New Owner
                </CardTitle>
                <CardDescription>Add a new farm owner or manager</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Full Name</Label>
                    <Input
                      id="owner-name"
                      placeholder="Enter full name"
                      value={newOwner.name}
                      onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-email">Email</Label>
                    <Input
                      id="owner-email"
                      type="email"
                      placeholder="Enter email address"
                      value={newOwner.email}
                      onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-phone">Phone Number</Label>
                    <Input
                      id="owner-phone"
                      placeholder="Enter phone number"
                      value={newOwner.phone}
                      onChange={(e) => setNewOwner({ ...newOwner, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-role">Role</Label>
                    <Select value={newOwner.role} onValueChange={(value: 'owner' | 'manager' | 'supervisor') => setNewOwner({ ...newOwner, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addOwner} className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Owner
                </Button>
              </CardContent>
            </Card>

            {/* Existing Owners */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {owners.map(owner => {
                const ownerFarms = getFarmsByOwner(owner.id)
                
                return (
                  <Card key={owner.id} className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={owner.avatar} />
                            <AvatarFallback className="bg-green-100 text-green-600">
                              {owner.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{owner.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {owner.role}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{owner.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{owner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Joined {new Date(owner.joinedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="font-medium text-gray-600">Farms Owned</div>
                        <div className="text-2xl font-bold text-green-600">{ownerFarms.length}</div>
                        {ownerFarms.length > 0 && (
                          <div className="text-sm text-gray-500">
                            {ownerFarms.map(farm => farm.name).join(', ')}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingOwner(owner.id)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteOwner(owner.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Workers Tab */}
          <TabsContent value="workers" className="space-y-6">
            {/* Add New Worker */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-600" />
                  Add New Worker
                </CardTitle>
                <CardDescription>Add a new worker to a specific farm</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="worker-name">Full Name</Label>
                    <Input
                      id="worker-name"
                      placeholder="Enter full name"
                      value={newWorker.name}
                      onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="worker-email">Email</Label>
                    <Input
                      id="worker-email"
                      type="email"
                      placeholder="Enter email address"
                      value={newWorker.email}
                      onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="worker-phone">Phone Number</Label>
                    <Input
                      id="worker-phone"
                      placeholder="Enter phone number"
                      value={newWorker.phone}
                      onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="worker-role">Role</Label>
                    <Select value={newWorker.role} onValueChange={(value) => setNewWorker({ ...newWorker, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Field Supervisor">Field Supervisor</SelectItem>
                        <SelectItem value="Tea Picker">Tea Picker</SelectItem>
                        <SelectItem value="Machine Operator">Machine Operator</SelectItem>
                        <SelectItem value="Quality Controller">Quality Controller</SelectItem>
                        <SelectItem value="General Worker">General Worker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="worker-salary">Monthly Salary (KES)</Label>
                    <Input
                      id="worker-salary"
                      type="number"
                      placeholder="Enter monthly salary"
                      value={newWorker.salary}
                      onChange={(e) => setNewWorker({ ...newWorker, salary: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="worker-farm">Assign to Farm</Label>
                    <Select value={newWorker.farmId} onValueChange={(value) => setNewWorker({ ...newWorker, farmId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select farm" />
                      </SelectTrigger>
                      <SelectContent>
                        {farms.map(farm => (
                          <SelectItem key={farm.id} value={farm.id}>
                            {farm.name} - {farm.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addWorker} className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Worker
                </Button>
              </CardContent>
            </Card>

            {/* Filter Workers by Farm */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle>Filter Workers by Farm</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedFarm} onValueChange={setSelectedFarm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select farm to view workers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Farms</SelectItem>
                    {farms.map(farm => (
                      <SelectItem key={farm.id} value={farm.id}>
                        {farm.name} - {farm.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Workers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedFarm ? getWorkersByFarm(selectedFarm) : workers).map(worker => {
                const workerFarm = farms.find(farm => farm.id === worker.farmId)
                
                return (
                  <Card key={worker.id} className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-green-100 text-green-600">
                              {worker.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{worker.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {worker.role}
                            </Badge>
                          </div>
                        </div>
                        <Badge variant={worker.status === 'active' ? 'default' : 'secondary'}>
                          {worker.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{worker.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{worker.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span>{workerFarm?.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Started {new Date(worker.startDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="font-medium text-gray-600">Monthly Salary</div>
                        <div className="text-xl font-bold text-green-600">
                          KES {worker.salary.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingWorker(worker.id)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteWorker(worker.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{farms.length}</div>
                  <div className="text-sm text-gray-600">Total Farms</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{owners.length}</div>
                  <div className="text-sm text-gray-600">Farm Owners</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{workers.length}</div>
                  <div className="text-sm text-gray-600">Total Workers</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Tractor className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {farms.reduce((total, farm) => total + farm.size, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Acres</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}