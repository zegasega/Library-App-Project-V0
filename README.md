# 📚 Library Management API



## 🛠 Backend 

### 🚀 Özellikler

- **🔐 Login (Kullanıcı Girişi):**  
  Kullanıcı e-posta ve şifre ile giriş yapabilir. Başarılı girişte `accessToken` ve `refreshToken` döner.

- **📝 Register (Kullanıcı Kaydı):**  
  Yeni kullanıcı oluşturur. E-posta veya telefon numarası benzersiz olmalıdır.

- **🔍 Get Users by Filter (Filtreli Kullanıcı Listeleme):**  
  Kullanıcıları belirli kriterlere göre query parametreleriyle filtreleyerek listeler.  
  Örnek:  

- **✏️ Update User (Kullanıcı Güncelleme):**  
Belirli bir `id`'ye sahip kullanıcının bilgilerini günceller.

- **🗑️ Delete User (Kullanıcı Silme):**  
Belirtilen `id`'ye sahip kullanıcıyı veritabanından siler.

- **🔑 JWT Middleware:**  
Korunan rotalarda kullanıcı kimliğini doğrulamak için JWT kullanılır.

- **🛡️ Role Middleware:**  
Belirli işlemleri yalnızca yetkili roller (`admin`, `manager`, `superadmin`, vb.) gerçekleştirebilir.

