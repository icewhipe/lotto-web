"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadMultiple = exports.uploadSingle = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure upload directories exist
const uploadDirs = {
    notes: './uploads/notes',
    images: './uploads/images',
    documents: './uploads/documents',
    temp: './uploads/temp',
};
Object.values(uploadDirs).forEach((dir) => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
});
// Storage configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadType = req.body.uploadType || 'temp';
        const destination = uploadDirs[uploadType] || uploadDirs.temp;
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path_1.default.extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        cb(null, filename);
    },
});
// File filter for different types
const fileFilter = (req, file, cb) => {
    const uploadType = req.body?.uploadType;
    if (uploadType === 'images') {
        // Images only
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'));
        }
    }
    else if (uploadType === 'documents') {
        // Documents (PDF, DOC, DOCX)
        const allowedMimes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Only PDF and DOC files are allowed!'));
        }
    }
    else if (uploadType === 'notes') {
        // Notes (PDF, DOC, DOCX, TXT)
        const allowedMimes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed!'));
        }
    }
    else {
        // Allow all for temp
        cb(null, true);
    }
};
// Max file size (10MB)
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760');
// Multer upload configuration
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
});
// Single file upload
const uploadSingle = (fieldName) => exports.upload.single(fieldName);
exports.uploadSingle = uploadSingle;
// Multiple files upload
const uploadMultiple = (fieldName, maxCount = 10) => exports.upload.array(fieldName, maxCount);
exports.uploadMultiple = uploadMultiple;
// Multiple fields upload
const uploadFields = (fields) => exports.upload.fields(fields);
exports.uploadFields = uploadFields;
//# sourceMappingURL=multer.js.map