# Hướng dẫn Link Package - rs-libs-ui

## Tổng quan
Tài liệu này hướng dẫn cách link package rs-libs-ui để development và testing local.

## npm link - Development Workflow

### 1. Link Package từ rs-libs-ui
```bash
# Trong thư mục rs-libs-ui
cd /path/to/rs-libs-ui

# Build package trước
npm run build

# Tạo global symlink
npm link
```

### 2. Sử dụng Package trong dự án khác
```bash
# Trong dự án consumer
cd /path/to/your-project

# Link đến package
npm link @your-github-username/rs-libs-ui
```

### 3. Unlink khi hoàn thành
```bash
# Trong dự án consumer
npm unlink @your-github-username/rs-libs-ui

# Trong rs-libs-ui (optional)
npm unlink
```

## Yalc - Alternative Linking Tool

### 1. Cài đặt Yalc
```bash
npm install -g yalc
```

### 2. Publish local package
```bash
# Trong rs-libs-ui
npm run build
yalc publish
```

### 3. Add vào dự án consumer
```bash
# Trong dự án consumer
yalc add @your-github-username/rs-libs-ui
npm install
```

### 4. Update package
```bash
# Trong rs-libs-ui (sau khi có thay đổi)
npm run build
yalc push

# Hoặc publish và update manual
yalc publish
# Trong consumer project
yalc update
```

### 5. Remove package
```bash
# Trong dự án consumer
yalc remove @your-github-username/rs-libs-ui
npm install
```

## Development với Watch Mode

### 1. Setup Watch trong rs-libs-ui
```bash
# Terminal 1: Watch build
npm run build:watch

# Terminal 2: Watch và push với yalc
npm run watch:yalc
```

### 2. Thêm script vào package.json
```json
{
  "scripts": {
    "build:watch": "rollup -c --watch",
    "watch:yalc": "nodemon --watch dist --exec \"yalc push\"",
    "dev:link": "concurrently \"npm run build:watch\" \"npm run watch:yalc\""
  }
}
```

### 3. Cài đặt dependencies cho watch
```bash
npm install --save-dev nodemon concurrently
```

## Testing Package Integration

### 1. Tạo Test Project
```bash
mkdir test-rs-libs-ui
cd test-rs-libs-ui
npx create-react-app . --template typescript
```

### 2. Link Package
```bash
# Sử dụng npm link
npm link @your-github-username/rs-libs-ui

# Hoặc yalc
yalc add @your-github-username/rs-libs-ui
```

### 3. Test Import
```typescript
// src/App.tsx
import { EmailEditor, EmailTemplate } from '@your-github-username/rs-libs-ui';

function App() {
  return (
    <div className="App">
      <EmailEditor />
    </div>
  );
}
```

## Troubleshooting

### React Hook Errors
Khi link package có thể gặp lỗi "Invalid hook call". Giải pháp:

```bash
# Trong rs-libs-ui, link React từ consumer project
cd node_modules/react
npm link
cd ../react-dom  
npm link

# Trong consumer project
npm link react react-dom
```

### TypeScript Errors
```bash
# Đảm bảo types được build
npm run build

# Kiểm tra dist/index.d.ts tồn tại
ls -la dist/
```

### Module Resolution Issues
Thêm vào tsconfig.json của consumer project:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

## Best Practices

### 1. Development Workflow
```bash
# Setup một lần
npm run build
yalc publish

# Development loop
# 1. Thay đổi code trong rs-libs-ui
# 2. Auto build với watch mode
# 3. Auto push với yalc
# 4. Test trong consumer project
```

### 2. Version Management
```bash
# Bump version trước khi test
npm version prerelease --preid=dev
yalc publish
```

### 3. Clean Development Environment
```bash
# Script để clean tất cả links
npm run clean:links
```

Thêm vào package.json:
```json
{
  "scripts": {
    "clean:links": "npm unlink && yalc installations clean"
  }
}
```

## Multiple Projects Workflow

### 1. Link đến nhiều projects
```bash
# Publish một lần
yalc publish

# Add vào từng project
cd /path/to/project1 && yalc add @your-github-username/rs-libs-ui
cd /path/to/project2 && yalc add @your-github-username/rs-libs-ui
```

### 2. Update tất cả cùng lúc
```bash
# Trong rs-libs-ui
yalc push
# Tự động update tất cả projects đã add
```

## Automation Scripts

### 1. Quick Link Script
```bash
#!/bin/bash
# link.sh
npm run build
yalc publish
echo "Package published locally. Run 'yalc add @your-github-username/rs-libs-ui' in your consumer project."
```

### 2. Development Script  
```bash
#!/bin/bash
# dev.sh
npm run build:watch &
npm run watch:yalc &
echo "Development mode started. Press Ctrl+C to stop."
wait
```
