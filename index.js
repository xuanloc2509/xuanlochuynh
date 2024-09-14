import os from 'os';
import express from 'express';
import { writeFile, mkdir } from 'fs/promises';
import EventEmitter from 'events';
import path from 'path';

class TaskEmitter extends EventEmitter {}
const taskEmitter = new TaskEmitter();

const app = express();
const PORT = 3000;

// Lấy thông tin hệ thống
const systemInfo = {
    OSType: os.type(),
    Platform: os.platform(),
    RAM: os.totalmem(),
    USEDRAM: os.totalmem() - os.freemem(),
    CPU: os.cpus()
};

// Đường dẫn tới file
const directoryPath = path.join('D:', 'Homework');
const filePath = path.join(directoryPath, 'systemInfo.json');

// Tạo thư mục trước khi server khởi động
const initialize = async () => {
    try {
        // Kiểm tra và tạo thư mục nếu chưa tồn tại
        await mkdir(directoryPath, { recursive: true });
        console.log(`Thư mục '${directoryPath}' đã sẵn sàng.`);
    } catch (err) {
        console.error('Lỗi khi tạo thư mục:', err);
        process.exit(1); // Dừng ứng dụng nếu không thể tạo thư mục
    }
};

// Endpoint để in ra trình duyệt
app.get('/', async (req, res) => {
    res.json(systemInfo);
    
    try {
        // Ghi thông tin ra file
        await writeFile(filePath, JSON.stringify(systemInfo, null, 2));

        // Emit sự kiện khi hoàn thành
        taskEmitter.emit('completedTask');
    } catch (err) {
        console.error('Lỗi khi ghi file:', err);
    }
});

// Bắt sự kiện khi task hoàn thành
taskEmitter.on('completedTask', () => {
    console.log('Completed task!');
});

// Khởi tạo và start server
initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
