# 📡 LPTT Public API Endpoints

## Overview

Public API endpoints для основного сайта ЛПТТ. Эти endpoints доступны без авторизации и используются для отображения контента на публичной части сайта.

**Base URL:** `https://api.lptt.obrvrn.ru` (production)  
**Base URL:** `http://localhost:3000/api` (development)

---

## 🔓 Authentication

Public endpoints **НЕ требуют** authentication token.

---

## 📊 Endpoints

### 1. GET /public/stats

Получить общую статистику техникума.

**Response:**
```json
{
  "success": true,
  "data": {
    "students": 532,
    "specialties": 12,
    "teachers": 48,
    "employmentRate": 98,
    "yearsOfExperience": 50
  }
}
```

### 2. GET /public/news

Получить список новостей.

**Query Parameters:**
- `page` (number, optional) - Номер страницы, default: 1
- `limit` (number, optional) - Количество на странице, default: 10
- `category` (string, optional) - Фильтр по категории: NEWS | ANNOUNCEMENT | EVENT

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Заголовок новости",
        "description": "Краткое описание...",
        "imageUrl": "https://cdn.lptt.ru/news/image.jpg",
        "publishedAt": "2025-10-16T10:00:00Z",
        "category": "NEWS",
        "isPublished": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "hasMore": true
    }
  }
}
```

### 3. GET /public/news/:id

Получить одну новость по ID.

**Parameters:**
- `id` (string) - UUID новости

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Заголовок новости",
    "description": "Краткое описание",
    "content": "Полный текст новости...",
    "imageUrl": "https://cdn.lptt.ru/news/image.jpg",
    "publishedAt": "2025-10-16T10:00:00Z",
    "category": "NEWS",
    "views": 150
  }
}
```

### 4. GET /public/gallery/photos

Получить фотографии из галереи.

**Query Parameters:**
- `albumId` (string, optional) - UUID альбома
- `page` (number, optional) - Номер страницы, default: 1
- `limit` (number, optional) - Количество на странице, default: 20

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Название фото",
        "description": "Описание",
        "imageUrl": "https://cdn.lptt.ru/gallery/photo.jpg",
        "thumbnailUrl": "https://cdn.lptt.ru/gallery/photo_thumb.jpg",
        "albumId": "uuid",
        "views": 50,
        "likes": 10
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 200
    }
  }
}
```

### 5. GET /public/gallery/albums

Получить список альбомов.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Альбом 2024",
      "description": "Описание альбома",
      "coverImage": "https://cdn.lptt.ru/albums/cover.jpg",
      "photoCount": 45,
      "createdAt": "2024-09-01T00:00:00Z"
    }
  ]
}
```

### 6. GET /public/schedule

Получить расписание.

**Query Parameters:**
- `groupId` (string, optional) - UUID группы
- `date` (string, optional) - Дата в формате YYYY-MM-DD

**Response:**
```json
{
  "success": true,
  "data": {
    "group": {
      "id": "uuid",
      "name": "ПТ-21",
      "specialty": "Программирование"
    },
    "date": "2025-10-16",
    "dayOfWeek": 1,
    "lessons": [
      {
        "id": "uuid",
        "subject": {
          "id": "uuid",
          "name": "Математика",
          "code": "MATH-101"
        },
        "teacher": {
          "id": "uuid",
          "name": "Иванов И.И."
        },
        "startTime": "09:00",
        "endTime": "10:30",
        "room": "201",
        "type": "LECTURE"
      }
    ]
  }
}
```

### 7. GET /public/specialties

Получить список специальностей.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Программирование в компьютерных системах",
      "code": "09.02.07",
      "duration": "3 года 10 месяцев",
      "description": "Подготовка программистов для разработки ПО",
      "budgetPlaces": 25,
      "commercialPlaces": 10,
      "averageScore": 4.5
    }
  ]
}
```

### 8. POST /public/applications

Подать заявление на поступление.

**Request Body:**
```json
{
  "name": "Иван Петров",
  "email": "ivan@example.com",
  "phone": "+79001234567",
  "birthDate": "2007-05-15",
  "specialtyId": "uuid",
  "educationType": "BUDGET"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "applicationNumber": "2025-0001",
    "status": "PENDING",
    "submittedAt": "2025-10-16T12:00:00Z"
  }
}
```

### 9. GET /public/contacts

Получить контактную информацию.

**Response:**
```json
{
  "success": true,
  "data": {
    "phone": "+7 (47391) 4-11-91",
    "email": "lptt@lptt.obrvrn.ru",
    "address": "г. Лиски, ул. Лысенко, 1А",
    "workingHours": "Пн-Пт: 8:00-17:00",
    "coordinates": {
      "lat": 50.9844,
      "lng": 39.5143
    }
  }
}
```

---

## 🔧 Backend Implementation

### File Structure

```
backend/src/
├── routes/
│   └── public.routes.ts       # Public API routes
├── controllers/
│   └── public.controller.ts   # Public API controllers
├── services/
│   └── public.service.ts      # Business logic
└── server.ts                  # Main server file
```

### Implementation Example

#### `backend/src/routes/public.routes.ts`

```typescript
import { Router } from 'express';
import { PublicController } from '../controllers/public.controller';

const router = Router();
const publicController = new PublicController();

// Stats
router.get('/stats', publicController.getStats);

// News
router.get('/news', publicController.getNews);
router.get('/news/:id', publicController.getNewsById);

// Gallery
router.get('/gallery/photos', publicController.getPhotos);
router.get('/gallery/albums', publicController.getAlbums);

// Schedule
router.get('/schedule', publicController.getSchedule);

// Specialties
router.get('/specialties', publicController.getSpecialties);

// Applications
router.post('/applications', publicController.submitApplication);

// Contacts
router.get('/contacts', publicController.getContacts);

export default router;
```

#### `backend/src/controllers/public.controller.ts`

```typescript
import { Request, Response } from 'express';
import { PublicService } from '../services/public.service';

export class PublicController {
  private publicService = new PublicService();

  getStats = async (req: Request, res: Response) => {
    try {
      const stats = await this.publicService.getStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch stats' 
      });
    }
  };

  getNews = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10, category } = req.query;
      const news = await this.publicService.getNews({
        page: Number(page),
        limit: Number(limit),
        category: category as string,
      });
      res.json({ success: true, data: news });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch news' 
      });
    }
  };

  getNewsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const newsItem = await this.publicService.getNewsById(id);
      
      if (!newsItem) {
        return res.status(404).json({ 
          success: false, 
          error: 'News not found' 
        });
      }

      res.json({ success: true, data: newsItem });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch news' 
      });
    }
  };

  getPhotos = async (req: Request, res: Response) => {
    try {
      const { albumId, page = 1, limit = 20 } = req.query;
      const photos = await this.publicService.getPhotos({
        albumId: albumId as string,
        page: Number(page),
        limit: Number(limit),
      });
      res.json({ success: true, data: photos });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch photos' 
      });
    }
  };

  getAlbums = async (req: Request, res: Response) => {
    try {
      const albums = await this.publicService.getAlbums();
      res.json({ success: true, data: albums });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch albums' 
      });
    }
  };

  getSchedule = async (req: Request, res: Response) => {
    try {
      const { groupId, date } = req.query;
      const schedule = await this.publicService.getSchedule({
        groupId: groupId as string,
        date: date as string,
      });
      res.json({ success: true, data: schedule });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch schedule' 
      });
    }
  };

  getSpecialties = async (req: Request, res: Response) => {
    try {
      const specialties = await this.publicService.getSpecialties();
      res.json({ success: true, data: specialties });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch specialties' 
      });
    }
  };

  submitApplication = async (req: Request, res: Response) => {
    try {
      const application = await this.publicService.submitApplication(req.body);
      res.status(201).json({ success: true, data: application });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to submit application' 
      });
    }
  };

  getContacts = async (req: Request, res: Response) => {
    try {
      const contacts = await this.publicService.getContacts();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch contacts' 
      });
    }
  };
}
```

#### `backend/src/services/public.service.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PublicService {
  async getStats() {
    const [students, specialties, teachers] = await Promise.all([
      prisma.student.count(),
      prisma.specialty.count(),
      prisma.teacher.count(),
    ]);

    return {
      students,
      specialties,
      teachers,
      employmentRate: 98, // TODO: Calculate from DB
      yearsOfExperience: 50,
    };
  }

  async getNews(params: { page: number; limit: number; category?: string }) {
    const { page, limit, category } = params;
    const skip = (page - 1) * limit;

    const where = {
      isPublished: true,
      ...(category && { category }),
    };

    const [items, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { date: 'desc' },
        take: limit,
        skip,
      }),
      prisma.event.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + items.length < total,
      },
    };
  }

  async getNewsById(id: string) {
    return prisma.event.findUnique({
      where: { id, isPublished: true },
    });
  }

  async getPhotos(params: { albumId?: string; page: number; limit: number }) {
    const { albumId, page, limit } = params;
    const skip = (page - 1) * limit;

    const where = albumId ? { albumId } : {};

    const [items, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.galleryImage.count({ where }),
    ]);

    return {
      items,
      pagination: { page, limit, total },
    };
  }

  async getAlbums() {
    return prisma.album.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { images: true },
        },
      },
    });
  }

  async getSchedule(params: { groupId?: string; date?: string }) {
    // Implementation depends on schedule schema
    // TODO: Implement based on your schedule logic
    return {
      group: {},
      date: params.date,
      lessons: [],
    };
  }

  async getSpecialties() {
    return prisma.specialty.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { groups: true },
        },
      },
    });
  }

  async submitApplication(data: any) {
    // TODO: Implement application submission
    return {
      id: 'uuid',
      applicationNumber: '2025-0001',
      status: 'PENDING',
      submittedAt: new Date(),
    };
  }

  async getContacts() {
    return {
      phone: '+7 (47391) 4-11-91',
      email: 'lptt@lptt.obrvrn.ru',
      address: 'г. Лиски, ул. Лысенко, 1А',
      workingHours: 'Пн-Пт: 8:00-17:00',
      coordinates: {
        lat: 50.9844,
        lng: 39.5143,
      },
    };
  }
}
```

#### Update `backend/src/server.ts`

```typescript
import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/public.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Public routes (no auth required)
app.use('/api/public', publicRoutes);

// ... other routes ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🧪 Testing

### Using curl

```bash
# Get stats
curl http://localhost:3000/api/public/stats

# Get news
curl "http://localhost:3000/api/public/news?page=1&limit=10"

# Get news by ID
curl http://localhost:3000/api/public/news/uuid

# Get photos
curl "http://localhost:3000/api/public/gallery/photos?page=1&limit=20"

# Submit application
curl -X POST http://localhost:3000/api/public/applications \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"+79001234567","birthDate":"2007-01-01","specialtyId":"uuid","educationType":"BUDGET"}'
```

---

## 📈 Monitoring

- Setup logging for all API calls
- Track response times
- Monitor error rates
- Use APM tools (e.g., New Relic, Datadog)

---

## 🔒 Security

- Rate limiting (use `express-rate-limit`)
- Input validation (use `joi` or `zod`)
- CORS properly configured
- No sensitive data in responses
- SQL injection prevention (Prisma handles this)

---

## 📝 Notes

- All dates are in ISO 8601 format (UTC)
- All IDs are UUIDs
- Pagination starts at page 1
- Default limit is 10-20 depending on endpoint
- Images should be served from CDN
- Cache frequently accessed data (Redis recommended)

---

**Version:** 1.0  
**Last Updated:** 2025-10-16  
**Maintainer:** LPTT Dev Team
