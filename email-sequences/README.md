# Cyrasoul Email Dizileri
## Alex Hormozi Yaklaşımı ile Plain-Text Email Sequences

---

## Genel Bakış

Bu klasör, Cyrasoul'un email pazarlama stratejisini içerir. Tüm email'ler Alex Hormozi'nin değer-odaklı, plain-text yaklaşımına göre yazılmıştır.

### Dosya Yapısı

```
email-sequences/
├── README.md                         # Bu dosya
├── welcome/                          # Hedef bazlı welcome dizileri
│   ├── guzellik-sequence.md          # Güzellik hedefi (DailyGlow + DreamGlow)
│   ├── odaklanma-sequence.md         # Odaklanma hedefi (MindFuel)
│   ├── sakinlik-sequence.md          # Sakinlik hedefi (TheChill)
│   ├── detoks-sequence.md            # Detoks hedefi (Reset Button)
│   └── uyku-sequence.md              # Uyku hedefi (DreamGlow uyku odaklı)
└── post-purchase/
    └── post-purchase-sequence.md     # Satın alma sonrası 5 email
```

---

## Strateji Özeti

### Felsefe

1. **Plain Text** - HTML, görsel, logo yok
2. **60 Saniye** - Her email max 200 kelime
3. **Tek CTA** - Birden fazla link yok
4. **P.S.** - Her email'de etkileşim isteği
5. **Samimi Ton** - Arkadaştan gelen mesaj gibi

### Gönderen Bilgileri

- **İsim:** Can Okçuer
- **Şirket:** Cyrasoul
- **Email:** info@cyrasoul.com

---

## Segmentasyon Yapısı

Pop-up'ta kullanıcılar hedeflerini seçiyor. Her hedef farklı bir email dizisini tetikliyor:

| Hedef | Birincil Ürün | İkincil Ürün | Email Dizisi |
|-------|---------------|--------------|--------------|
| Güzellik | DailyGlow | DreamGlow | `welcome/guzellik-sequence.md` |
| Odaklanma | MindFuel | TheChill | `welcome/odaklanma-sequence.md` |
| Sakinlik | TheChill | DreamGlow | `welcome/sakinlik-sequence.md` |
| Detoks | Reset Button | MindFuel | `welcome/detoks-sequence.md` |
| Uyku | DreamGlow | TheChill | `welcome/uyku-sequence.md` |

---

## Welcome Sequence Yapısı (7 Email)

Her welcome dizisi aynı yapıyı takip eder:

| # | Gün | Tip | Amaç | Psikoloji |
|---|-----|-----|------|-----------|
| 1 | 0 | Hoş Geldin | Bağlantı kur, beklenti oluştur | External Enemy, Loss Aversion |
| 2 | 2 | Quick Win | Hemen uygulanabilir taktik | Reciprocity, Commitment |
| 3 | 4 | Bilim/Veri | İstatistik + mekanizma | Authority, Specificity |
| 4 | 6 | Sosyal Kanıt | Müşteri hikayesi | Social Proof, Similarity |
| 5 | 8 | Derin Problem | "Gerçek sorun bu..." | Pattern Interrupt, Empathy |
| 6 | 10 | Çözüm Tanıtımı | Ürün + nasıl çalışır | IKEA Effect, Goal-Gradient |
| 7 | 12 | Soft CTA | Özel teklif + bundle | Scarcity, Anchoring |

---

## Post-Purchase Sequence Yapısı (5 Email)

| # | Gün | Tip | Amaç |
|---|-----|-----|------|
| 1 | 0 | Teşekkür | Sipariş onayı + beklenti belirleme |
| 2 | 3 | İlk Hafta | Ne beklenmeli + motivasyon |
| 3 | 7 | Check-in | İlk sonuçlar + soru sorma |
| 4 | 14 | Derinleşme | Bundle önerisi + optimizasyon |
| 5 | 30 | Sonuç | Değerlendirme + abonelik teklifi |

---

## Psikoloji Çerçevesi

### Kullanılan Mental Modeller

- **Loss Aversion:** "Her gün kaybettiğin 4 saat..."
- **Peak-End Rule:** Güçlü açılış + güçlü kapanış
- **Zeigarnik Effect:** Açık döngüler bırak
- **Social Proof:** Testimonial'lar ve rakamlar
- **Goal-Gradient:** İlerleme göster (7 gün, 30 gün timeline)
- **IKEA Effect:** Ritüel sistemi ile kullanıcı yatırımı
- **Reciprocity:** Önce değer ver, sonra iste

### Dış Düşman Çerçevesi

Her ürün için tanımlanmış "düşmanlar":

| Ürün | Dış Düşman |
|------|------------|
| MindFuel | Bildirimler, sosyal medya, dijital dikkat hırsızları |
| Reset Button | İşlenmiş gıdalar, çevresel toksinler, modern yaşam |
| DreamGlow | Mavi ışık, stres, düzensiz uyku rutinleri |
| DailyGlow | Oksidatif stres, UV hasarı, yetersiz beslenme |
| TheChill | İş stresi, "her an erişilebilir" kültürü |

---

## Email Format Şablonu

Her email şu yapıda yazılmıştır:

```markdown
## Email #X: [İsim]
**Gönderim:** Gün X
**Konu:** [Kısa, merak uyandırıcı - max 60 karakter]
**Ön İzleme:** [90-140 karakter]

---

Selam,

[Hook - 1 cümle merak uyandırıcı]

[Problem/Değer - 2-3 paragraf, kısa cümleler]

[Taktik/İçgörü - Hemen uygulanabilir]

[Bağlamsal CTA - Hikayeye bağlı]

Sevgiler,
Can Okçuer
Cyrasoul

P.S. [Etkileşim isteği veya bonus]

---
**Psikoloji:** [Kullanılan mental modeller]
**Hedef:** [Email'in başarı kriteri]
```

---

## Kalite Kontrol Checklist

Her email için kontrol edilecekler:

### İçerik
- [ ] 60 saniyede okunabilir mi? (Max 200 kelime)
- [ ] Plain text formatında mı? (HTML/görsel yok)
- [ ] Tek CTA var mı?
- [ ] P.S. etkileşim isteği içeriyor mu?
- [ ] Handbook bilgileriyle tutarlı mı?

### Teknik
- [ ] Spam trigger kelimeleri yok mu?
- [ ] Link sayısı max 1-2 mi?
- [ ] Konu satırı 40-60 karakter mi?

### Ton
- [ ] Samimi arkadaş tonu mu?
- [ ] Uygulanabilir değer veriyor mu?
- [ ] Bağlamsal CTA mi?

---

## ESP Entegrasyon Notları

### Klaviyo için:
1. Her dizinin segmentasyon kuralını belirle
2. Trigger: Pop-up form submit (hedef seçimine göre)
3. Timing: Plana göre delay ekle (Gün 0, 2, 4, 6, 8, 10, 12)
4. Post-purchase trigger: Order placed

### Personalizasyon:
- `[İsim]` → Klaviyo'da `{{ first_name|default:"" }}`
- İsim yoksa "Selam," olarak kalır

---

## Toplam Email Sayısı

| Dizi | Email Sayısı |
|------|--------------|
| Güzellik Welcome | 7 |
| Odaklanma Welcome | 7 |
| Sakinlik Welcome | 7 |
| Detoks Welcome | 7 |
| Uyku Welcome | 7 |
| Post-Purchase | 5 |
| **TOPLAM** | **40 email** |

---

## Güncelleme Notları

- **Versiyon:** 1.0
- **Oluşturulma:** Şubat 2026
- **Yazar:** Cyrasoul Ekibi
- **Yaklaşım:** Alex Hormozi değer-odaklı email stratejisi
