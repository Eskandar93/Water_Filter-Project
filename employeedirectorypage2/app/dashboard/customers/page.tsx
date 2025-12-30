"use client"

import { useState } from "react"
import { mockCustomers, type Customer, type Installment } from "@/lib/customers-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Search, MapPin, Calendar, Package, Eye } from "lucide-react"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Form state for new customer
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    governorate: "",
    city: "",
    center: "",
    village: "",
    houseNumber: "",
    landmark: "",
    postalCode: "",
    branch: "",
    product: "",
    productCount: 1,
    serviceType: "purchase" as "purchase" | "maintenance",
  })

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.includes(searchQuery) ||
      customer.phone.includes(searchQuery) ||
      customer.address.governorate.includes(searchQuery),
  )

  const handleAddCustomer = () => {
    const customer: Customer = {
      id: Date.now().toString(),
      name: newCustomer.name,
      phone: newCustomer.phone,
      address: {
        governorate: newCustomer.governorate,
        city: newCustomer.city,
        center: newCustomer.center,
        village: newCustomer.village,
        houseNumber: newCustomer.houseNumber,
        landmark: newCustomer.landmark,
      },
      postalCode: newCustomer.postalCode,
      branch: newCustomer.branch,
      installments: [],
      trustReceipts: [],
      product: newCustomer.product,
      purchaseDate: new Date().toISOString().split("T")[0],
      productCount: newCustomer.productCount,
      serviceType: newCustomer.serviceType,
      registrationDate: new Date().toISOString().split("T")[0],
    }
    setCustomers([...customers, customer])
    setIsAddDialogOpen(false)
    setNewCustomer({
      name: "",
      phone: "",
      governorate: "",
      city: "",
      center: "",
      village: "",
      houseNumber: "",
      landmark: "",
      postalCode: "",
      branch: "",
      product: "",
      productCount: 1,
      serviceType: "purchase",
    })
  }

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id))
  }

  const getPaidInstallments = (installments: Installment[]) => installments.filter((i) => i.paid)

  const getRemainingInstallments = (installments: Installment[]) => installments.filter((i) => !i.paid)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">العملاء</h1>
          <p className="text-muted-foreground mt-1">إدارة بيانات العملاء وتفاصيل الأقساط</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-5 h-5" />
              إضافة عميل
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة عميل جديد</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="اسم العميل"
                />
              </div>
              <div className="space-y-2">
                <Label>رقم الموبايل</Label>
                <Input
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+201xxxxxxxxx"
                />
              </div>
              <div className="space-y-2">
                <Label>المحافظة</Label>
                <Input
                  value={newCustomer.governorate}
                  onChange={(e) => setNewCustomer({ ...newCustomer, governorate: e.target.value })}
                  placeholder="المحافظة"
                />
              </div>
              <div className="space-y-2">
                <Label>المدينة</Label>
                <Input
                  value={newCustomer.city}
                  onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                  placeholder="المدينة"
                />
              </div>
              <div className="space-y-2">
                <Label>المركز</Label>
                <Input
                  value={newCustomer.center}
                  onChange={(e) => setNewCustomer({ ...newCustomer, center: e.target.value })}
                  placeholder="المركز"
                />
              </div>
              <div className="space-y-2">
                <Label>القرية (إن وجدت)</Label>
                <Input
                  value={newCustomer.village}
                  onChange={(e) => setNewCustomer({ ...newCustomer, village: e.target.value })}
                  placeholder="القرية"
                />
              </div>
              <div className="space-y-2">
                <Label>رقم المنزل</Label>
                <Input
                  value={newCustomer.houseNumber}
                  onChange={(e) => setNewCustomer({ ...newCustomer, houseNumber: e.target.value })}
                  placeholder="رقم المنزل"
                />
              </div>
              <div className="space-y-2">
                <Label>مكان مشهور بالقرب</Label>
                <Input
                  value={newCustomer.landmark}
                  onChange={(e) => setNewCustomer({ ...newCustomer, landmark: e.target.value })}
                  placeholder="مكان مشهور بالقرب من العنوان"
                />
              </div>
              <div className="space-y-2">
                <Label>الرقم البريدي</Label>
                <Input
                  value={newCustomer.postalCode}
                  onChange={(e) => setNewCustomer({ ...newCustomer, postalCode: e.target.value })}
                  placeholder="الرقم البريدي"
                />
              </div>
              <div className="space-y-2">
                <Label>الفرع</Label>
                <Input
                  value={newCustomer.branch}
                  onChange={(e) => setNewCustomer({ ...newCustomer, branch: e.target.value })}
                  placeholder="الفرع"
                />
              </div>
              <div className="space-y-2">
                <Label>المنتج</Label>
                <Input
                  value={newCustomer.product}
                  onChange={(e) => setNewCustomer({ ...newCustomer, product: e.target.value })}
                  placeholder="اسم المنتج"
                />
              </div>
              <div className="space-y-2">
                <Label>عدد المنتجات</Label>
                <Input
                  type="number"
                  min="1"
                  value={newCustomer.productCount}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      productCount: Number.parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>نوع الخدمة</Label>
                <Select
                  value={newCustomer.serviceType}
                  onValueChange={(value: "purchase" | "maintenance") =>
                    setNewCustomer({ ...newCustomer, serviceType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">شراء</SelectItem>
                    <SelectItem value="maintenance">صيانة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddCustomer}>إضافة</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث بالاسم أو رقم الهاتف أو المحافظة..."
          className="pr-10"
        />
      </div>

      {/* Customers Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>قائمة العملاء ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>رقم الموبايل</TableHead>
                <TableHead>المحافظة</TableHead>
                <TableHead>الفرع</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead>نوع الخدمة</TableHead>
                <TableHead>الأقساط المتبقية</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="ltr">{customer.phone}</TableCell>
                  <TableCell>{customer.address.governorate}</TableCell>
                  <TableCell>{customer.branch}</TableCell>
                  <TableCell>{customer.product}</TableCell>
                  <TableCell>
                    <Badge variant={customer.serviceType === "purchase" ? "default" : "secondary"}>
                      {customer.serviceType === "purchase" ? "شراء" : "صيانة"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getRemainingInstallments(customer.installments).length} من {customer.installments.length}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Customer Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>تفاصيل العميل</span>
            </DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6 mt-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">الاسم</p>
                  <p className="font-medium">{selectedCustomer.name}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">رقم الموبايل</p>
                  <p className="font-medium ltr">{selectedCustomer.phone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  العنوان بالتفاصيل
                </p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">المحافظة: </span>
                    {selectedCustomer.address.governorate}
                  </div>
                  <div>
                    <span className="text-muted-foreground">المدينة: </span>
                    {selectedCustomer.address.city}
                  </div>
                  {selectedCustomer.address.center && (
                    <div>
                      <span className="text-muted-foreground">المركز: </span>
                      {selectedCustomer.address.center}
                    </div>
                  )}
                  {selectedCustomer.address.village && (
                    <div>
                      <span className="text-muted-foreground">القرية: </span>
                      {selectedCustomer.address.village}
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">رقم المنزل: </span>
                    {selectedCustomer.address.houseNumber}
                  </div>
                  {selectedCustomer.address.landmark && (
                    <div>
                      <span className="text-muted-foreground">مكان مشهور: </span>
                      {selectedCustomer.address.landmark}
                    </div>
                  )}
                </div>
              </div>

              {/* Other Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">الرقم البريدي</p>
                  <p className="font-medium">{selectedCustomer.postalCode}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">الفرع</p>
                  <p className="font-medium">{selectedCustomer.branch}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">نوع الخدمة</p>
                  <Badge variant={selectedCustomer.serviceType === "purchase" ? "default" : "secondary"}>
                    {selectedCustomer.serviceType === "purchase" ? "شراء" : "صيانة"}
                  </Badge>
                </div>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    المنتج
                  </p>
                  <p className="font-medium">{selectedCustomer.product}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">عدد المنتجات</p>
                  <p className="font-medium">{selectedCustomer.productCount}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    تاريخ الشراء
                  </p>
                  <p className="font-medium">{selectedCustomer.purchaseDate}</p>
                </div>
              </div>

              {/* Installments */}
              <div className="space-y-4">
                <h3 className="font-semibold">الأقساط</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 mb-2">الأقساط المدفوعة</p>
                    {getPaidInstallments(selectedCustomer.installments).length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {getPaidInstallments(selectedCustomer.installments).map((inst, idx) => (
                          <li key={idx}>
                            {inst.amount} جنيه - {inst.date}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">لا توجد</p>
                    )}
                  </div>
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700 mb-2">الأقساط المتبقية</p>
                    {getRemainingInstallments(selectedCustomer.installments).length > 0 ? (
                      <ul className="space-y-1 text-sm">
                        {getRemainingInstallments(selectedCustomer.installments).map((inst, idx) => (
                          <li key={idx}>
                            {inst.amount} جنيه - {inst.date}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">لا توجد</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Trust Receipts */}
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">وصالات الأمانة</p>
                {selectedCustomer.trustReceipts.length > 0 ? (
                  <div className="flex gap-2 flex-wrap">
                    {selectedCustomer.trustReceipts.map((receipt, idx) => (
                      <Badge key={idx} variant="outline">
                        {receipt}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm">لا توجد</p>
                )}
              </div>

              {/* Registration Date */}
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">تاريخ تسجيل العميل</p>
                <p className="font-medium">{selectedCustomer.registrationDate}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
