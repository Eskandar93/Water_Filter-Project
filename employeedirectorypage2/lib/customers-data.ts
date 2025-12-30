export interface Installment {
  amount: number
  date: string
  paid: boolean
}

export interface Customer {
  id: string
  name: string // الاسم
  phone: string // رقم الموبايل
  address: {
    governorate: string // المحافظة
    city: string // المدينة
    center: string // المركز
    village: string // القرية
    houseNumber: string // رقم المنزل
    landmark: string // مكان مشهور بالقرب
  }
  postalCode: string // الرقم البريدي
  branch: string // الفرع
  installments: Installment[] // الأقساط
  trustReceipts: string[] // وصالت الأمانة
  product: string // المنتج
  purchaseDate: string // تاريخ الشراء
  productCount: number // عدد المنتجات
  serviceType: "purchase" | "maintenance" // نوع الخدمة (شراء أم صيانة)
  registrationDate: string // تاريخ تسجيل العميل
}

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "محمد أحمد إبراهيم",
    phone: "+201012345678",
    address: {
      governorate: "القاهرة",
      city: "مدينة نصر",
      center: "الحي الثامن",
      village: "",
      houseNumber: "15",
      landmark: "بجوار مسجد الحمد",
    },
    postalCode: "11765",
    branch: "الفرع الرئيسي",
    installments: [
      { amount: 500, date: "2025-01-15", paid: true },
      { amount: 500, date: "2025-02-15", paid: true },
      { amount: 500, date: "2025-03-15", paid: false },
      { amount: 500, date: "2025-04-15", paid: false },
    ],
    trustReceipts: ["وصل-001", "وصل-002"],
    product: "غسالة أوتوماتيك",
    purchaseDate: "2025-01-01",
    productCount: 1,
    serviceType: "purchase",
    registrationDate: "2024-12-25",
  },
  {
    id: "2",
    name: "فاطمة علي محمود",
    phone: "+201123456789",
    address: {
      governorate: "الجيزة",
      city: "6 أكتوبر",
      center: "الحي الأول",
      village: "",
      houseNumber: "8",
      landmark: "أمام مول العرب",
    },
    postalCode: "12566",
    branch: "فرع الجيزة",
    installments: [
      { amount: 800, date: "2025-02-01", paid: true },
      { amount: 800, date: "2025-03-01", paid: false },
      { amount: 800, date: "2025-04-01", paid: false },
    ],
    trustReceipts: ["وصل-003"],
    product: "ثلاجة",
    purchaseDate: "2025-02-01",
    productCount: 1,
    serviceType: "purchase",
    registrationDate: "2025-01-20",
  },
  {
    id: "3",
    name: "أحمد سعيد حسن",
    phone: "+201234567890",
    address: {
      governorate: "الإسكندرية",
      city: "سموحة",
      center: "",
      village: "",
      houseNumber: "22",
      landmark: "بجوار نادي سموحة",
    },
    postalCode: "21648",
    branch: "فرع الإسكندرية",
    installments: [
      { amount: 300, date: "2025-01-10", paid: true },
      { amount: 300, date: "2025-02-10", paid: true },
    ],
    trustReceipts: [],
    product: "تكييف سبليت",
    purchaseDate: "2025-01-10",
    productCount: 2,
    serviceType: "maintenance",
    registrationDate: "2025-01-05",
  },
]
