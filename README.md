# Hotel Case | Fırat YILDIZ

Merhaba, case study görevi istenilen şekilde responsive olarak tamamlanmıştır.

Projede kullanılan teknolojiler
* Next.js 15
* Typescript
* Zustand
* Tailwind CSS
* Axios
* React Query

![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/forecast-table.png?raw=true)

![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/forecast-graph.png?raw=true)


## Proje kurulumu için gereklilikler
* NodeJS (version minimum v20.10.0)

## Proje nasıl kurulur

* #### Terminali açıp bu komutu kullanabilirsiniz

```
(HTTPS)

git clone https://github.com/FRTYZ/rmos-hotel-case.git

(SSH)

git clone git@github.com:FRTYZ/rmos-hotel-case.git
```

* #### Projeyi localinize klonladıktan sonra projenin dizininden terminali açıp sırasıyla bu komutları kullanabilirisiniz

#### Paketleri yükleme
```
npm install
```

#### Projeyi çalıştırma
```
npm run dev
```

#### Projeden build alma
```
npm run build
```

## Projenin ekran görüntüleri

* ### Giriş Yapma (Login)

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/login.png?raw=true)

  #### API'den gelen hata kodlarına göre uyarı mesajları oluşturulup, gösterilmesi sağlandı.

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/login-alert.png?raw=true)

* ### Forecast (Tablo)

  #### Tablo için Tanstack'in React Table kullanılarak custom component oluşturulup,özelleştirildi.

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/forecast-table.png?raw=true)

  #### Custom drawer ile mobil ekran için filtreleme işlemleri gösterildi

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/forecast-filter-mobile.png?raw=true)

* ### Forecast (Grafik)

  #### Grafikler için Rechart kütüphanesi kullanılıp, tablonun oda sayısı ve boş oda durumuna göre değerlendirildi.

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/forecast-graph.png?raw=true)

* ### Blacklist

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/blacklist.png?raw=true)

* ### Blacklist (kayıt ekleme)

  #### Validation gibi form kontrolleri mevcut. Kullanıcı deneyimi için hata durumu ve submit olayına göre buton disable hale getirildi

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/blacklist-create.png?raw=true)

* ### Blacklist (kayıt güncelleme)

  #### Validation gibi form kontrolleri mevcut. Kullanıcı deneyimi için hata durumu ve submit olayına göre buton disable hale getirildi

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/blacklist-update.png?raw=true)

* ### Blacklist (kayıt silme)

  #### Silme işlemi için, React Query'de olan cache'teki verilere göre ilgili id ile filtrelenmesi sağlandı

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/blacklist-delete.png?raw=true)

## Projenin dosya düzeni

* ### src/app

  * src/app/(auth) => login sayfası ve logout işlemi 
  * src/app/blacklist => blacklist ekranı için ve partials bileşenleri 
  * src/app/home => forecast ekranı ve partials bileşenleri 
  * src/types => blacklists ve hotel-stats veriler için type

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/app-structure.png?raw=true)


* ### src/components

  * src/components/DataTable => Table componenti ve partials bileşenleri 
  * src/components/FormElements => Form elemanları için özel inputlar
  * src/components/layout => Layout düzeni 
  * src/components/Lazy => Forecast ve BlackList ekranlar için lazy loading
  * src/components/Chart => Forecast grafik ekranı için grafik componenti
  * src/components/Drawer => Form, mobile filtre ve navbar için custom drawer

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/components-structure.png?raw=true)

* ### src/helpers, src/libs, src/store

  * src/helpers/Request.tsx => API istekleri için helper fonksiyonlar 
  * src/helpers/libs => React Query'in src/app/layout.tsx'de kullanılması için
  * src/store => Zustand için klasörümüz 

  ![alt text](https://github.com/FRTYZ/rmos-hotel-case/blob/main/public/other-structure.png?raw=true)

### Package.json
```
{
  "name": "rmos-hotel-case",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.76.1",
    "@tanstack/react-table": "^8.21.3",
    "axios": "^1.9.0",
    "clsx": "^2.1.1",
    "formik": "^2.4.6",
    "next": "15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "recharts": "^2.15.3",
    "sweetalert2": "^11.21.0",
    "zustand": "^5.0.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

İyi çalışmalar dilerim.