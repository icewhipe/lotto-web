# ✅ ЛПТТ Liquid Glass Редизайн - QA Чек-лист и Критерии Приёмки

## 🎯 Overview

Полный чек-лист для тестирования и приёмки редизайна сайта ЛПТТ в стиле Liquid Glass UI.

**Дата:** 16.10.2025  
**Версия:** 2.0  
**Тестовое окружение:** staging.lptt.obrvrn.ru

---

## 🔴 КРИТИЧЕСКИЕ (Must-Pass) - Блокирующие релиз

### ✅ Анимации

- [ ] **AN-01** Заглушка появляется корректно при загрузке
- [ ] **AN-02** Liquid transition исчезает плавно (2.2s)
- [ ] **AN-03** Волны движутся снизу вверх (12 волн)
- [ ] **AN-04** Droplets имеют морфинг эффект
- [ ] **AN-05** Hero появляется после transition с fade+blur
- [ ] **AN-06** Нет layout shift (CLS < 0.1)
- [ ] **AN-07** Анимации работают в Chrome 100+
- [ ] **AN-08** Анимации работают в Firefox 100+
- [ ] **AN-09** Анимации работают в Safari 15+
- [ ] **AN-10** `prefers-reduced-motion` отключает анимации

**Acceptance Criteria:**
- Transition длится 2200ms
- Hero элементы появляются с stagger (100ms delay)
- Никаких "прыжков" контента
- Reduced motion: анимации < 100ms

---

### ✅ Главный Экран (Hero)

- [ ] **HR-01** Бейджи в один ряд на desktop (≥1024px)
- [ ] **HR-02** Бейдж "г. Лиски, ул. Лысенко 1А" видим
- [ ] **HR-03** Бейдж "Набор 2025-2026" видим
- [ ] **HR-04** Заголовок compact и bold (text-6xl/7xl)
- [ ] **HR-05** Статистика: 4 бейджа в grid 2x2 на mobile
- [ ] **HR-06** Статистика: 4 бейджа в row на desktop
- [ ] **HR-07** CTA кнопки в один ряд на desktop
- [ ] **HR-08** CTA "Подать документы" (primary blue)
- [ ] **HR-09** CTA "Электронный дневник" (secondary glass)
- [ ] **HR-10** Контакты: телефон + email видимы
- [ ] **HR-11** Trust badges: 3 checkmarks видимы
- [ ] **HR-12** Всё видно выше fold на 1366x768
- [ ] **HR-13** Всё видно выше fold на 375x812 (mobile)

**Acceptance Criteria:**
- На desktop: бейджи и кнопки горизонтально
- На mobile: бейджи и кнопки вертикально, но компактно
- Hero занимает max 70vh
- Статистика из API (fallback если offline)

---

### ✅ Навигация

- [ ] **NAV-01** Navbar sticky (fixed position)
- [ ] **NAV-02** Backdrop blur появляется после 50px scroll
- [ ] **NAV-03** Shadow появляется после 50px scroll
- [ ] **NAV-04** Активная секция подсвечивается
- [ ] **NAV-05** Второй navbar без горизонтального скролла
- [ ] **NAV-06** Dropdown меню открывается корректно
- [ ] **NAV-07** Dropdown закрывается при клике вне
- [ ] **NAV-08** Mobile menu открывается/закрывается
- [ ] **NAV-09** Subsections раскрываются в mobile
- [ ] **NAV-10** Keyboard: Tab перемещает фокус
- [ ] **NAV-11** Keyboard: Enter активирует ссылку
- [ ] **NAV-12** Keyboard: Escape закрывает dropdown
- [ ] **NAV-13** Focus visible на всех элементах

**Acceptance Criteria:**
- Navbar остаётся вверху при скролле
- Анимация backdrop blur плавная (300ms)
- Keyboard navigation полностью работает
- No horizontal scroll на любом разрешении

---

### ✅ Производительность

- [ ] **PERF-01** Lighthouse Performance ≥ 90 (mobile)
- [ ] **PERF-02** Lighthouse Performance ≥ 95 (desktop)
- [ ] **PERF-03** LCP < 2.5s
- [ ] **PERF-04** FID < 100ms
- [ ] **PERF-05** CLS < 0.1
- [ ] **PERF-06** TTFB < 600ms
- [ ] **PERF-07** FCP < 1.8s
- [ ] **PERF-08** Main bundle < 300KB (gzip)
- [ ] **PERF-09** Vendor bundle < 200KB (gzip)
- [ ] **PERF-10** Total JS < 650KB (gzip)

**Acceptance Criteria:**
- Lighthouse scores измерены 3 раза, среднее значение
- Тестирование на 3G connection (throttling)
- Все критические ресурсы preloaded

---

### ✅ Accessibility

- [ ] **A11Y-01** Lighthouse Accessibility ≥ 95
- [ ] **A11Y-02** Color contrast ≥ 4.5:1 (text)
- [ ] **A11Y-03** Color contrast ≥ 3:1 (UI components)
- [ ] **A11Y-04** Keyboard navigation работает полностью
- [ ] **A11Y-05** Focus indicators видимые
- [ ] **A11Y-06** ARIA labels на иконках
- [ ] **A11Y-07** ARIA expanded на dropdowns
- [ ] **A11Y-08** Alt text на изображениях
- [ ] **A11Y-09** Heading hierarchy правильная (H1→H2→H3)
- [ ] **A11Y-10** Screen reader friendly
- [ ] **A11Y-11** Reduced motion работает
- [ ] **A11Y-12** No flashing content

**Acceptance Criteria:**
- WCAG AA compliance
- Тестирование с NVDA/JAWS screen reader
- Все интерактивные элементы доступны с клавиатуры

---

### ✅ API Интеграция

- [ ] **API-01** Статистика загружается из /public/stats
- [ ] **API-02** Новости загружаются из /public/news
- [ ] **API-03** Галерея загружается из /public/gallery/photos
- [ ] **API-04** Расписание загружается из /public/schedule
- [ ] **API-05** Специальности загружаются из /public/specialties
- [ ] **API-06** Контакты загружаются из /public/contacts
- [ ] **API-07** Loading states отображаются
- [ ] **API-08** Error states обрабатываются
- [ ] **API-09** Fallback data работает при offline
- [ ] **API-10** Pagination работает корректно

**Acceptance Criteria:**
- Все API calls с try-catch
- Timeout 10 секунд
- Fallback data для всех endpoints
- Error messages user-friendly

---

## 🟡 ВАЖНЫЕ (Should-Pass) - Желательно исправить

### ✅ Адаптивность

- [ ] **RESP-01** 375px (iPhone SE) - всё видно
- [ ] **RESP-02** 390px (iPhone 12/13) - всё видно
- [ ] **RESP-03** 768px (iPad portrait) - оптимально
- [ ] **RESP-04** 1024px (iPad landscape) - оптимально
- [ ] **RESP-05** 1366px (laptop) - оптимально
- [ ] **RESP-06** 1920px (desktop) - оптимально
- [ ] **RESP-07** 2560px (4K) - контент центрирован
- [ ] **RESP-08** Portrait orientation работает
- [ ] **RESP-09** Landscape orientation работает

---

### ✅ Кросс-браузерность

- [ ] **BROWSER-01** Chrome 100+ (desktop)
- [ ] **BROWSER-02** Firefox 100+ (desktop)
- [ ] **BROWSER-03** Safari 15+ (desktop)
- [ ] **BROWSER-04** Edge 100+ (desktop)
- [ ] **BROWSER-05** Chrome 100+ (Android)
- [ ] **BROWSER-06** Safari 15+ (iOS)
- [ ] **BROWSER-07** Samsung Internet 20+

---

### ✅ UX & Micro-interactions

- [ ] **UX-01** Hover эффекты плавные
- [ ] **UX-02** Карточки поднимаются при hover
- [ ] **UX-03** Кнопки имеют ripple/glow
- [ ] **UX-04** Dropdowns имеют smooth transition
- [ ] **UX-05** Images имеют placeholder blur
- [ ] **UX-06** Loading spinners видимые
- [ ] **UX-07** Error messages помогающие
- [ ] **UX-08** Success messages показываются
- [ ] **UX-09** Tooltips информативные
- [ ] **UX-10** Form validation user-friendly

---

### ✅ Контент

- [ ] **CONTENT-01** Все разделы доступны из меню
- [ ] **CONTENT-02** Пресс-центр: новости/фото/видео/события
- [ ] **CONTENT-03** Абитуриентам: специальности/заявления
- [ ] **CONTENT-04** Студентам: расписание/дневник
- [ ] **CONTENT-05** Контакты: телефон/email/адрес/карта
- [ ] **CONTENT-06** Футер: ссылки/соцсети/копирайт
- [ ] **CONTENT-07** 404 страница дружелюбная
- [ ] **CONTENT-08** Placeholder для разделов в разработке

---

## 🟢 NICE-TO-HAVE (Could-Have) - Опционально

### ✅ Оптимизации

- [ ] **OPT-01** Images в AVIF/WebP
- [ ] **OPT-02** Lazy loading images
- [ ] **OPT-03** Fonts preloaded
- [ ] **OPT-04** CDN используется
- [ ] **OPT-05** Code splitting работает
- [ ] **OPT-06** Service Worker для offline
- [ ] **OPT-07** Cache strategy оптимальная
- [ ] **OPT-08** Brotli compression

---

### ✅ SEO

- [ ] **SEO-01** Meta tags корректные
- [ ] **SEO-02** Open Graph настроен
- [ ] **SEO-03** Twitter Cards настроены
- [ ] **SEO-04** Canonical URLs
- [ ] **SEO-05** Sitemap генерируется
- [ ] **SEO-06** Robots.txt настроен
- [ ] **SEO-07** Schema.org markup
- [ ] **SEO-08** Lighthouse SEO = 100

---

### ✅ Analytics & Monitoring

- [ ] **ANALYTICS-01** Google Analytics установлен
- [ ] **ANALYTICS-02** Events tracking настроен
- [ ] **ANALYTICS-03** Error tracking (Sentry)
- [ ] **ANALYTICS-04** Performance monitoring
- [ ] **ANALYTICS-05** User sessions recording

---

## 📋 ПРОЦЕСС ТЕСТИРОВАНИЯ

### 1. Подготовка

```bash
# Clone repo
git clone https://github.com/lptt/website.git
cd website

# Install dependencies
npm install
cd backend && npm install && cd ..

# Setup environment
cp .env.example .env
# Edit .env with correct values

# Run backend
cd backend && npm run dev

# Run frontend (new terminal)
npm run dev
```

### 2. Ручное тестирование

**Инструменты:**
- Chrome DevTools
- Firefox DevTools
- Lighthouse CI
- axe DevTools (accessibility)
- WAVE (accessibility)
- Screen reader (NVDA/JAWS)

**Последовательность:**

1. **Desktop (1920x1080):**
   - Открыть http://localhost:5173
   - Проверить заглушку и transition
   - Проверить hero и все элементы
   - Проверить навигацию
   - Проверить все секции
   - Проверить формы

2. **Mobile (375x812):**
   - Chrome DevTools Device Mode
   - Проверить всё то же самое
   - Проверить touch interactions
   - Проверить mobile menu

3. **Accessibility:**
   - Tab navigation
   - Screen reader
   - Color contrast
   - Reduced motion

4. **Performance:**
   - Lighthouse audit (3 раза)
   - Network throttling (3G)
   - CPU throttling (4x slowdown)

### 3. Автоматизированное тестирование

```bash
# Run tests
npm run test

# Run Lighthouse CI
npm run lighthouse

# Check bundle size
npm run build
npm run analyze
```

### 4. Приёмка

**Criteria:**
- ✅ Все КРИТИЧЕСКИЕ (Must-Pass) пройдены
- ✅ ≥80% ВАЖНЫХ (Should-Pass) пройдены
- ⚠️ NICE-TO-HAVE опциональны

**Sign-off:**
- [ ] QA Engineer: ____________________
- [ ] Product Owner: ____________________
- [ ] Tech Lead: ____________________
- [ ] Design Lead: ____________________

**Дата приёмки:** __________

---

## 🐛 BUG TRACKING

### Severity Levels

- **P0 (Critical):** Блокирует релиз
- **P1 (High):** Важный, но можно задеплоить
- **P2 (Medium):** Желательно исправить
- **P3 (Low):** Nice to have

### Bug Report Template

```markdown
**ID:** BUG-001
**Title:** [Short description]
**Severity:** P0/P1/P2/P3
**Status:** Open/In Progress/Fixed/Closed

**Description:**
[Detailed description of the bug]

**Steps to Reproduce:**
1. ...
2. ...
3. ...

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happens]

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Screen: 1920x1080
- URL: https://staging.lptt.ru

**Screenshots:**
[Attach screenshots]

**Priority Justification:**
[Why this severity level]
```

---

## 📊 МЕТРИКИ УСПЕХА

### Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Lighthouse Performance (Mobile) | ≥90 | - | ⏳ |
| Lighthouse Performance (Desktop) | ≥95 | - | ⏳ |
| LCP | <2.5s | - | ⏳ |
| FID | <100ms | - | ⏳ |
| CLS | <0.1 | - | ⏳ |
| TTFB | <600ms | - | ⏳ |
| FCP | <1.8s | - | ⏳ |
| Bundle Size (Total) | <650KB | - | ⏳ |

### Accessibility Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Lighthouse Accessibility | ≥95 | - | ⏳ |
| WCAG AA Compliance | 100% | - | ⏳ |
| Keyboard Navigation | 100% | - | ⏳ |
| Color Contrast | ≥4.5:1 | - | ⏳ |

### User Experience Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Page Load Time | <3s | - | ⏳ |
| Time to Interactive | <5s | - | ⏳ |
| Error Rate | <1% | - | ⏳ |
| User Satisfaction | ≥4.5/5 | - | ⏳ |

---

## 🚀 РЕЛИЗ

### Pre-Release Checklist

- [ ] Все критические тесты пройдены
- [ ] Все важные тесты пройдены (≥80%)
- [ ] Performance targets достигнуты
- [ ] Accessibility targets достигнуты
- [ ] Security audit пройден
- [ ] Backup создан
- [ ] Rollback plan готов
- [ ] Monitoring настроен
- [ ] Documentation обновлена
- [ ] Changelog подготовлен

### Deployment Steps

1. **Staging Deployment**
   - Deploy to staging
   - Run smoke tests
   - QA sign-off

2. **Production Deployment**
   - Deploy to production
   - Monitor logs
   - Check metrics
   - User acceptance testing

3. **Post-Release**
   - Monitor for 24h
   - Fix critical bugs
   - Collect feedback
   - Plan next iteration

---

## 📞 КОНТАКТЫ

**QA Team:** qa@lptt.ru  
**Dev Team:** dev@lptt.ru  
**Support:** support@lptt.ru  
**Urgent:** +7 (XXX) XXX-XX-XX

---

**Документ версия:** 1.0  
**Последнее обновление:** 16.10.2025  
**Автор:** Claude Sonnet 4.5 (Senior QA Engineer)
