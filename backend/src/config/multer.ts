import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directories exist
const uploadDirs = {
  notes: './uploads/notes',
  images: './uploads/images',
  documents: './uploads/documents',
  temp: './uploads/temp',
};

Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadType = req.body.uploadType || 'temp';
    const destination = uploadDirs[uploadType as keyof typeof uploadDirs] || uploadDirs.temp;
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

// File filter for different types
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const uploadType = req.body.uploadType;

  if (uploadType === 'images') {
    // Images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  } else if (uploadType === 'documents') {
    // Documents (PDF, DOC, DOCX)
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed!'));
    }
  } else if (uploadType === 'notes') {
    // Notes (PDF, DOC, DOCX, TXT)
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed!'));
    }
  } else {
    // Allow all for temp
    cb(null, true);
  }
};

// Max file size (10MB)
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760');

// Multer upload configuration
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

// Single file upload
export const uploadSingle = (fieldName: string) => upload.single(fieldName);

// Multiple files upload
export const uploadMultiple = (fieldName: string, maxCount: number = 10) =>
  upload.array(fieldName, maxCount);

// Multiple fields upload
export const uploadFields = (fields: { name: string; maxCount: number }[]) =>
  upload.fields(fields);
