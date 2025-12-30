"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, MapPin, User, Plus, Phone, Map, Navigation, Loader2 } from "lucide-react"

interface AddBranchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (branch: {
    name: string
    phoneNumber: string
    branchAddress: {
      government: string
      city: string
      postalCode: string
      famousPlace1: string
      famousPlace2: string
      location: string
    }
    latitude: number
    longitude: number
    registrationRadius: number
    managerName: string
  }) => void
}

export function AddBranchDialog({ open, onOpenChange, onAdd }: AddBranchDialogProps) {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [government, setGovernment] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [famousPlace1, setFamousPlace1] = useState("")
  const [famousPlace2, setFamousPlace2] = useState("")
  const [location, setLocation] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [registrationRadius, setRegistrationRadius] = useState("200")
  const [managerName, setManagerName] = useState("")
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState("")

  const getCurrentLocation = () => {
    setLoadingLocation(true)
    setLocationError("")

    if (!navigator.geolocation) {
      setLocationError("المتصفح لا يدعم خاصية تحديد الموقع")
      setLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6))
        setLongitude(position.coords.longitude.toFixed(6))
        setLoadingLocation(false)
      },
      (error) => {
        let errorMessage = "فشل الحصول على الموقع الحالي"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "تم رفض الإذن للوصول إلى الموقع"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "معلومات الموقع غير متاحة"
            break
          case error.TIMEOUT:
            errorMessage = "انتهت مهلة طلب الموقع"
            break
        }
        setLocationError(errorMessage)
        setLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name,
      phoneNumber,
      branchAddress: {
        government,
        city,
        postalCode,
        famousPlace1,
        famousPlace2,
        location,
      },
      latitude: Number.parseFloat(latitude) || 0,
      longitude: Number.parseFloat(longitude) || 0,
      registrationRadius: Number.parseFloat(registrationRadius) || 200,
      managerName,
    })
    // Reset form
    setName("")
    setPhoneNumber("")
    setGovernment("")
    setCity("")
    setPostalCode("")
    setFamousPlace1("")
    setFamousPlace2("")
    setLocation("")
    setLatitude("")
    setLongitude("")
    setRegistrationRadius("200")
    setManagerName("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card text-card-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            إضافة فرع جديد
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">أدخل بيانات الفرع الجديد</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Branch Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              اسم الفرع
            </Label>
            <div className="relative">
              <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: فرع القاهرة"
                className="pr-10 bg-background border-border text-foreground"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-foreground">
              رقم الهاتف
            </Label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="مثال: 01234567890"
                className="pr-10 bg-background border-border text-foreground"
                required
              />
            </div>
          </div>

          {/* Manager Name */}
          <div className="space-y-2">
            <Label htmlFor="managerName" className="text-foreground">
              اسم المدير
            </Label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="managerName"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="مثال: أحمد محمد"
                className="pr-10 bg-background border-border text-foreground"
                required
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Map className="w-4 h-4 text-primary" />
              بيانات العنوان
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Government */}
              <div className="space-y-2">
                <Label htmlFor="government" className="text-foreground">
                  المحافظة
                </Label>
                <Input
                  id="government"
                  value={government}
                  onChange={(e) => setGovernment(e.target.value)}
                  placeholder="مثال: القاهرة"
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-foreground">
                  المدينة
                </Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="مثال: المعادي"
                  className="bg-background border-border text-foreground"
                  required
                />
              </div>

              {/* Postal Code */}
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-foreground">
                  الرمز البريدي
                </Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="مثال: 12345"
                  className="bg-background border-border text-foreground"
                />
              </div>

              {/* Famous Place 1 */}
              <div className="space-y-2">
                <Label htmlFor="famousPlace1" className="text-foreground">
                  معلم مشهور (1)
                </Label>
                <Input
                  id="famousPlace1"
                  value={famousPlace1}
                  onChange={(e) => setFamousPlace1(e.target.value)}
                  placeholder="مثال: بجوار مترو المعادي"
                  className="bg-background border-border text-foreground"
                />
              </div>

              {/* Famous Place 2 */}
              <div className="space-y-2 col-span-2">
                <Label htmlFor="famousPlace2" className="text-foreground">
                  معلم مشهور (2)
                </Label>
                <Input
                  id="famousPlace2"
                  value={famousPlace2}
                  onChange={(e) => setFamousPlace2(e.target.value)}
                  placeholder="مثال: أمام كارفور المعادي"
                  className="bg-background border-border text-foreground"
                />
              </div>

              {/* Location Description */}
              <div className="space-y-2 col-span-2">
                <Label htmlFor="location" className="text-foreground">
                  وصف الموقع التفصيلي
                </Label>
                <Textarea
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="مثال: 123 شارع النيل، بجوار محطة المترو، الطابق الثاني"
                  className="bg-background border-border text-foreground resize-none"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>

          {/* Coordinates Section */}
          <div className="border-t border-border pt-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Navigation className="w-4 h-4 text-primary" />
                الإحداثيات الجغرافية
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                disabled={loadingLocation}
                className="text-xs border-primary/30 hover:bg-primary/10 bg-transparent"
              >
                {loadingLocation ? (
                  <>
                    <Loader2 className="w-3 h-3 ml-1 animate-spin" />
                    جاري التحديد...
                  </>
                ) : (
                  <>
                    <MapPin className="w-3 h-3 ml-1" />
                    استخدم الموقع الحالي
                  </>
                )}
              </Button>
            </div>

            {locationError && (
              <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-xs text-destructive">{locationError}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Latitude */}
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-foreground">
                  دائرة العرض (Latitude)
                </Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="مثال: 30.0444"
                    className="pr-10 bg-background border-border text-foreground"
                    required
                  />
                </div>
              </div>

              {/* Longitude */}
              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-foreground">
                  خط الطول (Longitude)
                </Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="مثال: 31.2357"
                    className="pr-10 bg-background border-border text-foreground"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Registration Radius */}
            <div className="space-y-2 mt-4">
              <Label htmlFor="registrationRadius" className="text-foreground">
                نطاق التسجيل (بالمتر)
              </Label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="registrationRadius"
                  type="number"
                  min="50"
                  max="5000"
                  step="50"
                  value={registrationRadius}
                  onChange={(e) => setRegistrationRadius(e.target.value)}
                  placeholder="مثال: 200"
                  className="pr-10 bg-background border-border text-foreground"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                المسافة المسموحة للموظفين لتسجيل الحضور والانصراف (الافتراضي: 200 متر)
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 ml-2" />
              إضافة الفرع
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-border"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
