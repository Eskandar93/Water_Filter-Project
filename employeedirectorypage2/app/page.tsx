import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Users, ClipboardCheck, BarChart3, Shield, Zap } from "lucide-react"

export const metadata = {
  title: "نظام إدارة الموظفين - الصفحة الرئيسية",
  description: "نظام متكامل لإدارة الموظفين والفروع وتسجيل الحضور",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border/40 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">نظام الإدارة</span>
          </div>

          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/login">تسجيل الدخول</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            نظام متكامل لإدارة الموظفين
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            المنصة الكاملة لإدارة
            <br />
            <span className="text-primary">موظفيك وفروعك</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            نظام إدارة حديث يمكّن مؤسستك من تتبع الموظفين والفروع وتسجيل الحضور بسهولة وأمان، مع واجهة عربية بالكامل
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              <Link href="/register">ابدأ الآن</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-border hover:bg-muted bg-transparent"
            >
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2">
            <div className="text-4xl font-bold text-primary">إدارة شاملة</div>
            <p className="text-muted-foreground">للموظفين والفروع</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2">
            <div className="text-4xl font-bold text-primary">تسجيل دقيق</div>
            <p className="text-muted-foreground">للحضور والانصراف</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2">
            <div className="text-4xl font-bold text-primary">تقارير فورية</div>
            <p className="text-muted-foreground">وتحليلات متقدمة</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2">
            <div className="text-4xl font-bold text-primary">أمان عالي</div>
            <p className="text-muted-foreground">وصلاحيات متعددة</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">ميزات النظام</h2>
          <p className="text-xl text-muted-foreground">أدوات قوية لإدارة مؤسستك بكفاءة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card border-2 border-border rounded-xl p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">إدارة الموظفين</h3>
            <p className="text-muted-foreground leading-relaxed">
              إضافة وتعديل بيانات الموظفين، وتنظيمهم حسب الأقسام والفروع مع معلومات شاملة لكل موظف
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">إدارة الفروع</h3>
            <p className="text-muted-foreground leading-relaxed">
              إنشاء فروع متعددة مع تحديد الموقع الجغرافي، وإدارة الأقسام داخل كل فرع بسهولة
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <ClipboardCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">تسجيل الحضور</h3>
            <p className="text-muted-foreground leading-relaxed">
              تسجيل حضور وانصراف الموظفين تلقائياً بناءً على الموقع الجغرافي مع التحقق من نطاق العمل
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">التقارير والتحليلات</h3>
            <p className="text-muted-foreground leading-relaxed">
              عرض تقارير مفصلة عن حضور الموظفين وأداء الفروع مع إحصائيات دقيقة
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">صلاحيات متعددة</h3>
            <p className="text-muted-foreground leading-relaxed">
              نظام صلاحيات متقدم يتيح التحكم الكامل للمدراء وإدارة محدودة للموظفين
            </p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">سرعة وسهولة</h3>
            <p className="text-muted-foreground leading-relaxed">
              واجهة مستخدم سريعة وسهلة الاستخدام بتصميم عصري وداعم كامل للغة العربية
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">جاهز للبدء؟</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">ابدأ في إدارة موظفيك وفروعك بكفاءة اليوم</p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
            <Link href="/register">إنشاء حساب جديد</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-slate-950/50">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>© 2025 نظام إدارة الموظفين. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
