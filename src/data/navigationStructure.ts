// Полная структура навигации LPTT

export interface NavSection {
  id: string
  label: string
  icon?: string
  subsections?: NavSection[]
}

export const navigationStructure: NavSection[] = [
  {
    id: 'home',
    label: 'Главная',
  },
  {
    id: 'press-center',
    label: 'Пресс-центр',
    subsections: [
      { id: 'news', label: 'Новости' },
      { id: 'photo-gallery', label: 'Фотогалерея' },
      { id: 'video-gallery', label: 'Видеогалерея' },
      { id: 'events', label: 'Мероприятия' },
    ],
  },
  {
    id: 'professionalism',
    label: 'ФП "Профессионалитет"',
    subsections: [
      { id: 'about-project', label: 'О федеральном проекте' },
      { id: 'project-news', label: 'Новости' },
      { id: 'cluster', label: 'Кластер «Машиностроение»' },
      { id: 'partners', label: 'Предприятия-партнёры' },
      { id: 'council', label: 'Региональный наблюдательный совет' },
      { id: 'management', label: 'Управляющая компания' },
      { id: 'poster', label: 'Постер «Правоохранительная сфера»' },
      { id: 'complex', label: 'Учебно-производственный комплекс' },
    ],
  },
  {
    id: 'applicants',
    label: 'Абитуриентам',
    subsections: [
      { id: 'info', label: 'Информация для абитуриентов' },
      { id: 'specialties', label: 'Специальности' },
      { id: 'faq', label: 'Часто задаваемые вопросы' },
      { id: 'applicant-news', label: 'Новости и объявления' },
      { id: 'targeted', label: 'Целевое обучение' },
      { id: 'application-screen', label: 'Экран подачи заявлений' },
    ],
  },
  {
    id: 'students',
    label: 'Студентам',
    subsections: [
      { id: 'schedule', label: 'Расписание занятий' },
      { id: 'e-resources', label: 'Электронные образовательные ресурсы' },
      { id: 'psychologist', label: 'Страница педагога-психолога' },
      { id: 'mediation', label: 'Служба медитации' },
      { id: 'sport-club', label: 'Спортивный клуб «Вымпел»' },
      { id: 'social-partners', label: 'Наши социальные партнёры' },
      { id: 'diary', label: 'Электронный дневник' },
    ],
  },
  {
    id: 'graduates',
    label: 'Выпускникам',
    subsections: [
      { id: 'cstv', label: 'ЦСТВ' },
      { id: 'work-plan', label: 'План работы' },
      { id: 'reports', label: 'Отчёты' },
      { id: 'online-resources', label: 'Онлайн-ресурсы' },
      { id: 'vacancies', label: 'Вакансии' },
      { id: 'support-program', label: 'Программа постдипломного сопровождения' },
      { id: 'employer-meetings', label: 'Встречи с работодателями' },
      { id: 'employment-info', label: 'Информация о трудоустройстве' },
      { id: 'exhibitions', label: 'Выставки, форумы и статьи' },
    ],
  },
  {
    id: 'projects',
    label: 'Проекты',
    subsections: [
      { id: 'edu-credit', label: 'Образовательный кредит' },
      { id: 'code-future', label: 'Код будущего' },
      { id: 'prof-minimum', label: 'Профминимум' },
      { id: 'student-teams', label: 'Российские студенческие отряды' },
      { id: 'mentorship', label: 'Наставничество' },
      { id: 'ticket-future', label: 'Билет в будущее' },
      { id: 'first-profession', label: 'Первая профессия' },
    ],
  },
  {
    id: 'it-cube',
    label: 'IT-Куб',
    subsections: [
      { id: 'programs', label: 'Дополнительные программы' },
      { id: 'it-schedule', label: 'Расписание занятий' },
      { id: 'enrollment', label: 'Записаться на обучение' },
      { id: 'it-contacts', label: 'Контакты' },
      { id: 'documents', label: 'Документы' },
      { id: 'it-events', label: 'Мероприятия' },
      { id: 'equipment', label: 'Материально-техническое оснащение' },
    ],
  },
  {
    id: 'teachers',
    label: 'Преподавателям',
    subsections: [
      { id: 'educational-work', label: 'Воспитательная работа' },
      { id: 'teacher-diary', label: 'Электронный дневник' },
    ],
  },
  {
    id: 'driving-school',
    label: 'Автошкола',
    subsections: [
      { id: 'driving-programs', label: 'Программы' },
    ],
  },
  {
    id: 'contacts',
    label: 'Контакты',
    subsections: [
      { id: 'control-contacts', label: 'Контакты контролирующих организаций' },
      { id: 'phone-directory', label: 'Телефонный справочник' },
    ],
  },
  {
    id: 'about',
    label: 'О техникуме',
    subsections: [
      { id: 'history', label: 'История' },
      { id: 'about-schedule', label: 'Расписание занятий' },
      { id: 'bell-schedule', label: 'Расписание звонков' },
      { id: 'groups-list', label: 'Список групп' },
      { id: 'newspaper', label: 'Газета' },
      { id: 'museum', label: 'Музей' },
      { id: 'congratulations', label: 'Поздравления и благодарности' },
      { id: 'diplomas', label: 'Дипломы и награды' },
      { id: 'reviews', label: 'Отзывы' },
      { id: 'qa', label: 'Вопрос-ответ' },
    ],
  },
]
